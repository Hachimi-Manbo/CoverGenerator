import React from 'react';
import { Icon } from '@iconify/react';
import type { ThemeProps } from './types';

/**
 * OutlineTheme - 轮廓边框风格
 * 强调边框和线条的设计
 */
const OutlineTheme: React.FC<ThemeProps> = ({ text, icon, background }) => {
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
      className="relative w-full h-full flex items-center justify-center p-16"
      style={bgStyle}
    >
      {/* 外层边框容器 */}
      <div
        className="relative border-4 p-16 max-w-5xl"
        style={{
          borderColor: text.color,
          borderRadius: background.borderRadius || 16,
        }}
      >
        {/* 内层边框容器 */}
        <div
          className="border-2 p-12"
          style={{
            borderColor: text.color,
            borderRadius: (background.borderRadius || 16) - 8,
          }}
        >
          {/* 图标 */}
          {icon.type === 'iconify' && icon.iconifyId && (
            <div className="flex justify-center mb-8">
              <div
                className="border-2 rounded-full p-6"
                style={{
                  borderColor: text.color,
                }}
              >
                <Icon
                  icon={icon.iconifyId}
                  width={icon.size * 0.8}
                  height={icon.size * 0.8}
                  style={{
                    color: icon.color,
                    transform: `rotate(${icon.rotation}deg)`,
                  }}
                />
              </div>
            </div>
          )}

          {icon.type === 'custom' && icon.customUrl && (
            <div className="flex justify-center mb-8">
              <div
                className="border-2 rounded-full p-6"
                style={{
                  borderColor: text.color,
                }}
              >
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
            </div>
          )}

          {/* 标题 */}
          <h1
            className="text-center font-bold leading-tight mb-6"
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

          {/* 分割线 */}
          <div
            className="w-32 h-1 mx-auto mb-6"
            style={{
              backgroundColor: text.color,
            }}
          />

          {/* 副标题 */}
          {text.subtitle && (
            <p
              className="text-center opacity-90 mb-8"
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
              className="text-center border-t-2 pt-6"
              style={{
                borderColor: text.color,
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
    </div>
  );
};

export default OutlineTheme;
