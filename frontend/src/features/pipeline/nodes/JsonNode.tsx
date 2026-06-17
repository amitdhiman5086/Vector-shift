import React, { useState } from 'react';
import { Position, NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/usePipelineStore';
import { getNodeDef } from '../registry/nodeRegistry';

interface JsonNodeData {
  jsonPath?: string;
}

export const JsonNode: React.FC<NodeProps<JsonNodeData>> = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [jsonPath, setJsonPath] = useState<string>(data?.jsonPath || '$.data.id');

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJsonPath(value);
    updateNodeField(id, 'jsonPath', value);
  };

  const handles = [
    { id: `${id}-json`, type: 'target' as const, position: Position.Left },
    { id: `${id}-value`, type: 'source' as const, position: Position.Right }
  ];

  return (
    <BaseNode
      id={id}
      title="JSON Parser"
      subtitle="Transform"
      color={getNodeDef('jsonNode')?.color}
      icon={getNodeDef('jsonNode')?.icon}
      handles={handles}
    >
      <label className="node-field-label">
        JSON Path Query
        <input
          type="text"
          value={jsonPath}
          onChange={handlePathChange}
          className="node-field-input"
          placeholder="$.data.id"
        />
      </label>
    </BaseNode>
  );
};
