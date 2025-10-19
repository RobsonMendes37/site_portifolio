import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, Footer, ThemeToggle, LanguageToggle, StarsCanvas } from "./components";
import SimpleAvatar from "./components/SimpleAvatar";
import SimpleWhatsApp from "./components/SimpleWhatsApp";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { LanguageProvider } from "./hooks/useLanguage.jsx";
import { getThemeColors } from "./constants/colors";
import { herobg, herobg_light } from "./assets";

const AppContent = () => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);

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
