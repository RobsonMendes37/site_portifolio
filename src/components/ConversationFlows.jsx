import { translations } from '../constants/translations';

class ConversationFlows {
  constructor(language = 'pt') {
    this.language = language;
    this.t = translations[language];
    this.currentFlow = null;
    this.flowHistory = [];
    this.userPreferences = {};
    this.conversationContext = {};
  }

  // Detectar fluxo baseado na mensagem
  detectFlow(message) {
    const lowerMessage = message.toLowerCase();
    
    const flows = {
      // Fluxo de Apresentação
      greeting: {
        keywords: ['oi', 'olá', 'hello', 'hi', 'hey', 'e aí', 'eai', 'bom dia', 'boa tarde', 'boa noite'],
        priority: 10,
        flow: 'greeting'
      },
      
      // Fluxo de Projetos
      projects: {
        keywords: ['projeto', 'project', 'trabalho', 'work', 'portfolio', 'portfólio', 'singulare', 'avante', 'monemii', 'criar', 'desenvolver'],
        priority: 9,
        flow: 'projects'
      },
      
      // Fluxo de Experiência Profissional
      experience: {
        keywords: ['experiência', 'experience', 'carreira', 'career', 'trabalho', 'job', 'empresa', 'company', 'inove', 'great', 'avante tech'],
        priority: 8,
        flow: 'experience'
      },
      
      // Fluxo de Tecnologias
      technologies: {
        keywords: ['tecnologia', 'technology', 'tech', 'react', 'node', 'python', 'javascript', 'mongodb', 'habilidade', 'skill', 'linguagem', 'framework'],
        priority: 7,
        flow: 'technologies'
      },
      
      // Fluxo de Contato
      contact: {
        keywords: ['contato', 'contact', 'falar', 'talk', 'conversar', 'chat', 'whatsapp', 'email', 'telefone', 'phone'],
        priority: 6,
        flow: 'contact'
      },
      
      // Fluxo de Colaboração
      collaboration: {
        keywords: ['colaborar', 'collaborate', 'trabalhar', 'work together', 'parceria', 'partnership', 'freelance', 'projeto', 'proposal'],
        priority: 5,
        flow: 'collaboration'
      },
      
      // Fluxo de Educação
      education: {
        keywords: ['estudar', 'study', 'curso', 'course', 'aprender', 'learn', 'tutorial', 'ensinar', 'teach', 'mentoria', 'mentorship'],
        priority: 4,
        flow: 'education'
      },
      
      // Fluxo de Hobbies/Interesses
      hobbies: {
        keywords: ['hobby', 'interesse', 'interest', 'gosto', 'like', 'fazer', 'do', 'tempo livre', 'free time', 'diversão', 'fun'],
        priority: 3,
        flow: 'hobbies'
      },
      
      // Fluxo de Elogios
      compliments: {
        keywords: ['parabéns', 'congratulations', 'legal', 'cool', 'incrível', 'amazing', 'bom', 'good', 'ótimo', 'great', 'fantástico', 'fantastic'],
        priority: 2,
        flow: 'compliments'
      },
      
      // Fluxo de Agradecimento
      thanks: {
        keywords: ['obrigado', 'thanks', 'thank you', 'valeu', 'vlw', 'grato', 'grateful'],
        priority: 1,
        flow: 'thanks'
      }
    };

    // Encontrar o fluxo com maior prioridade
    let bestFlow = null;
    let bestPriority = 0;

    for (const [key, flow] of Object.entries(flows)) {
      const matchCount = flow.keywords.filter(keyword => 
        lowerMessage.includes(keyword)
      ).length;
      
      if (matchCount > 0 && flow.priority > bestPriority) {
        bestFlow = flow.flow;
        bestPriority = flow.priority;
      }
    }

    return bestFlow || 'general';
  }

  // Obter resposta baseada no fluxo
  getFlowResponse(flow, message, context = {}) {
    const responses = {
      greeting: this.getGreetingFlow(message, context),
      projects: this.getProjectsFlow(message, context),
      experience: this.getExperienceFlow(message, context),
      technologies: this.getTechnologiesFlow(message, context),
      contact: this.getContactFlow(message, context),
      collaboration: this.getCollaborationFlow(message, context),
      education: this.getEducationFlow(message, context),
      hobbies: this.getHobbiesFlow(message, context),
      compliments: this.getComplimentsFlow(message, context),
      thanks: this.getThanksFlow(message, context),
      general: this.getGeneralFlow(message, context)
    };

    return responses[flow] || responses.general;
  }

