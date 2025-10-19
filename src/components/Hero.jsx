import { motion } from "framer-motion";

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
            <h1 className={`font-black lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2 ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>
            {t.hero.greeting} <span className={`${theme === 'dark' ? 'text-[#915EFF]' : 'text-[#bed286]'} transition-colors duration-300`}>{t.hero.name}</span>
          </h1>
          <p className={`font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 ${theme === 'dark' ? 'text-[#dfd9ff]' : 'text-[#7a6348]'} transition-colors duration-300`}>
            {language === 'pt' 
              ? <>Eu desenvolvo software, interfaces de usuário <br className='sm:block hidden' /> e aplicações web</>
              : <>I develop software, user <br className='sm:block hidden' /> interfaces and web applications</>
            }
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <motion.div
            className={`bg-white/20 backdrop-blur-sm rounded-full p-4 cursor-pointer border-2 ${theme === 'dark' ? 'border-white/30' : 'border-gray-400/30'} transition-colors duration-300`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="flex flex-col items-center">
              <span className={`text-xs mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                SCROLL
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`w-6 h-6 border-2 ${theme === 'dark' ? 'border-white' : 'border-gray-600'} rounded-full flex items-center justify-center transition-colors duration-300`}
              >
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`w-1 h-1 ${theme === 'dark' ? 'bg-white' : 'bg-gray-600'} rounded-full transition-colors duration-300`}
                />
              </motion.div>
            </div>
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
