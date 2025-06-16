import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(() =>
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", enabled);
    localStorage.theme = enabled ? "dark" : "light";
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="text-sm px-4 py-1 rounded-full shadow bg-slate-200 dark:bg-slate-700 dark:text-white hover:scale-105 transition"
    >
      {enabled ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
