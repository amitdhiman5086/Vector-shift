import React, { useState } from 'react';
import { Position, NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/usePipelineStore';
import { getNodeDef } from '../registry/nodeRegistry';

interface ApiNodeData {
  method?: string;
  url?: string;
}

export const ApiNode: React.FC<NodeProps<ApiNodeData>> = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [method, setMethod] = useState<string>(data?.method || 'GET');
  const [url, setUrl] = useState<string>(data?.url || 'https://api.example.com');

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMethod(value);
    updateNodeField(id, 'method', value);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    updateNodeField(id, 'url', value);
  };

  const handles = [
    { id: `${id}-trigger`, type: 'target' as const, position: Position.Left, style: { top: '30%' } },
    { id: `${id}-payload`, type: 'target' as const, position: Position.Left, style: { top: '70%' } },
    { id: `${id}-response`, type: 'source' as const, position: Position.Right, style: { top: '30%' } },
    { id: `${id}-error`, type: 'source' as const, position: Position.Right, style: { top: '70%' } },
  ];

  return (
    <BaseNode
      id={id}
      title="API Request"
      subtitle="Network"
      color={getNodeDef('apiNode')?.color}
      icon={getNodeDef('apiNode')?.icon}
      handles={handles}
    >
      <label className="node-field-label">
        Method
        <select value={method} onChange={handleMethodChange} className="node-field-select">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      <label className="node-field-label">
        URL
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          className="node-field-input"
          placeholder="https://api.example.com"
        />
      </label>
    </BaseNode>
  );
};
