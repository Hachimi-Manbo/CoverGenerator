import React from 'react';
import { Icon } from '@iconify/react';
import type { ThemeProps } from './types';

/**
 * MobileMockupTheme - 移动端预览风格
 * 模拟手机屏幕的设计
 */
const MobileMockupTheme: React.FC<ThemeProps> = ({ text, icon, background }) => {
  const contentBgColor = background.solidColor || '#4F46E5';

  return (
    <div className="relative w-full h-full flex items-center justify-center p-12 bg-gradient-to-br from-purple-100 to-blue-100">
      {/* 手机外壳 */}
      <div className="relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
        {/* 屏幕内容区域 */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden"
          style={{
            width: '400px',
            height: '800px',
          }}
        >
          {/* 状态栏 */}
          <div className="absolute top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-sm px-8 py-3 flex items-center justify-between">
            <span className="text-white text-sm font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:signal" className="text-white" width={16} />
              <Icon icon="mdi:wifi" className="text-white" width={16} />
              <Icon icon="mdi:battery" className="text-white" width={20} />
            </div>
          </div>

          {/* 刘海 */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 w-40 h-7 bg-gray-900 rounded-b-3xl"></div>

          {/* 背景内容 */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-12"
            style={{
              background: background.type === 'gradient'
                ? `linear-gradient(${background.gradientAngle || 135}deg, ${background.gradientStart || '#4F46E5'}, ${background.gradientEnd || '#7C3AED'})`
                : contentBgColor,
              backgroundImage: background.type === 'image' && background.imageUrl
                ? `url(${background.imageUrl})`
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* 图标 */}
            {icon.type === 'iconify' && icon.iconifyId && (
              <div className="mb-6 mt-8">
                <Icon
                  icon={icon.iconifyId}
                  width={icon.size * 0.7}
                  height={icon.size * 0.7}
                  style={{
                    color: icon.color,
                    transform: `rotate(${icon.rotation}deg)`,
                  }}
                />
              </div>
            )}

            {icon.type === 'custom' && icon.customUrl && (
              <div className="mb-6 mt-8">
                <img
                  src={icon.customUrl}
                  alt="Custom icon"
                  style={{
                    width: icon.size * 0.7,
                    height: icon.size * 0.7,
                    transform: `rotate(${icon.rotation}deg)`,
                  }}
                />
              </div>
            )}

            {/* 标题 */}
            <h1
              className="text-center font-bold leading-tight mb-4 px-4"
              style={{
                fontSize: text.fontSize * 0.6,
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
                className="text-center opacity-90 px-4"
                style={{
                  fontSize: text.fontSize * 0.25,
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
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                style={{
                  fontSize: text.fontSize * 0.2,
                  fontWeight: text.fontWeight - 100,
                  color: text.color,
                  fontFamily: text.font,
                }}
              >
                {text.author}
              </div>
            )}
          </div>

          {/* 底部导航栏 */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm h-16 flex items-center justify-center">
            <div className="w-32 h-1.5 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* 侧边按钮 */}
        <div className="absolute -right-1 top-32 w-1 h-12 bg-gray-800 rounded-r"></div>
        <div className="absolute -right-1 top-48 w-1 h-16 bg-gray-800 rounded-r"></div>
      </div>
    </div>
  );
};

export default MobileMockupTheme;
