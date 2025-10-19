// Configuração da IA para o Avatar
export const AIConfig = {
  // APIs disponíveis
  apis: {
    openai: {
      enabled: !!import.meta.env.VITE_OPENAI_API_KEY,
      key: import.meta.env.VITE_OPENAI_API_KEY,
      model: 'gpt-3.5-turbo',
      maxTokens: 150,
      temperature: 0.7
    },
    huggingface: {
      enabled: !!import.meta.env.VITE_HUGGINGFACE_API_KEY,
      key: import.meta.env.VITE_HUGGINGFACE_API_KEY,
      model: 'microsoft/DialoGPT-medium',
      maxLength: 120,
      temperature: 0.7
    }
  },
  
  // Configurações de rate limiting
  rateLimits: {
    openai: { max: 3, window: 60000 }, // 3 requests per minute
    huggingface: { max: 100, window: 60000 } // 100 requests per minute
  },
  
  // Configurações de cache
  cache: {
    enabled: true,
    maxSize: 100,
    ttl: 300000 // 5 minutos
  },
  
  // Configurações de fallback
  fallback: {
    enabled: true,
    useRuleBased: true,
    showErrors: false
  },
  
  // Configurações de personalidade
  personality: {
    enthusiasm: 0.8,
    professionalism: 0.9,
    humor: 0.6,
    helpfulness: 1.0,
    techSavvy: 1.0
  }
};

// Verificar se pelo menos uma API está configurada
export const isAIAvailable = () => {
  return AIConfig.apis.openai.enabled || AIConfig.apis.huggingface.enabled;
};

// Obter API preferida
export const getPreferredAPI = () => {
  if (AIConfig.apis.huggingface.enabled) return 'huggingface';
  if (AIConfig.apis.openai.enabled) return 'openai';
  return null;
};

// Instruções para configurar as APIs
export const setupInstructions = {
  huggingface: {
    title: 'Hugging Face (Recomendado)',
    description: 'API gratuita e generosa para conversação',
    steps: [
      '1. Acesse https://huggingface.co/settings/tokens',
      '2. Crie um token de acesso',
      '3. Adicione VITE_HUGGINGFACE_API_KEY=hf_seu-token no arquivo .env'
    ],
    benefits: [
      '100 requisições por minuto',
      'Completamente gratuito',
      'Boa qualidade para português'
    ]
  },
  openai: {
    title: 'OpenAI (Melhor Qualidade)',
    description: 'API premium com melhor qualidade de respostas',
    steps: [
      '1. Acesse https://platform.openai.com/api-keys',
      '2. Crie uma API key',
      '3. Adicione VITE_OPENAI_API_KEY=sk_sua-chave no arquivo .env'
    ],
    benefits: [
      'Melhor qualidade de respostas',
      'Mais natural e contextual',
      'Suporte a múltiplos idiomas'
    ],
    limitations: [
      '3 requisições por minuto (plano gratuito)',
      'Pode ter custos após limite gratuito'
    ]
  }
};

export default AIConfig;
