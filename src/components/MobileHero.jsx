import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { translations } from "../constants/translations";
import { herobg, herobg_light } from "../assets";

const MobileHero = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  
  // Debug removido - problema resolvido
  
  return (
    <section 
      className={`relative w-full h-screen mx-auto bg-cover bg-no-repeat bg-center transition-all duration-300`}
      style={{
        backgroundColor: theme === 'dark' ? '#050816' : '#d4c4a8', // Fallback color
        backgroundImage: theme === 'dark' 
          ? `url(${herobg})`
          : `url(${herobg_light})`
      }}
    >
      <motion.div 
        className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <motion.h1 
            className={`font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mt-2 ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.hero.greeting} <span className={`${theme === 'dark' ? 'text-[#915EFF]' : 'text-[#bed286]'} transition-colors duration-300`}>{t.hero.name}</span>
          </motion.h1>
          <motion.p 
            className={`font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 ${theme === 'dark' ? 'text-[#dfd9ff]' : 'text-[#7a6348]'} transition-colors duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {language === 'pt' 
              ? <>Eu desenvolvo software, interfaces de usuário e aplicações web</>
              : <>I develop software, user interfaces and web applications</>
            }
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        className='absolute bottom-10 w-full flex justify-center items-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <a href='#about'>
          <div className={`w-[35px] h-[64px] rounded-3xl border-4 ${theme === 'dark' ? 'border-secondary' : 'border-gray-400'} flex justify-center items-start p-2 transition-colors duration-300`}>
            <motion.div 
              className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-secondary' : 'bg-gray-400'} mb-1 transition-colors duration-300`}
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default MobileHero;
