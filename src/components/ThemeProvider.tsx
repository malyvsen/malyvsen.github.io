import daynight from "daynight";
import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const setTheme = () => {
      const { light } = daynight();
      document.body.className = light ? "light-theme" : "dark-theme";
    };
    setTheme();
    const interval = setInterval(setTheme, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}
