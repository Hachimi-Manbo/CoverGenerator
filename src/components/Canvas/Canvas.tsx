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
  
  // 计算预览缩放比例（将完整分辨率缩放到 900px 宽度）
  const previewMaxWidth = 900;
  const previewScale = Math.min(previewMaxWidth / ratio.width, 1);

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 p-8">
      {/* 外层容器 - 控制显示尺寸 */}
      <div
        className="relative"
        style={{
          width: ratio.width * previewScale,
          height: ratio.height * previewScale,
        }}
      >
        {/* 画布容器 - 始终以完整分辨率渲染，通过 transform 缩放显示 */}
        <div
          id="cover-canvas"
          className="relative shadow-2xl overflow-hidden bg-white origin-top-left"
          style={{
            width: ratio.width,
            height: ratio.height,
            transform: `scale(${previewScale})`,
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
        </div>
      </div>
    </div>
  );
};

export default Canvas;
