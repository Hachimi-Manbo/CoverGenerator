import { useEffect } from 'react';
import useCoverStore from '@/store/coverStore';
import { exportSingleCover } from '@/lib/export';

/**
 * 键盘快捷键 Hook
 * 
 * 快捷键说明：
 * - Ctrl+S: 保存项目
 * - Ctrl+O: 打开/加载项目
 * - Ctrl+E: 导出当前比例
 * - Ctrl+Shift+E: 批量导出所有比例
 */
export function useKeyboardShortcuts() {
  const { saveToFile, loadFromFile, previewRatio, text } = useCoverStore();

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      // 检查是否按下 Ctrl (Windows/Linux) 或 Cmd (Mac)
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;

      if (!isCtrlOrCmd) return;

      // Ctrl+S: 保存项目
      if (event.key === 's' || event.key === 'S') {
        event.preventDefault();
        try {
          const filename = `${text.title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-').substring(0, 30)}-project.json`;
          await saveToFile(filename);
          console.log('项目已保存');
        } catch (error) {
          console.error('保存项目失败:', error);
        }
      }

      // Ctrl+O: 打开/加载项目
      else if (event.key === 'o' || event.key === 'O') {
        event.preventDefault();
        try {
          await loadFromFile();
          console.log('项目已加载');
        } catch (error) {
          console.error('加载项目失败:', error);
        }
      }

      // Ctrl+E: 导出当前比例
      else if (event.key === 'e' || event.key === 'E') {
        event.preventDefault();
        try {
          await exportSingleCover(previewRatio);
          console.log('导出成功');
        } catch (error) {
          console.error('导出失败:', error);
        }
      }

      // Ctrl+Shift+E: 批量导出（保留用于未来实现）
      // else if (event.shiftKey && (event.key === 'e' || event.key === 'E')) {
      //   event.preventDefault();
      //   // 批量导出逻辑
      // }
    };

    // 添加事件监听器
    window.addEventListener('keydown', handleKeyDown);

    // 清理函数
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [saveToFile, loadFromFile, previewRatio, text.title]);
}
