import React, { useEffect, ReactNode } from 'react';
import { useStore } from '../features/pipeline/store/usePipelineStore';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
};
