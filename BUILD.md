# 打包发布指南

## 📦 构建准备

### 1. 生成应用图标

1. 在浏览器中打开 `icon-generator.html`
2. 点击"下载图标"按钮，保存为 `icon.png`
3. 将 `icon.png` 复制到 `src-tauri/icons/` 目录
4. 运行图标生成命令：

```powershell
# 使用 Tauri CLI 生成所有平台图标
npm run tauri icon
```

这将自动生成所有需要的图标尺寸：
- Windows: `.ico` 文件
- macOS: `.icns` 文件
- Linux: 各种尺寸的 `.png` 文件

### 2. 版本管理

确保以下文件的版本号一致：
- ✅ `package.json` - version: "1.0.0"
- ✅ `src-tauri/Cargo.toml` - version = "1.0.0"
- ✅ `src-tauri/tauri.conf.json` - version: "1.0.0"

## 🔨 构建步骤

### Windows 构建 (MSI 安装包)

```powershell
# 1. 清理之前的构建
npm run tauri build -- --clean

# 2. 构建生产版本（自动生成 MSI）
npm run tauri build
```

构建产物位置：
```
src-tauri/target/release/
  ├── cover-generator.exe          # 可执行文件
  └── bundle/
      └── msi/
          └── CoverGenerator_1.0.0_x64_zh-CN.msi  # 安装包
```

### 构建选项

**仅构建可执行文件（不打包）：**
```powershell
npm run tauri build -- --bundles none
```

**指定构建目标：**
```powershell
# 仅构建 MSI
npm run tauri build -- --bundles msi

# 构建便携版 + MSI
npm run tauri build -- --bundles msi nsis
```

## 🧪 测试

### 开发模式测试
```powershell
npm run tauri dev
```

### 构建后测试
1. 安装 MSI 包
2. 测试所有功能：
   - 主题切换
   - 文字编辑
   - 图标选择
   - 背景自定义
   - 导出功能（单个/批量）
   - 项目保存/加载
   - 快捷键（Ctrl+S, Ctrl+O, Ctrl+E）

## 📊 优化打包体积

### 当前优化措施

1. **Rust 优化（Cargo.toml）：**
```toml
[profile.release]
opt-level = "z"     # 最大体积优化
lto = true          # 链接时优化
codegen-units = 1   # 单个代码生成单元
strip = true        # 移除调试符号
panic = "abort"     # 减少 panic 处理代码
```

2. **前端构建优化（vite.config.ts）：**
```typescript
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,  // 移除 console
      drop_debugger: true
    }
  },
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'ui-vendor': ['@iconify/react', 'html-to-image']
      }
    }
  }
}
```

### 预期体积

- **可执行文件**：~8-12 MB
- **MSI 安装包**：~10-15 MB
- **安装后大小**：~20-30 MB

### 进一步优化（可选）

1. **使用 UPX 压缩（可能被杀毒软件误报）：**
```powershell
# 下载 UPX: https://github.com/upx/upx/releases
upx --best --lzma src-tauri/target/release/cover-generator.exe
```

2. **移除未使用的 Tauri 功能：**
   - 检查 `src-tauri/Cargo.toml` 中的依赖
   - 移除未使用的 Tauri 插件

## 📋 发布检查清单

- [ ] 更新版本号（package.json, Cargo.toml, tauri.conf.json）
- [ ] 生成自定义图标并运行 `npm run tauri icon`
- [ ] 测试开发模式（npm run tauri dev）
- [ ] 运行完整测试（所有功能）
- [ ] 构建发布版本（npm run tauri build）
- [ ] 测试安装 MSI 包
- [ ] 测试所有功能在已安装应用中正常工作
- [ ] 检查应用图标显示正确
- [ ] 检查卸载功能正常
- [ ] 准备 README.md（使用说明）
- [ ] 准备 CHANGELOG.md（更新日志）

## 🚀 发布

### GitHub Release（推荐）

1. 创建 Git 标签：
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

2. 在 GitHub 上创建 Release
3. 上传构建产物：
   - `CoverGenerator_1.0.0_x64_zh-CN.msi`
   - 可选：`cover-generator.exe`（便携版）

### 本地分发

将 MSI 文件分享给用户，提供安装说明。

## 🛠️ 常见问题

**Q: 构建失败，提示找不到依赖？**
```powershell
# 清理并重新安装
rm -r node_modules
npm install
cd src-tauri
cargo clean
cd ..
npm run tauri build
```

**Q: MSI 安装时被 Windows Defender 拦截？**
- 正常现象（未签名应用）
- 用户需要点击"仍要运行"
- 生产环境建议购买代码签名证书

**Q: 如何减小安装包体积？**
- 见"优化打包体积"章节
- 移除未使用的功能和依赖

**Q: 如何添加代码签名？**
1. 购买代码签名证书
2. 在 `tauri.conf.json` 的 `bundle.windows` 中配置：
```json
{
  "certificateThumbprint": "YOUR_CERT_THUMBPRINT",
  "digestAlgorithm": "sha256",
  "timestampUrl": "http://timestamp.digicert.com"
}
```
