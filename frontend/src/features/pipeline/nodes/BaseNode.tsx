import React from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store/usePipelineStore';

export interface BaseNodeHandle {
  id: string;
  type: 'source' | 'target';
  position: Position;
  style?: React.CSSProperties;
}

export interface BaseNodeProps {
  id: string;
  title: string;
  subtitle?: string;
  color?: string;
  icon?: string | React.ElementType;
  handles?: BaseNodeHandle[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const BaseNode: React.FC<BaseNodeProps> = ({
  id,
  title,
  subtitle,
  color,
  icon,
  handles = [],
  children,
  style,
}) => {
  const removeNode = useStore((state) => state.removeNode);

  const dynamicStyle = {
    ...style,
    ...(color ? { borderLeft: `3.5px solid ${color}` } : {})
  };

  return (
    <div className="custom-node" style={dynamicStyle}>
      {/* Dynamic Handles */}
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={h.style}
        />
      ))}
      
      {/* Header section */}
      <div className="node-header flex items-center justify-between group">
        <div className="flex items-center gap-2 min-w-0">
          {icon && (
            <span className="flex items-center justify-center text-(--color-text-primary) shrink-0">
              {typeof icon === 'string' ? icon : React.createElement(icon, { className: "w-[15px] h-[15px]" })}
            </span>
          )}
          <span className="font-semibold truncate text-(--color-text-primary)">{title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {subtitle && (
            <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-(--color-primary-glow) text-(--color-text-secondary) shrink-0 select-none">
              {subtitle}
            </span>
          )}
          <button
            onClick={() => removeNode(id)}
            className="text-gray-400 hover:text-red-500 transition-colors rounded p-0.5 opacity-0 group-hover:opacity-100"
            title="Delete node"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content section */}
      <div className="flex flex-col gap-3 flex-1">
        {children}
      </div>
    </div>
  );
};
