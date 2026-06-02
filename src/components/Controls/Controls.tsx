import React, { useState } from 'react';
import useCoverStore from '@/store/coverStore';
import { THEMES, RATIOS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import IconPicker from './IconPicker';
import CollapsibleSection from './CollapsibleSection';
import ShortcutsHelp from '../ProjectManager/ShortcutsHelp';
import { exportSingleCover, exportMultipleRatios } from '@/lib/export';

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
    saveToFile,
    loadFromFile,
  } = useCoverStore();

  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 导出当前比例
  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportSingleCover(previewRatio);
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  // 批量导出所有选中比例
  const handleExportAll = async () => {
    if (selectedRatios.length === 0) {
      alert('请至少选择一个比例');
      return;
    }

    setIsExporting(true);
    try {
      const element = document.getElementById('cover-canvas');
      if (!element) {
        throw new Error('Canvas element not found');
      }
      
      const baseFilename = text.title
        .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-')
        .substring(0, 50) || 'cover';
      
      await exportMultipleRatios(element, selectedRatios, baseFilename);
      alert(`成功导出 ${selectedRatios.length} 个文件！`);
    } catch (error) {
      console.error('Batch export failed:', error);
      alert('批量导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  // 保存项目
  const handleSaveProject = async () => {
    setIsSaving(true);
    try {
      const filename = `${text.title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-').substring(0, 30)}-project.json`;
      await saveToFile(filename);
      alert('项目已保存！');
    } catch (error) {
      console.error('Save project failed:', error);
      alert('保存项目失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  // 加载项目
  const handleLoadProject = async () => {
    try {
      await loadFromFile();
      alert('项目已加载！');
    } catch (error) {
      console.error('Load project failed:', error);
      alert('加载项目失败，请重试');
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white border-r border-gray-200">
      <div className="p-6 space-y-4">
        {/* 标题 */}
        <div className="border-b pb-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-gray-900">封面生成器</h1>
            <ShortcutsHelp />
          </div>
          <p className="text-sm text-gray-500">Cover Generator</p>
        </div>

        {/* 主题选择 */}
        <CollapsibleSection title="主题模板" icon="mdi:palette" defaultOpen={true}>
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
        </CollapsibleSection>

        {/* 文字编辑 */}
        <CollapsibleSection title="文字内容" icon="mdi:text" defaultOpen={true}>
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

            {/* 字体选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                字体
              </label>
              <select
                value={text.font}
                onChange={(e) => updateText({ font: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Source Sans Pro">Source Sans Pro</option>
                <option value="Raleway">Raleway</option>
                <option value="Ubuntu">Ubuntu</option>
                <option value="Nunito">Nunito</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier New</option>
              </select>
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

            {/* 字重 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                字体粗细: {text.fontWeight}
              </label>
              <input
                type="range"
                min="100"
                max="900"
                step="100"
                value={text.fontWeight}
                onChange={(e) => updateText({ fontWeight: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Thin</span>
                <span>Normal</span>
                <span>Bold</span>
                <span>Black</span>
              </div>
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

            {/* 文字阴影 */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <input
                  type="checkbox"
                  checked={text.shadow}
                  onChange={(e) => updateText({ shadow: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                文字阴影
              </label>
              {text.shadow && (
                <div className="space-y-2 pl-6">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      阴影模糊: {text.shadowBlur}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={text.shadowBlur}
                      onChange={(e) => updateText({ shadowBlur: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      阴影颜色
                    </label>
                    <input
                      type="color"
                      value={text.shadowColor}
                      onChange={(e) => updateText({ shadowColor: e.target.value })}
                      className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 文字描边 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                描边宽度: {text.strokeWidth}px
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={text.strokeWidth}
                onChange={(e) => updateText({ strokeWidth: parseFloat(e.target.value) })}
                className="w-full"
              />
              {text.strokeWidth > 0 && (
                <div className="mt-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    描边颜色
                  </label>
                  <input
                    type="color"
                    value={text.strokeColor}
                    onChange={(e) => updateText({ strokeColor: e.target.value })}
                    className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </CollapsibleSection>

        {/* 图标设置 */}
        <CollapsibleSection title="图标" icon="mdi:image" defaultOpen={true}>
          <div className="space-y-3">
            {/* 图标选择器 */}
            <IconPicker
              value={icon.iconifyId || ''}
              onChange={(iconId) => updateIcon({ type: 'iconify', iconifyId: iconId })}
            />

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

            {/* 图标旋转 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                旋转角度: {icon.rotation}°
              </label>
              <input
                type="range"
                min="-180"
                max="180"
                value={icon.rotation}
                onChange={(e) => updateIcon({ rotation: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* 背景设置 */}
        <CollapsibleSection title="背景" icon="mdi:palette-swatch" defaultOpen={true}>
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
              <div className="space-y-3">
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

                {/* 图片控制选项 - 仅在有图片时显示 */}
                {background.imageUrl && (
                  <div className="space-y-3 pt-2 border-t border-gray-200">
                    {/* 图片缩放 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        缩放: {((background.imageScale || 1) * 100).toFixed(0)}%
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={background.imageScale || 1}
                        onChange={(e) => updateBackground({ imageScale: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    {/* 图片旋转 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        旋转: {background.imageRotation || 0}°
                      </label>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={background.imageRotation || 0}
                        onChange={(e) => updateBackground({ imageRotation: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    {/* 水平位置 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        水平位置: {background.imagePositionX || 50}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={background.imagePositionX || 50}
                        onChange={(e) => updateBackground({ imagePositionX: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    {/* 垂直位置 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        垂直位置: {background.imagePositionY || 50}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={background.imagePositionY || 50}
                        onChange={(e) => updateBackground({ imagePositionY: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    {/* 模糊 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        模糊: {background.imageBlur || 0}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={background.imageBlur || 0}
                        onChange={(e) => updateBackground({ imageBlur: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    {/* 亮度 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        亮度: {background.imageBrightness || 100}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={background.imageBrightness || 100}
                        onChange={(e) => updateBackground({ imageBrightness: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 通用背景效果 */}
            <div className="pt-3 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">通用效果</h3>
              <div className="space-y-3">
                {/* 圆角半径 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    圆角: {background.borderRadius || 0}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={background.borderRadius || 0}
                    onChange={(e) => updateBackground({ borderRadius: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 比例选择 */}
        <CollapsibleSection title="预览比例" icon="mdi:aspect-ratio" defaultOpen={true}>
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
        </CollapsibleSection>

        {/* 操作按钮 */}
        <div className="pt-4 space-y-3 border-t">
          {/* 导出当前比例 */}
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Icon icon="mdi:download" width={20} className="mr-2" />
            {isExporting ? '导出中...' : '导出当前比例'}
          </Button>

          {/* 批量导出 */}
          <Button 
            className="w-full" 
            size="lg"
            variant="outline"
            onClick={handleExportAll}
            disabled={isExporting || selectedRatios.length === 0}
          >
            <Icon icon="mdi:folder-multiple-image" width={20} className="mr-2" />
            批量导出 ({selectedRatios.length})
          </Button>

          {/* 项目管理 */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button 
              variant="outline"
              onClick={handleSaveProject}
              disabled={isSaving}
            >
              <Icon icon="mdi:content-save" width={18} className="mr-1.5" />
              保存项目
            </Button>
            <Button 
              variant="outline"
              onClick={handleLoadProject}
            >
              <Icon icon="mdi:folder-open" width={18} className="mr-1.5" />
              加载项目
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
