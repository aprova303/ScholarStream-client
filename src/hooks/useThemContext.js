import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};

export default useThemeContext;
