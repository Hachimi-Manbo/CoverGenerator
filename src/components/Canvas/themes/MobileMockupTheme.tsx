import React from 'react';
import { Icon } from '@iconify/react';
import { getScale, type ThemeProps } from './types';

/**
 * MobileMockupTheme - 移动端预览风格
 * 模拟手机屏幕的设计
 */
const MobileMockupTheme: React.FC<ThemeProps> = ({ text, icon, background, width }) => {
  const scale = getScale(width);
  const contentBgColor = background.solidColor || '#4F46E5';

  return (
    <div
      className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100"
      style={{ padding: `${48 * scale}px` }}
    >
      {/* 手机外壳 */}
      <div
        className="relative bg-gray-900 shadow-2xl"
        style={{
          borderRadius: `${48 * scale}px`,
          padding: `${16 * scale}px`,
        }}
      >
        {/* 屏幕内容区域 */}
        <div
          className="relative overflow-hidden"
          style={{
            width: `${400 * scale}px`,
            height: `${800 * scale}px`,
            borderRadius: `${40 * scale}px`,
          }}
        >
          {/* 状态栏 */}
          <div
            className="absolute top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-sm flex items-center justify-between"
            style={{
              paddingLeft: `${32 * scale}px`,
              paddingRight: `${32 * scale}px`,
              paddingTop: `${12 * scale}px`,
              paddingBottom: `${12 * scale}px`,
            }}
          >
            <span
              className="text-white font-medium"
              style={{ fontSize: `${14 * scale}px` }}
            >
              9:41
            </span>
            <div className="flex items-center" style={{ gap: `${4 * scale}px` }}>
              <Icon icon="mdi:signal" className="text-white" width={16 * scale} />
              <Icon icon="mdi:wifi" className="text-white" width={16 * scale} />
              <Icon icon="mdi:battery" className="text-white" width={20 * scale} />
            </div>
          </div>

          {/* 刘海 */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 bg-gray-900"
            style={{
              width: `${160 * scale}px`,
              height: `${28 * scale}px`,
              borderBottomLeftRadius: `${48 * scale}px`,
              borderBottomRightRadius: `${48 * scale}px`,
            }}
          ></div>

          {/* 背景内容 */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              background: background.type === 'gradient'
                ? `linear-gradient(${background.gradientAngle || 135}deg, ${background.gradientStart || '#4F46E5'}, ${background.gradientEnd || '#7C3AED'})`
                : contentBgColor,
              backgroundImage: background.type === 'image' && background.imageUrl
                ? `url(${background.imageUrl})`
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: `${48 * scale}px`,
            }}
          >
            {/* 图标 */}
            {icon.type === 'iconify' && icon.iconifyId && (
              <div
                style={{
                  marginBottom: `${24 * scale}px`,
                  marginTop: `${32 * scale}px`,
                }}
              >
                <Icon
                  icon={icon.iconifyId}
                  width={icon.size * 0.7 * scale}
                  height={icon.size * 0.7 * scale}
                  style={{
                    color: icon.color,
                    transform: `rotate(${icon.rotation}deg)`,
                  }}
                />
              </div>
            )}

            {icon.type === 'custom' && icon.customUrl && (
              <div
                style={{
                  marginBottom: `${24 * scale}px`,
                  marginTop: `${32 * scale}px`,
                }}
              >
                <img
                  src={icon.customUrl}
                  alt="Custom icon"
                  style={{
                    width: icon.size * 0.7 * scale,
                    height: icon.size * 0.7 * scale,
                    transform: `rotate(${icon.rotation}deg)`,
                  }}
                />
              </div>
            )}

            {/* 标题 */}
            <h1
              className="text-center font-bold leading-tight"
              style={{
                fontSize: text.fontSize * 0.6 * scale,
                fontWeight: text.fontWeight,
                color: text.color,
                fontFamily: text.font,
                marginBottom: `${16 * scale}px`,
                paddingLeft: `${16 * scale}px`,
                paddingRight: `${16 * scale}px`,
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
                  fontSize: text.fontSize * 0.25 * scale,
                  fontWeight: text.fontWeight - 200,
                  color: text.color,
                  fontFamily: text.font,
                  paddingLeft: `${16 * scale}px`,
                  paddingRight: `${16 * scale}px`,
                }}
              >
                {text.subtitle}
              </p>
            )}

            {/* 作者 */}
            {text.author && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 text-center"
                style={{
                  bottom: `${32 * scale}px`,
                  fontSize: text.fontSize * 0.2 * scale,
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
          <div
            className="absolute bottom-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm flex items-center justify-center"
            style={{ height: `${64 * scale}px` }}
          >
            <div
              className="bg-white/30 rounded-full"
              style={{
                width: `${128 * scale}px`,
                height: `${6 * scale}px`,
              }}
            ></div>
          </div>
        </div>

        {/* 侧边按钮 */}
        <div
          className="absolute bg-gray-800"
          style={{
            right: `${-4 * scale}px`,
            top: `${128 * scale}px`,
            width: `${4 * scale}px`,
            height: `${48 * scale}px`,
            borderTopRightRadius: `${4 * scale}px`,
            borderBottomRightRadius: `${4 * scale}px`,
          }}
        ></div>
        <div
          className="absolute bg-gray-800"
          style={{
            right: `${-4 * scale}px`,
            top: `${192 * scale}px`,
            width: `${4 * scale}px`,
            height: `${64 * scale}px`,
            borderTopRightRadius: `${4 * scale}px`,
            borderBottomRightRadius: `${4 * scale}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default MobileMockupTheme;
