// React
import { useContext } from "react";

// Context
import { ThemeContext } from "../context/ThemeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
};