  // Fluxo de Apresentação
  getGreetingFlow(message, context) {
    const greetings = [
      {
        response: this.language === 'pt' 
          ? "Oi! 👋 Que bom te ver por aqui! Eu sou o Robson virtual. Como posso te ajudar hoje?"
          : "Hi! 👋 Great to see you here! I'm virtual Robson. How can I help you today?",
        nextActions: ['projects', 'experience', 'technologies', 'contact'],
        avatarState: 'waving'
      },
      {
        response: this.language === 'pt'
          ? "Olá! 😊 Bem-vindo ao meu portfólio! Que tal conversarmos sobre tecnologia?"
          : "Hello! 😊 Welcome to my portfolio! How about we chat about technology?",
        nextActions: ['technologies', 'projects', 'collaboration'],
        avatarState: 'happy'
      }
    ];

    return this.selectRandomResponse(greetings);
  }

  // Fluxo de Projetos
  getProjectsFlow(message, context) {
    const projectResponses = [
      {
        response: this.language === 'pt'
          ? "Ah, meus projetos! 😊 Tenho alguns bem legais! O Singulare Reab foi uma landing page para reabilitação infantil, o Avante Tech é um site institucional, e o Monemii é uma plataforma Agrotech. Qual te interessa mais?"
          : "Oh, my projects! 😊 I have some really cool ones! Singulare Reab was a landing page for child rehabilitation, Avante Tech is an institutional website, and Monemii is an Agrotech platform. Which one interests you more?",
        nextActions: ['singulare', 'avante', 'monemii', 'technologies'],
        avatarState: 'excited'
      },
      {
        response: this.language === 'pt'
          ? "Meus projetos são minha paixão! 🚀 Cada um tem uma história especial. Quer que eu te conte sobre algum específico ou prefere ver todos?"
          : "My projects are my passion! 🚀 Each one has a special story. Would you like me to tell you about a specific one or would you prefer to see them all?",
        nextActions: ['show_all', 'specific_project', 'technologies'],
        avatarState: 'talking'
      }
    ];

    return this.selectRandomResponse(projectResponses);
  }

  // Fluxo de Experiência
  getExperienceFlow(message, context) {
    const experienceResponses = [
      {
        response: this.language === 'pt'
          ? "Minha jornada tem sido incrível! 💼 Comecei na INOVE como bolsista, depois fui Diretor de Eventos, trabalhei na Avante Tech como Tech Lead, e agora estou no GREat como Full Stack Developer. Cada experiência me ensinou muito!"
          : "My journey has been incredible! 💼 I started at INOVE as a scholar, then became Events Director, worked at Avante Tech as Tech Lead, and now I'm at GREat as Full Stack Developer. Each experience taught me so much!",
        nextActions: ['inove', 'avante', 'great', 'skills'],
        avatarState: 'talking'
      },
      {
        response: this.language === 'pt'
          ? "Tenho bastante experiência! 🚀 Já trabalhei como Tech Lead, desenvolvi sites responsivos, criei APIs RESTful, e sempre busco aprender novas tecnologias. Que aspecto da minha experiência te interessa?"
          : "I have quite a bit of experience! 🚀 I've worked as Tech Lead, developed responsive websites, created RESTful APIs, and I'm always learning new technologies. What aspect of my experience interests you?",
        nextActions: ['leadership', 'development', 'technologies', 'learning'],
        avatarState: 'excited'
      }
    ];

    return this.selectRandomResponse(experienceResponses);
  }

  // Fluxo de Tecnologias
  getTechnologiesFlow(message, context) {
    const techResponses = [
      {
        response: this.language === 'pt'
          ? "Adoro tecnologia! 💻 Trabalho principalmente com React, Node.js, Python, MongoDB, Docker... Mas estou sempre aprendendo coisas novas! Qual tecnologia te interessa mais?"
          : "I love technology! 💻 I work mainly with React, Node.js, Python, MongoDB, Docker... But I'm always learning new things! Which technology interests you more?",
        nextActions: ['react', 'nodejs', 'python', 'mongodb', 'docker'],
        avatarState: 'excited'
      },
      {
        response: this.language === 'pt'
          ? "Tecnologia é minha paixão! 🚀 React para frontend, Node.js para backend, Python para automação, MongoDB para dados... Posso te contar sobre qualquer uma delas!"
          : "Technology is my passion! 🚀 React for frontend, Node.js for backend, Python for automation, MongoDB for data... I can tell you about any of them!",
        nextActions: ['frontend', 'backend', 'automation', 'database'],
        avatarState: 'talking'
      }
    ];

    return this.selectRandomResponse(techResponses);
  }

