import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { translations } from "../constants/translations";
import { getThemeColors, colors } from "../constants/colors";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  theme,
  themeColors,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className={`${theme === 'dark' ? 'bg-black-200' : 'bg-[#f0e8d6]'} p-10 rounded-3xl xs:w-[320px] w-full transition-colors duration-300 shadow-lg ${theme === 'dark' ? 'shadow-black-200' : 'shadow-gray-200'}`}
  >
    <p className={`font-black text-[48px] ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>"</p>

    <div className='mt-1'>
      <p className={`tracking-wider text-[18px] ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className={`font-medium text-[16px] ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>
            <span className={`${theme === 'dark' ? 'text-[#915EFF]' : 'text-[#bed286]'}`}>@</span> {name}
          </p>
          <p className={`mt-1 text-[12px] ${theme === 'dark' ? 'text-secondary' : 'text-[#7a6348]'} transition-colors duration-300`}>
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const themeColors = getThemeColors(theme);
  
  return (
    <div className={`mt-12 ${theme === 'dark' ? 'bg-black-100' : 'bg-[#e6ddd0]'} rounded-[20px] transition-colors duration-300`}>
      <div
        className={`${theme === 'dark' ? 'bg-tertiary' : 'bg-[#ebe4d1]'} rounded-2xl ${styles.padding} min-h-[300px] transition-colors duration-300 shadow-lg ${theme === 'dark' ? 'shadow-black-200' : 'shadow-gray-200'}`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{t.testimonials.subtitle}</p>
          <h2 className={`${styles.sectionHeadText} ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>{t.testimonials.title}</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => {
          // Mapear depoimentos para traduções
          const translatedTestimonial = t.testimonials.testimonials[index] || testimonial;
          
          return (
            <FeedbackCard 
              key={testimonial.name} 
              index={index} 
              {...testimonial}
              testimonial={translatedTestimonial.testimonial}
              name={translatedTestimonial.name}
              designation={translatedTestimonial.designation}
              company={translatedTestimonial.company}
              theme={theme}
              themeColors={themeColors}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "feedbacks");
