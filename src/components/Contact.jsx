import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { translations } from "../constants/translations";
import { getThemeColors, componentColors } from "../constants/colors";

const Contact = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const themeColors = getThemeColors(theme);
  
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className={`flex-[0.75] ${theme === 'dark' ? 'bg-black-100' : 'bg-[#ebe4d1]'} p-8 rounded-2xl transition-colors duration-300 shadow-lg ${theme === 'dark' ? 'shadow-black-200' : 'shadow-gray-200'}`}
      >
        <p className={styles.sectionSubText}>{t.contact.subtitle}</p>
        <h3 className={`${styles.sectionHeadText} ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>{t.contact.title}</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>{t.contact.form.name}</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder={t.contact.form.namePlaceholder}
              className={`${theme === 'dark' ? 'bg-tertiary placeholder:text-secondary text-white' : 'bg-[#f0e8d6] placeholder:text-[#7a6348] text-[#2f2a1f]'} py-4 px-6 rounded-lg outline-none border-none font-medium transition-colors duration-300`}
            />
          </label>
          <label className='flex flex-col'>
            <span className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>{t.contact.form.email}</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder={t.contact.form.emailPlaceholder}
              className={`${theme === 'dark' ? 'bg-tertiary placeholder:text-secondary text-white' : 'bg-[#f0e8d6] placeholder:text-[#7a6348] text-[#2f2a1f]'} py-4 px-6 rounded-lg outline-none border-none font-medium transition-colors duration-300`}
            />
          </label>
          <label className='flex flex-col'>
            <span className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#2f2a1f]'} transition-colors duration-300`}>{t.contact.form.message}</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder={t.contact.form.messagePlaceholder}
              className={`${theme === 'dark' ? 'bg-tertiary placeholder:text-secondary text-white' : 'bg-[#f0e8d6] placeholder:text-[#7a6348] text-[#2f2a1f]'} py-4 px-6 rounded-lg outline-none border-none font-medium transition-colors duration-300`}
            />
          </label>

          <button
            type='submit'
            className={`${theme === 'dark' ? 'bg-tertiary text-white shadow-primary' : 'bg-[#2f2a1f] text-white shadow-gray-500'} py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-md transition-colors duration-300`}
          >
            {loading ? t.contact.form.sending : t.contact.form.send}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
