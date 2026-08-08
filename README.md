[README.md](https://github.com/user-attachments/files/30848298/README.md)
# UESP-Chinese-Translator

一个面向中文《上古卷轴 V：天际》玩家的 UESP 浏览器辅助扩展。

本项目不会复制或翻译 UESP 的内容，而是在浏览 UESP 时，通过本地术语表将游戏专有名词转换为指定中文汉化的译名，并利用浏览器自带的网页翻译功能完成剩余英文内容的翻译。

目前默认术语表使用 **ANK 汉化**。

## ✨ 功能

### 中文搜索 → UESP 英文搜索

在 UESP 搜索框中直接输入中文游戏名称，例如：

```text
奥杜因
盗贼公会
雪漫
黑暗兄弟会
```

按下：

```text
Alt + Shift + Q
```

自动转换为：

```text
Alduin
Thieves Guild
Whiterun
Dark Brotherhood
```

然后正常进行 UESP 搜索。

### UESP 页面英文术语 → 中文术语

打开 UESP 英文页面后，按：

```text
Alt + Shift + Q
```

插件会将页面中匹配术语表的英文专有名词替换为中文译名。

例如：

```text
Dragonborn → 龙裔
Alduin → 奥杜因
Thalmor → 梭默
Whiterun → 雪漫
```

之后可以直接使用 Chrome / Edge 等浏览器自带的网页翻译功能。

推荐流程：

```text
打开 UESP 页面
      ↓
Alt + Shift + Q
      ↓
专有名词转换为中文
      ↓
浏览器自带翻译
      ↓
阅读中文页面
```

这样可以避免浏览器翻译将《上古卷轴》的专有名词翻译成与游戏汉化不同的名称。

## 🎮 使用方法

### 1. 安装扩展

下载整个项目文件，打包为文件夹，可以通过浏览器的「加载已解压的扩展程序」安装。

Chrome：

```text
chrome://extensions/
```

Microsoft Edge：

```text
edge://extensions/
```

然后：

1. 开启「开发者模式」
2. 点击「加载已解压的扩展程序」
3. 选择本项目文件夹

### 2. 设置快捷键

Chrome：

```text
chrome://extensions/shortcuts
```

Edge：

```text
edge://extensions/shortcuts
```

找到 **UESP-Chinese-Translator**，将「执行术语替换」设置为：

```text
Alt + Shift + Q
```

### 3. 搜索 UESP

例如想查询「独孤城」。

在 UESP 搜索框输入：

```text
独孤城
```

按 `Alt + Shift + Q`，会变成：

```text
Solitude
```

然后正常搜索即可。

### 4. 阅读 UESP 页面

打开 UESP 英文页面后：

```text
Alt + Shift + Q
```

插件会优先将 ANK 术语转换为中文，然后使用浏览器的「翻译成中文」功能翻译剩余英文。

## 📚 术语表

插件的术语表与程序代码分离，位于：

```text
terms.json
```

基本格式：

```json
[
  {
    "en": "Dragonborn",
    "zh": "龙裔"
  },
  {
    "en": "Alduin",
    "zh": "奥杜因"
  }
]
```

因此插件本身并不绑定某一种汉化。

### 使用其他汉化

如果你使用其他中文汉化，只需要修改 `terms.json` 中的中文译名即可，无需修改插件代码。

未来也欢迎贡献者制作：

- 蒹葭版
- 官方繁中版
- 其他汉化版本
- 汉化方案切换

等术语表或相关功能。

## 🛠️ 开发

项目目前结构比较简单：

```text
UESP-Chinese-Translator/
├── manifest.json
├── background.js
├── content.js
├── terms.json
├── README.md
├── LICENSE
└── NOTICE.md
```

### `manifest.json`

浏览器扩展配置。

### `background.js`

负责接收浏览器快捷键并通知当前页面。

### `content.js`

负责：

- 页面英文 → 中文术语替换
- 搜索框中文 → 英文术语替换

### `terms.json`

术语表。

## 🤝 贡献

欢迎任何人参与项目开发。

如果你发现某个术语替换错误，也欢迎直接提交 Issue 或修改术语表后提交 Pull Request。

## 📌 项目定位

这个项目并不是为了重新建立一个中文 UESP。

UESP 本身已经拥有非常丰富的《上古卷轴》资料，因此本项目希望尽可能直接利用 UESP 的原始内容：

```text
UESP
  │
  ├── 提供任务、人物、地点、Lore 等资料
  │
  ↓
UESP-Chinese-Translator
  │
  ├── 中文 → 英文搜索
  │
  └── 英文专有名词 → 指定汉化译名
  │
  ↓
浏览器自带网页翻译
  │
  ↓
中文阅读体验
```

这样可以避免维护一个独立中文 Wiki 所需要的大量翻译和同步工作。

## 📜 许可证与第三方内容

### 项目代码

本项目代码采用 **MIT License** 发布，详见 `LICENSE`。

### 术语表及第三方资料

`terms.json` 中的术语数据可能包含来自第三方社区资料的内容。代码许可证**不等同于**第三方术语数据的许可证。

当前默认 ANK 术语表来源于 **BWiki《上古卷轴5：天际》相关术语资料**。

根据 BWiki 的版权声明：

> 本Wiki用户创作的内容遵循 CC BY-SA 3.0 协议，其版权由编者所有，所使用汉化的版权由各汉化组所有，翻译自UESP的内容其原文版权由UESP及其编者所有。游戏文本、文件和图片内容的版权由其所有者拥有。

因此，使用、修改或再发布相关术语数据时，应遵守其原始来源所适用的许可证、署名及其他要求。

本项目的代码采用 MIT License；第三方术语数据、汉化内容、UESP 内容以及游戏相关素材不因本项目采用 MIT License 而获得 MIT License 授权。

详细来源与声明见 `NOTICE.md`。

## ⚠️ Disclaimer

这是一个非官方的社区工具。

本项目与 Bethesda Softworks、The Elder Scrolls、UESP、BWiki、ANK 或任何相关汉化团队不存在官方关联。

本项目不会复制 UESP 的 Wiki 内容作为项目数据库；插件主要对用户浏览器中显示的网页内容进行本地术语替换。

《The Elder Scrolls》系列及相关游戏文本、图片、文件、商标和其他素材的权利归其各自权利人所有。

## ❤️ 致谢

感谢：

- UESP —— 提供极其丰富的《上古卷轴》资料
- ANK 汉化及相关社区 —— 提供统一的中文游戏术语
- BWiki —— 提供相关术语资料
- Chrome / Microsoft Edge —— 提供网页翻译功能
- 所有参与本项目维护和改进的贡献者

## TODO

- [ ] 多种汉化术语表
- [ ] 汉化方案切换
- [ ] 更完善的术语匹配
- [ ] 更好的搜索支持
- [ ] 自动更新术语表
- [ ] Firefox 支持
- [ ] 更多浏览器支持
- [ ] 更完善的错误处理
- [ ] 术语表管理工具

欢迎提交 Issue 和 Pull Request。

**如果这个工具对你查 UESP 有帮助，欢迎 Star ⭐**
