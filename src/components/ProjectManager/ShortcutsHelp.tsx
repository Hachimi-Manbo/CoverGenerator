import React, { useState } from 'react';
import { Icon } from '@iconify/react';

/**
 * ShortcutsHelp 组件 - 键盘快捷键帮助
 * 显示可用的键盘快捷键
 */
const ShortcutsHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'Ctrl+S', description: '保存项目' },
    { key: 'Ctrl+O', description: '打开项目' },
    { key: 'Ctrl+E', description: '导出当前比例' },
  ];

  return (
    <div className="relative">
      {/* 触发按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        title="键盘快捷键"
      >
        <Icon icon="mdi:keyboard-outline" width={20} className="text-gray-600" />
      </button>

      {/* 快捷键列表弹窗 */}
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* 内容 */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-gray-900">键盘快捷键</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Icon icon="mdi:close" width={16} />
              </button>
            </div>
            
            <div className="space-y-2">
              {shortcuts.map((shortcut) => (
                <div 
                  key={shortcut.key} 
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-700">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShortcutsHelp;
