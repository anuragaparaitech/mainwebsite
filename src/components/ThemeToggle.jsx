import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '', variant = 'header' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  if (variant === 'menu') {
    // Extended variant with text label for mobile/hamburger drawer
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 border ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-amber-300 hover:bg-slate-700'
            : 'bg-slate-100/90 border-slate-200 text-slate-800 hover:bg-slate-200'
        } ${className}`}
        aria-label={`Switch to ${isDark ? 'dark' : 'light'} mode`}
      >
        <span className="flex items-center gap-3 font-semibold text-sm">
          <span className="material-symbols-outlined text-[20px] transition-transform duration-300">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
          <span className="text-on-surface">
            {isDark ? 'Light Theme' : 'Dark Theme'}
          </span>
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full font-mono-tag uppercase tracking-wider font-semibold bg-blue-500/10 text-blue-400">
          {theme}
        </span>
      </button>
    );
  }

  // Compact circular button for Header (desktop & mobile bar)
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border focus:outline-none focus:ring-2 focus:ring-[#2563EB] active:scale-95 group overflow-hidden ${
        isDark
          ? 'bg-slate-800/90 hover:bg-slate-700/90 text-amber-300 border-slate-700/80 hover:border-amber-400/40 shadow-slate-950/40'
          : 'bg-white/85 hover:bg-white text-slate-700 hover:text-[#2563EB] border-slate-200/90 hover:border-blue-400/40 shadow-black/5'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      {/* Icon with smooth rotation transition */}
      <span
        className={`material-symbols-outlined text-[20px] sm:text-[22px] transition-transform duration-300 ease-out group-hover:scale-110 ${
          isDark ? 'rotate-0' : '-rotate-12'
        }`}
      >
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>

      {/* Subtle indicator ring on hover */}
      <span className="absolute inset-0 rounded-full border border-current opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
    </button>
  );
}
