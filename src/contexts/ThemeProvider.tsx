import { useState, createContext } from "react";
export const ThemeContext = createContext<any>(null);
export const ThemeProvider = ({ children }: any) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme } as any}>
            {children}
        </ThemeContext.Provider>
    );
};
