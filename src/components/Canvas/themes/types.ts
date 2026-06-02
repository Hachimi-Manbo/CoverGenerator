import type { TextConfig, IconConfig, BackgroundConfig } from '@/types';

// 主题组件通用 Props
export interface ThemeProps {
  text: TextConfig;
  icon: IconConfig;
  background: BackgroundConfig;
  width: number;
  height: number;
}

/**
 * 计算响应式缩放比例
 * 基于目标宽度与基准宽度（1920px）的比例
 */
export function getScale(targetWidth: number, baseWidth = 1920): number {
  return targetWidth / baseWidth;
}
