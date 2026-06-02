import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { OFFLINE_ICONS } from '@/lib/constants';

interface IconPickerProps {
  value: string;
  onChange: (iconId: string) => void;
}

/**
 * IconPicker 组件 - 图标选择器
 * 支持在线搜索和离线图标选择
 */
const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{ id: string; label: string }>>([]);
  const [isOnline] = useState(navigator.onLine);

  // 过滤离线图标
  const filteredOfflineIcons = useMemo(() => {
    if (!searchQuery) return OFFLINE_ICONS;
    const query = searchQuery.toLowerCase();
    return OFFLINE_ICONS.filter(
      icon => icon.label.toLowerCase().includes(query) || icon.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // 在线搜索图标
  const handleSearch = async (query: string) => {
    if (!query.trim() || !isOnline) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=50`
      );
      const data = await response.json();
      
      if (data.icons && Array.isArray(data.icons)) {
        setSearchResults(
          data.icons.map((iconId: string) => ({
            id: iconId,
            label: iconId.split(':')[1] || iconId,
          }))
        );
      }
    } catch (error) {
      console.error('搜索图标失败:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // 防抖搜索
  const handleSearchInput = (query: string) => {
    setSearchQuery(query);
    
    if (isOnline && query.trim()) {
      // 简单防抖
      const timeoutId = setTimeout(() => {
        handleSearch(query);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  };

  const displayIcons = isOnline && searchResults.length > 0 
    ? searchResults 
    : filteredOfflineIcons;

  return (
    <div className="space-y-3">
      {/* 搜索框 */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchInput(e.target.value)}
          placeholder={isOnline ? "搜索图标..." : "搜索离线图标..."}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Icon 
          icon="mdi:magnify" 
          width={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Icon icon="mdi:loading" width={18} className="animate-spin text-blue-500" />
          </div>
        )}
      </div>

      {/* 在线/离线状态 */}
      <div className="flex items-center justify-between text-xs">
        <span className={`flex items-center gap-1 ${isOnline ? 'text-green-600' : 'text-orange-600'}`}>
          <Icon icon={isOnline ? 'mdi:wifi' : 'mdi:wifi-off'} width={14} />
          {isOnline ? '在线模式' : '离线模式'}
        </span>
        <span className="text-gray-500">
          {displayIcons.length} 个图标
        </span>
      </div>

      {/* 当前选中的图标 */}
      {value && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
          <Icon icon={value} width={32} height={32} />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500">当前图标</div>
            <div className="text-sm font-mono truncate">{value}</div>
          </div>
          <button
            onClick={() => onChange('')}
            className="p-1 hover:bg-blue-100 rounded"
            title="清除图标"
          >
            <Icon icon="mdi:close" width={16} />
          </button>
        </div>
      )}

      {/* 图标网格 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="grid grid-cols-6 gap-1 p-2 max-h-80 overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
          }}
        >
          {displayIcons.map((icon) => (
            <button
              key={icon.id}
              onClick={() => onChange(icon.id)}
              className={`
                aspect-square flex items-center justify-center rounded-lg
                transition-all hover:bg-blue-50 hover:scale-110
                ${value === icon.id ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50'}
              `}
              title={icon.label}
            >
              <Icon icon={icon.id} width={24} height={24} />
            </button>
          ))}
        </div>
      </div>

      {/* 手动输入 */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">
          或手动输入图标 ID
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="例: logos:react"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          访问 <a href="https://icon-sets.iconify.design/" target="_blank" rel="noopener" className="text-blue-500 hover:underline">Iconify</a> 查找更多图标
        </p>
      </div>
    </div>
  );
};

export default IconPicker;
