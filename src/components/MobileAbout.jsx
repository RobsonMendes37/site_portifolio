import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { translations } from "../constants/translations";
import { robson } from "../assets";

const MobileServiceCard = ({ title, icon, theme, index }) => (
  <motion.div 
    className="w-full bg-gradient-to-r from-[#00cea8] to-[#bf61ff] p-[1px] rounded-[20px] shadow-lg"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className={`${theme === 'dark' ? 'bg-tertiary' : 'bg-[#ebe4d1]'} rounded-[20px] py-6 px-6 min-h-[200px] flex flex-col items-center justify-center transition-colors duration-300 shadow-lg`}>
      <motion.img
        src={icon}
        alt={title}
        className="w-16 h-16 object-contain mb-4"
        onError={(e) => {
          console.log('Erro ao carregar imagem:', title, icon);
          e.target.style.display = 'none';
        }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      />
      <h3 className={`${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} text-lg font-bold text-center transition-colors duration-300`}>
        {title}
      </h3>
    </div>
  </motion.div>
);

const MobileAbout = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  
  const services = [
    {
      title: language === 'pt' ? "Desenvolvedor Web" : "Web Developer",
      icon: "/src/assets/web.png"
    },
    {
      title: language === 'pt' ? "Desenvolvedor React Native" : "React Native Developer", 
      icon: "/src/assets/mobile.png"
    },
    {
      title: language === 'pt' ? "Desenvolvedor Backend" : "Backend Developer",
      icon: "/src/assets/backend.png"
    }
  ];
  
  return (
    <div className="relative z-0 bg-primary">
      <motion.div 
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="w-48 h-48 relative"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-[#065f46] via-[#1e1b4b] to-[#312e81] p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#2f2a1f]/20 to-[#7a6348]/20">
              <img 
                src={robson} 
                alt="Robson" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col items-center px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-secondary text-sm uppercase tracking-wider">Introduction</p>
          <h2 className={`text-4xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>
            {t.about.title}
          </h2>
        </motion.div>

        <motion.p 
          className={`text-lg max-w-3xl text-center mb-8 ${theme === 'dark' ? 'text-secondary' : 'text-[#7a6348]'} transition-colors duration-300`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t.about.description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {services.map((service, index) => (
            <MobileServiceCard 
              key={index}
              title={service.title}
              icon={service.icon}
              theme={theme}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileAbout;
