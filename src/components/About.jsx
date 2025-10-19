import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { translations } from "../constants/translations";
import { robson } from "../assets";

const ServiceCard = ({ index, title, icon, theme }) => (
  <Tilt className='w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className={`${theme === 'dark' ? 'bg-tertiary' : 'bg-[#ebe4d1]'} rounded-[20px] py-4 px-6 min-h-[200px] flex justify-evenly items-center flex-col transition-colors duration-300 shadow-lg ${theme === 'dark' ? 'shadow-black-200' : 'shadow-gray-200'}`}
      >
        <img
          src={icon}
          alt='web-development'
          className='w-12 h-12 object-contain'
        />

        <h3 className={`${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} text-[16px] font-bold text-center transition-colors duration-300`}>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <>
      <motion.div
        variants={fadeIn("up", "spring", 0.1, 0.75)}
        className='flex justify-center lg:hidden mb-8'
      >
        <div className="w-64 h-64 relative group">
          {/* Card com animação de flutuação */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-full h-full"
          >
            {/* Círculo com gradiente e sombra */}
            <div className="w-full h-full rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-[#065f46] via-[#1e1b4b] to-[#312e81] p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#2f2a1f]/20 to-[#7a6348]/20 backdrop-blur-sm">
                <img 
                  src="/src/assets/robson.png" 
                  alt="Robson" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Efeito de brilho que se move */}
            <motion.div
              animate={{
                x: [-20, 20, -20],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            
            {/* Partículas flutuantes */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
              className="absolute -top-2 -right-2 w-3 h-3 bg-[#065f46] rounded-full"
            />
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 1
              }}
              className="absolute -bottom-2 -left-2 w-2 h-2 bg-[#312e81] rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>

    {/* Duas colunas  */}
    <div className="flex gap-10 items-center flex-col lg:flex-row lg:gap-20">
      {/* Coluna esquerda */}
      <div className="flex flex-col gap-10">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={`${styles.sectionHeadText} ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>{t.about.title}</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className={`mt-4 ${theme === 'dark' ? 'text-secondary' : 'text-[#7a6348]'} text-[17px] max-w-3xl leading-[30px] transition-colors duration-300`}
        >
          {t.about.description}
        </motion.p>
      

          <div className='flex flex-col  lg:flex-row gap-6 mt-10'>
            {services.map((service, index) => {

              const serviceTitleMap = {
                "Web Developer": t.services.webDeveloper,
                "React Native Developer": t.services.reactNativeDeveloper,
                "Backend Developer": t.services.backendDeveloper
              };
              
              return (
                <ServiceCard 
                  key={service.title} 
                  index={index} 
                  {...service} 
                  title={serviceTitleMap[service.title] || service.title}
                  theme={theme} 
                />
              );
            })}
        </div>
      </div>

      {/* Coluna direita - imagem  */}
      <div className='hidden justify-center lg:flex flex-1 justify-end'>
          <motion.div
            variants={fadeIn("left", "spring", 0.5, 0.75)}
            className='w-full max-w-md flex items-center justify-center'
          >
            {/* Apenas a imagem */}
            <div className="w-96 h-96 relative group">
              {/* Card com animação de flutuação */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full h-full"
              >
                {/* Círculo com gradiente e sombra */}
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-[#065f46] via-[#1e1b4b] to-[#312e81] p-2">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#2f2a1f]/20 to-[#7a6348]/20 backdrop-blur-sm">
                    <img 
                      src="/src/assets/robson.png" 
                      alt="Robson" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Efeito de brilho que se move */}
                <motion.div
                  animate={{
                    x: [-30, 30, -30],
                    opacity: [0.2, 0.9, 0.2]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
                
                {/* Partículas flutuantes maiores */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0.8
                  }}
                  className="absolute -top-3 -right-3 w-4 h-4 bg-[#065f46] rounded-full"
                />
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: 1.5
                  }}
                  className="absolute -bottom-3 -left-3 w-3 h-3 bg-[#312e81] rounded-full"
                />
                <motion.div
                  animate={{
                    y: [0, -25, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    delay: 2.2
                  }}
                  className="absolute top-1/2 -right-5 w-2 h-2 bg-white rounded-full"
                />
              </motion.div>
            </div>
        </motion.div>
      </div>

    </div>
  </>
  );
};

export default SectionWrapper(About, "about");
