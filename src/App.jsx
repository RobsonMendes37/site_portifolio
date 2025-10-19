import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, Footer, ThemeToggle, LanguageToggle, StarsCanvas } from "./components";
import MobileHero from "./components/MobileHero";
import MobileAbout from "./components/MobileAbout";
import SimpleAvatar from "./components/SimpleAvatar";
import SimpleWhatsApp from "./components/SimpleWhatsApp";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { LanguageProvider } from "./hooks/useLanguage.jsx";
import { getThemeColors } from "./constants/colors";
import { herobg, herobg_light } from "./assets";

const AppContent = () => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verifica se está no browser
    if (typeof window === 'undefined') {
      setIsMobile(true);
      return;
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div
        className='relative z-0 transition-colors duration-300'
        style={{ backgroundColor: themeColors.background }}
      >
        <Navbar />
        <MobileHero />
        <MobileAbout />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
        </div>
        <Footer />
        <SimpleAvatar />
        <SimpleWhatsApp />
        <ThemeToggle />
        <LanguageToggle />
      </div>
    );
  }

  return (
    <div
      className='relative z-0 transition-colors duration-300'
      style={{ backgroundColor: themeColors.background }}
    >
      <div 
        className="bg-cover bg-no-repeat bg-center transition-all duration-300"
        style={{
          backgroundImage: theme === 'dark' 
            ? `url(${herobg})`
            : `url(${herobg_light})`
        }}
      >
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
          <Footer />
          <SimpleAvatar />
          <SimpleWhatsApp />
          <ThemeToggle />
          <LanguageToggle />
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
