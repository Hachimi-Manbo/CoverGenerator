/**
 * Tauri 浏览器降级方案
 * 在缺少 Tauri 插件时提供基本的文件保存/加载功能
 */

// 检查是否在 Tauri 环境中运行
export function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI__' in window;
}

// 兼容旧的函数名
export const isTauriApp = isTauri;

/**
 * 浏览器环境下保存文件
 */
function browserSaveFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 浏览器环境下读取文件
 */
function browserOpenFile(): Promise<string | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        resolve(text);
      } else {
        resolve(null);
      }
    };
    input.click();
  });
}

/**
 * 打开保存对话框（浏览器降级）
 */
export async function openSaveDialog(options: {
  defaultPath?: string;
  filters?: { name: string; extensions: string[] }[];
}): Promise<string | null> {
  // 浏览器环境下返回默认路径
  return options.defaultPath || 'file.png';
}

/**
 * 打开目录选择对话框（浏览器降级）
 */
export async function openDirectoryDialog(_options?: {
  title?: string;
  defaultPath?: string;
}): Promise<string | null> {
  // 浏览器环境不支持目录选择，返回 null
  console.warn('Directory selection not available in browser mode');
  return null;
}

/**
 * 保存二进制文件（浏览器降级）
 */
export async function saveBinaryFile(
  filePath: string,
  data: Uint8Array
): Promise<void> {
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const filename = filePath.split(/[/\\]/).pop() || 'file.bin';
  browserSaveFile(blob, filename);
}

/**
 * 读取文本文件（浏览器降级）
 */
export async function readTextFile(_filePath: string): Promise<string> {
  console.warn('readTextFile not fully supported in browser mode');
  throw new Error('readTextFile is only available in Tauri environment');
}

/**
 * 保存文本文件（浏览器降级）
 */
export async function saveTextFile(
  filePath: string,
  content: string
): Promise<void> {
  const blob = new Blob([content], { type: 'text/plain' });
  const filename = filePath.split(/[/\\]/).pop() || 'file.txt';
  browserSaveFile(blob, filename);
}

/**
 * 打开文件保存对话框
 */
export async function saveFile(
  blob: Blob,
  defaultName: string,
  _filters?: { name: string; extensions: string[] }[]
): Promise<void> {
  browserSaveFile(blob, defaultName);
}

/**
 * 打开文件选择对话框
 */
export async function openFile(
  _filters?: { name: string; extensions: string[] }[]
): Promise<string | null> {
  return browserOpenFile();
}

/**
 * 获取系统字体列表
 */
export async function getSystemFonts(): Promise<string[]> {
  console.warn('System fonts not available in browser mode');
  return [];
}

/**
 * 保存项目数据
 */
export async function saveProject(data: string, defaultName: string): Promise<void> {
  const blob = new Blob([data], { type: 'application/json' });
  await saveFile(blob, defaultName, [
    { name: 'Cover Project', extensions: ['json'] },
  ]);
}

/**
 * 加载项目数据
 */
export async function loadProject(): Promise<string | null> {
  return await openFile([
    { name: 'Cover Project', extensions: ['json'] },
  ]);
}
