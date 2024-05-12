import daynight from "daynight";
import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultTheme = "light-theme";
  useEffect(() => {
    const setTheme = () => {
      const { light } = daynight();
      document.body.className = light ? "light-theme" : "dark-theme";
    };
    setTheme();
    const interval = setInterval(setTheme, 10 * 1000);
    return () => {
      document.body.className = defaultTheme;
      clearInterval(interval);
    };
  }, []);

  return children;
}
