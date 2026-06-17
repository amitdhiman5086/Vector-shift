import React from 'react';
import { DraggableNode } from '../../../components/DraggableNode';
import { useStore, RFState } from '../store/usePipelineStore';
import { NODE_REGISTRY } from '../registry/nodeRegistry';

const SunIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M5.25 12H3m18 0h-2.25m-1.357-6.071l-1.591 1.59M9.05 14.95l-1.591 1.59M18.364 18.364l-1.59-1.59M9.05 9.05L7.46 7.46M12 9a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
);

const MoonIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

const selector = (state: RFState) => ({
  theme: state.theme,
  toggleTheme: state.toggleTheme,
});

export const PipelineToolbar: React.FC = () => {
  const { theme, toggleTheme } = useStore(selector);

  return (
    <div className="p-5 border-b border-(--color-border) bg-(--color-bg-app) transition-all duration-300 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-(--color-text-primary)">
            VectorShift <span className="font-light text-(--color-text-secondary)">Pipeline</span>
          </h1>
          <p className="text-xs text-(--color-text-secondary) mt-0.5">
            Construct workflow templates by dragging and connecting nodes.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap justify-center items-center gap-3">
            {NODE_REGISTRY.map(node => (
              <DraggableNode key={node.type} type={node.type} label={node.label} color={node.color} icon={node.icon} />
            ))}
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-(--color-border)"></div>
          
          <button 
            onClick={toggleTheme} 
            aria-label="Toggle Theme" 
            className="p-2.5 rounded-xl border border-(--color-border) bg-(--color-surface) hover:bg-(--color-surface-hover) text-(--color-text-secondary) hover:text-(--color-text-primary) transition-all duration-200 cursor-pointer shadow-sm flex items-center justify-center"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};
