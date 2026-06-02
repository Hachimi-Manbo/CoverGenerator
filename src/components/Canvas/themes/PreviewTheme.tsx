import React from 'react';
import { Icon } from '@iconify/react';
import type { ThemeProps } from './types';

/**
 * PreviewTheme - 浏览器预览风格
 * 模拟浏览器窗口的设计
 */
const PreviewTheme: React.FC<ThemeProps> = ({ text, icon, background }) => {
  const contentBgColor = background.solidColor || '#4F46E5';

  return (
    <div className="relative w-full h-full flex items-center justify-center p-12 bg-gradient-to-br from-gray-100 to-gray-200">
      {/* 浏览器窗口容器 */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* 浏览器顶栏 */}
        <div className="bg-gray-200 px-6 py-4 flex items-center gap-2 border-b border-gray-300">
          {/* 窗口控制按钮 */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* 地址栏 */}
          <div className="flex-1 ml-4 bg-white rounded-lg px-4 py-1.5 text-sm text-gray-500 flex items-center gap-2">
            <Icon icon="mdi:lock" width={16} />
            <span className="truncate">{text.title.toLowerCase().replace(/\s+/g, '-')}.dev</span>
          </div>
        </div>

        {/* 内容区域 */}
        <div
          className="relative flex flex-col items-center justify-center p-16"
          style={{
            background: background.type === 'gradient'
              ? `linear-gradient(${background.gradientAngle || 135}deg, ${background.gradientStart || '#4F46E5'}, ${background.gradientEnd || '#7C3AED'})`
              : contentBgColor,
            backgroundImage: background.type === 'image' && background.imageUrl
              ? `url(${background.imageUrl})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '400px',
          }}
        >
          {/* 图标 */}
          {icon.type === 'iconify' && icon.iconifyId && (
            <div className="mb-6">
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
            <div className="mb-6">
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
            className="text-center font-bold leading-tight mb-4"
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
              className="text-center opacity-90"
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

          {/* 作者 - 右下角 */}
          {text.author && (
            <div
              className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2"
              style={{
                fontSize: text.fontSize * 0.3,
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
