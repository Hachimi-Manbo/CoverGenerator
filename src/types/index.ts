// 主题类型
export type ThemeId = 
  | 'basic' 
  | 'modern' 
  | 'stylish' 
  | 'outline' 
  | 'preview' 
  | 'background';

// 比例类型
export type RatioId = 
  | '1:1' 
  | '16:9' 
  | '21:9' 
  | '4:3' 
  | '2:1' 
  | 'hashnode' 
  | 'devto';

// 背景类型
export type BackgroundType = 'solid' | 'gradient' | 'image';

// 主题配置
export interface ThemeConfig {
  id: ThemeId;
  label: string;
  description: string;
  preview?: string;
}

// 比例配置
export interface RatioConfig {
  id: RatioId;
  label: string;
  width: number;
  height: number;
  description?: string;
}

// 文字配置
export interface TextConfig {
  title: string;
  subtitle: string;
  author: string;
  font: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  strokeColor: string;
  strokeWidth: number;
  shadow: boolean;
  shadowColor: string;
  shadowBlur: number;
}

// 图标配置
export interface IconConfig {
  type: 'iconify' | 'custom' | 'none';
  iconifyId?: string; // e.g., 'logos:react'
  customUrl?: string;
  size: number;
  color: string;
  rotation: number;
}

// 背景配置
export interface BackgroundConfig {
  type: BackgroundType;
  // 纯色
  solidColor?: string;
  // 渐变
  gradientStart?: string;
  gradientEnd?: string;
  gradientAngle?: number;
  // 图片
  imageUrl?: string;
  imageScale?: number;
  imageRotation?: number;
  imageBlur?: number;
  imageBrightness?: number;
  imagePositionX?: number;
  imagePositionY?: number;
  // 通用效果
  borderRadius?: number;
  innerShadow?: boolean;
  opacity?: number;
}

// 封面状态（全局 Store）
export interface CoverState {
  // 当前主题
  theme: ThemeId;
  // 文字配置
  text: TextConfig;
  // 图标配置
  icon: IconConfig;
  // 背景配置
  background: BackgroundConfig;
  // 选中的比例
  selectedRatios: RatioId[];
  // 当前预览的比例
  previewRatio: RatioId;
  
  // 更新方法
  updateTheme: (theme: ThemeId) => void;
  updateText: (text: Partial<TextConfig>) => void;
  updateIcon: (icon: Partial<IconConfig>) => void;
  updateBackground: (background: Partial<BackgroundConfig>) => void;
  updateRatios: (ratios: RatioId[]) => void;
  updatePreviewRatio: (ratio: RatioId) => void;
  reset: () => void;
}

// 项目保存格式
export interface ProjectData {
  version: string;
  theme: ThemeId;
  text: TextConfig;
  icon: IconConfig;
  background: BackgroundConfig;
  selectedRatios: RatioId[];
  createdAt: string;
  updatedAt: string;
}

// 导出选项
export interface ExportOptions {
  ratio: RatioId;
  scale: number; // 2x for high DPI
  quality: number; // 0.95
  filename?: string;
}
