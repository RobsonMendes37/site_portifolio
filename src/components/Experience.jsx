import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { translations } from "../constants/translations";
import { getThemeColors } from "../constants/colors";

const ExperienceCard = ({ experience, theme, themeColors }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: themeColors.card,
        color: themeColors.text.primary,
      }}
      contentArrowStyle={{ borderRight: `7px solid ${themeColors.tertiary}` }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-[24px] font-bold transition-colors duration-300' style={{ color: themeColors.text.primary }}>{experience.title}</h3>
        <p
          className='text-[16px] font-semibold transition-colors duration-300'
          style={{ margin: 0, color: themeColors.text.secondary }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-[14px] pl-1 tracking-wider transition-colors duration-300'
            style={{ color: themeColors.text.white }}
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const themeColors = getThemeColors(theme);
  
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center mt-20` }>
          {t.experience.subtitle}
        </p>
        <h2 className={`${styles.sectionHeadText} text-center ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>
          {t.experience.title}
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => {
            // Mapear experiências para traduções
            const translatedExperience = t.experience.experiences[index] || experience;
            
            return (
              <ExperienceCard
                key={`experience-${index}`}
                experience={{
                  ...experience,
                  title: translatedExperience.title,
                  company_name: translatedExperience.company,
                  date: translatedExperience.date,
                  points: translatedExperience.points
                }}
                theme={theme}
                themeColors={themeColors}
              />
            );
          })}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
