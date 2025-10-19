import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { useTheme } from "../hooks/useTheme";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const { theme } = useTheme();

  return (
    <motion.button
      onClick={toggleLanguage}
      className={`fixed ${theme === 'dark' ? 'top-3' : 'top-3'} right-32 sm:hidden z-50 w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg group ${
        theme === 'dark' 
          ? 'bg-black/15 border-white/15 hover:bg-black/25 hover:border-white/25 border' 
          : 'bg-white/15 hover:bg-white/25'
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
    >
      <motion.div
        key={language}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex items-center justify-center w-full h-full"
      >
        <span className={`text-xs sm:text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>
          {language === 'pt' ? 'EN' : 'PT'}
        </span>
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
        {language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      </motion.div>
    </motion.button>
  );
};

export default LanguageToggle;
