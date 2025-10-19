import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { translations } from "../constants/translations";
import { herobg, herobg_light } from "../assets";

const Hero = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const autoScrollTimeoutRef = useRef(null);
  const hasScrolledRef = useRef(false);
  const [showEnhancedScroll, setShowEnhancedScroll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    setIsMobile(checkMobile());
  }, []);

  // Auto-scroll forçado após 10 segundos
  useEffect(() => {
    const handleScroll = () => {
      hasScrolledRef.current = true;
    };

    const handleUserInteraction = () => {
      hasScrolledRef.current = true;
    };

    // Adiciona listeners para detectar scroll e interação (apenas para tracking)
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    // Mostrar botão melhorado após 5 segundos
    const enhancedScrollTimeout = setTimeout(() => {
      setShowEnhancedScroll(true);
    }, 5000);

    // Auto-scroll forçado após 10 segundos (mesmo se mexendo)
    autoScrollTimeoutRef.current = setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 10000);

    // Cleanup
    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
      clearTimeout(enhancedScrollTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);
  
  return (
    <section 
      className={`relative w-full h-screen mx-auto bg-cover bg-no-repeat bg-center transition-all duration-300`}
      style={{
        backgroundImage: theme === 'dark' 
          ? `url(${herobg})`
          : `url(${herobg_light})`
      }}
      onLoad={() => {
        console.log('Hero background carregado:', theme === 'dark' ? herobg : herobg_light);
      }}
    >
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className={`w-5 h-5 rounded-full ${theme === 'dark' ? 'bg-[#915EFF]' : 'bg-[#bed286]'} transition-colors duration-300`} />
          <div className={`w-1 sm:h-80 h-40 ${theme === 'dark' ? 'violet-gradient' : 'bg-gradient-to-b from-[#bed286] to-[#a8c470]'} transition-all duration-300`} />
        </div>

        <div>
            <a href='#about'>
              <h1 className={`font-black lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2 ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300 cursor-pointer hover:opacity-80`}>
                {t.hero.greeting} <span className={`${theme === 'dark' ? 'text-[#915EFF]' : 'text-[#bed286]'} transition-colors duration-300`}>{t.hero.name}</span>
              </h1>
            </a>
          <p className={`font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 ${theme === 'dark' ? 'text-[#dfd9ff]' : 'text-[#7a6348]'} transition-colors duration-300`}>
            {language === 'pt' 
              ? <>Eu desenvolvo software, interfaces de usuário <br className='sm:block hidden' /> e aplicações web</>
              : <>I develop software, user <br className='sm:block hidden' /> interfaces and web applications</>
            }
          </p>
        </div>
      </div>

      {/* Renderizar 3D apenas em desktop */}
      {!isMobile ? (
        <ComputersCanvas />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-64 h-64 flex items-center justify-center"
          >
            {/* Imagem estática do computador */}
            <div className="relative">
              <div className="w-48 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl">
                {/* Tela do computador */}
                <div className="w-full h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                  <div className="w-16 h-12 bg-black rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                {/* Base do computador */}
                <div className="w-full h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-b-lg"></div>
              </div>
              {/* Teclado */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gray-800 rounded shadow-lg"></div>
              {/* Mouse */}
              <div className="absolute -bottom-2 -right-4 w-8 h-12 bg-gray-800 rounded-full shadow-lg"></div>
            </div>
          </motion.div>
        </div>
      )}

      <motion.div 
        className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.0 }}
      >
        <a href='#about'>
          <motion.div 
            className={`${showEnhancedScroll ? 'w-[50px] h-[80px]' : 'w-[35px] h-[64px]'} rounded-3xl border-4 ${theme === 'dark' ? 'border-secondary' : 'border-gray-400'} flex justify-center items-start p-2 transition-all duration-500`}
            animate={showEnhancedScroll ? { 
              scale: [1, 1.1, 1],
              boxShadow: theme === 'dark' 
                ? ['0 0 0px #915EFF', '0 0 20px #915EFF', '0 0 0px #915EFF']
                : ['0 0 0px #bed286', '0 0 20px #bed286', '0 0 0px #bed286']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              animate={{
                y: [0, showEnhancedScroll ? 32 : 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className={`${showEnhancedScroll ? 'w-4 h-4' : 'w-3 h-3'} rounded-full ${theme === 'dark' ? 'bg-secondary' : 'bg-gray-400'} mb-1 transition-all duration-500`}
            />
            {showEnhancedScroll && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium ${theme === 'dark' ? 'text-secondary' : 'text-gray-600'} whitespace-nowrap`}
              >
                SCROLL DOWN
              </motion.div>
            )}
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
