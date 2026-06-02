import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CoverState, ThemeId, RatioId, ProjectData } from '@/types';
import {
  DEFAULT_TEXT_CONFIG,
  DEFAULT_ICON_CONFIG,
  DEFAULT_BACKGROUND_CONFIG,
} from '@/lib/constants';
import { saveProject, loadProject } from '@/lib/tauri';

interface CoverStoreState extends CoverState {
  // 项目管理
  recentProjects: string[];
  currentProjectPath: string | null;
  
  // 项目保存/加载
  exportState: () => ProjectData;
  importState: (data: ProjectData) => void;
  saveToFile: (filename?: string) => Promise<void>;
  loadFromFile: () => Promise<void>;
  addRecentProject: (path: string) => void;
}

const useCoverStore = create<CoverStoreState>()(
  persist(
    (set, get) => ({
      // 初始状态
      theme: 'modern',
      text: DEFAULT_TEXT_CONFIG,
      icon: DEFAULT_ICON_CONFIG,
      background: DEFAULT_BACKGROUND_CONFIG,
      selectedRatios: ['16:9', '1:1'],
      previewRatio: '16:9',
      recentProjects: [],
      currentProjectPath: null,

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

      // 项目序列化
      exportState: (): ProjectData => {
        const state = get();
        return {
          version: '1.0',
          theme: state.theme,
          text: state.text,
          icon: state.icon,
          background: state.background,
          selectedRatios: state.selectedRatios,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      },

      // 项目反序列化
      importState: (data: ProjectData) => {
        set({
          theme: data.theme,
          text: data.text,
          icon: data.icon,
          background: data.background,
          selectedRatios: data.selectedRatios,
          previewRatio: data.selectedRatios[0] || '16:9',
        });
      },

      // 保存项目到文件
      saveToFile: async (filename?: string) => {
        const state = get();
        const projectData = state.exportState();
        const json = JSON.stringify(projectData, null, 2);
        const defaultFilename = filename || `cover-project-${Date.now()}.json`;
        
        await saveProject(json, defaultFilename);
      },

      // 从文件加载项目
      loadFromFile: async () => {
        const json = await loadProject();
        if (json) {
          try {
            const projectData: ProjectData = JSON.parse(json);
            get().importState(projectData);
          } catch (error) {
            console.error('Failed to parse project file:', error);
            throw new Error('Invalid project file');
          }
        }
      },

      // 添加到最近项目列表
      addRecentProject: (path: string) => {
        set((state) => {
          const recent = [path, ...state.recentProjects.filter((p) => p !== path)];
          return {
            recentProjects: recent.slice(0, 10), // 保留最近 10 个
            currentProjectPath: path,
          };
        });
      },
    }),
    {
      name: 'cover-generator-store',
      partialize: (state) => ({
        // 只持久化最近项目列表
        recentProjects: state.recentProjects,
      }),
    }
  )
);

export default useCoverStore;
