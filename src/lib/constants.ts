import type { ThemeConfig, RatioConfig, TextConfig, IconConfig, BackgroundConfig } from '@/types';

// 主题配置
export const THEMES: ThemeConfig[] = [
  {
    id: 'basic',
    label: 'Basic',
    description: '简洁经典风格',
  },
  {
    id: 'modern',
    label: 'Modern',
    description: '现代卡片风格',
  },
  {
    id: 'stylish',
    label: 'Stylish',
    description: '时尚分栏风格',
  },
  {
    id: 'outline',
    label: 'Outline',
    description: '轮廓边框风格',
  },
  {
    id: 'preview',
    label: 'Preview',
    description: '浏览器预览风格',
  },
  {
    id: 'background',
    label: 'Background',
    description: '背景图片风格',
  },
  {
    id: 'mobile-mockup',
    label: 'Mobile Mockup',
    description: '移动端预览风格',
  },
];

// 比例配置
export const RATIOS: RatioConfig[] = [
  {
    id: '1:1',
    label: '1:1 Square',
    width: 1080,
    height: 1080,
    description: 'Instagram Post',
  },
  {
    id: '16:9',
    label: '16:9 Widescreen',
    width: 1920,
    height: 1080,
    description: 'YouTube Cover',
  },
  {
    id: '21:9',
    label: '21:9 Ultra Wide',
    width: 2560,
    height: 1080,
    description: 'Ultra Wide Cover',
  },
  {
    id: '4:3',
    label: '4:3 Traditional',
    width: 1600,
    height: 1200,
    description: 'Traditional Screen',
  },
  {
    id: '2:1',
    label: '2:1 Banner',
    width: 2000,
    height: 1000,
    description: 'Twitter Cover',
  },
  {
    id: 'hashnode',
    label: 'Hashnode',
    width: 800,
    height: 420,
    description: 'Hashnode Blog',
  },
  {
    id: 'devto',
    label: 'Dev.to',
    width: 1000,
    height: 420,
    description: 'Dev.to Article',
  },
];

// 默认文字配置
export const DEFAULT_TEXT_CONFIG: TextConfig = {
  title: 'Your Awesome Title',
  subtitle: 'Add a catchy subtitle here',
  author: 'Your Name',
  font: 'Inter',
  fontSize: 48,
  fontWeight: 700,
  color: '#FFFFFF',
  strokeColor: '#000000',
  strokeWidth: 0,
  shadow: false,
  shadowColor: '#000000',
  shadowBlur: 10,
};

// 默认图标配置
export const DEFAULT_ICON_CONFIG: IconConfig = {
  type: 'iconify',
  iconifyId: 'logos:react',
  size: 64,
  color: '#61DAFB',
  rotation: 0,
};

// 默认背景配置
export const DEFAULT_BACKGROUND_CONFIG: BackgroundConfig = {
  type: 'solid',
  solidColor: '#4F46E5',
  gradientStart: '#4F46E5',
  gradientEnd: '#7C3AED',
  gradientAngle: 135,
  imageScale: 1,
  imageRotation: 0,
  imageBlur: 0,
  imageBrightness: 100,
  imagePositionX: 50,
  imagePositionY: 50,
  borderRadius: 0,
  innerShadow: false,
  opacity: 100,
};

// 预装字体列表
export const DEFAULT_FONTS = [
  'Inter',
  'Roboto',
  'Poppins',
  'Montserrat',
  'Open Sans',
  'Lato',
  'Source Sans Pro',
  'Raleway',
  'Ubuntu',
  'Nunito',
];

// 离线图标集（示例，后续补充）
export const OFFLINE_ICONS = [
  { id: 'logos:react', label: 'React' },
  { id: 'logos:vue', label: 'Vue.js' },
  { id: 'logos:typescript-icon', label: 'TypeScript' },
  { id: 'logos:javascript', label: 'JavaScript' },
  { id: 'logos:python', label: 'Python' },
  { id: 'logos:nodejs-icon', label: 'Node.js' },
  { id: 'logos:rust', label: 'Rust' },
  { id: 'logos:go', label: 'Go' },
  { id: 'ph:code-bold', label: 'Code' },
  { id: 'ph:laptop-bold', label: 'Laptop' },
  { id: 'ph:rocket-launch-bold', label: 'Rocket' },
  { id: 'ph:lightbulb-bold', label: 'Lightbulb' },
];

// 应用版本
export const APP_VERSION = '1.0.0';

// 项目文件扩展名
export const PROJECT_FILE_EXT = '.cover.json';
