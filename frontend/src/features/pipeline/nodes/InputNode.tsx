import React, { useState } from 'react';
import { Position, NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/usePipelineStore';
import { getNodeDef } from '../registry/nodeRegistry';

interface InputNodeData {
  inputName?: string;
  inputType?: string;
}

export const InputNode: React.FC<NodeProps<InputNodeData>> = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState<string>(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState<string>(data?.inputType || 'Text');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'inputName', value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setInputType(value);
    updateNodeField(id, 'inputType', value);
  };

  const handles = [
    { id: `${id}-value`, type: 'source' as const, position: Position.Right }
  ];

  return (
    <BaseNode
      id={id}
      title="Input Node"
      subtitle="Source"
      color={getNodeDef('customInput')?.color}
      icon={getNodeDef('customInput')?.icon}
      handles={handles}
    >
      <label className="node-field-label">
        Name
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange} 
          className="node-field-input"
        />
      </label>
      <label className="node-field-label">
        Type
        <select value={inputType} onChange={handleTypeChange} className="node-field-select">
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};

