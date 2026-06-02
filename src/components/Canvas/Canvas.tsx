import React from 'react';
import useCoverStore from '@/store/coverStore';
import { RATIOS } from '@/lib/constants';
import { THEME_COMPONENTS } from './themes';

/**
 * Canvas 组件 - 主画布
 * 根据当前主题和配置渲染封面
 */
const Canvas: React.FC = () => {
  const { theme, text, icon, background, previewRatio } = useCoverStore();
  const ratio = RATIOS.find((r) => r.id === previewRatio);

  if (!ratio) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-50">
        <div className="text-gray-500">Invalid ratio selected</div>
      </div>
    );
  }

  // 获取当前主题组件
  const ThemeComponent = THEME_COMPONENTS[theme];

  if (!ThemeComponent) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-50">
        <div className="text-gray-500">Theme not found: {theme}</div>
      </div>
    );
  }

  const aspectRatio = ratio.width / ratio.height;

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 p-8">
      {/* 画布容器 - 用于导出 */}
      <div
        id="cover-canvas"
        className="relative shadow-2xl overflow-hidden bg-white"
        style={{
          width: '100%',
          maxWidth: '900px',
          aspectRatio: aspectRatio,
        }}
      >
        {/* 渲染主题组件 */}
        <ThemeComponent
          text={text}
          icon={icon}
          background={background}
          width={ratio.width}
          height={ratio.height}
        />

        {/* 调试信息 - 仅开发时显示 */}
        {process.env.NODE_ENV === 'development' && (
          <>
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {theme}
            </div>
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {ratio.id}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Canvas;
