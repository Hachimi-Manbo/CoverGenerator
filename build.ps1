# 快速构建脚本
# 用于 Phase 5 打包测试

Write-Host "🎨 CoverGenerator 构建助手" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# 1. 检查环境
Write-Host "📋 检查环境..." -ForegroundColor Yellow

$nodeVersion = node --version 2>$null
$npmVersion = npm --version 2>$null
$cargoVersion = cargo --version 2>$null

if ($nodeVersion) {
    Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js 未安装" -ForegroundColor Red
    exit 1
}

if ($npmVersion) {
    Write-Host "✓ npm: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "✗ npm 未安装" -ForegroundColor Red
    exit 1
}

if ($cargoVersion) {
    Write-Host "✓ Rust: $cargoVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Rust 未安装" -ForegroundColor Red
    Write-Host "  请访问 https://www.rust-lang.org/tools/install 安装 Rust" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# 2. 显示菜单
Write-Host "请选择操作:" -ForegroundColor Cyan
Write-Host "1. 启动开发服务器 (npm run tauri dev)"
Write-Host "2. 构建生产版本 (npm run tauri build)"
Write-Host "3. 生成应用图标 (npm run tauri icon)"
Write-Host "4. 清理并重新构建"
Write-Host "5. 仅构建前端 (npm run build)"
Write-Host "6. 退出"
Write-Host ""

$choice = Read-Host "输入选项 (1-6)"

switch ($choice) {
    "1" {
        Write-Host "`n🚀 启动开发服务器..." -ForegroundColor Green
        npm run tauri dev
    }
    "2" {
        Write-Host "`n📦 构建生产版本..." -ForegroundColor Green
        Write-Host "这可能需要几分钟时间..." -ForegroundColor Yellow
        npm run tauri build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✓ 构建成功！" -ForegroundColor Green
            Write-Host "构建产物位置:" -ForegroundColor Cyan
            Write-Host "  - EXE: src-tauri\target\release\cover-generator.exe"
            Write-Host "  - MSI: src-tauri\target\release\bundle\msi\"
        }
    }
    "3" {
        Write-Host "`n🎨 生成应用图标..." -ForegroundColor Green
        
        $iconPath = "src-tauri\icons\icon.png"
        if (Test-Path $iconPath) {
            Write-Host "✓ 找到图标文件: $iconPath" -ForegroundColor Green
            npm run tauri icon
        } else {
            Write-Host "✗ 未找到图标文件" -ForegroundColor Red
            Write-Host "请先运行以下步骤:" -ForegroundColor Yellow
            Write-Host "1. 在浏览器中打开 icon-generator.html"
            Write-Host "2. 下载生成的图标"
            Write-Host "3. 将图标保存为 src-tauri\icons\icon.png"
            Write-Host "4. 再次运行此命令"
        }
    }
    "4" {
        Write-Host "`n🧹 清理并重新构建..." -ForegroundColor Green
        
        Write-Host "清理 node_modules..." -ForegroundColor Yellow
        if (Test-Path "node_modules") {
            Remove-Item -Recurse -Force "node_modules"
        }
        
        Write-Host "清理 Rust target..." -ForegroundColor Yellow
        if (Test-Path "src-tauri\target") {
            Remove-Item -Recurse -Force "src-tauri\target"
        }
        
        Write-Host "重新安装依赖..." -ForegroundColor Yellow
        npm install
        
        Write-Host "构建生产版本..." -ForegroundColor Yellow
        npm run tauri build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✓ 构建成功！" -ForegroundColor Green
        }
    }
    "5" {
        Write-Host "`n📦 构建前端..." -ForegroundColor Green
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✓ 前端构建成功！" -ForegroundColor Green
            Write-Host "输出目录: dist/" -ForegroundColor Cyan
        }
    }
    "6" {
        Write-Host "`n👋 再见！" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host "`n✗ 无效选项" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
