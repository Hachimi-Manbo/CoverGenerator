import type { TextConfig, IconConfig, BackgroundConfig } from '@/types';

// 主题组件通用 Props
export interface ThemeProps {
  text: TextConfig;
  icon: IconConfig;
  background: BackgroundConfig;
  width: number;
  height: number;
}
