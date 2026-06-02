/**
 * Tauri API 封装
 * 提供文件系统和系统字体访问等原生功能
 */

// 检查是否在 Tauri 环境中运行
export function isTauriApp(): boolean {
  return typeof window !== 'undefined' && '__TAURI__' in window;
}

/**
 * 打开文件保存对话框
 */
export async function saveFile(
  blob: Blob,
  defaultName: string,
  filters?: { name: string; extensions: string[] }[]
): Promise<void> {
  if (!isTauriApp()) {
    // 浏览器环境：直接下载
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = defaultName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return;
  }

  // Tauri 环境：使用原生对话框
  const { save } = await import('@tauri-apps/plugin-dialog');
  const { writeFile } = await import('@tauri-apps/plugin-fs');

  const filePath = await save({
    defaultPath: defaultName,
    filters: filters || [
      { name: 'PNG Image', extensions: ['png'] },
    ],
  });

  if (filePath) {
    const arrayBuffer = await blob.arrayBuffer();
    await writeFile(filePath, new Uint8Array(arrayBuffer));
  }
}

/**
 * 打开文件选择对话框
 */
export async function openFile(
  filters?: { name: string; extensions: string[] }[]
): Promise<string | null> {
  if (!isTauriApp()) {
    return null;
  }

  const { open } = await import('@tauri-apps/plugin-dialog');
  const { readTextFile } = await import('@tauri-apps/plugin-fs');

  const filePath = await open({
    multiple: false,
    filters: filters || [
      { name: 'Cover Project', extensions: ['json'] },
    ],
  });

  if (filePath && typeof filePath === 'string') {
    return await readTextFile(filePath);
  }

  return null;
}

/**
 * 获取系统字体列表（Rust 后端实现）
 */
export async function getSystemFonts(): Promise<string[]> {
  if (!isTauriApp()) {
    return [];
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core');
    const fonts = await invoke<string[]>('get_system_fonts');
    return fonts;
  } catch (error) {
    console.error('Failed to get system fonts:', error);
    return [];
  }
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
