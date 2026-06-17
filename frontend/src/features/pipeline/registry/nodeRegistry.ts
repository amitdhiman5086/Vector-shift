import { NodeProps } from 'reactflow';
import React from 'react';
import { InputNode } from '../nodes/InputNode';
import { LLMNode } from '../nodes/LLMNode';
import { OutputNode } from '../nodes/OutputNode';
import { TextNode } from '../nodes/TextNode';
import { ApiNode } from '../nodes/ApiNode';
import { JsonNode } from '../nodes/JsonNode';
import { FileReaderNode } from '../nodes/FileReaderNode';
import { ConditionalNode } from '../nodes/ConditionalNode';
import { ToastNode } from '../nodes/ToastNode';
import { LogIn, Bot, LogOut, Type, Globe, Braces, FolderOpen, GitBranch, Bell } from 'lucide-react';

export interface NodeDefinition {
  type: string;
  label: string;
  color: string;
  icon: React.ElementType;
  component: React.FC<NodeProps>;
}

export const NODE_REGISTRY: NodeDefinition[] = [
  { type: 'customInput', label: 'Input', color: '#10b981', icon: LogIn, component: InputNode },
  { type: 'llm', label: 'LLM', color: '#8b5cf6', icon: Bot, component: LLMNode },
  { type: 'customOutput', label: 'Output', color: '#f43f5e', icon: LogOut, component: OutputNode },
  { type: 'text', label: 'Text', color: '#f59e0b', icon: Type, component: TextNode },
  { type: 'apiNode', label: 'API Request', color: '#3b82f6', icon: Globe, component: ApiNode },
  { type: 'jsonNode', label: 'JSON Parse', color: '#ec4899', icon: Braces, component: JsonNode },
  { type: 'fileReaderNode', label: 'File System', color: '#14b8a6', icon: FolderOpen, component: FileReaderNode },
  { type: 'conditionalNode', label: 'Condition', color: '#6366f1', icon: GitBranch, component: ConditionalNode },
  { type: 'toastNode', label: 'Toast', color: '#06b6d4', icon: Bell, component: ToastNode },
];

export const reactFlowNodeTypes = NODE_REGISTRY.reduce((acc, node) => {
  acc[node.type] = node.component;
  return acc;
}, {} as Record<string, React.FC<NodeProps>>);

export const getNodeDef = (type: string) => NODE_REGISTRY.find(n => n.type === type);