  // Fluxo de Contato
  getContactFlow(message, context) {
    const contactResponses = [
      {
        response: this.language === 'pt'
          ? "Que bom que quer falar comigo! 💬 Que tal conversarmos no WhatsApp? Lá posso te ajudar melhor e mostrar mais detalhes dos meus projetos!"
          : "Great that you want to talk to me! 💬 How about we chat on WhatsApp? There I can help you better and show more details about my projects!",
        nextActions: ['whatsapp', 'email', 'linkedin'],
        avatarState: 'talking',
        shouldOpenWhatsApp: true
      },
      {
        response: this.language === 'pt'
          ? "Adoro conversar! 😊 No WhatsApp posso te mostrar mais detalhes dos meus projetos e responder suas perguntas em tempo real!"
          : "I love chatting! 😊 On WhatsApp I can show you more details about my projects and answer your questions in real time!",
        nextActions: ['whatsapp', 'projects', 'experience'],
        avatarState: 'happy',
        shouldOpenWhatsApp: true
      }
    ];

    return this.selectRandomResponse(contactResponses);
  }

  // Fluxo de Colaboração
  getCollaborationFlow(message, context) {
    const collaborationResponses = [
      {
        response: this.language === 'pt'
          ? "Que legal que quer colaborar! 🤝 Adoro trabalhar em equipe e sempre busco novos desafios. Que tipo de projeto você tem em mente?"
          : "How cool that you want to collaborate! 🤝 I love working in teams and I'm always looking for new challenges. What kind of project do you have in mind?",
        nextActions: ['web_project', 'mobile_project', 'consulting', 'freelance'],
        avatarState: 'excited'
      },
      {
        response: this.language === 'pt'
          ? "Colaboração é fundamental! 💡 Já trabalhei em equipes grandes e pequenas, sempre focando em entregar o melhor resultado. Vamos conversar no WhatsApp sobre sua ideia?"
          : "Collaboration is fundamental! 💡 I've worked in large and small teams, always focusing on delivering the best result. Let's chat on WhatsApp about your idea?",
        nextActions: ['whatsapp', 'portfolio', 'experience'],
        avatarState: 'talking',
        shouldOpenWhatsApp: true
      }
    ];

    return this.selectRandomResponse(collaborationResponses);
  }

  // Fluxo de Educação
  getEducationFlow(message, context) {
    const educationResponses = [
      {
        response: this.language === 'pt'
          ? "Adoro compartilhar conhecimento! 📚 Posso te ajudar com React, Node.js, Python, ou qualquer tecnologia que eu domino. O que você gostaria de aprender?"
          : "I love sharing knowledge! 📚 I can help you with React, Node.js, Python, or any technology I master. What would you like to learn?",
        nextActions: ['react_tutorial', 'nodejs_tutorial', 'python_tutorial', 'general_learning'],
        avatarState: 'talking'
      },
      {
        response: this.language === 'pt'
          ? "Educação é transformação! 🎓 Já mentorei várias pessoas e adoro ver o crescimento. Que tal conversarmos sobre seus objetivos de aprendizado?"
          : "Education is transformation! 🎓 I've mentored several people and I love seeing growth. How about we talk about your learning goals?",
        nextActions: ['mentorship', 'goals', 'whatsapp'],
        avatarState: 'happy'
      }
    ];

    return this.selectRandomResponse(educationResponses);
  }

  // Fluxo de Hobbies
  getHobbiesFlow(message, context) {
    const hobbiesResponses = [
      {
        response: this.language === 'pt'
          ? "Fora da programação, adoro ler sobre tecnologia, jogar videogames, e sempre estou experimentando novas ferramentas! 🎮 E você, quais são seus hobbies?"
          : "Outside of programming, I love reading about technology, playing video games, and I'm always experimenting with new tools! 🎮 What about you, what are your hobbies?",
        nextActions: ['gaming', 'reading', 'tools', 'user_hobbies'],
        avatarState: 'happy'
      },
      {
        response: this.language === 'pt'
          ? "Amo aprender coisas novas! 💡 Sempre estou testando novas tecnologias, lendo documentação, e criando projetos pessoais. É assim que me mantenho atualizado!"
          : "I love learning new things! 💡 I'm always testing new technologies, reading documentation, and creating personal projects. That's how I stay updated!",
        nextActions: ['learning', 'projects', 'technologies'],
        avatarState: 'excited'
      }
    ];

    return this.selectRandomResponse(hobbiesResponses);
  }

  // Fluxo de Elogios
  getComplimentsFlow(message, context) {
    const complimentResponses = [
      {
        response: this.language === 'pt'
          ? "Obrigado! 😊 Fico muito feliz que tenha gostado! Isso me motiva ainda mais a continuar aprendendo e criando coisas incríveis!"
          : "Thank you! 😊 I'm very happy that you liked it! This motivates me even more to keep learning and creating amazing things!",
        nextActions: ['projects', 'experience', 'technologies'],
        avatarState: 'happy'
      },
      {
        response: this.language === 'pt'
          ? "Que gentil! 🥰 Suas palavras significam muito para mim! Que tal conversarmos mais no WhatsApp? Adoraria te conhecer melhor!"
          : "How kind! 🥰 Your words mean a lot to me! How about we chat more on WhatsApp? I'd love to get to know you better!",
        nextActions: ['whatsapp', 'projects', 'collaboration'],
        avatarState: 'excited',
        shouldOpenWhatsApp: true
      }
    ];

    return this.selectRandomResponse(complimentResponses);
  }

