export type ThemeContextType = {
  mode: string;
  onChange?: (mode: string) => void;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
};
