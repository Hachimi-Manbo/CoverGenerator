import React from 'react';
import useCoverStore from '@/store/coverStore';
import { THEMES, RATIOS } from '@/lib/constants';
import { Button } from '@/components/ui/button';

const Controls: React.FC = () => {
  const {
    theme,
    text,
    previewRatio,
    selectedRatios,
    updateTheme,
    updateText,
    updatePreviewRatio,
    updateRatios,
  } = useCoverStore();

  return (
    <div className="h-full overflow-y-auto bg-white border-r border-gray-200">
      <div className="p-6 space-y-6">
        {/* 标题 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">封面生成器</h1>
          <p className="text-sm text-gray-500 mt-1">Cover Generator</p>
        </div>

        {/* 主题选择 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">主题</h2>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((t) => (
              <Button
                key={t.id}
                variant={theme === t.id ? 'default' : 'outline'}
                className="w-full"
                onClick={() => updateTheme(t.id)}
              >
                {t.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 文字编辑 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">文字</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                标题
              </label>
              <input
                type="text"
                value={text.title}
                onChange={(e) => updateText({ title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                副标题
              </label>
              <input
                type="text"
                value={text.subtitle}
                onChange={(e) => updateText({ subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                作者
              </label>
              <input
                type="text"
                value={text.author}
                onChange={(e) => updateText({ author: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 比例选择 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">预览比例</h2>
          <select
            value={previewRatio}
            onChange={(e) => updatePreviewRatio(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {RATIOS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label} ({r.width}×{r.height})
              </option>
            ))}
          </select>
        </div>

        {/* 导出按钮 */}
        <div>
          <Button className="w-full" size="lg">
            导出封面
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
