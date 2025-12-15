import { useEffect, useState } from "react";

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    if (typeof document !== 'undefined') {
      if (document.documentElement.classList.contains('dark')) return 'dark';
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
  } catch (e) {
    /* ignore */
  }
  return 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}
