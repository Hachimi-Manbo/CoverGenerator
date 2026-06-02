import React from 'react';
import useCoverStore from '@/store/coverStore';
import { THEMES, RATIOS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

/**
 * Controls 组件 - 编辑控制面板
 * 提供主题选择、文字编辑、图标选择、背景编辑等功能
 */
const Controls: React.FC = () => {
  const {
    theme,
    text,
    icon,
    background,
    previewRatio,
    selectedRatios,
    updateTheme,
    updateText,
    updateIcon,
    updateBackground,
    updatePreviewRatio,
    updateRatios,
  } = useCoverStore();

  return (
    <div className="h-full overflow-y-auto bg-white border-r border-gray-200">
      <div className="p-6 space-y-8">
        {/* 标题 */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">封面生成器</h1>
          <p className="text-sm text-gray-500 mt-1">Cover Generator</p>
        </div>

        {/* 主题选择 */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Icon icon="mdi:palette" width={20} />
            主题模板
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => updateTheme(t.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg border-2 transition-all
                  ${theme === t.id
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="font-medium text-sm">{t.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{t.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 文字编辑 */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Icon icon="mdi:text" width={20} />
            文字内容
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                标题
              </label>
              <textarea
                value={text.title}
                onChange={(e) => updateText({ title: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="输入封面标题..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                副标题
              </label>
              <input
                type="text"
                value={text.subtitle}
                onChange={(e) => updateText({ subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="输入副标题（可选）..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                作者
              </label>
              <input
                type="text"
                value={text.author}
                onChange={(e) => updateText({ author: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="输入作者名..."
              />
            </div>

            {/* 字体大小 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                字体大小: {text.fontSize}px
              </label>
              <input
                type="range"
                min="24"
                max="120"
                value={text.fontSize}
                onChange={(e) => updateText({ fontSize: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* 文字颜色 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                文字颜色
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={text.color}
                  onChange={(e) => updateText({ color: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={text.color}
                  onChange={(e) => updateText({ color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 图标设置 */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Icon icon="mdi:image" width={20} />
            图标
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                图标 ID (Iconify)
              </label>
              <input
                type="text"
                value={icon.iconifyId || ''}
                onChange={(e) => updateIcon({ type: 'iconify', iconifyId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例: logos:react"
              />
              <p className="text-xs text-gray-500 mt-1">
                访问 <a href="https://icon-sets.iconify.design/" target="_blank" rel="noopener" className="text-blue-500 hover:underline">Iconify</a> 查找图标
              </p>
            </div>

            {/* 图标大小 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                图标大小: {icon.size}px
              </label>
              <input
                type="range"
                min="32"
                max="200"
                value={icon.size}
                onChange={(e) => updateIcon({ size: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* 图标颜色 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                图标颜色
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={icon.color}
                  onChange={(e) => updateIcon({ color: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={icon.color}
                  onChange={(e) => updateIcon({ color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 背景设置 */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Icon icon="mdi:palette-swatch" width={20} />
            背景
          </h2>
          <div className="space-y-3">
            {/* 背景类型 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                背景类型
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => updateBackground({ type: 'solid' })}
                  className={`px-3 py-2 text-xs rounded-lg border-2 transition-all ${
                    background.type === 'solid'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  纯色
                </button>
                <button
                  onClick={() => updateBackground({ type: 'gradient' })}
                  className={`px-3 py-2 text-xs rounded-lg border-2 transition-all ${
                    background.type === 'gradient'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  渐变
                </button>
                <button
                  onClick={() => updateBackground({ type: 'image' })}
                  className={`px-3 py-2 text-xs rounded-lg border-2 transition-all ${
                    background.type === 'image'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  图片
                </button>
              </div>
            </div>

            {/* 纯色背景 */}
            {background.type === 'solid' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  背景颜色
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={background.solidColor || '#4F46E5'}
                    onChange={(e) => updateBackground({ solidColor: e.target.value })}
                    className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={background.solidColor || '#4F46E5'}
                    onChange={(e) => updateBackground({ solidColor: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#4F46E5"
                  />
                </div>
              </div>
            )}

            {/* 渐变背景 */}
            {background.type === 'gradient' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    起始颜色
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={background.gradientStart || '#4F46E5'}
                      onChange={(e) => updateBackground({ gradientStart: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={background.gradientStart || '#4F46E5'}
                      onChange={(e) => updateBackground({ gradientStart: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    结束颜色
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={background.gradientEnd || '#7C3AED'}
                      onChange={(e) => updateBackground({ gradientEnd: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={background.gradientEnd || '#7C3AED'}
                      onChange={(e) => updateBackground({ gradientEnd: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    渐变角度: {background.gradientAngle || 135}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={background.gradientAngle || 135}
                    onChange={(e) => updateBackground({ gradientAngle: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </>
            )}

            {/* 图片背景 */}
            {background.type === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  图片 URL
                </label>
                <input
                  type="text"
                  value={background.imageUrl || ''}
                  onChange={(e) => updateBackground({ imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  或使用 <a href="https://unsplash.com/" target="_blank" rel="noopener" className="text-blue-500 hover:underline">Unsplash</a> 图片链接
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 比例选择 */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Icon icon="mdi:aspect-ratio" width={20} />
            预览比例
          </h2>
          <select
            value={previewRatio}
            onChange={(e) => updatePreviewRatio(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {RATIOS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label} - {r.width}×{r.height}
              </option>
            ))}
          </select>
        </div>

        {/* 导出按钮 */}
        <div className="pt-4 border-t">
          <Button className="w-full" size="lg">
            <Icon icon="mdi:download" width={20} className="mr-2" />
            导出封面
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
