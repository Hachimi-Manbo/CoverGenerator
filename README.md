# 🎨 CoverGenerator - 封面生成器

一款功能强大的桌面应用，帮助你快速创建精美的封面图片。支持多种主题模板、图标、文字样式和背景自定义，可导出多种比例的高质量封面。

A powerful desktop app for creating beautiful cover images quickly. Supports multiple theme templates, icons, text styles, and background customization, with export options for various aspect ratios in high quality.

本人是感知算法工程师，完全不懂前端。创建这个项目的直接原因是网上的封面生成工具不能满足**个人**需求。

本项目完全由 Claude 进行开发和调试。

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey)

## ✨ 功能特性

### 🎭 7 种精美主题
- **Gradient Wave** - 波浪渐变主题
- **Tech Grid** - 科技网格主题
- **Minimal** - 极简主题
- **Neon Glow** - 霓虹发光主题
- **Nature** - 自然主题
- **Abstract Art** - 抽象艺术主题
- **Geometric** - 几何图形主题

### 📝 强大的文字编辑
- 标题和副标题独立编辑
- 多种字体选择
- 字号、颜色、粗细、行高自定义
- 实时预览效果

### 🎨 图标系统
- 集成 Iconify（200,000+ 图标）
- 支持在线搜索和选择
- 图标大小和颜色自定义
- 位置自由调整

### 🖼️ 背景自定义
- 纯色背景
- 渐变背景（线性/径向）
- 图片背景（支持本地上传）
- 透明度调节

### 📐 多比例导出
支持 6 种常用比例：
- 16:9（视频封面）
- 4:3（传统显示）
- 1:1（社交媒体）
- 3:2（摄影）
- 21:9（超宽屏）
- 9:16（竖屏视频）

### 💾 项目管理
- 保存设计为项目文件（.json）
- 加载已保存的项目
- 最近项目列表（持久化到 localStorage）
- 批量导出所选比例

### ⌨️ 快捷键支持
- `Ctrl+S` - 保存项目
- `Ctrl+O` - 打开项目
- `Ctrl+E` - 导出当前比例

### 🚀 性能优化
- 启动时间 <2s
- 内存占用 <80MB
- 安装包 ~10-15MB
- 本地运行，无需网络（图标除外）

## 🛠️ 技术栈

