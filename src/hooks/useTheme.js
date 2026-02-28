// This hook is maintained for backward compatibility
// Use useThemeContext from useThemContext.js instead
import useThemeContext from "./useThemContext";

const useTheme = () => {
  return useThemeContext();
};

export default useTheme;