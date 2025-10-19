import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { isAIAvailable, getPreferredAPI, setupInstructions } from '../config/ai';

const AIStatus = ({ conversationEngine, isOpen, onClose }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [analytics, setAnalytics] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (conversationEngine && isOpen) {
      setAnalytics(conversationEngine.getAnalytics());
    }
  }, [conversationEngine, isOpen]);

  if (!isOpen) return null;

  const aiAvailable = isAIAvailable();
  const preferredAPI = getPreferredAPI();

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`w-96 max-h-96 overflow-y-auto rounded-2xl p-6 ${
          theme === 'dark' ? 'bg-tertiary' : 'bg-white'
        } shadow-2xl`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {language === 'pt' ? 'Status da IA' : 'AI Status'}
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
          >
            ✕
          </button>
        </div>

        {/* AI Status */}
        <div className="space-y-4">
          <div className={`p-3 rounded-lg ${
            aiAvailable 
              ? `${theme === 'dark' ? 'bg-green-900' : 'bg-green-100'} ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`
              : `${theme === 'dark' ? 'bg-red-900' : 'bg-red-100'} ${theme === 'dark' ? 'text-red-300' : 'text-red-800'}`
          }`}>
            <div className="flex items-center space-x-2">
              <span className="text-lg">
                {aiAvailable ? '🤖' : '⚠️'}
              </span>
              <span className="font-medium">
                {aiAvailable 
                  ? (language === 'pt' ? 'IA Ativa' : 'AI Active')
                  : (language === 'pt' ? 'IA Indisponível' : 'AI Unavailable')
                }
              </span>
            </div>
            {aiAvailable && (
              <p className="text-sm mt-1">
                {language === 'pt' 
                  ? `Usando ${preferredAPI === 'huggingface' ? 'Hugging Face' : 'OpenAI'}`
                  : `Using ${preferredAPI === 'huggingface' ? 'Hugging Face' : 'OpenAI'}`
                }
              </p>
            )}
          </div>

          {/* Analytics */}
          {analytics && (
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-black-200' : 'bg-gray-100'}`}>
              <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'pt' ? 'Estatísticas' : 'Statistics'}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'pt' ? 'Respostas IA:' : 'AI Responses:'}
                  </span>
                  <span className={`ml-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {analytics.aiUsage || 0}
                  </span>
                </div>
                <div>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'pt' ? 'Fallback:' : 'Fallback:'}
                  </span>
                  <span className={`ml-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {analytics.fallbackUsage || 0}
                  </span>
                </div>
                <div>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'pt' ? 'Tempo médio:' : 'Avg Time:'}
                  </span>
                  <span className={`ml-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {Math.round(analytics.averageResponseTime || 0)}ms
                  </span>
                </div>
                <div>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'pt' ? 'Cache:' : 'Cache:'}
                  </span>
                  <span className={`ml-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {analytics.cacheSize || 0}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Setup Instructions */}
          {!aiAvailable && (
            <div className="space-y-3">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  theme === 'dark' 
                    ? 'bg-black-200 hover:bg-black-100 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {language === 'pt' ? 'Como configurar IA?' : 'How to setup AI?'}
                  </span>
                  <span>{showInstructions ? '▼' : '▶'}</span>
                </div>
              </button>

              {showInstructions && (
                <motion.div
                  className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-black-200' : 'bg-gray-100'}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="space-y-3">
                    {Object.entries(setupInstructions).map(([key, instruction]) => (
                      <div key={key} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-black-100' : 'bg-white'}`}>
                        <h5 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {instruction.title}
                        </h5>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {instruction.description}
                        </p>
                        <div className="mt-2">
                          <h6 className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {language === 'pt' ? 'Passos:' : 'Steps:'}
                          </h6>
                          <ul className="text-xs mt-1 space-y-1">
                            {instruction.steps.map((step, index) => (
                              <li key={index} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {instruction.benefits && (
                          <div className="mt-2">
                            <h6 className={`text-xs font-medium ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                              {language === 'pt' ? 'Benefícios:' : 'Benefits:'}
                            </h6>
                            <ul className="text-xs mt-1 space-y-1">
                              {instruction.benefits.map((benefit, index) => (
                                <li key={index} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>
                                  ✓ {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={() => {
                if (conversationEngine) {
                  conversationEngine.clearAICache();
                  setAnalytics(conversationEngine.getAnalytics());
                }
              }}
              className={`flex-1 p-2 rounded-lg text-sm transition-colors ${
                theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {language === 'pt' ? 'Limpar Cache' : 'Clear Cache'}
            </button>
            <button
              onClick={() => {
                if (conversationEngine) {
                  conversationEngine.clearHistory();
                  setAnalytics(conversationEngine.getAnalytics());
                }
              }}
              className={`flex-1 p-2 rounded-lg text-sm transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              {language === 'pt' ? 'Limpar Histórico' : 'Clear History'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIStatus;
