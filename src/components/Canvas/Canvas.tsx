import React from 'react';
import useCoverStore from '@/store/coverStore';
import { RATIOS } from '@/lib/constants';

const Canvas: React.FC = () => {
  const { theme, text, icon, background, previewRatio } = useCoverStore();
  const ratio = RATIOS.find((r) => r.id === previewRatio);

  if (!ratio) {
    return <div>Invalid ratio</div>;
  }

  const aspectRatio = ratio.width / ratio.height;

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-50 p-8">
      <div
        className="relative shadow-2xl overflow-hidden"
        style={{
          width: '100%',
          maxWidth: '800px',
          aspectRatio: aspectRatio,
          backgroundColor: background.solidColor || '#4F46E5',
        }}
      >
        {/* 占位符内容 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
          <div className="text-6xl font-bold mb-4">{text.title}</div>
          <div className="text-2xl opacity-80">{text.subtitle}</div>
          <div className="absolute bottom-8 text-lg opacity-60">{text.author}</div>
          
          {/* 主题标识 */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-sm font-medium">Theme: {theme}</span>
          </div>
          
          {/* 比例标识 */}
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-sm font-medium">
              {ratio.label} ({ratio.width}×{ratio.height})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
