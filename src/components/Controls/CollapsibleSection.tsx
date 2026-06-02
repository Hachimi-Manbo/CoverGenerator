import React, { useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';

interface CollapsibleSectionProps {
  title: string;
  icon?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * CollapsibleSection 组件 - 可折叠的分组面板
 * 用于组织控制面板的各个区域
 */
const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  icon, 
  defaultOpen = true, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* 标题栏 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          {icon && <Icon icon={icon} width={20} className="text-gray-600" />}
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        </div>
        <Icon 
          icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} 
          width={20} 
          className="text-gray-500 transition-transform"
        />
      </button>

      {/* 内容区域 */}
      {isOpen && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
