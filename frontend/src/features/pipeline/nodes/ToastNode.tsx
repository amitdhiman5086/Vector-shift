import React, { useState } from 'react';
import { Position, NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/usePipelineStore';
import { getNodeDef } from '../registry/nodeRegistry';

interface ToastNodeData {
  duration?: number;
  toastType?: string;
}

export const ToastNode: React.FC<NodeProps<ToastNodeData>> = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [duration, setDuration] = useState<number>(data?.duration || 3000);
  const [toastType, setToastType] = useState<string>(data?.toastType || 'Success');

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setDuration(value);
    updateNodeField(id, 'duration', value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setToastType(value);
    updateNodeField(id, 'toastType', value);
  };

  const handles = [
    { id: `${id}-trigger`, type: 'target' as const, position: Position.Left, style: { top: '30%' } },
    { id: `${id}-message`, type: 'target' as const, position: Position.Left, style: { top: '70%' } }
  ];

  return (
    <BaseNode
      id={id}
      title="Notification Toast"
      subtitle="Sink"
      color={getNodeDef('toastNode')?.color}
      icon={getNodeDef('toastNode')?.icon}
      handles={handles}
    >
      <label className="node-field-label">
        Duration (ms)
        <input
          type="number"
          value={duration}
          onChange={handleDurationChange}
          className="node-field-input"
          min={500}
          max={10000}
          step={500}
        />
      </label>
      <label className="node-field-label">
        Notification Type
        <select value={toastType} onChange={handleTypeChange} className="node-field-select">
          <option value="Success">Success</option>
          <option value="Info">Info</option>
          <option value="Warning">Warning</option>
          <option value="Error">Error</option>
        </select>
      </label>
    </BaseNode>
  );
};
