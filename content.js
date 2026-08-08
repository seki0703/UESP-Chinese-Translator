let terms = [];
let loaded = false;

fetch(chrome.runtime.getURL("terms.json"))
  .then(response => response.json())
  .then(data => {
    terms = data;
    terms.sort((a, b) => b.en.length - a.en.length);
    loaded = true;
  })
  .catch(error => {
    console.error("UESP ANK Helper: 无法加载 terms.json", error);
  });

chrome.runtime.onMessage.addListener((message) => {
  if (message.action !== "replaceANK") return;

  if (!loaded) {
    console.warn("UESP ANK Helper: 术语表尚未加载完成");
    return;
  }

  // 同一个快捷键：
  // 1. 如果当前焦点在搜索/文本输入框：中文 → 英文
  // 2. 否则：网页正文英文 → ANK中文
  const active = document.activeElement;
  // UESP 的两个搜索框使用的 input 属性不完全相同，
  // 因此这里不再限制 type=text/search，直接识别所有 input/textarea。
  const isInput =
    active &&
    (
      active.matches("input") ||
      active.matches("textarea") ||
      active.isContentEditable
    );

  if (isInput) {
    replaceChineseInInput(active);
  } else {
    replaceEnglishTerms();
  }
});

function replaceEnglishTerms() {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  let changed = 0;

  for (const node of nodes) {
    const parent = node.parentElement;
    if (!parent) continue;

    if (
      parent.closest(
        "script, style, noscript, textarea, input, select, option, code, pre"
      )
    ) {
      continue;
    }

    let text = node.nodeValue;
    let newText = text;

    for (const term of terms) {
      const regex = new RegExp(
        "(?<![A-Za-z0-9_])" +
        escapeRegExp(term.en) +
        "(?![A-Za-z0-9_])",
        "gi"
      );

      newText = newText.replace(regex, term.zh);
    }

    if (newText !== text) {
      node.nodeValue = newText;
      changed++;
    }
  }

  console.log(`UESP ANK Helper: 已替换 ${changed} 个文本节点`);
}

function replaceChineseInInput(input) {
  let value = input.value;

  // 长中文术语优先。
  const candidates = [];

  for (const term of terms) {
    candidates.push({ zh: term.zh, en: term.en });

    if (Array.isArray(term.zhAliases)) {
      for (const alias of term.zhAliases) {
        candidates.push({ zh: alias, en: term.en });
      }
    }
  }

  candidates.sort((a, b) => b.zh.length - a.zh.length);

  for (const item of candidates) {
    const regex = new RegExp(escapeRegExp(item.zh), "g");
    value = value.replace(regex, item.en);
  }

  if (value !== input.value) {
    // 使用原生 setter，兼容部分网页对 value 属性的特殊处理。
    const prototype = Object.getPrototypeOf(input);
    const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

    if (descriptor && descriptor.set) {
      descriptor.set.call(input, value);
    } else {
      input.value = value;
    }

    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
