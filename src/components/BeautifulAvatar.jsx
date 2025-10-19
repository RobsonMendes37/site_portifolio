import React from 'react';
import { motion } from 'framer-motion';

const BeautifulAvatar = ({ 
  isVisible = true, 
  isTalking = false, 
  isThinking = false, 
  isExcited = false, 
  isHappy = false, 
  isWaving = false,
  size = 'medium',
  theme = 'dark'
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const eyeVariants = {
    idle: { scale: 1, y: 0 },
    talking: { 
      scale: [1, 1.1, 1],
      y: [0, -1, 0],
      transition: { duration: 0.3, repeat: Infinity }
    },
    thinking: {
      scale: [1, 0.8, 1],
      transition: { duration: 0.5, repeat: Infinity }
    },
    excited: {
      scale: [1, 1.2, 1],
      y: [0, -2, 0],
      transition: { duration: 0.2, repeat: 3 }
    },
    happy: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.4, repeat: 2 }
    }
  };

  const mouthVariants = {
    idle: { scaleY: 1, scaleX: 1 },
    talking: {
      scaleY: [1, 0.3, 1],
      scaleX: [1, 1.2, 1],
      transition: { duration: 0.2, repeat: Infinity }
    },
    thinking: {
      scaleY: 0.5,
      scaleX: 0.8,
      transition: { duration: 0.3 }
    },
    excited: {
      scaleY: [1, 0.2, 1],
      scaleX: [1, 1.3, 1],
      transition: { duration: 0.1, repeat: 3 }
    },
    happy: {
      scaleY: 0.3,
      scaleX: 1.2,
      transition: { duration: 0.2 }
    }
  };

  const getCurrentState = () => {
    if (isExcited) return 'excited';
    if (isHappy) return 'happy';
    if (isTalking) return 'talking';
    if (isThinking) return 'thinking';
    return 'idle';
  };

  const currentState = getCurrentState();

  return (
    <motion.div
      className={`${sizeClasses[size]} relative flex items-center justify-center`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0, 
        opacity: isVisible ? 1 : 0,
        rotate: isWaving ? [0, 10, -10, 0] : 0
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Face Background */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
            : 'bg-gradient-to-br from-blue-400 to-purple-500'
        } shadow-lg`}
        animate={{
          scale: currentState === 'excited' ? [1, 1.1, 1] : 1,
          boxShadow: currentState === 'excited' 
            ? ['0 4px 20px rgba(59, 130, 246, 0.5)', '0 8px 30px rgba(59, 130, 246, 0.8)', '0 4px 20px rgba(59, 130, 246, 0.5)']
            : ['0 4px 20px rgba(59, 130, 246, 0.3)']
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Hair */}
      <motion.div
        className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full"
        animate={{
          y: currentState === 'excited' ? [-2, 0, -2] : 0
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Eyes */}
      <div className="relative z-10 flex space-x-2">
        <motion.div
          className="w-3 h-3 bg-white rounded-full flex items-center justify-center"
          variants={eyeVariants}
          animate={currentState}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-blue-900 rounded-full"
            animate={{
              x: isThinking ? [0, 2, 0] : 0,
              y: isThinking ? [0, 1, 0] : 0
            }}
            transition={{ duration: 0.5, repeat: isThinking ? Infinity : 0 }}
          />
        </motion.div>
        <motion.div
          className="w-3 h-3 bg-white rounded-full flex items-center justify-center"
          variants={eyeVariants}
          animate={currentState}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-blue-900 rounded-full"
            animate={{
              x: isThinking ? [0, 2, 0] : 0,
              y: isThinking ? [0, 1, 0] : 0
            }}
            transition={{ duration: 0.5, repeat: isThinking ? Infinity : 0 }}
          />
        </motion.div>
      </div>

      {/* Mouth */}
      <motion.div
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-white rounded-full"
        variants={mouthVariants}
        animate={currentState}
      />

      {/* Thinking Dots */}
      {isThinking && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-1"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -5 }}
          exit={{ opacity: 0, y: 0 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-white rounded-full"
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Excitement Particles */}
      {isExcited && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              initial={{
                x: '50%',
                y: '50%',
                scale: 0
              }}
              animate={{
                x: Math.cos(i * 60 * Math.PI / 180) * 30 + 50,
                y: Math.sin(i * 60 * Math.PI / 180) * 30 + 50,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      )}

      {/* Pulse Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-blue-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 0, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-blue-400 opacity-20"
        animate={{
          scale: currentState === 'excited' ? [1, 1.3, 1] : [1, 1.1, 1],
          opacity: currentState === 'excited' ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: currentState === 'excited' ? 0.3 : 3,
          repeat: Infinity
        }}
      />
    </motion.div>
  );
};

export default BeautifulAvatar;
