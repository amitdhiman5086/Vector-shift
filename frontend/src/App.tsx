import React from 'react';
import { PipelineToolbar } from './features/pipeline/components/PipelineToolbar';
import { PipelineCanvas } from './features/pipeline/components/PipelineCanvas';
import { SubmitButton } from './components/SubmitButton';
import { ThemeProvider } from './components/ThemeProvider';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen w-screen bg-(--color-bg-app) text-(--color-text-primary) font-sans overflow-hidden">
        <PipelineToolbar />
        <div className="flex-1 relative">
          <PipelineCanvas />
        </div>
        <SubmitButton />
      </div>
    </ThemeProvider>
  );
};

export default App;
