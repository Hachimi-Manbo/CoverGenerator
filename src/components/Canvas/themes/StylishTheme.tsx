import React from 'react';
import { Icon } from '@iconify/react';
import { getScale, type ThemeProps } from './types';

/**
 * StylishTheme - 时尚分栏风格
 * 左右分栏设计，视觉层次感强
 */
const StylishTheme: React.FC<ThemeProps> = ({ text, icon, background, width }) => {
  const scale = getScale(width);
  const bgColor = background.solidColor || '#4F46E5';
  const bgGradient = background.type === 'gradient'
    ? `linear-gradient(${background.gradientAngle || 135}deg, ${background.gradientStart || '#4F46E5'}, ${background.gradientEnd || '#7C3AED'})`
    : bgColor;

  return (
    <div className="relative w-full h-full flex">
      {/* 左侧内容区 - 60% */}
      <div
        className="w-3/5 flex flex-col justify-center"
        style={{
          background: bgGradient,
          padding: `${40 * scale}px`,
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
          className="font-bold leading-tight"
          style={{
            fontSize: text.fontSize * scale,
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
              fontSize: text.fontSize * 0.4 * scale,
              fontWeight: text.fontWeight - 200,
              color: text.color,
              fontFamily: text.font,
            }}
          >
            {text.subtitle}
          </p>
        )}
      </div>

      {/* 右侧装饰区 - 40% */}
      <div
        className="w-2/5 relative flex items-center justify-center"
        style={{
          background: background.type === 'image' && background.imageUrl
            ? `url(${background.imageUrl})`
            : `linear-gradient(135deg, ${bgColor}dd, ${bgColor}99)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* 装饰圆形 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full opacity-20"
            style={{
              width: `${256 * scale}px`,
              height: `${256 * scale}px`,
              background: text.color,
            }}
          />
        </div>

        {/* 作者信息 */}
        {text.author && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 text-center"
            style={{
              fontSize: text.fontSize * 0.35 * scale,
              fontWeight: text.fontWeight - 100,
              color: text.color,
              fontFamily: text.font,
              bottom: `${48 * scale}px`,
            }}
          >
            {text.author}
          </div>
        )}
      </div>
    </div>
  );
};

export default StylishTheme;
