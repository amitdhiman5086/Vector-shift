import React from 'react';
import { useStore } from '../features/pipeline/store/usePipelineStore';

const SubmitIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
  >
    <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.925a1.5 1.5 0 0 0 1.09 1.03l4.348 1.195a.25.25 0 0 1 0 .476l-4.348 1.195a1.5 1.5 0 0 0-1.09 1.03l-1.414 4.925a.75.75 0 0 0 .826.95 1.749 1.749 0 0 0 1.275-.568l5.474-5.475a1.5 1.5 0 0 0 0-2.122L5.206 2.857a1.75 1.75 0 0 0-1.275-.568Z" />
  </svg>
);

export const SubmitButton: React.FC = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error: ${response.statusText}`);
      }

      const result = await response.json();
      
      const dagMessage = result.is_dag 
        ? '✅ Yes, this pipeline forms a Directed Acyclic Graph (DAG)!'
        : '❌ No, this pipeline contains loops/cycles (it is NOT a DAG).';

      alert(
        `Pipeline Submission Results:\n\n` +
        `• Number of Nodes: ${result.num_nodes}\n` +
        `• Number of Edges: ${result.num_edges}\n` +
        `• DAG Status: ${result.is_dag ? 'Valid DAG' : 'Invalid Graph'}\n\n` +
        `${dagMessage}`
      );
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error connecting to backend:\n${error instanceof Error ? error.message : String(error)}\n\nPlease ensure your FastAPI backend is running.`);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 border-t border-(--color-border) bg-(--color-bg-app) z-10 transition-colors duration-300">
      <button 
        type="button"
        onClick={handleSubmit}
        className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm tracking-wide bg-(--color-primary) text-(--color-surface) border border-(--color-border) hover:opacity-90 active:scale-[0.97] transition-all duration-200 cursor-pointer shadow-sm select-none"
      >
        <span>Submit Pipeline</span>
        <SubmitIcon />
      </button>
    </div>
  );
};

