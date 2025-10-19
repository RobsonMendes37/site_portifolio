import { AIConfig, isAIAvailable, getPreferredAPI } from '../config/ai';

class AIService {
  constructor() {
    this.config = AIConfig;
    this.rateLimiter = new RateLimiter(this.config.rateLimits);
    this.cache = new Map();
    this.analytics = {
      aiRequests: 0,
      fallbackRequests: 0,
      responseTime: [],
      errors: 0
    };
    this.isAvailable = isAIAvailable();
    this.preferredAPI = getPreferredAPI();
  }

  async generateResponse(message, context, language = 'pt') {
    const cacheKey = `${message}-${language}`;
    
    // Verificar cache primeiro
    if (this.config.cache.enabled && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const startTime = Date.now();
    
    try {
      let response;
      
      // Verificar se IA está disponível
      if (!this.isAvailable) {
        response = this.getFallbackResponse(message, language);
        this.analytics.fallbackRequests++;
      } else {
        // Tentar API preferida primeiro
        if (this.preferredAPI === 'huggingface' && this.rateLimiter.canMakeRequest('huggingface')) {
          response = await this.huggingFaceResponse(message, context, language);
          this.rateLimiter.recordRequest('huggingface');
        } 
        else if (this.preferredAPI === 'openai' && this.rateLimiter.canMakeRequest('openai')) {
          response = await this.openAIResponse(message, context, language);
          this.rateLimiter.recordRequest('openai');
        }
        // Fallback para a outra API
        else if (this.config.apis.openai.enabled && this.rateLimiter.canMakeRequest('openai')) {
          response = await this.openAIResponse(message, context, language);
          this.rateLimiter.recordRequest('openai');
        }
        else if (this.config.apis.huggingface.enabled && this.rateLimiter.canMakeRequest('huggingface')) {
          response = await this.huggingFaceResponse(message, context, language);
          this.rateLimiter.recordRequest('huggingface');
        }
        // Fallback para respostas baseadas em regras
        else {
          response = this.getFallbackResponse(message, language);
          this.analytics.fallbackRequests++;
        }
      }

      // Cache da resposta se habilitado
      if (this.config.cache.enabled) {
        this.cache.set(cacheKey, response);
        
        // Limitar tamanho do cache
        if (this.cache.size > this.config.cache.maxSize) {
          const firstKey = this.cache.keys().next().value;
          this.cache.delete(firstKey);
        }
      }
      
      // Analytics
      this.analytics.aiRequests++;
      this.analytics.responseTime.push(Date.now() - startTime);
      
      return response;
      
    } catch (error) {
      console.error('AI Service Error:', error);
      this.analytics.errors++;
      return this.getFallbackResponse(message, language);
    }
  }

  async huggingFaceResponse(message, context, language) {
    const model = this.config.apis.huggingface.model;

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        headers: { 
          Authorization: `Bearer ${this.config.apis.huggingface.key}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: `${context}\nUsuário: ${message}\nRobson:`,
          parameters: { 
            max_length: this.config.apis.huggingface.maxLength, 
            temperature: this.config.apis.huggingface.temperature,
            do_sample: true,
            top_p: 0.9
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return this.cleanResponse(data[0]?.generated_text || data.generated_text || '');
  }

  async openAIResponse(message, context, language) {
    const systemPrompt = language === 'pt' 
      ? `Você é o Robson virtual, um desenvolvedor full stack especializado em React, Node.js, Python. 
         Seja amigável, profissional e entusiasta por tecnologia. 
         Contexto: ${context}
         Responda de forma natural e conversacional, como se fosse o próprio Robson falando.`
      : `You are virtual Robson, a full stack developer specialized in React, Node.js, Python.
         Be friendly, professional and enthusiastic about technology.
         Context: ${context}
         Respond naturally and conversationally, as if you were Robson himself speaking.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apis.openai.key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.apis.openai.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: this.config.apis.openai.maxTokens,
        temperature: this.config.apis.openai.temperature,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return this.cleanResponse(data.choices[0].message.content);
  }

  getFallbackResponse(message, language) {
    const lowerMessage = message.toLowerCase();
    
    // Respostas baseadas em palavras-chave
    if (lowerMessage.includes('projeto') || lowerMessage.includes('project')) {
      return language === 'pt' 
        ? "Ah, meus projetos! 😊 Tenho alguns bem legais. Quer que eu te mostre?"
        : "Oh, my projects! 😊 I have some really cool ones. Want me to show you?";
    }
    
    if (lowerMessage.includes('experiência') || lowerMessage.includes('experience')) {
      return language === 'pt'
        ? "Tenho bastante experiência! 🚀 Trabalhei em várias empresas e projetos incríveis."
        : "I have quite a bit of experience! 🚀 I've worked at several companies and amazing projects.";
    }
    
    if (lowerMessage.includes('contato') || lowerMessage.includes('contact')) {
      return language === 'pt'
        ? "Que bom que quer falar comigo! 💬 Que tal conversarmos no WhatsApp?"
        : "Great that you want to talk to me! 💬 How about we chat on WhatsApp?";
    }
    
    if (lowerMessage.includes('tecnologia') || lowerMessage.includes('technology')) {
      return language === 'pt'
        ? "Adoro tecnologia! 💻 Trabalho com React, Node.js, Python, MongoDB... Posso te contar mais!"
        : "I love technology! 💻 I work with React, Node.js, Python, MongoDB... I can tell you more!";
    }
    
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('thank')) {
      return language === 'pt'
        ? "De nada! 😊 Fico feliz em ajudar! Precisa de mais alguma coisa?"
        : "You're welcome! 😊 I'm happy to help! Need anything else?";
    }
    
    // Resposta padrão
    return language === 'pt'
      ? "Hmm, interessante pergunta! 🤔 Que tal conversarmos no WhatsApp para eu te ajudar melhor?"
      : "Hmm, interesting question! 🤔 How about we chat on WhatsApp so I can help you better?";
  }

  cleanResponse(response) {
    if (!response) return "Desculpe, não consegui processar sua mensagem.";
    
    // Limpar resposta da IA
    return response
      .replace(/^Robson:\s*/i, '')
      .replace(/^Usuário:.*$/gm, '')
      .replace(/\n.*$/s, '')
      .trim()
      .substring(0, 200); // Limitar tamanho
  }

  getAnalytics() {
    return {
      ...this.analytics,
      averageResponseTime: this.analytics.responseTime.length > 0 
        ? this.analytics.responseTime.reduce((a, b) => a + b, 0) / this.analytics.responseTime.length 
        : 0,
      cacheSize: this.cache.size
    };
  }

  clearCache() {
    this.cache.clear();
  }
}

class RateLimiter {
  constructor(limits) {
    this.requests = {
      openai: [],
      huggingface: []
    };
    this.limits = limits || {
      openai: { max: 3, window: 60000 },
      huggingface: { max: 100, window: 60000 }
    };
  }

  canMakeRequest(service) {
    const now = Date.now();
    const limit = this.limits[service];
    
    if (!limit) return true; // Sem limite se não configurado
    
    // Limpar requisições antigas
    this.requests[service] = this.requests[service].filter(
      time => now - time < limit.window
    );
    
    return this.requests[service].length < limit.max;
  }

  recordRequest(service) {
    this.requests[service].push(Date.now());
  }

  getRemainingRequests(service) {
    const limit = this.limits[service];
    if (!limit) return Infinity;
    
    const now = Date.now();
    this.requests[service] = this.requests[service].filter(
      time => now - time < limit.window
    );
    
    return Math.max(0, limit.max - this.requests[service].length);
  }
}

export default AIService;
