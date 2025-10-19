import React from "react";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { translations } from "../constants/translations";
import { robson } from "../assets";

const MobileServiceCard = ({ title, icon, theme }) => (
  <div className="w-full bg-gradient-to-r from-[#00cea8] to-[#bf61ff] p-[1px] rounded-[20px] shadow-lg">
    <div className={`${theme === 'dark' ? 'bg-tertiary' : 'bg-[#ebe4d1]'} rounded-[20px] py-6 px-6 min-h-[200px] flex flex-col items-center justify-center transition-colors duration-300 shadow-lg`}>
      <img
        src={icon}
        alt={title}
        className="w-16 h-16 object-contain mb-4"
        onError={(e) => {
          console.log('Erro ao carregar imagem:', title, icon);
          e.target.style.display = 'none';
        }}
      />
      <h3 className={`${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} text-lg font-bold text-center transition-colors duration-300`}>
        {title}
      </h3>
    </div>
  </div>
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
      <div className="flex justify-center mb-8">
        <div className="w-48 h-48 relative">
          <div className="w-full h-full rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-[#065f46] via-[#1e1b4b] to-[#312e81] p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#2f2a1f]/20 to-[#7a6348]/20">
              <img 
                src={robson} 
                alt="Robson" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center px-4">
        <div className="text-center mb-8">
          <p className="text-secondary text-sm uppercase tracking-wider">Introduction</p>
          <h2 className={`text-4xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>
            {t.about.title}
          </h2>
        </div>

        <p className={`text-lg max-w-3xl text-center mb-8 ${theme === 'dark' ? 'text-secondary' : 'text-[#7a6348]'} transition-colors duration-300`}>
          {t.about.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {services.map((service, index) => (
            <MobileServiceCard 
              key={index}
              title={service.title}
              icon={service.icon}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileAbout;
