import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { translations } from "../constants/translations";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_url,
  theme,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className={`${theme === 'dark' ? 'bg-tertiary' : 'bg-[#ebe4d1]'} p-5 rounded-2xl sm:w-[360px] w-full transition-colors duration-300 shadow-lg ${theme === 'dark' ? 'shadow-black-200' : 'shadow-gray-200'}`}
      >
        <div className='relative w-full h-[230px] group'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          {/* Overlay com botão que aparece no hover */}
          <div className='absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl'>
            <button 
              onClick={() => window.open(live_url, "_blank")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              Visitar Site
            </button>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className={`${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} font-bold text-[24px] transition-colors duration-300`}>{name}</h3>
          <p className={`mt-2 ${theme === 'dark' ? 'text-secondary' : 'text-[#7a6348]'} text-[14px] transition-colors duration-300`}>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText} ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>{t.work.title}</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className={`mt-3 ${theme === 'dark' ? 'text-secondary' : 'text-[#7a6348]'} text-[17px] max-w-3xl leading-[30px] transition-colors duration-300`}
        >
          {t.work.description}
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => {
          // Mapear nomes dos projetos para traduções
          const projectMap = {
            "Singulare Reab": t.work.projects[0],
            "Avante Tech": t.work.projects[1], 
            "Monemii tec": t.work.projects[2]
          };
          
          const translatedProject = projectMap[project.name] || project;
          
          return (
            <ProjectCard 
              key={`project-${index}`} 
              index={index} 
              {...project}
              name={translatedProject.name}
              description={translatedProject.description}
              theme={theme} 
            />
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
