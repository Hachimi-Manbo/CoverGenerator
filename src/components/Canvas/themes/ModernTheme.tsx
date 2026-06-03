import React from 'react';
import { Icon } from '@iconify/react';
import { getScale, type ThemeProps } from './types';

/**
 * ModernTheme - 现代卡片风格
 * 带有阴影的卡片式设计
 */
const ModernTheme: React.FC<ThemeProps> = ({ text, icon, background, width }) => {
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
    bgStyle.backgroundPosition = 'center';
  }

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{
        ...bgStyle,
        padding: `${128 * scale}px`,
      }}
    >
      {/* 内容卡片 */}
      <div
        className="relative bg-white/10 backdrop-blur-sm w-full h-full flex flex-col justify-center shadow-2xl"
        style={{
          borderRadius: `${(background.borderRadius || 24) * scale}px`,
          padding: `${64 * scale}px`,
        }}
      >
        {/* 图标 - 左上角 */}
        {icon.type === 'iconify' && icon.iconifyId && (
          <div
            className="absolute bg-white shadow-lg"
            style={{
              top: `${24 * scale}px`,
              left: `${24 * scale}px`,
              borderRadius: `${32 * scale}px`,
              padding: `${16 * scale}px`,
            }}
          >
            <Icon
              icon={icon.iconifyId}
              width={icon.size * 0.8 * scale}
              height={icon.size * 0.8 * scale}
              style={{
                color: background.solidColor || '#4F46E5',
                transform: `rotate(${icon.rotation}deg)`,
              }}
            />
          </div>
        )}

        {icon.type === 'custom' && icon.customUrl && (
          <div
            className="absolute bg-white shadow-lg"
            style={{
              top: `${-24 * scale}px`,
              left: `${-24 * scale}px`,
              borderRadius: `${32 * scale}px`,
              padding: `${16 * scale}px`,
            }}
          >
            <img
              src={icon.customUrl}
              alt="Custom icon"
              style={{
                width: icon.size * 0.8 * scale,
                height: icon.size * 0.8 * scale,
                transform: `rotate(${icon.rotation}deg)`,
              }}
            />
          </div>
        )}

        {/* 标题 */}
        <h1
          className="font-bold leading-tight"
          style={{
            fontSize: text.fontSize * 1.2 * scale,
            fontWeight: text.fontWeight,
            color: text.color,
            fontFamily: text.font,
            marginBottom: `${16 * scale}px`,
            textShadow: text.shadow
              ? `0 ${4 * scale}px ${text.shadowBlur * scale}px ${text.shadowColor}`
              : 'none',
          }}
        >
          {text.title}
        </h1>

        {/* 副标题 */}
        {text.subtitle && (
          <p
            className="opacity-90"
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
            className="flex items-center border-t border-white/20"
            style={{
              fontSize: text.fontSize * 0.5 * scale,
              fontWeight: text.fontWeight - 100,
              color: text.color,
              fontFamily: text.font,
              gap: `${12 * scale}px`,
              paddingTop: `${24 * scale}px`,
            }}
          >
            <div
              className="rounded-full bg-white/20"
              style={{
                width: `${40 * scale}px`,
                height: `${40 * scale}px`,
              }}
            ></div>
            <span>{text.author}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTheme;
