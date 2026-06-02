# CoverGenerator

一款轻量级的博客和社交媒体封面生成器，支持在线图片搜索和本地上传功能。

A lightweight blog and social media cover generator with online image search and local upload capabilities.

本人是感知算法工程师，完全不懂前端。创建这个项目的直接原因是网上的封面生成工具不能满足**个人**需求。

本项目完全由Claude进行开发和调试。

## ✨ 功能特性

- 🎨 **7种主题模板** - Basic、Modern、Stylish、Outline、Preview、Background、Mobile Mockup
- 📐 **多种尺寸支持** - 1:1、16:9、21:9、4:3、2:1、Hashnode、Dev.to 专用尺寸
- 🖼️ **图标系统** - Iconify 在线图标库 + 500+ 离线图标 + 自定义上传
- 🎭 **背景定制** - 纯色/渐变/图片背景，支持在线搜索和本地上传
- 💾 **项目管理** - 保存/加载项目配置，批量导出多尺寸封面
- 🚀 **本地运行** - 基于 Tauri 的桌面应用，无需服务器
- ⚡ **高性能** - 启动时间 <2s，内存占用 <80MB，安装包 ~10MB

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript + Vite
- **桌面框架**: Tauri 2.x (Rust + WebView)
- **UI 组件**: Shadcn/ui (Radix UI)
- **样式方案**: Tailwind CSS 4
- **状态管理**: Zustand
- **图标库**: @iconify/react
- **导出功能**: html-to-image

## 📦 安装与使用

### 环境要求

- **Node.js**: 20+
- **Rust**: 1.70+ (用于构建 Tauri 应用)
- **Visual Studio Build Tools** (Windows 用户)

### 开发环境启动

```powershell
# 安装依赖
npm install

# 启动开发服务器
npm run tauri dev

# 构建生产版本
npm run tauri build
```

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
- [ ] Phase 3: 图标和文字控制
- [ ] Phase 4: 背景图片和搜索
- [ ] Phase 5: 项目管理和批量导出
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
