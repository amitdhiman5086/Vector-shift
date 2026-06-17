import React, { useState } from 'react';
import { Position, NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/usePipelineStore';
import { getNodeDef } from '../registry/nodeRegistry';

interface FileReaderNodeData {
  format?: string;
  defaultPath?: string;
}

export const FileReaderNode: React.FC<NodeProps<FileReaderNodeData>> = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [format, setFormat] = useState<string>(data?.format || 'Text');
  const [defaultPath, setDefaultPath] = useState<string>(data?.defaultPath || '/docs/input.txt');

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormat(value);
    updateNodeField(id, 'format', value);
  };

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDefaultPath(value);
    updateNodeField(id, 'defaultPath', value);
  };

  const handles = [
    { id: `${id}-path`, type: 'target' as const, position: Position.Left },
    { id: `${id}-content`, type: 'source' as const, position: Position.Right }
  ];

  return (
    <BaseNode
      id={id}
      title="File System"
      subtitle="Input"
      color={getNodeDef('fileReaderNode')?.color}
      icon={getNodeDef('fileReaderNode')?.icon}
      handles={handles}
    >
      <label className="node-field-label">
        Default Path
        <input
          type="text"
          value={defaultPath}
          onChange={handlePathChange}
          className="node-field-input"
          placeholder="/docs/input.txt"
        />
      </label>
      <label className="node-field-label">
        Read Format
        <select value={format} onChange={handleFormatChange} className="node-field-select">
          <option value="Text">Plain Text</option>
          <option value="JSON">JSON Object</option>
          <option value="Binary">Binary stream</option>
        </select>
      </label>
    </BaseNode>
  );
};
