import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { translations } from "../constants/translations";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // NavLinks dinâmicos baseados no idioma
  const dynamicNavLinks = [
    { id: "about", title: t.nav.about },
    { id: "work", title: t.nav.work },
    { id: "projects", title: t.nav.projects },
    { id: "feedbacks", title: t.nav.testimonials },
    { id: "contact", title: t.nav.contact }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 transition-colors duration-300 ${
        scrolled 
          ? (theme === 'dark' ? 'bg-primary' : 'bg-[#f0e8d6]') 
          : 'bg-transparent'
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className={`${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} text-[18px] font-bold cursor-pointer flex transition-colors duration-300`}>
            Robson &nbsp;
            <span className='sm:block hidden'> | Engenheiro de Software</span>
          </p>
        </Link>

            <ul className='list-none hidden sm:flex flex-row gap-10'>
              {dynamicNavLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title 
                  ? (theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]')
                  : (theme === 'dark' ? 'text-secondary' : 'text-[#7a6348]')
              } ${theme === 'dark' ? 'hover:text-white' : 'hover:text-[#2f2a1f]'} text-[18px] font-medium cursor-pointer transition-colors duration-300`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Botões de tema e idioma - visíveis apenas no desktop */}
        <div className='hidden sm:flex items-center gap-3'>
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg ${
              theme === 'dark' 
                ? 'bg-black/15 hover:bg-white/25' 
                : 'bg-white/15 hover:bg-white/25'
            }`}
          >
            <span className="text-xs font-bold">
              {theme === 'dark' ? '☀️' : '🌙'}
            </span>
          </button>
          
          <button
            onClick={toggleLanguage}
            className={`w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg ${
              theme === 'dark' 
                ? 'bg-black/15 hover:bg-white/25' 
                : 'bg-white/15 hover:bg-white/25'
            }`}
          >
            <span className="text-xs font-bold">
              {language === 'pt' ? 'EN' : 'PT'}
            </span>
          </button>
        </div>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 ${theme === 'dark' ? 'black-gradient' : 'bg-[#ebe4d1]'} absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl shadow-lg transition-colors duration-300`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {dynamicNavLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] transition-colors duration-300 ${
                    active === nav.title 
                      ? (theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]')
                      : (theme === 'dark' ? 'text-secondary' : 'text-[#7a6348]')
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
