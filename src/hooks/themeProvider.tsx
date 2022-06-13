import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export enum Theme {
  dark = "theme-dark",
  light = "theme-light",
}
export const Context = createContext<{
  toggleTheme: () => void;
  theme: Theme;
}>({
  toggleTheme: () => {},
  theme: Theme.light,
});
export function ThemeProvider(props: PropsWithChildren) {
  const [theme, setTheme] = useState(Theme.light);
  useEffect(() => {
    setTheme(localStorage.getItem("theme") as Theme);
    document.documentElement.className = localStorage.getItem("theme") as Theme;
  }, []);
  return (
    <Context.Provider
      value={{
        toggleTheme: () => {
          const newTheme = theme == Theme.light ? Theme.dark : Theme.light;
          localStorage.setItem("theme", newTheme);
          document.documentElement.className = newTheme;
          setTheme(newTheme);
        },
        theme,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
export function useTheme() {
  return useContext(Context);
}
