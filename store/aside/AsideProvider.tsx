'use client';
import { createContext, useContext, useMemo, useState } from 'react';
import { AsideState, AsideType, AsideProviderProps } from './types';

export const AsideContext = createContext<AsideState>({
  type: null,
  value: false,
  onChange: () => {},
});

export const useAside = () => {
  const context = useContext(AsideContext);

  if (!context) {
    throw new Error('Place is not wrapped by Theme provider');
  }

  return context;
};

const AsideProvider = ({ children }: AsideProviderProps) => {
  const [state, setState] = useState<Omit<AsideState, 'onChange'>>({
    type: null,
    value: false,
  });

  const value = useMemo(
    () => ({
      ...state,
      onChange: (type: AsideType, value: boolean) => {
        setState((prev) => ({ ...prev, type, value }));
      },
    }),
    [state]
  );

  return (
    <AsideContext.Provider value={value}>{children}</AsideContext.Provider>
  );
};

export default AsideProvider;
