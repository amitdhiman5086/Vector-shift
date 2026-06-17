import React from 'react';
import { Position, NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { getNodeDef } from '../registry/nodeRegistry';

export const LLMNode: React.FC<NodeProps> = ({ id }) => {
  const handles = [
    { id: `${id}-system`, type: 'target' as const, position: Position.Left, style: { top: '35%' } },
    { id: `${id}-prompt`, type: 'target' as const, position: Position.Left, style: { top: '65%' } },
    { id: `${id}-response`, type: 'source' as const, position: Position.Right }
  ];

  return (
    <BaseNode
      id={id}
      title="LLM Engine"
      subtitle="AI Model"
      color={getNodeDef('llm')?.color}
      icon={getNodeDef('llm')?.icon}
      handles={handles}
    >
      <div className="text-xs text-(--color-text-secondary) py-2 px-2.5 rounded bg-[rgba(9,13,22,0.4)] border border-[rgba(255,255,255,0.03)] leading-relaxed">
        Processes prompt templates and outputs model responses.
      </div>
    </BaseNode>
  );
};

