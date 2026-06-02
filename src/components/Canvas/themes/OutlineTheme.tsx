import React from 'react';
import { Icon } from '@iconify/react';
import { getScale, type ThemeProps } from './types';

/**
 * OutlineTheme - 轮廓边框风格
 * 强调边框和线条的设计
 */
const OutlineTheme: React.FC<ThemeProps> = ({ text, icon, background, width }) => {
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
        padding: `${64 * scale}px`,
      }}
    >
      {/* 外层边框容器 */}
      <div
        className="relative max-w-5xl"
        style={{
          borderColor: text.color,
          borderWidth: `${4 * scale}px`,
          borderStyle: 'solid',
          borderRadius: `${(background.borderRadius || 16) * scale}px`,
          padding: `${64 * scale}px`,
        }}
      >
        {/* 内层边框容器 */}
        <div
          style={{
            borderColor: text.color,
            borderWidth: `${2 * scale}px`,
            borderStyle: 'solid',
            borderRadius: `${((background.borderRadius || 16) - 8) * scale}px`,
            padding: `${48 * scale}px`,
          }}
        >
          {/* 图标 */}
          {icon.type === 'iconify' && icon.iconifyId && (
            <div className="flex justify-center" style={{ marginBottom: `${32 * scale}px` }}>
              <div
                className="rounded-full"
                style={{
                  borderColor: text.color,
                  borderWidth: `${2 * scale}px`,
                  borderStyle: 'solid',
                  padding: `${24 * scale}px`,
                }}
              >
                <Icon
                  icon={icon.iconifyId}
                  width={icon.size * 0.8 * scale}
                  height={icon.size * 0.8 * scale}
                  style={{
                    color: icon.color,
                    transform: `rotate(${icon.rotation}deg)`,
                  }}
                />
              </div>
            </div>
          )}

          {icon.type === 'custom' && icon.customUrl && (
            <div className="flex justify-center" style={{ marginBottom: `${32 * scale}px` }}>
              <div
                className="rounded-full"
                style={{
                  borderColor: text.color,
                  borderWidth: `${2 * scale}px`,
                  borderStyle: 'solid',
                  padding: `${24 * scale}px`,
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
              marginBottom: `${24 * scale}px`,
              textShadow: text.shadow
                ? `0 ${4 * scale}px ${text.shadowBlur * scale}px ${text.shadowColor}`
                : 'none',
            }}
          >
            {text.title}
          </h1>

          {/* 分割线 */}
          <div
            className="mx-auto"
            style={{
              width: `${128 * scale}px`,
              height: `${4 * scale}px`,
              marginBottom: `${24 * scale}px`,
              backgroundColor: text.color,
            }}
          />

          {/* 副标题 */}
          {text.subtitle && (
            <p
              className="text-center opacity-90"
              style={{
                fontSize: text.fontSize * 0.4 * scale,
                fontWeight: text.fontWeight - 200,
                color: text.color,
                fontFamily: text.font,
                marginBottom: `${32 * scale}px`,
              }}
            >
              {text.subtitle}
            </p>
          )}

          {/* 作者 */}
          {text.author && (
            <div
              className="text-center"
              style={{
                borderTopColor: text.color,
                borderTopWidth: `${2 * scale}px`,
                borderTopStyle: 'solid',
                paddingTop: `${24 * scale}px`,
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
    </div>
  );
};

export default OutlineTheme;
