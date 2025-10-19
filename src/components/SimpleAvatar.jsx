import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage.jsx';
import SimpleConversationEngine from './SimpleConversationEngine';

const SimpleAvatar = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [conversationEngine] = useState(() => new SimpleConversationEngine(language));
  const [suggestions, setSuggestions] = useState([]);
  const [avatarState, setAvatarState] = useState('idle');
  const [currentFlow, setCurrentFlow] = useState('greeting');
  const [showTooltip, setShowTooltip] = useState(true);

  // Mensagem de boas-vindas automática
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
      const result = conversationEngine.processMessage('olá');
      const welcomeMessage = result.response;
      
      setMessages([{ type: 'bot', content: welcomeMessage, timestamp: new Date() }]);
      setSuggestions(result.suggestions || []);
      setAvatarState(result.avatarState);
      setCurrentFlow(result.flow);
    }, 3000);

    return () => clearTimeout(timer);
  }, [language, conversationEngine]);

  // Fazer o tooltip desaparecer após 8 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleUserMessage = (message) => {
    if (!message.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage = { type: 'user', content: message, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');

    // Processar com engine avançado
    setIsTyping(true);
    setAvatarState('thinking');
    
    setTimeout(() => {
      try {
        const result = conversationEngine.processMessage(message);
        const botMessage = { type: 'bot', content: result.response, timestamp: new Date() };
        
        
        setMessages(prev => [...prev, botMessage]);
        setSuggestions(result.suggestions || []);
        setAvatarState(result.avatarState || 'idle');
        setCurrentFlow(result.flow || 'main_menu');
        
        // Sincronizar flow com o engine
        conversationEngine.setFlow(result.flow || 'main_menu');
        
        // Abrir WhatsApp se necessário
        if (result.shouldOpenWhatsApp) {
          setTimeout(() => {
            const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent('Olá! Vim do seu site.')}`;
            window.open(whatsappUrl, "_blank");
          }, 2000);
        }
      } catch (error) {
        console.error('Error processing message:', error);
        const errorMessage = { type: 'bot', content: 'Desculpe, ocorreu um erro. Tente novamente.', timestamp: new Date() };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    handleUserMessage(userInput);
  };

  const quickActions = [
    {
      text: language === 'pt' ? 'Ver Projetos' : 'See Projects',
      action: () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    },
    {
      text: language === 'pt' ? 'Sobre Mim' : 'About Me',
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    },
    {
      text: 'WhatsApp',
      action: () => {
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent('Olá! Vim do seu site.')}`;
        window.open(whatsappUrl, "_blank");
        setIsOpen(false);
      }
    }
  ];

  return (
    <div className="fixed bottom-24 right-6 z-40">
      {/* Avatar Button */}
      <motion.div
        className="relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            className={`absolute bottom-full right-0 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg whitespace-nowrap ${
              !isOpen ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: !isOpen ? 1 : 0, y: !isOpen ? 0 : 10 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {language === 'pt' ? 'Fale comigo!' : 'Chat with me!'}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          </motion.div>
        )}

        {/* Avatar Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 ${theme === 'dark' ? 'bg-tertiary' : 'bg-[#2f2a1f]'} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Avatar Face */}
          <div className="relative">
            {/* Eyes */}
            <div className="flex space-x-1 mb-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            {/* Smile */}
            <div className="w-4 h-2 border-b-2 border-white rounded-full"></div>
          </div>

          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute bottom-20 right-0 w-80 h-96 ${theme === 'dark' ? 'bg-tertiary' : 'bg-white'} rounded-2xl shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className={`p-4 ${theme === 'dark' ? 'bg-black-100' : 'bg-gray-50'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
                <div>
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'pt' ? 'Robson Virtual' : 'Virtual Robson'}
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'pt' ? 'Online' : 'Online'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 h-64 overflow-y-auto">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`max-w-xs p-3 rounded-2xl ${
                    message.type === 'user' 
                      ? `${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded-br-md`
                      : `${theme === 'dark' ? 'bg-black-200' : 'bg-gray-100'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'} rounded-bl-md`
                  }`}>
                    <div className="text-sm whitespace-pre-line">{message.content}</div>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : (theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="mb-4 flex justify-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className={`inline-block p-3 rounded-2xl rounded-bl-md ${theme === 'dark' ? 'bg-black-200' : 'bg-gray-100'}`}>
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={language === 'pt' ? 'Digite sua mensagem...' : 'Type your message...'}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-black-200 text-white placeholder-gray-400' 
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <motion.button
                  type="submit"
                  disabled={!userInput.trim()}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    userInput.trim() 
                      ? `${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`
                      : `${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} text-gray-400 cursor-not-allowed`
                  }`}
                  whileHover={userInput.trim() ? { scale: 1.05 } : {}}
                  whileTap={userInput.trim() ? { scale: 0.95 } : {}}
                >
                  {language === 'pt' ? 'Enviar' : 'Send'}
                </motion.button>
              </form>
            </div>


            {/* Quick Actions */}
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'pt' ? 'Ações rápidas:' : 'Quick actions:'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={action.action}
                    className={`p-2 text-xs rounded-lg transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-black-200 hover:bg-black-100 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {action.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SimpleAvatar;
