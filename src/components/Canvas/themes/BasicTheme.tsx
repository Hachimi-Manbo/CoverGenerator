import React from 'react';
import { Icon } from '@iconify/react';
import { getScale, type ThemeProps } from './types';

/**
 * BasicTheme - 简洁经典风格
 * 灵感来自 CoverView 的 BasicTheme
 */
const BasicTheme: React.FC<ThemeProps> = ({ text, icon, background, width }) => {
  const scale = getScale(width);
  
  const bgStyle: React.CSSProperties = {
    backgroundColor: background.solidColor || '#4F46E5',
  };

  // 如果是渐变背景
  if (background.type === 'gradient') {
    bgStyle.background = `linear-gradient(${background.gradientAngle || 135}deg, ${background.gradientStart || '#4F46E5'}, ${background.gradientEnd || '#7C3AED'})`;
  }

  // 如果是图片背景
  if (background.type === 'image' && background.imageUrl) {
    bgStyle.backgroundImage = `url(${background.imageUrl})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{
        ...bgStyle,
        padding: `${24 * scale}px`,
      }}
    >
      {/* 图标 */}
      {icon.type === 'iconify' && icon.iconifyId && (
        <div style={{ marginBottom: `${32 * scale}px` }}>
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

      {/* 自定义图标/图片 */}
      {icon.type === 'custom' && icon.customUrl && (
        <div style={{ marginBottom: `${32 * scale}px` }}>
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
          fontSize: text.fontSize * 1.2 * scale,
          fontWeight: text.fontWeight,
          color: text.color,
          fontFamily: text.font,
          marginBottom: `${16 * scale}px`,
          textShadow: text.shadow
            ? `0 ${4 * scale}px ${text.shadowBlur * scale}px ${text.shadowColor}`
            : 'none',
          WebkitTextStroke: text.strokeWidth > 0
            ? `${text.strokeWidth * scale}px ${text.strokeColor}`
            : 'none',
        }}
      >
        {text.title}
      </h1>

      {/* 副标题 */}
      {text.subtitle && (
        <p
          className="text-center opacity-90"
          style={{
            fontSize: text.fontSize * 0.5 * scale,
            fontWeight: text.fontWeight - 200,
            color: text.color,
            fontFamily: text.font,
            marginBottom: `${24 * scale}px`,
          }}
        >
          {text.subtitle}
        </p>
      )}

      {/* 作者 */}
      {text.author && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 opacity-80"
          style={{
            bottom: `${32 * scale}px`,
            fontSize: text.fontSize * 0.45 * scale,
            fontWeight: text.fontWeight - 100,
            color: text.color,
            fontFamily: text.font,
          }}
        >
          {text.author}
        </div>
      )}
    </div>
  );
};

export default BasicTheme;
