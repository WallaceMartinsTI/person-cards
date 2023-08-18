// React
import { createContext, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export interface ContextProps {
  darkTheme?: boolean;
  setDarkTheme?: (value: boolean) => void;
}

export const ThemeContext = createContext<ContextProps>({});

export const ThemeContextProvider = ({ children }: Props) => {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
