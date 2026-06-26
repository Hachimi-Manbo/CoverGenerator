import { toPng } from 'html-to-image';
import type { ExportOptions } from '@/types';
import { RATIOS } from './constants';
import { 
  isTauri, 
  saveBinaryFile, 
  openSaveDialog,
} from './tauri';

/**
 * 导出画布为 PNG 图片
 */
export async function exportCanvas(
  element: HTMLElement,
  options: ExportOptions
): Promise<Blob> {
  const ratio = RATIOS.find((r) => r.id === options.ratio);
  if (!ratio) {
    throw new Error(`Invalid ratio: ${options.ratio}`);
  }

  const width = ratio.width * options.scale;
  const height = ratio.height * options.scale;

  // 保存原始样式
  const originalWidth = element.style.width;
  const originalHeight = element.style.height;
  const originalMaxWidth = element.style.maxWidth;
  const originalTransform = element.style.transform;
  
  try {
    // 临时移除 transform 缩放，设置为目标尺寸
    element.style.transform = 'none';
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.maxWidth = 'none';

    const dataUrl = await toPng(element, {
      width,
      height,
      pixelRatio: 1,
      quality: options.quality,
      cacheBust: true,
    });

    // 转换 data URL 为 Blob
    const response = await fetch(dataUrl);
    return response.blob();
  } finally {
    // 恢复原始样式
    element.style.transform = originalTransform;
    element.style.width = originalWidth;
    element.style.height = originalHeight;
    element.style.maxWidth = originalMaxWidth;
  }
}

/**
 * 下载图片到本地（浏览器环境）
 */
export function downloadImage(blob: Blob, filename: string): void {
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
 * 导出单个比例的封面图片
 */
export async function exportSingleCover(
  ratioId: string,
  filename?: string
): Promise<void> {
  const element = document.getElementById('cover-canvas');
  if (!element) {
    throw new Error('Canvas element not found');
  }

  const ratio = RATIOS.find((r) => r.id === ratioId);
  if (!ratio) {
    throw new Error(`Invalid ratio: ${ratioId}`);
  }

  const blob = await exportCanvas(element, {
    ratio: ratioId as any,
    scale: 1,
    quality: 0.95,
  });

  const defaultFilename = filename || `cover-${ratio.width}x${ratio.height}.png`;

  // 如果是 Tauri 环境，尝试使用原生保存对话框
  if (isTauri()) {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const filePath = await openSaveDialog({
        defaultPath: defaultFilename,
        filters: [
          {
            name: 'PNG Image',
            extensions: ['png'],
          },
        ],
      });

      if (filePath) {
        await saveBinaryFile(filePath, uint8Array);
        return;
      }
    } catch (error) {
      console.warn('Tauri save dialog failed, falling back to browser download:', error);
      // 降级到浏览器下载
    }
  }
  
  // 浏览器环境或 Tauri 失败时，直接下载
  downloadImage(blob, defaultFilename);
}