- **桌面框架**: [Tauri 2.x](https://tauri.app/) - 轻量级跨平台框架
- **前端框架**: React 19 + TypeScript 5.8
- **构建工具**: Vite 7.0
- **UI 组件**: [Shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **样式方案**: Tailwind CSS 3.4
- **状态管理**: Zustand 5.0 (with persist middleware)
- **图标库**: @iconify/react (200,000+ icons)
- **导出功能**: html-to-image 1.11

## 📦 安装与使用

### 📥 下载安装（用户）

#### Windows

1. 从 [Releases](https://github.com/yourusername/cover-generator/releases) 下载最新版本
2. 双击 `CoverGenerator_1.0.0_x64_zh-CN.msi` 安装
3. 从开始菜单启动应用

#### 便携版

下载 `cover-generator.exe`，无需安装直接运行。

### 🔧 开发环境（开发者）

### 环境要求

- **Node.js**: 20.20.2+
- **Rust**: 1.70+
- **Visual Studio Build Tools** (Windows)

#### 开发步骤

```powershell
# 1. 克隆项目
git clone https://github.com/yourusername/cover-generator.git
cd cover-generator

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run tauri dev

# 4. 构建生产版本
npm run tauri build
```

详细构建说明请查看 [BUILD.md](BUILD.md)

## 🚀 使用指南

### 1️⃣ 选择主题
在左侧控制面板顶部选择你喜欢的主题模板。每个主题都有独特的视觉风格。

### 2️⃣ 编辑文字
- 展开"文字设置"区域
- 输入标题和副标题
- 调整字体、大小、颜色、粗细等
- 实时预览效果

### 3️⃣ 添加图标
- 展开"图标设置"
- 搜索或浏览图标（支持 Iconify 200,000+ 图标）
- 调整图标大小、颜色和位置

### 4️⃣ 自定义背景
- 展开"背景设置"
- 选择纯色、渐变或图片背景
- 调整颜色、透明度或上传本地图片

### 5️⃣ 选择比例
- 在"比例选择"中勾选需要的比例
- 画布会实时切换到选中的比例
- 支持多选（批量导出时使用）

### 6️⃣ 导出封面
- **单个导出**: 点击"导出当前比例"或按 `Ctrl+E`
- **批量导出**: 点击"批量导出 (n)"，选择保存目录
- 支持 PNG 格式，2x 分辨率（高质量）

### 7️⃣ 保存项目
- 点击"保存项目"或按 `Ctrl+S`
- 项目保存为 `.json` 文件
- 包含所有设计设置（主题、文字、图标、背景等）
- 下次通过"加载项目"或 `Ctrl+O` 重新打开

## 📝 项目结构

```
cover-generator/
├── src/                          # 前端源码
│   ├── components/               # React 组件
│   │   ├── Canvas/              # 画布组件（主题渲染）
│   │   ├── Controls/            # 控制面板
│   │   ├── ProjectManager/      # 项目管理组件
│   │   └── ui/                  # Shadcn UI 组件
│   ├── lib/                      # 工具函数
│   │   ├── export.ts            # 导出功能
│   │   ├── tauri.ts             # Tauri API 封装
│   │   └── utils.ts             # 通用工具
│   ├── store/                    # Zustand 状态管理
│   │   └── coverStore.ts        # 全局状态
│   ├── types/                    # TypeScript 类型
│   └── hooks/                    # React Hooks
├── src-tauri/                    # Tauri 后端（Rust）
│   ├── src/                      # Rust 源码
│   ├── icons/                    # 应用图标
│   ├── Cargo.toml               # Rust 依赖配置
│   └── tauri.conf.json          # Tauri 配置
├── BUILD.md                      # 详细构建指南
├── icon-generator.html           # 图标生成工具
└── package.json                  # Node.js 依赖配置
```

## 🎯 开发计划

- [x] Phase 1: 环境搭建
- [x] Phase 2: 主题系统
- [x] Phase 3: 增强控制面板
- [x] Phase 4: 导出和项目保存
- [x] Phase 5: 桌面应用打包
- [ ] Phase 6: 离线优化和系统集成（下一步）
  - [ ] 离线图标包（500-800 常用图标）
  - [ ] Windows 系统字体集成
  - [ ] 离线模式检测和降级

## 📝 更新日志

### v1.0.0 (2026-06-02)

**🎉 首次发布**
- ✅ 7 种精美主题模板
- ✅ 完整的文字编辑功能
- ✅ 图标系统（Iconify 200,000+ 图标）
- ✅ 背景自定义（纯色/渐变/图片）
- ✅ 6 种比例支持（16:9, 4:3, 1:1, 3:2, 21:9, 9:16）
- ✅ 项目保存/加载（.json 格式）
- ✅ 批量导出功能
- ✅ 快捷键支持（Ctrl+S, Ctrl+O, Ctrl+E）
- ✅ 打包优化（体积优化、Release 配置）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

[MIT License](LICENSE)

## 💬 联系方式

- GitHub Issues: [提交问题](https://github.com/yourusername/cover-generator/issues)
- Email: your.email@example.com

## 🙏 致谢

- [Tauri](https://tauri.app/) - 优秀的桌面应用框架
- [Iconify](https://iconify.design/) - 丰富的图标资源
- [Shadcn/ui](https://ui.shadcn.com/) - 精美的 UI 组件
- [Claude](https://claude.ai/) - AI 开发助手

---

**⭐ 如果这个项目对你有帮助，请给个 Star！**

### 项目结构

```
cover-generator/
├── src/                      # 前端源代码
│   ├── components/           # React 组件
│   │   ├── Canvas/          # 画布和主题组件
│   │   ├── Controls/        # 控制面板
│   │   └── ProjectManager/  # 项目管理对话框
│   ├── store/               # Zustand 状态管理
│   ├── lib/                 # 工具函数库
│   ├── types/               # TypeScript 类型定义
│   └── assets/              # 静态资源
├── src-tauri/               # Tauri 后端 (Rust)
├── 开发计划.md               # 详细开发计划
└── package.json
```


## 🎯 开发进度

- [x] Phase 1: 环境配置和基础结构
- [x] Phase 2: 主题系统实现
- [x] Phase 3: 图标和文字控制
- [x] Phase 4: 背景图片和搜索
- [x] Phase 5: 项目管理和批量导出
- [ ] Phase 6: 优化和打包

## 📝 许可证

本项目基于 [GPL-3.0 License](LICENSE) 开源。

## 🙏 致谢

本项目参考了以下优秀项目的设计思路：
- [CoverView](https://github.com/rutikwankhade/CoverView) - 主题设计灵感
- [easy_cover](https://github.com/Moe-hacker/easy_cover) - 功能需求参考

## 🖥️ 平台支持

- ✅ Windows 10/11 (当前优先支持)
- 🔄 Linux (计划支持)
- 📅 macOS (未来支持)

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
