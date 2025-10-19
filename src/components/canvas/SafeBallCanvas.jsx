import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SafeBallCanvas = ({ icon, name }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se está no browser
    if (typeof window === 'undefined') {
      setIsMobile(true);
      setIsLoading(false);
      return;
    }

    // Detecta mobile de forma simples
    const checkMobile = () => {
      return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    setIsMobile(checkMobile());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="w-28 h-28 flex items-center justify-center">Loading...</div>;
  }

  // Sempre usa versão simples com Framer Motion
  return (
    <motion.div
      className="w-28 h-28 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-full h-full rounded-full bg-gradient-to-br from-[#00cea8] to-[#bf61ff] p-1 shadow-lg"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <img
            src={icon}
            alt={name}
            className="w-12 h-12 object-contain"
            onError={(e) => {
              console.log('Erro ao carregar tecnologia:', name, icon);
              e.target.style.display = 'none';
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SafeBallCanvas;
