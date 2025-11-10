import { useState, createContext, useEffect } from "react";
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
    const themeDefaut = localStorage.getItem("theme");

    const [theme, setTheme] = useState(themeDefaut);
    const toggleTheme = () => {
        setTheme(theme === "" ? "dark-mode" : "");
        localStorage.setItem("theme", theme === "" ? "dark-mode" : "");
    };
    const value = { theme, toggleTheme };
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };
