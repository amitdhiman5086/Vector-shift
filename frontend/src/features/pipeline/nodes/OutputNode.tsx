import React, { useState } from 'react';
import { Position, NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/usePipelineStore';
import { getNodeDef } from '../registry/nodeRegistry';

interface OutputNodeData {
  outputName?: string;
  outputType?: string;
}

export const OutputNode: React.FC<NodeProps<OutputNodeData>> = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState<string>(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState<string>(data?.outputType || 'Text');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'outputName', value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setOutputType(value);
    updateNodeField(id, 'outputType', value);
  };

  const handles = [
    { id: `${id}-value`, type: 'target' as const, position: Position.Left }
  ];

  return (
    <BaseNode
      id={id}
      title="Output Node"
      subtitle="Sink"
      color={getNodeDef('customOutput')?.color}
      icon={getNodeDef('customOutput')?.icon}
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
        <select value={outputType} onChange={handleTypeChange} className="node-field-select">
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};

