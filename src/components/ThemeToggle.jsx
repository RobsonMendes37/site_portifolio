import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { componentColors } from "../constants/colors";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed ${theme === 'dark' ? 'top-3' : 'top-3'} right-16 sm:hidden z-50 w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg group ${
        theme === 'dark' 
          ? 'bg-black/15  hover:bg-white/25 ' 
          : 'bg-white/15 hover:bg-white/25'
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex items-center justify-center w-full h-full"
      >
        {theme === 'dark' ? (
          <motion.svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </motion.svg>
        ) : (
          <motion.svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </motion.svg>
        )}
      </motion.div>
      
      {/* Tooltip - Hidden on mobile for cleaner look */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="hidden sm:block absolute bottom-full right-0 mb-2 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap pointer-events-none"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          color: theme === 'dark' ? 'white' : 'black'
        }}
      >
        {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
