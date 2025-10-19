import { translations } from '../constants/translations';
import AIService from '../services/AIService';
import ConversationFlows from './ConversationFlows';

class ConversationEngine {
  constructor(language = 'pt') {
    this.language = language;
    this.t = translations[language];
    this.conversationHistory = [];
    this.personality = {
      enthusiasm: 0.8,
      professionalism: 0.9,
      humor: 0.6,
      helpfulness: 1.0,
      techSavvy: 1.0
    };
    this.aiService = new AIService();
    this.conversationFlows = new ConversationFlows(language);
    this.useAI = true; // Flag para habilitar/desabilitar IA
    this.useFlows = true; // Flag para usar fluxos inteligentes
  }

  // Detectar intenção da mensagem
  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    const intents = {
      greeting: ['oi', 'olá', 'hello', 'hi', 'hey', 'e aí', 'eai'],
      projects: ['projeto', 'project', 'trabalho', 'work', 'portfolio', 'portfólio', 'singulare', 'avante', 'monemii'],
      experience: ['experiência', 'experience', 'carreira', 'career', 'trabalho', 'job', 'empresa', 'company'],
      contact: ['contato', 'contact', 'falar', 'talk', 'conversar', 'chat', 'whatsapp'],
      technologies: ['tecnologia', 'technology', 'tech', 'react', 'node', 'python', 'javascript', 'mongodb', 'habilidade', 'skill'],
      compliment: ['parabéns', 'congratulations', 'legal', 'cool', 'incrível', 'amazing', 'bom', 'good', 'ótimo', 'great'],
      thanks: ['obrigado', 'thanks', 'thank you', 'valeu', 'vlw'],
      time: ['hora', 'time', 'dia', 'day', 'tarde', 'afternoon', 'manhã', 'morning', 'noite', 'night'],
      weather: ['tempo', 'weather', 'chuva', 'rain', 'sol', 'sun', 'frio', 'cold', 'quente', 'hot']
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent;
      }
    }

    return 'unknown';
  }

  // Gerar resposta baseada na intenção
  generateResponse(intent, message = '') {
    const responses = {
      greeting: this.getGreetingResponse(),
      projects: this.getProjectsResponse(),
      experience: this.getExperienceResponse(),
      contact: this.getContactResponse(),
      technologies: this.getTechnologiesResponse(),
      compliment: this.getComplimentResponse(),
      thanks: this.getThanksResponse(),
      time: this.getTimeResponse(),
      weather: this.getWeatherResponse(),
      unknown: this.getUnknownResponse()
    };

    return responses[intent] || responses.unknown;
  }

  // Respostas específicas
  getGreetingResponse() {
    const greetings = this.t.avatar.greetings || [
      "Oi! 👋 Que bom te ver por aqui!",
      "Olá! 😊 Como posso te ajudar hoje?",
      "Oi! 🚀 Que tal conversarmos sobre tecnologia?"
    ];
    return this.getRandomResponse(greetings);
  }

  getProjectsResponse() {
    const responses = [
      "Ah, meus projetos! 😊 Tenho alguns bem legais. Quer que eu te mostre?",
      "Meus projetos são minha paixão! 🚀 Tenho o Singulare, Avante Tech, Monemii... Qual te interessa?",
      "Adoro falar sobre meus projetos! 💻 Cada um tem uma história especial. Quer conhecer?"
    ];
    return this.getRandomResponse(responses);
  }

  getExperienceResponse() {
    const responses = [
      "Tenho bastante experiência! 🚀 Trabalhei em várias empresas e projetos incríveis.",
      "Minha jornada tem sido incrível! 💼 Da INOVE ao GREat, cada experiência me ensinou muito.",
      "Experiência é o que não me falta! 🎯 Já trabalhei como Tech Lead e desenvolvedor full stack."
    ];
    return this.getRandomResponse(responses);
  }

  getContactResponse() {
    const responses = [
      "Que bom que quer falar comigo! 💬 Que tal conversarmos no WhatsApp?",
      "Adoro conversar! 😊 No WhatsApp posso te ajudar melhor. Vamos lá?",
      "Perfeito! 💬 No WhatsApp posso te mostrar mais detalhes dos meus projetos."
    ];
    return this.getRandomResponse(responses);
  }

  getTechnologiesResponse() {
    const responses = [
      "Adoro tecnologia! 💻 Trabalho com React, Node.js, Python, MongoDB... Posso te contar mais!",
      "Tecnologia é minha paixão! 🚀 React, Next.js, Spring Boot, Docker... Qual te interessa?",
      "Sou apaixonado por tech! 💡 React, React Native, Python, TypeScript... Posso explicar qualquer uma!"
    ];
    return this.getRandomResponse(responses);
  }

  getComplimentResponse() {
    const responses = [
      "Obrigado! 😊 Fico feliz que tenha gostado!",
      "Que gentil! 🥰 Isso me motiva ainda mais!",
      "Muito obrigado! 💙 Suas palavras significam muito para mim!"
    ];
    return this.getRandomResponse(responses);
  }

  getThanksResponse() {
    const responses = [
      "De nada! 😊 Fico feliz em ajudar! Precisa de mais alguma coisa?",
      "Por nada! 💙 Estou aqui para ajudar!",
      "Imagina! 😄 Foi um prazer te ajudar!"
    ];
    return this.getRandomResponse(responses);
  }

  getTimeResponse() {
    const hour = new Date().getHours();
    let timeGreeting;
    
    if (hour < 12) {
      timeGreeting = "Bom dia! ☀️";
    } else if (hour < 18) {
      timeGreeting = "Boa tarde! 🌤️";
    } else {
      timeGreeting = "Boa noite! 🌙";
    }
    
    return `${timeGreeting} Que dia lindo para programar! 💻`;
  }

  getWeatherResponse() {
    const responses = [
      "Que dia lindo! ☀️ Perfeito para programar!",
      "O tempo está ótimo! 🌤️ Ideal para focar no código!",
      "Que dia perfeito! ☀️ Vamos aproveitar para criar algo incrível!"
    ];
    return this.getRandomResponse(responses);
  }

  getUnknownResponse() {
    const responses = [
      "Hmm, interessante pergunta! 🤔 Que tal conversarmos no WhatsApp para eu te ajudar melhor?",
      "Boa pergunta! 🤔 No WhatsApp posso te dar uma resposta mais detalhada!",
      "Interessante! 💭 Que tal falarmos no WhatsApp? Posso te ajudar melhor lá!"
    ];
    return this.getRandomResponse(responses);
  }

  // Selecionar resposta aleatória
  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Processar mensagem completa
  async processMessage(message) {
    try {
      let response;
      let intent = 'ai_generated';
      let shouldOpenWhatsApp = false;
      let flow = 'general';
      let avatarState = 'thinking';

      if (this.useFlows) {
        // Usar sistema de fluxos inteligentes
        const flowResult = this.conversationFlows.processMessage(message, {
          history: this.conversationHistory.slice(-3),
          personality: this.personality
        });
        
        response = flowResult.response;
        flow = flowResult.flow;
        shouldOpenWhatsApp = flowResult.shouldOpenWhatsApp || false;
        avatarState = this.conversationFlows.getAvatarState(flow, flowResult);
        intent = flow;
        
        // Se IA estiver disponível, tentar melhorar a resposta
        if (this.useAI && this.aiService.isAvailable) {
          try {
            const context = this.buildContext(flowResult);
            const aiResponse = await this.aiService.generateResponse(message, context, this.language);
            if (aiResponse && aiResponse.length > 10) {
              response = aiResponse;
              intent = 'ai_enhanced';
            }
          } catch (aiError) {
            console.log('AI enhancement failed, using flow response');
          }
        }
      } else if (this.useAI) {
        // Tentar IA primeiro
        const context = this.buildContext();
        response = await this.aiService.generateResponse(message, context, this.language);
        
        // Detectar se deve abrir WhatsApp baseado na resposta
        shouldOpenWhatsApp = this.shouldOpenWhatsAppFromResponse(response);
        avatarState = 'talking';
      } else {
        // Fallback para sistema baseado em regras
        intent = this.detectIntent(message);
        response = this.generateResponse(intent, message);
        shouldOpenWhatsApp = this.shouldOpenWhatsApp(intent);
        avatarState = this.getAvatarState(intent);
      }
      
      // Adicionar ao histórico
      this.conversationHistory.push({
        user: message,
        bot: response,
        intent,
        flow,
        avatarState,
        timestamp: new Date(),
        aiGenerated: this.useAI,
        flowBased: this.useFlows
      });

      return {
        response,
        intent,
        flow,
        avatarState,
        shouldOpenWhatsApp,
        suggestions: this.conversationFlows.getFlowSuggestions(flow)
      };
      
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Fallback para sistema baseado em regras
      const intent = this.detectIntent(message);
      const response = this.generateResponse(intent, message);
      
      this.conversationHistory.push({
        user: message,
        bot: response,
        intent,
        flow: 'fallback',
        avatarState: 'thinking',
        timestamp: new Date(),
        aiGenerated: false,
        flowBased: false,
        error: error.message
      });

      return {
        response,
        intent,
        flow: 'fallback',
        avatarState: 'thinking',
        shouldOpenWhatsApp: this.shouldOpenWhatsApp(intent),
        suggestions: ['Projetos', 'Experiência', 'Tecnologias', 'WhatsApp']
      };
    }
  }

  // Construir contexto para IA
  buildContext(flowResult = null) {
    const context = `
      Robson é um desenvolvedor full stack com experiência em:
      - React, React Native, Next.js
      - Node.js, Python, Spring Boot
      - MongoDB, Docker
      - Trabalhou na INOVE, Avante Tech, GREat
      - Projetos: Singulare Reab, Avante Tech, Monemii
      - Personalidade: amigável, profissional, entusiasta por tecnologia
      - Idioma: ${this.language}
    `;
    
    // Adicionar contexto do fluxo se disponível
    if (flowResult) {
      const flowContext = `
        Fluxo atual: ${flowResult.flow}
        Contexto: ${JSON.stringify(flowResult.context || {})}
      `;
      return `${context}\n\n${flowContext}`;
    }
    
    // Adicionar histórico recente se disponível
    if (this.conversationHistory.length > 0) {
      const recentHistory = this.conversationHistory.slice(-3);
      const historyContext = recentHistory.map(conv => 
        `Usuário: ${conv.user}\nRobson: ${conv.bot}`
      ).join('\n');
      return `${context}\n\nHistórico recente:\n${historyContext}`;
    }
    
    return context;
  }

  // Detectar se deve abrir WhatsApp baseado na resposta da IA
  shouldOpenWhatsAppFromResponse(response) {
    const whatsappKeywords = [
      'whatsapp', 'contato', 'contact', 'conversar', 'chat',
      'falar', 'talk', 'mensagem', 'message'
    ];
    
    const lowerResponse = response.toLowerCase();
    return whatsappKeywords.some(keyword => lowerResponse.includes(keyword));
  }

  // Determinar se deve abrir WhatsApp
  shouldOpenWhatsApp(intent) {
    const whatsappIntents = ['contact', 'unknown', 'compliment'];
    return whatsappIntents.includes(intent);
  }

  // Obter estado do avatar baseado na intenção
  getAvatarState(intent) {
    const stateMap = {
      greeting: 'waving',
      projects: 'excited',
      experience: 'talking',
      contact: 'talking',
      technologies: 'excited',
      compliment: 'happy',
      thanks: 'happy',
      time: 'idle',
      weather: 'idle',
      unknown: 'thinking'
    };

    return stateMap[intent] || 'thinking';
  }

  // Obter dicas de conversa
  getConversationTips() {
    return this.t.avatar.conversationTips || [
      "Pergunte sobre meus projetos!",
      "Quer saber sobre minha experiência?",
      "Fale sobre tecnologia comigo!",
      "Que tal conversarmos no WhatsApp?"
    ];
  }

  // Controlar uso da IA
  setUseAI(useAI) {
    this.useAI = useAI;
  }

  // Controlar uso dos fluxos
  setUseFlows(useFlows) {
    this.useFlows = useFlows;
  }

  // Obter analytics
  getAnalytics() {
    return {
      ...this.aiService.getAnalytics(),
      conversationHistory: this.conversationHistory.length,
      aiUsage: this.conversationHistory.filter(conv => conv.aiGenerated).length,
      fallbackUsage: this.conversationHistory.filter(conv => !conv.aiGenerated).length
    };
  }

  // Limpar cache da IA
  clearAICache() {
    this.aiService.clearCache();
  }

  // Obter histórico de conversas
  getConversationHistory() {
    return this.conversationHistory;
  }

  // Limpar histórico
  clearHistory() {
    this.conversationHistory = [];
  }
}

export default ConversationEngine;
