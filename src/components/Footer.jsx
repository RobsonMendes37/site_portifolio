import { motion } from "framer-motion";
import { github, linkedin, email } from "../assets";
import { contactInfo } from "../constants";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { translations } from "../constants/translations";
import { getThemeColors, componentColors } from "../constants/colors";

const Footer = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const themeColors = getThemeColors(theme);
  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative ${theme === 'dark' ? 'bg-tertiary' : 'bg-[#e6ddd0]'} py-8 px-4 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e informações */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>Robson Mendes</h3>
            <p className={`text-sm text-center md:text-left max-w-md ${theme === 'dark' ? 'text-secondary' : 'text-[#7a6348]'} transition-colors duration-300`}>
              {t.footer.description}
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>{t.footer.quickLinks}</h4>
            <div className="flex flex-col space-y-3">
              <a 
                href="#about" 
                className={`${theme === 'dark' ? 'text-secondary hover:text-white' : 'text-[#7a6348] hover:text-[#2f2a1f]'} transition-colors duration-300 hover:scale-105 transform`}
              >
                {t.nav.about}
              </a>
              <a 
                href="#work" 
                className={`${theme === 'dark' ? 'text-secondary hover:text-white' : 'text-[#7a6348] hover:text-[#2f2a1f]'} transition-colors duration-300 hover:scale-105 transform`}
              >
                {t.nav.work}
              </a>
              <a 
                href="#experience" 
                className={`${theme === 'dark' ? 'text-secondary hover:text-white' : 'text-[#7a6348] hover:text-[#2f2a1f]'} transition-colors duration-300 hover:scale-105 transform`}
              >
                {t.nav.projects}
              </a>
              <a 
                href="#feedbacks" 
                className={`${theme === 'dark' ? 'text-secondary hover:text-white' : 'text-[#7a6348] hover:text-[#2f2a1f]'} transition-colors duration-300 hover:scale-105 transform`}
              >
                {t.nav.testimonials}
              </a>
              <a 
                href="#contact" 
                className={`${theme === 'dark' ? 'text-secondary hover:text-white' : 'text-[#7a6348] hover:text-[#2f2a1f]'} transition-colors duration-300 hover:scale-105 transform`}
              >
                {t.nav.contact}
              </a>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>{t.footer.socialMedia}</h4>
            
            {/* Ícones das redes sociais */}
            <div className="flex space-x-4 mb-6">
              <a
                href={contactInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all duration-300 group"
                title="GitHub"
              >
                <img src={github} alt="GitHub" className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 filter brightness-0 invert" />
              </a>
              <a
                href={contactInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all duration-300 group"
                title="LinkedIn"
              >
                <img src={linkedin} alt="LinkedIn" className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 filter brightness-0 invert" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all duration-300 group"
                title="Email"
              >
                <img src={email} alt="Email" className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 filter brightness-0 invert" />
              </a>
            </div>

            {/* Informações de contato */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <img src={email} alt="Email" className="w-4 h-4 filter brightness-0 invert" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-secondary hover:text-white transition-colors duration-300 text-sm"
                >
                  {contactInfo.email}
                </a>
              </div>
              <p className="text-secondary text-xs">
                {t.footer.available}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary mt-8 pt-6 text-center">
          <p className="text-secondary text-sm">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
