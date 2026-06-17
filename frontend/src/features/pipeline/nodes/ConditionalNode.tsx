import React, { useState } from 'react';
import { Position, NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/usePipelineStore';
import { getNodeDef } from '../registry/nodeRegistry';

interface ConditionalNodeData {
  operator?: string;
}

export const ConditionalNode: React.FC<NodeProps<ConditionalNodeData>> = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [operator, setOperator] = useState<string>(data?.operator || '==');

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setOperator(value);
    updateNodeField(id, 'operator', value);
  };

  const handles = [
    { id: `${id}-inputA`, type: 'target' as const, position: Position.Left, style: { top: '30%' } },
    { id: `${id}-inputB`, type: 'target' as const, position: Position.Left, style: { top: '70%' } },
    { id: `${id}-true`, type: 'source' as const, position: Position.Right, style: { top: '30%' } },
    { id: `${id}-false`, type: 'source' as const, position: Position.Right, style: { top: '70%' } }
  ];

  return (
    <BaseNode
      id={id}
      title="Conditional If/Else"
      subtitle="Logic"
      color={getNodeDef('conditionalNode')?.color}
      icon={getNodeDef('conditionalNode')?.icon}
      handles={handles}
    >
      <label className="node-field-label">
        Comparison Operator
        <select value={operator} onChange={handleOperatorChange} className="node-field-select">
          <option value="==">Equals (==)</option>
          <option value="!=">Not Equals (!=)</option>
          <option value=">">Greater than (&gt;)</option>
          <option value="<">Less than (&lt;)</option>
          <option value="contains">Contains</option>
        </select>
      </label>
    </BaseNode>
  );
};
