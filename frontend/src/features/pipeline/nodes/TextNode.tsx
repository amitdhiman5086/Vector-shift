import React, { useState, useRef, useLayoutEffect } from "react";
import { Handle, Position, NodeProps, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";
import { useStore } from "../store/usePipelineStore";
import { getNodeDef } from "../registry/nodeRegistry";

interface TextNodeData {
  text?: string;
}

export const TextNode: React.FC<NodeProps<TextNodeData>> = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState<string>(data?.text || "{{input}}");
  const updateNodeInternals = useUpdateNodeInternals();
  const prevVarsRef = useRef<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCurrText(value);
    updateNodeField(id, "text", value);
  };

  // Extract variables starting with letter, $ or _ wrapped in {{ }}
  const getVariables = (text: string) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const variables: string[] = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    return variables;
  };

  const variables = getVariables(currText);
  const variablesStr = variables.join(",");

  // Calculate dynamic dimensions
  const lines = currText.split("\n");
  const maxLineLength = Math.max(...lines.map((line) => line.length), 10);
  const dynamicWidth = Math.min(Math.max(240, maxLineLength * 8 + 32), 480);

  useLayoutEffect(() => {
    if (prevVarsRef.current !== variablesStr) {
      const state = useStore.getState();
      const validTargetHandles = new Set(variables.map((v) => `${id}-${v}`));
      const orphanedEdges = state.edges.filter(
        (e) =>
          e.target === id &&
          e.targetHandle &&
          !validTargetHandles.has(e.targetHandle),
      );
      if (orphanedEdges.length > 0) {
        state.onEdgesChange(
          orphanedEdges.map((e) => ({ type: "remove", id: e.id })),
        );
      }
      prevVarsRef.current = variablesStr;
    }

    updateNodeInternals(id);

    const raf = requestAnimationFrame(() => {
      useStore.setState((state) => ({
        edges: state.edges.map((e) => ({ ...e })),
      }));
    });

    return () => cancelAnimationFrame(raf);
  }, [variablesStr, id, updateNodeInternals, variables]);

  return (
    <BaseNode
      id={id}
      title="Text Parser"
      subtitle="Utility"
      color={getNodeDef("text")?.color}
      icon={getNodeDef("text")?.icon}
      handles={[
        {
          id: `${id}-output`,
          type: "source" as const,
          position: Position.Right,
        },
      ]}
      style={{ width: `${dynamicWidth}px` }}
    >
      {/* Variable input handles — flow-layout positioned */}
      {variables.length > 0 && (
        <div className="flex flex-col gap-1">
          {variables.map((variable) => (
            <div key={variable} className="relative flex items-center h-6 pl-1">
              <Handle
                type="target"
                position={Position.Left}
                id={`${id}-${variable}`}
                className="w-[9px]! h-[9px]!"
              />
              <span className="text-[10px] capitalize font-mono text-(--color-text-muted) ml-1 select-none">
                {variable}
              </span>
            </div>
          ))}
        </div>
      )}

      <label className="node-field-label flex-1 flex flex-col gap-1.5 min-h-0">
        Text Content
        <textarea
          value={currText}
          onChange={handleTextChange}
          className="node-field-input no-scrollbar flex-1 resize-none font-mono text-xs leading-relaxed min-h-[60px]"
          placeholder="Type something {{variable}}..."
        />
      </label>
    </BaseNode>
  );
};
