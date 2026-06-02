import React from 'react';
import { Icon } from '@iconify/react';
import type { ThemeProps } from './types';

/**
 * BackgroundTheme - 背景图片风格
 * 强调背景图片，文字带遮罩效果
 */
const BackgroundTheme: React.FC<ThemeProps> = ({ text, icon, background }) => {
  const bgStyle: React.CSSProperties = {
    backgroundColor: background.solidColor || '#4F46E5',
  };

  if (background.type === 'gradient') {
    bgStyle.background = `linear-gradient(${background.gradientAngle || 135}deg, ${background.gradientStart || '#4F46E5'}, ${background.gradientEnd || '#7C3AED'})`;
  }

  if (background.type === 'image' && background.imageUrl) {
    bgStyle.backgroundImage = `url(${background.imageUrl})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = `${background.imagePositionX || 50}% ${background.imagePositionY || 50}%`;
    bgStyle.filter = background.imageBlur ? `blur(${background.imageBlur}px)` : 'none';
  }

  return (
    <div className="relative w-full h-full">
      {/* 背景层 */}
      <div
        className="absolute inset-0"
        style={bgStyle}
      />

      {/* 渐变遮罩 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
        }}
      />

      {/* 内容层 */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-16">
        {/* 图标 */}
        {icon.type === 'iconify' && icon.iconifyId && (
          <div className="mb-8 bg-white/20 backdrop-blur-md rounded-2xl p-6">
            <Icon
              icon={icon.iconifyId}
              width={icon.size}
              height={icon.size}
              style={{
                color: icon.color,
                transform: `rotate(${icon.rotation}deg)`,
              }}
            />
          </div>
        )}

        {icon.type === 'custom' && icon.customUrl && (
          <div className="mb-8 bg-white/20 backdrop-blur-md rounded-2xl p-6">
            <img
              src={icon.customUrl}
              alt="Custom icon"
              style={{
                width: icon.size,
                height: icon.size,
                transform: `rotate(${icon.rotation}deg)`,
              }}
            />
          </div>
        )}

        {/* 标题 */}
        <h1
          className="text-center font-bold leading-tight mb-4 px-8"
          style={{
            fontSize: text.fontSize,
            fontWeight: text.fontWeight,
            color: text.color,
            fontFamily: text.font,
            textShadow: `0 4px 20px rgba(0,0,0,0.5), 0 8px ${text.shadowBlur}px ${text.shadowColor}`,
          }}
        >
          {text.title}
        </h1>

        {/* 副标题 */}
        {text.subtitle && (
          <p
            className="text-center opacity-95 px-8"
            style={{
              fontSize: text.fontSize * 0.4,
              fontWeight: text.fontWeight - 200,
              color: text.color,
              fontFamily: text.font,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            {text.subtitle}
          </p>
        )}

        {/* 作者 - 底部居中 */}
        {text.author && (
          <div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-8 py-3"
            style={{
              fontSize: text.fontSize * 0.35,
              fontWeight: text.fontWeight - 100,
              color: text.color,
              fontFamily: text.font,
            }}
          >
            {text.author}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundTheme;
