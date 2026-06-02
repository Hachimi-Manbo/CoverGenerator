import { toPng } from 'html-to-image';
import type { ExportOptions } from '@/types';
import { RATIOS } from './constants';

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

  const dataUrl = await toPng(element, {
    width,
    height,
    pixelRatio: options.scale,
    quality: options.quality,
    cacheBust: true,
  });

  // 转换 data URL 为 Blob
  const response = await fetch(dataUrl);
  return response.blob();
}

/**
 * 下载图片到本地
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
 * 批量导出多个比例
 */
export async function exportMultipleRatios(
  element: HTMLElement,
  ratioIds: string[],
  baseFilename: string,
  scale = 2,
  quality = 0.95
): Promise<void> {
  for (const ratioId of ratioIds) {
    const ratio = RATIOS.find((r) => r.id === ratioId);
    if (!ratio) continue;

    const blob = await exportCanvas(element, {
      ratio: ratioId as any,
      scale,
      quality,
    });

    const filename = `${baseFilename}-${ratio.width}x${ratio.height}.png`;
    downloadImage(blob, filename);

    // 添加延迟避免浏览器阻止多个下载
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
