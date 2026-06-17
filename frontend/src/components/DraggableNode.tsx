import React, { useState } from 'react';

interface DraggableNodeProps {
  type: string;
  label: string;
  color?: string;
  icon?: React.ElementType;
}

export const DraggableNode: React.FC<DraggableNodeProps> = ({ type, label, color, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    const appData = { nodeType };
    const target = event.target as HTMLDivElement;
    target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`px-4 py-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-xs font-medium uppercase tracking-wider text-(--color-text-secondary) hover:text-(--color-text-primary) transition-all duration-200 cursor-grab active:cursor-grabbing hover:shadow-sm flex items-center justify-center gap-2 min-w-[90px] select-none`}
      style={{ 
        borderColor: isHovered ? color : undefined,
        backgroundColor: isHovered ? 'var(--color-surface-hover)' : undefined
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        const target = event.target as HTMLDivElement;
        target.style.cursor = 'grab';
      }}
      draggable
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </div>
  );
};
