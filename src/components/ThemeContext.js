// src/ThemeContext.js
import { createContext, useState, useContext } from "react";

// 1. Create Context (teacher makes a notebook)
const ThemeContext = createContext();

// 2. Teacher (Provider) manages and shares the notebook
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Student helper: useTheme = shortcut to read teacher’s notebook
export const useTheme = () => useContext(ThemeContext);
