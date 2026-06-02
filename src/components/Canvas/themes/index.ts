/**
 * 主题组件索引
 * 统一导出所有主题组件
 */

import BasicTheme from './BasicTheme';
import ModernTheme from './ModernTheme';
import StylishTheme from './StylishTheme';
import OutlineTheme from './OutlineTheme';
import PreviewTheme from './PreviewTheme';
import BackgroundTheme from './BackgroundTheme';

import type { ThemeId } from '@/types';
import type { ThemeProps } from './types';

// 主题组件映射
export const THEME_COMPONENTS: Record<ThemeId, React.FC<ThemeProps>> = {
  'basic': BasicTheme,
  'modern': ModernTheme,
  'stylish': StylishTheme,
  'outline': OutlineTheme,
  'preview': PreviewTheme,
  'background': BackgroundTheme,
};

// 单独导出
export {
  BasicTheme,
  ModernTheme,
  StylishTheme,
  OutlineTheme,
  PreviewTheme,
  BackgroundTheme,
};

export type { ThemeProps };
