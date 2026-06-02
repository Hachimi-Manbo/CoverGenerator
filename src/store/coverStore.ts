import { create } from 'zustand';
import type { CoverState, ThemeId, RatioId } from '@/types';
import {
  DEFAULT_TEXT_CONFIG,
  DEFAULT_ICON_CONFIG,
  DEFAULT_BACKGROUND_CONFIG,
} from '@/lib/constants';

const useCoverStore = create<CoverState>((set) => ({
  // 初始状态
  theme: 'modern',
  text: DEFAULT_TEXT_CONFIG,
  icon: DEFAULT_ICON_CONFIG,
  background: DEFAULT_BACKGROUND_CONFIG,
  selectedRatios: ['16:9', '1:1'],
  previewRatio: '16:9',

  // 更新方法
  updateTheme: (theme: ThemeId) => set({ theme }),
  
  updateText: (textUpdate) =>
    set((state) => ({
      text: { ...state.text, ...textUpdate },
    })),
  
  updateIcon: (iconUpdate) =>
    set((state) => ({
      icon: { ...state.icon, ...iconUpdate },
    })),
  
  updateBackground: (backgroundUpdate) =>
    set((state) => ({
      background: { ...state.background, ...backgroundUpdate },
    })),
  
  updateRatios: (ratios: RatioId[]) =>
    set({ selectedRatios: ratios }),
  
  updatePreviewRatio: (ratio: RatioId) =>
    set({ previewRatio: ratio }),
  
  reset: () =>
    set({
      theme: 'modern',
      text: DEFAULT_TEXT_CONFIG,
      icon: DEFAULT_ICON_CONFIG,
      background: DEFAULT_BACKGROUND_CONFIG,
      selectedRatios: ['16:9', '1:1'],
      previewRatio: '16:9',
    }),
}));

export default useCoverStore;
