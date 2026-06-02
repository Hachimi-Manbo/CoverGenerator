import React from 'react';
import { Icon } from '@iconify/react';
import { getScale, type ThemeProps } from './types';

/**
 * BackgroundTheme - 背景图片风格
 * 强调背景图片，文字带遮罩效果
 */
const BackgroundTheme: React.FC<ThemeProps> = ({ text, icon, background, width }) => {
  const scale = getScale(width);
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
    bgStyle.filter = background.imageBlur ? `blur(${background.imageBlur * scale}px)` : 'none';
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
      <div
        className="relative w-full h-full flex flex-col items-center justify-center"
        style={{ padding: `${64 * scale}px` }}
      >
        {/* 图标 */}
        {icon.type === 'iconify' && icon.iconifyId && (
          <div
            className="bg-white/20 backdrop-blur-md"
            style={{
              marginBottom: `${32 * scale}px`,
              borderRadius: `${32 * scale}px`,
              padding: `${24 * scale}px`,
            }}
          >
            <Icon
              icon={icon.iconifyId}
              width={icon.size * scale}
              height={icon.size * scale}
              style={{
                color: icon.color,
                transform: `rotate(${icon.rotation}deg)`,
              }}
            />
          </div>
        )}

        {icon.type === 'custom' && icon.customUrl && (
          <div
            className="bg-white/20 backdrop-blur-md"
            style={{
              marginBottom: `${32 * scale}px`,
              borderRadius: `${32 * scale}px`,
              padding: `${24 * scale}px`,
            }}
          >
            <img
              src={icon.customUrl}
              alt="Custom icon"
              style={{
                width: icon.size * scale,
                height: icon.size * scale,
                transform: `rotate(${icon.rotation}deg)`,
              }}
            />
          </div>
        )}

        {/* 标题 */}
        <h1
          className="text-center font-bold leading-tight"
          style={{
            fontSize: text.fontSize * scale,
            fontWeight: text.fontWeight,
            color: text.color,
            fontFamily: text.font,
            marginBottom: `${16 * scale}px`,
            paddingLeft: `${32 * scale}px`,
            paddingRight: `${32 * scale}px`,
            textShadow: `0 ${4 * scale}px ${20 * scale}px rgba(0,0,0,0.5), 0 ${8 * scale}px ${text.shadowBlur * scale}px ${text.shadowColor}`,
          }}
        >
          {text.title}
        </h1>

        {/* 副标题 */}
        {text.subtitle && (
          <p
            className="text-center opacity-95"
            style={{
              fontSize: text.fontSize * 0.4 * scale,
              fontWeight: text.fontWeight - 200,
              color: text.color,
              fontFamily: text.font,
              paddingLeft: `${32 * scale}px`,
              paddingRight: `${32 * scale}px`,
              textShadow: `0 ${2 * scale}px ${10 * scale}px rgba(0,0,0,0.5)`,
            }}
          >
            {text.subtitle}
          </p>
        )}

        {/* 作者 - 底部居中 */}
        {text.author && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full"
            style={{
              bottom: `${48 * scale}px`,
              paddingLeft: `${32 * scale}px`,
              paddingRight: `${32 * scale}px`,
              paddingTop: `${12 * scale}px`,
              paddingBottom: `${12 * scale}px`,
              fontSize: text.fontSize * 0.35 * scale,
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
