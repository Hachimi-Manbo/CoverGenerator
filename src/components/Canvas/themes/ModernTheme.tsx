import React from 'react';
import { Icon } from '@iconify/react';
import type { ThemeProps } from './types';

/**
 * ModernTheme - 现代卡片风格
 * 带有阴影的卡片式设计
 */
const ModernTheme: React.FC<ThemeProps> = ({ text, icon, background }) => {
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
      className="relative w-full h-full flex items-center justify-center p-12"
      style={bgStyle}
    >
      {/* 内容卡片 */}
      <div
        className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-12 max-w-4xl shadow-2xl"
        style={{
          borderRadius: background.borderRadius || 24,
        }}
      >
        {/* 图标 - 左上角 */}
        {icon.type === 'iconify' && icon.iconifyId && (
          <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
            <Icon
              icon={icon.iconifyId}
              width={icon.size * 0.8}
              height={icon.size * 0.8}
              style={{
                color: background.solidColor || '#4F46E5',
                transform: `rotate(${icon.rotation}deg)`,
              }}
            />
          </div>
        )}

        {icon.type === 'custom' && icon.customUrl && (
          <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
            <img
              src={icon.customUrl}
              alt="Custom icon"
              style={{
                width: icon.size * 0.8,
                height: icon.size * 0.8,
                transform: `rotate(${icon.rotation}deg)`,
              }}
            />
          </div>
        )}

        {/* 标题 */}
        <h1
          className="font-bold leading-tight mb-4"
          style={{
            fontSize: text.fontSize,
            fontWeight: text.fontWeight,
            color: text.color,
            fontFamily: text.font,
            textShadow: text.shadow
              ? `0 4px ${text.shadowBlur}px ${text.shadowColor}`
              : 'none',
          }}
        >
          {text.title}
        </h1>

        {/* 副标题 */}
        {text.subtitle && (
          <p
            className="opacity-90 mb-6"
            style={{
              fontSize: text.fontSize * 0.4,
              fontWeight: text.fontWeight - 200,
              color: text.color,
              fontFamily: text.font,
            }}
          >
            {text.subtitle}
          </p>
        )}

        {/* 作者 */}
        {text.author && (
          <div
            className="flex items-center gap-3 pt-6 border-t border-white/20"
            style={{
              fontSize: text.fontSize * 0.35,
              fontWeight: text.fontWeight - 100,
              color: text.color,
              fontFamily: text.font,
            }}
          >
            <div className="w-10 h-10 rounded-full bg-white/20"></div>
            <span>{text.author}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTheme;
