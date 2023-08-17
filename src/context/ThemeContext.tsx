import { createContext, useState, ReactNode, Dispatch } from "react";

interface Props {
  children: ReactNode;
}

interface ContextProps {
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
