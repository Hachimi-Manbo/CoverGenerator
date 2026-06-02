import React from 'react';
import { Icon } from '@iconify/react';
import { getScale, type ThemeProps } from './types';

/**
 * PreviewTheme - 浏览器预览风格
 * 模拟浏览器窗口的设计
 */
const PreviewTheme: React.FC<ThemeProps> = ({ text, icon, background, width }) => {
  const scale = getScale(width);
  const contentBgColor = background.solidColor || '#4F46E5';

  return (
    <div
      className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
      style={{ padding: `${48 * scale}px` }}
    >
      {/* 浏览器窗口容器 */}
      <div
        className="w-full max-w-5xl bg-white shadow-2xl overflow-hidden"
        style={{ borderRadius: `${32 * scale}px` }}
      >
        {/* 浏览器顶栏 */}
        <div
          className="bg-gray-200 flex items-center border-b border-gray-300"
          style={{
            paddingLeft: `${24 * scale}px`,
            paddingRight: `${24 * scale}px`,
            paddingTop: `${16 * scale}px`,
            paddingBottom: `${16 * scale}px`,
            gap: `${8 * scale}px`,
          }}
        >
          {/* 窗口控制按钮 */}
          <div className="flex" style={{ gap: `${8 * scale}px` }}>
            <div
              className="rounded-full bg-red-500"
              style={{ width: `${12 * scale}px`, height: `${12 * scale}px` }}
            ></div>
            <div
              className="rounded-full bg-yellow-500"
              style={{ width: `${12 * scale}px`, height: `${12 * scale}px` }}
            ></div>
            <div
              className="rounded-full bg-green-500"
              style={{ width: `${12 * scale}px`, height: `${12 * scale}px` }}
            ></div>
          </div>

          {/* 地址栏 */}
          <div
            className="flex-1 bg-white text-gray-500 flex items-center truncate"
            style={{
              marginLeft: `${16 * scale}px`,
              borderRadius: `${8 * scale}px`,
              paddingLeft: `${16 * scale}px`,
              paddingRight: `${16 * scale}px`,
              paddingTop: `${6 * scale}px`,
              paddingBottom: `${6 * scale}px`,
              fontSize: `${14 * scale}px`,
              gap: `${8 * scale}px`,
            }}
          >
            <Icon icon="mdi:lock" width={16 * scale} />
            <span className="truncate">{text.title.toLowerCase().replace(/\s+/g, '-')}.dev</span>
          </div>
        </div>

        {/* 内容区域 */}
        <div
          className="relative flex flex-col items-center justify-center"
          style={{
            background: background.type === 'gradient'
              ? `linear-gradient(${background.gradientAngle || 135}deg, ${background.gradientStart || '#4F46E5'}, ${background.gradientEnd || '#7C3AED'})`
              : contentBgColor,
            backgroundImage: background.type === 'image' && background.imageUrl
              ? `url(${background.imageUrl})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: `${64 * scale}px`,
            minHeight: `${400 * scale}px`,
          }}
        >
          {/* 图标 */}
          {icon.type === 'iconify' && icon.iconifyId && (
            <div style={{ marginBottom: `${24 * scale}px` }}>
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
            <div style={{ marginBottom: `${24 * scale}px` }}>
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
              className="text-center opacity-90"
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

          {/* 作者 - 右下角 */}
          {text.author && (
            <div
              className="absolute bg-white/10 backdrop-blur-sm rounded-full"
              style={{
                bottom: `${24 * scale}px`,
                right: `${24 * scale}px`,
                paddingLeft: `${24 * scale}px`,
                paddingRight: `${24 * scale}px`,
                paddingTop: `${8 * scale}px`,
                paddingBottom: `${8 * scale}px`,
                fontSize: text.fontSize * 0.3 * scale,
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

export default PreviewTheme;
