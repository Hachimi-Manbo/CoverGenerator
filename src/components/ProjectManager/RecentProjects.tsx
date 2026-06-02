import React from 'react';
import useCoverStore from '@/store/coverStore';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';

/**
 * RecentProjects 组件 - 最近项目列表
 * 显示最近打开的项目，支持快速加载
 */
const RecentProjects: React.FC = () => {
  const { recentProjects, loadFromFile } = useCoverStore();

  if (recentProjects.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-500 text-center">
        <Icon icon="mdi:folder-open-outline" width={32} className="mx-auto mb-2 opacity-50" />
        暂无最近项目
      </div>
    );
  }

  const handleLoadRecent = async (path: string) => {
    try {
      await loadFromFile();
    } catch (error) {
      console.error('Failed to load recent project:', error);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700 px-2">最近项目</h3>
      <div className="space-y-1">
        {recentProjects.slice(0, 5).map((path, index) => {
          const filename = path.split(/[/\\]/).pop() || path;
          
          return (
            <button
              key={`${path}-${index}`}
              onClick={() => handleLoadRecent(path)}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2 group"
            >
              <Icon 
                icon="mdi:file-document-outline" 
                width={16} 
                className="text-gray-400 group-hover:text-gray-600" 
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {filename}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {path}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RecentProjects;