  // Fluxo de Agradecimento
  getThanksFlow(message, context) {
    const thanksResponses = [
      {
        response: this.language === 'pt'
          ? "De nada! 😊 Fico feliz em ajudar! Precisa de mais alguma coisa ou quer conversar sobre algum projeto específico?"
          : "You're welcome! 😊 I'm happy to help! Need anything else or want to talk about a specific project?",
        nextActions: ['projects', 'experience', 'technologies', 'contact'],
        avatarState: 'happy'
      },
      {
        response: this.language === 'pt'
          ? "Imagina! 💙 Foi um prazer te ajudar! Se tiver mais dúvidas, estarei aqui. Que tal conversarmos no WhatsApp para uma conversa mais detalhada?"
          : "Don't mention it! 💙 It was a pleasure helping you! If you have more questions, I'll be here. How about we chat on WhatsApp for a more detailed conversation?",
        nextActions: ['whatsapp', 'projects', 'collaboration'],
        avatarState: 'talking',
        shouldOpenWhatsApp: true
      }
    ];

    return this.selectRandomResponse(thanksResponses);
  }

  // Fluxo Geral
  getGeneralFlow(message, context) {
    const generalResponses = [
      {
        response: this.language === 'pt'
          ? "Interessante pergunta! 🤔 Que tal conversarmos no WhatsApp para eu te ajudar melhor? Lá posso dar respostas mais detalhadas!"
          : "Interesting question! 🤔 How about we chat on WhatsApp so I can help you better? There I can give more detailed answers!",
        nextActions: ['whatsapp', 'projects', 'experience'],
        avatarState: 'thinking',
        shouldOpenWhatsApp: true
      },
      {
        response: this.language === 'pt'
          ? "Boa pergunta! 💭 No WhatsApp posso te dar uma resposta mais completa e personalizada. Que tal conversarmos lá?"
          : "Good question! 💭 On WhatsApp I can give you a more complete and personalized answer. How about we chat there?",
        nextActions: ['whatsapp', 'technologies', 'collaboration'],
        avatarState: 'thinking',
        shouldOpenWhatsApp: true
      }
    ];

    return this.selectRandomResponse(generalResponses);
  }

  // Selecionar resposta aleatória
  selectRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Processar mensagem completa
  processMessage(message, context = {}) {
    const flow = this.detectFlow(message);
    const response = this.getFlowResponse(flow, message, context);
    
    // Atualizar contexto
    this.currentFlow = flow;
    this.flowHistory.push({ flow, message, timestamp: new Date() });
    this.conversationContext = { ...this.conversationContext, ...context };

    return {
      ...response,
      flow,
      context: this.conversationContext
    };
  }

  // Obter sugestões baseadas no fluxo atual
  getFlowSuggestions(flow) {
    const suggestions = {
      greeting: ['Ver Projetos', 'Sobre Mim', 'Tecnologias', 'Contato'],
      projects: ['Singulare', 'Avante Tech', 'Monemii', 'Tecnologias'],
      experience: ['INOVE', 'Avante Tech', 'GREat', 'Habilidades'],
      technologies: ['React', 'Node.js', 'Python', 'MongoDB'],
      contact: ['WhatsApp', 'Email', 'LinkedIn', 'Projetos'],
      collaboration: ['Projetos', 'Experiência', 'WhatsApp', 'Portfólio'],
      education: ['Tutoriais', 'Mentoria', 'Objetivos', 'WhatsApp'],
      hobbies: ['Gaming', 'Leitura', 'Ferramentas', 'Projetos'],
      compliments: ['Projetos', 'Experiência', 'WhatsApp', 'Colaboração'],
      thanks: ['Projetos', 'Experiência', 'Tecnologias', 'WhatsApp'],
      general: ['WhatsApp', 'Projetos', 'Experiência', 'Tecnologias']
    };

    return suggestions[flow] || suggestions.general;
  }

  // Obter estado do avatar baseado no fluxo
  getAvatarState(flow, response) {
    if (response.avatarState) return response.avatarState;
    
    const stateMap = {
      greeting: 'waving',
      projects: 'excited',
      experience: 'talking',
      technologies: 'excited',
      contact: 'talking',
      collaboration: 'excited',
      education: 'talking',
      hobbies: 'happy',
      compliments: 'happy',
      thanks: 'happy',
      general: 'thinking'
    };

    return stateMap[flow] || 'thinking';
  }
}

export default ConversationFlows;
