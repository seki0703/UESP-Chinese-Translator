chrome.commands.onCommand.addListener((command) => {
  if (command !== "replace-ank") return;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) return;

    chrome.tabs.sendMessage(tabs[0].id, {
      action: "replaceANK"
    }).catch(() => {});
  });
});
