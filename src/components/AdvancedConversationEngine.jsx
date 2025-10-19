class AdvancedConversationEngine {
  constructor(language = 'pt') {
    this.language = language;
    this.conversationHistory = [];
    this.currentContext = {};
    this.userPreferences = {};
    this.conversationFlow = 'greeting';
    this.lastTopic = null;
    this.conversationDepth = 0;
  }

  // Detectar intenção com múltiplas camadas
  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // Verificar se é uma mensagem muito curta ou sem sentido
    if (message.length < 2 || /^[0-9\s]+$/.test(message) || /^[^a-zA-ZáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ]+$/.test(message)) {
      return 'unclear';
    }
    
    // Verificar se são apenas caracteres especiais ou emojis
    if (/^[^\w\s]+$/.test(message) && message.length < 5) {
      return 'unclear';
    }
    
    // Detecção simples para cumprimentos
    if (lowerMessage === 'olá' || lowerMessage === 'oi' || lowerMessage === 'hello' || lowerMessage === 'hi') {
      return 'greeting';
    }
    
    // Palavras-chave com pesos
    const intentPatterns = {
      // Cumprimentos e apresentação
      greeting: {
        keywords: ['oi', 'olá', 'hello', 'hi', 'hey', 'e aí', 'eai', 'bom dia', 'boa tarde', 'boa noite', 'como vai', 'tudo bem', 'ola', 'oii', 'oiii', 'ola', 'olaa'],
        weight: 15,
        patterns: [/^(oi|olá|hello|hi|hey)$/i, /^(bom dia|boa tarde|boa noite)/i, /^o+i$/i, /^olá+$/i]
      },
      
      // Projetos específicos
      projects: {
        keywords: ['projeto', 'project', 'trabalho', 'work', 'portfolio', 'portfólio', 'criar', 'desenvolver', 'site', 'aplicação'],
        weight: 9,
        patterns: [/projeto/i, /portfolio/i, /trabalho/i]
      },
      
      // Projetos específicos
      singulare: {
        keywords: ['singulare', 'reab', 'reabilitação', 'infantil', 'criança', 'terapia'],
        weight: 8,
        patterns: [/singulare/i, /reab/i, /reabilitação/i]
      },
      
      avante: {
        keywords: ['avante', 'tech', 'institucional', 'empresa', 'corporativo'],
        weight: 8,
        patterns: [/avante/i, /institucional/i]
      },
      
      monemii: {
        keywords: ['monemii', 'agrotech', 'agro', 'campo', 'agricultura', 'rural'],
        weight: 8,
        patterns: [/monemii/i, /agrotech/i, /agro/i]
      },
      
      // Experiência profissional
      experience: {
        keywords: ['experiência', 'experience', 'carreira', 'career', 'trabalho', 'job', 'empresa', 'company', 'cv', 'curriculum'],
        weight: 7,
        patterns: [/experiência/i, /carreira/i, /trabalho/i]
      },
      
      // Empresas específicas
      inove: {
        keywords: ['inove', 'bolsista', 'eventos', 'acadêmico', 'universidade'],
        weight: 7,
        patterns: [/inove/i, /bolsista/i, /eventos/i]
      },
      
      great: {
        keywords: ['great', 'grat', 'atual', 'presente', 'agora'],
        weight: 7,
        patterns: [/great/i, /atual/i, /presente/i]
      },
      
      // Tecnologias
      technologies: {
        keywords: ['tecnologia', 'technology', 'tech', 'linguagem', 'framework', 'ferramenta', 'stack'],
        weight: 6,
        patterns: [/tecnologia/i, /tech/i, /linguagem/i]
      },
      
      // Tecnologias específicas
      react: {
        keywords: ['react', 'reactjs', 'frontend', 'interface', 'ui', 'componente'],
        weight: 6,
        patterns: [/react/i, /frontend/i, /interface/i]
      },
      
      nodejs: {
        keywords: ['node', 'nodejs', 'backend', 'api', 'servidor'],
        weight: 6,
        patterns: [/node/i, /backend/i, /api/i]
      },
      
      python: {
        keywords: ['python', 'django', 'flask', 'automação', 'script'],
        weight: 6,
        patterns: [/python/i, /automação/i, /script/i]
      },
      
      // Contato e colaboração
      contact: {
        keywords: ['contato', 'contact', 'falar', 'talk', 'conversar', 'chat', 'whatsapp', 'email', 'telefone', 'phone'],
        weight: 5,
        patterns: [/contato/i, /falar/i, /whatsapp/i]
      },
      
      collaboration: {
        keywords: ['colaborar', 'collaborate', 'trabalhar', 'work together', 'parceria', 'partnership', 'freelance', 'proposta'],
        weight: 5,
        patterns: [/colaborar/i, /trabalhar/i, /parceria/i]
      },
      
      // Educação e mentoria
      education: {
        keywords: ['estudar', 'study', 'curso', 'course', 'aprender', 'learn', 'tutorial', 'ensinar', 'teach', 'mentoria', 'mentorship'],
        weight: 4,
        patterns: [/estudar/i, /curso/i, /aprender/i]
      },
      
      // Hobbies e interesses
      hobbies: {
        keywords: ['hobby', 'interesse', 'interest', 'gosto', 'like', 'fazer', 'do', 'tempo livre', 'free time', 'diversão', 'fun'],
        weight: 3,
        patterns: [/hobby/i, /interesse/i, /gosto/i]
      },
      
      // Elogios e agradecimentos
      compliments: {
        keywords: ['parabéns', 'congratulations', 'legal', 'cool', 'incrível', 'amazing', 'bom', 'good', 'ótimo', 'great', 'fantástico', 'fantastic', 'excelente', 'excellent'],
        weight: 2,
        patterns: [/parabéns/i, /legal/i, /incrível/i, /bom/i, /ótimo/i]
      },
      
      thanks: {
        keywords: ['obrigado', 'thanks', 'thank you', 'valeu', 'vlw', 'grato', 'grateful', 'obrigada'],
        weight: 1,
        patterns: [/obrigado/i, /thanks/i, /valeu/i]
      },
      
      // Perguntas sobre preços e orçamentos
      pricing: {
        keywords: ['preço', 'price', 'custo', 'cost', 'valor', 'value', 'orçamento', 'budget', 'quanto', 'how much'],
        weight: 4,
        patterns: [/preço/i, /custo/i, /orçamento/i, /quanto/i]
      },
      
      // Perguntas sobre tempo
      timeline: {
        keywords: ['tempo', 'time', 'prazo', 'deadline', 'quando', 'when', 'quanto tempo', 'how long', 'rapidamente', 'quickly'],
        weight: 4,
        patterns: [/tempo/i, /prazo/i, /quando/i, /quanto tempo/i]
      },
      
      // Perguntas sobre localização
      location: {
        keywords: ['onde', 'where', 'local', 'localização', 'location', 'cidade', 'city', 'estado', 'state', 'brasil', 'brazil'],
        weight: 3,
        patterns: [/onde/i, /local/i, /cidade/i]
      }
    };

    // Calcular score para cada intenção
    const intentScores = {};
    
    for (const [intent, config] of Object.entries(intentPatterns)) {
      let score = 0;
      
      // Verificar palavras-chave
      for (const keyword of config.keywords) {
        if (lowerMessage.includes(keyword)) {
          score += config.weight;
        }
      }
      
      // Verificar padrões regex
      for (const pattern of config.patterns) {
        if (pattern.test(message)) {
          score += config.weight * 1.5; // Regex tem peso maior
        }
      }
      
      intentScores[intent] = score;
    }

    // Retornar intenção com maior score
    const bestIntent = Object.entries(intentScores)
      .sort(([,a], [,b]) => b - a)[0];
    
    console.log('Intent detection:', { message, intentScores, bestIntent }); // Debug log
    
    // Se o score for muito baixo, considerar como mensagem não clara
    if (!bestIntent || bestIntent[1] < 1) {
      return 'unclear';
    }
    
    return bestIntent[0];
  }

  // Obter resposta baseada na intenção e contexto
  getResponse(intent, message, context = {}) {
    const responses = this.getResponsesByIntent(intent);
    const contextualResponse = this.getContextualResponse(intent, message, context);
    
    // Combinar resposta baseada em intenção com contexto
    if (contextualResponse) {
      return contextualResponse;
    }
    
    // Selecionar resposta aleatória se não houver contexto específico
    return this.selectRandomResponse(responses);
  }

  // Respostas por intenção
  getResponsesByIntent(intent) {
    const responses = {
      greeting: [
        {
          response: this.language === 'pt' 
            ? "Oi! Que bom te ver por aqui! Eu sou o Robson virtual. Como posso te ajudar hoje?"
            : "Hi! Great to see you here! I'm virtual Robson. How can I help you today?",
          suggestions: ['Projetos', 'Experiência', 'Tecnologias', 'Contato'],
          avatarState: 'waving',
          nextFlow: 'main_menu'
        },
        {
          response: this.language === 'pt'
            ? "Olá! Bem-vindo ao meu portfólio! Que tal conversarmos sobre tecnologia?"
            : "Hello! Welcome to my portfolio! How about we chat about technology?",
          suggestions: ['Tecnologias', 'Projetos', 'Colaboração'],
          avatarState: 'happy',
          nextFlow: 'technology_focus'
        },
        {
          response: this.language === 'pt'
            ? "Oi! Que tal conversarmos sobre meus projetos e experiência? Tenho muito para te mostrar!"
            : "Hi! How about we chat about my projects and experience? I have a lot to show you!",
          suggestions: ['Projetos', 'Experiência', 'WhatsApp'],
          avatarState: 'excited',
          nextFlow: 'projects_focus'
        }
      ],

      projects: [
        {
          response: this.language === 'pt'
            ? "Ah, meus projetos! 😊 Tenho alguns bem legais! O Singulare Reab foi uma landing page para reabilitação infantil, o Avante Tech é um site institucional, e o Monemii é uma plataforma Agrotech. Qual te interessa mais?"
            : "Oh, my projects! 😊 I have some really cool ones! Singulare Reab was a landing page for child rehabilitation, Avante Tech is an institutional website, and Monemii is an Agrotech platform. Which one interests you more?",
          suggestions: ['Singulare', 'Avante Tech', 'Monemii', 'Tecnologias'],
          avatarState: 'excited',
          nextFlow: 'project_selection'
        },
        {
          response: this.language === 'pt'
            ? "Meus projetos são minha paixão! 🚀 Cada um tem uma história especial. Quer que eu te conte sobre algum específico ou prefere ver todos?"
            : "My projects are my passion! 🚀 Each one has a special story. Would you like me to tell you about a specific one or would you prefer to see them all?",
          suggestions: ['Ver Todos', 'Singulare', 'Avante Tech', 'Monemii'],
          avatarState: 'talking',
          nextFlow: 'project_details'
        }
      ],

      singulare: [
        {
          response: this.language === 'pt'
            ? "O Singulare Reab! 🏥 Foi um projeto muito especial! Desenvolvi uma landing page completa para reabilitação infantil, com foco na experiência do usuário e acessibilidade. Usamos React, Node.js e MongoDB. Foi incrível ver o impacto positivo na vida das crianças!"
            : "Singulare Reab! 🏥 It was a very special project! I developed a complete landing page for child rehabilitation, focusing on user experience and accessibility. We used React, Node.js and MongoDB. It was amazing to see the positive impact on children's lives!",
          suggestions: ['Tecnologias', 'Experiência', 'Outros Projetos', 'WhatsApp'],
          avatarState: 'excited',
          nextFlow: 'project_technologies'
        }
      ],

      avante: [
        {
          response: this.language === 'pt'
            ? "O Avante Tech! 💼 Um site institucional completo que desenvolvi! Focamos em apresentar os serviços da empresa de forma profissional e moderna. Usei React, Next.js, Tailwind CSS e integração com APIs. O resultado foi um site responsivo e performático!"
            : "Avante Tech! 💼 A complete institutional website I developed! We focused on presenting the company's services in a professional and modern way. I used React, Next.js, Tailwind CSS and API integration. The result was a responsive and performant website!",
          suggestions: ['Tecnologias', 'Experiência', 'Outros Projetos', 'WhatsApp'],
          avatarState: 'talking',
          nextFlow: 'project_technologies'
        }
      ],

      monemii: [
        {
          response: this.language === 'pt'
            ? "O Monemii! 🌾 Uma plataforma Agrotech fascinante! Desenvolvi uma solução digital para o setor agrícola, conectando tecnologia de ponta ao campo. Usei React Native para mobile, Node.js para backend, e integração com sistemas de IoT. Foi desafiador e muito gratificante!"
            : "Monemii! 🌾 A fascinating Agrotech platform! I developed a digital solution for the agricultural sector, connecting cutting-edge technology to the field. I used React Native for mobile, Node.js for backend, and IoT systems integration. It was challenging and very rewarding!",
          suggestions: ['Tecnologias', 'Experiência', 'Outros Projetos', 'WhatsApp'],
          avatarState: 'excited',
          nextFlow: 'project_technologies'
        }
      ],

      experience: [
        {
          response: this.language === 'pt'
            ? "Minha jornada tem sido incrível! 💼 Comecei na INOVE como bolsista, depois fui Diretor de Eventos, trabalhei na Avante Tech como Tech Lead, e agora estou no GREat como Full Stack Developer. Cada experiência me ensinou muito!"
            : "My journey has been incredible! 💼 I started at INOVE as a scholar, then became Events Director, worked at Avante Tech as Tech Lead, and now I'm at GREat as Full Stack Developer. Each experience taught me so much!",
          suggestions: ['INOVE', 'Avante Tech', 'GREat', 'Habilidades'],
          avatarState: 'talking',
          nextFlow: 'experience_details'
        },
        {
          response: this.language === 'pt'
            ? "Tenho bastante experiência! 🚀 Já trabalhei como Tech Lead, desenvolvi sites responsivos, criei APIs RESTful, e sempre busco aprender novas tecnologias. Que aspecto da minha experiência te interessa?"
            : "I have quite a bit of experience! 🚀 I've worked as Tech Lead, developed responsive websites, created RESTful APIs, and I'm always learning new technologies. What aspect of my experience interests you?",
          suggestions: ['Liderança', 'Desenvolvimento', 'Tecnologias', 'Aprendizado'],
          avatarState: 'excited',
          nextFlow: 'experience_skills'
        }
      ],

      inove: [
        {
          response: this.language === 'pt'
            ? "A INOVE! 🎓 Foi onde tudo começou! Como bolsista, executei eventos acadêmicos, criei artes visuais e desenvolvi estratégias de engajamento. Depois como Diretor de Eventos, planejei e executei capacitações profissionais. Foi uma experiência transformadora!"
            : "INOVE! 🎓 That's where it all started! As a scholar, I executed academic events, created visual arts and developed engagement strategies. Then as Events Director, I planned and executed professional training. It was a transformative experience!",
          suggestions: ['Eventos', 'Artes Visuais', 'Liderança', 'Próxima Experiência'],
          avatarState: 'happy',
          nextFlow: 'inove_details'
        }
      ],

      great: [
        {
          response: this.language === 'pt'
            ? "O GREat! 🚀 Minha experiência atual! Estou desenvolvendo componentes reutilizáveis em React e React Native, mantendo documentação eficiente e implementando funcionalidades full-stack. É incrível trabalhar com tecnologias modernas!"
            : "GREat! 🚀 My current experience! I'm developing reusable components in React and React Native, maintaining efficient documentation and implementing full-stack features. It's amazing to work with modern technologies!",
          suggestions: ['React', 'React Native', 'Full Stack', 'Tecnologias'],
          avatarState: 'excited',
          nextFlow: 'great_details'
        }
      ],

      technologies: [
        {
          response: this.language === 'pt'
            ? "Adoro tecnologia! 💻 Trabalho principalmente com React, Node.js, Python, MongoDB, Docker... Mas estou sempre aprendendo coisas novas! Qual tecnologia te interessa mais?"
            : "I love technology! 💻 I work mainly with React, Node.js, Python, MongoDB, Docker... But I'm always learning new things! Which technology interests you more?",
          suggestions: ['React', 'Node.js', 'Python', 'MongoDB'],
          avatarState: 'excited',
          nextFlow: 'technology_selection'
        },
        {
          response: this.language === 'pt'
            ? "Tecnologia é minha paixão! 🚀 React para frontend, Node.js para backend, Python para automação, MongoDB para dados... Posso te contar sobre qualquer uma delas!"
            : "Technology is my passion! 🚀 React for frontend, Node.js for backend, Python for automation, MongoDB for data... I can tell you about any of them!",
          suggestions: ['Frontend', 'Backend', 'Automação', 'Banco de Dados'],
          avatarState: 'talking',
          nextFlow: 'technology_categories'
        }
      ],

      react: [
        {
          response: this.language === 'pt'
            ? "React! ⚛️ Minha paixão! Desenvolvo interfaces modernas e responsivas, uso hooks, context API, e sempre busco as melhores práticas. Já criei componentes reutilizáveis, gerenciamento de estado com Redux, e integração com APIs. É incrível ver a evolução do React!"
            : "React! ⚛️ My passion! I develop modern and responsive interfaces, use hooks, context API, and always seek best practices. I've created reusable components, state management with Redux, and API integration. It's amazing to see React's evolution!",
          suggestions: ['Hooks', 'Context API', 'Redux', 'Componentes'],
          avatarState: 'excited',
          nextFlow: 'react_details'
        }
      ],

      nodejs: [
        {
          response: this.language === 'pt'
            ? "Node.js! 🟢 Poderoso para backend! Desenvolvo APIs RESTful, integração com bancos de dados, autenticação JWT, e sempre foco em performance e escalabilidade. Já trabalhei com Express, Socket.io, e microserviços!"
            : "Node.js! 🟢 Powerful for backend! I develop RESTful APIs, database integration, JWT authentication, and always focus on performance and scalability. I've worked with Express, Socket.io, and microservices!",
          suggestions: ['APIs', 'Autenticação', 'Microserviços', 'Performance'],
          avatarState: 'talking',
          nextFlow: 'nodejs_details'
        }
      ],

      python: [
        {
          response: this.language === 'pt'
            ? "Python! 🐍 Versátil e poderoso! Uso para automação, análise de dados, scripts, e desenvolvimento web com Django/Flask. Já criei bots, integrações com APIs, e soluções de automação que economizaram muito tempo!"
            : "Python! 🐍 Versatile and powerful! I use it for automation, data analysis, scripts, and web development with Django/Flask. I've created bots, API integrations, and automation solutions that saved a lot of time!",
          suggestions: ['Automação', 'Análise de Dados', 'Django', 'Flask'],
          avatarState: 'excited',
          nextFlow: 'python_details'
        }
      ],

      contact: [
        {
          response: this.language === 'pt'
            ? "Que bom que quer falar comigo! 💬 Que tal conversarmos no WhatsApp? Lá posso te ajudar melhor e mostrar mais detalhes dos meus projetos!"
            : "Great that you want to talk to me! 💬 How about we chat on WhatsApp? There I can help you better and show more details about my projects!",
          suggestions: ['WhatsApp', 'Email', 'LinkedIn', 'Projetos'],
          avatarState: 'talking',
          nextFlow: 'contact_methods',
          shouldOpenWhatsApp: true
        },
        {
          response: this.language === 'pt'
            ? "Adoro conversar! 😊 No WhatsApp posso te mostrar mais detalhes dos meus projetos e responder suas perguntas em tempo real!"
            : "I love chatting! 😊 On WhatsApp I can show you more details about my projects and answer your questions in real time!",
          suggestions: ['WhatsApp', 'Projetos', 'Experiência', 'Colaboração'],
          avatarState: 'happy',
          nextFlow: 'whatsapp_focus',
          shouldOpenWhatsApp: true
        }
      ],

      collaboration: [
        {
          response: this.language === 'pt'
            ? "Que legal que quer colaborar! 🤝 Adoro trabalhar em equipe e sempre busco novos desafios. Que tipo de projeto você tem em mente?"
            : "How cool that you want to collaborate! 🤝 I love working in teams and I'm always looking for new challenges. What kind of project do you have in mind?",
          suggestions: ['Projeto Web', 'Projeto Mobile', 'Consultoria', 'Freelance'],
          avatarState: 'excited',
          nextFlow: 'collaboration_types'
        },
        {
          response: this.language === 'pt'
            ? "Colaboração é fundamental! 💡 Já trabalhei em equipes grandes e pequenas, sempre focando em entregar o melhor resultado. Vamos conversar no WhatsApp sobre sua ideia?"
            : "Collaboration is fundamental! 💡 I've worked in large and small teams, always focusing on delivering the best result. Let's chat on WhatsApp about your idea?",
          suggestions: ['WhatsApp', 'Portfólio', 'Experiência', 'Tecnologias'],
          avatarState: 'talking',
          nextFlow: 'whatsapp_collaboration',
          shouldOpenWhatsApp: true
        }
      ],

      education: [
        {
          response: this.language === 'pt'
            ? "Adoro compartilhar conhecimento! 📚 Posso te ajudar com React, Node.js, Python, ou qualquer tecnologia que eu domino. O que você gostaria de aprender?"
            : "I love sharing knowledge! 📚 I can help you with React, Node.js, Python, or any technology I master. What would you like to learn?",
          suggestions: ['Tutorial React', 'Tutorial Node.js', 'Tutorial Python', 'Mentoria'],
          avatarState: 'talking',
          nextFlow: 'education_topics'
        },
        {
          response: this.language === 'pt'
            ? "Educação é transformação! 🎓 Já mentorei várias pessoas e adoro ver o crescimento. Que tal conversarmos sobre seus objetivos de aprendizado?"
            : "Education is transformation! 🎓 I've mentored several people and I love seeing growth. How about we talk about your learning goals?",
          suggestions: ['Objetivos', 'Mentoria', 'WhatsApp', 'Projetos'],
          avatarState: 'happy',
          nextFlow: 'education_goals'
        }
      ],

      hobbies: [
        {
          response: this.language === 'pt'
            ? "Fora da programação, adoro ler sobre tecnologia, jogar videogames, e sempre estou experimentando novas ferramentas! 🎮 E você, quais são seus hobbies?"
            : "Outside of programming, I love reading about technology, playing video games, and I'm always experimenting with new tools! 🎮 What about you, what are your hobbies?",
          suggestions: ['Gaming', 'Leitura', 'Ferramentas', 'Seus Hobbies'],
          avatarState: 'happy',
          nextFlow: 'hobbies_exchange'
        },
        {
          response: this.language === 'pt'
            ? "Amo aprender coisas novas! 💡 Sempre estou testando novas tecnologias, lendo documentação, e criando projetos pessoais. É assim que me mantenho atualizado!"
            : "I love learning new things! 💡 I'm always testing new technologies, reading documentation, and creating personal projects. That's how I stay updated!",
          suggestions: ['Aprendizado', 'Projetos', 'Tecnologias', 'WhatsApp'],
          avatarState: 'excited',
          nextFlow: 'learning_focus'
        }
      ],

      compliments: [
        {
          response: this.language === 'pt'
            ? "Obrigado! 😊 Fico muito feliz que tenha gostado! Isso me motiva ainda mais a continuar aprendendo e criando coisas incríveis!"
            : "Thank you! 😊 I'm very happy that you liked it! This motivates me even more to keep learning and creating amazing things!",
          suggestions: ['Projetos', 'Experiência', 'Tecnologias', 'Colaboração'],
          avatarState: 'happy',
          nextFlow: 'compliment_response'
        },
        {
          response: this.language === 'pt'
            ? "Que gentil! 🥰 Suas palavras significam muito para mim! Que tal conversarmos mais no WhatsApp? Adoraria te conhecer melhor!"
            : "How kind! 🥰 Your words mean a lot to me! How about we chat more on WhatsApp? I'd love to get to know you better!",
          suggestions: ['WhatsApp', 'Projetos', 'Colaboração', 'Experiência'],
          avatarState: 'excited',
          nextFlow: 'whatsapp_connection',
          shouldOpenWhatsApp: true
        }
      ],

      thanks: [
        {
          response: this.language === 'pt'
            ? "De nada! 😊 Fico feliz em ajudar! Precisa de mais alguma coisa ou quer conversar sobre algum projeto específico?"
            : "You're welcome! 😊 I'm happy to help! Need anything else or want to talk about a specific project?",
          suggestions: ['Projetos', 'Experiência', 'Tecnologias', 'Contato'],
          avatarState: 'happy',
          nextFlow: 'thanks_response'
        },
        {
          response: this.language === 'pt'
            ? "Imagina! 💙 Foi um prazer te ajudar! Se tiver mais dúvidas, estarei aqui. Que tal conversarmos no WhatsApp para uma conversa mais detalhada?"
            : "Don't mention it! 💙 It was a pleasure helping you! If you have more questions, I'll be here. How about we chat on WhatsApp for a more detailed conversation?",
          suggestions: ['WhatsApp', 'Projetos', 'Colaboração', 'Tecnologias'],
          avatarState: 'talking',
          nextFlow: 'whatsapp_detailed',
          shouldOpenWhatsApp: true
        }
      ],

      pricing: [
        {
          response: this.language === 'pt'
            ? "Ótima pergunta! 💰 Cada projeto é único, então os valores variam conforme complexidade, prazo e tecnologias. Que tal conversarmos no WhatsApp para eu entender melhor suas necessidades e dar um orçamento personalizado?"
            : "Great question! 💰 Each project is unique, so values vary according to complexity, deadline and technologies. How about we chat on WhatsApp so I can better understand your needs and give you a personalized quote?",
          suggestions: ['WhatsApp', 'Projetos', 'Tecnologias', 'Prazos'],
          avatarState: 'talking',
          nextFlow: 'pricing_discussion',
          shouldOpenWhatsApp: true
        }
      ],

      timeline: [
        {
          response: this.language === 'pt'
            ? "Boa pergunta! ⏰ O prazo depende do tipo e complexidade do projeto. Sites simples podem levar 1-2 semanas, aplicações mais complexas 1-3 meses. Que tal conversarmos no WhatsApp para eu entender melhor seu projeto?"
            : "Good question! ⏰ The deadline depends on the type and complexity of the project. Simple websites can take 1-2 weeks, more complex applications 1-3 months. How about we chat on WhatsApp so I can better understand your project?",
          suggestions: ['WhatsApp', 'Projetos', 'Complexidade', 'Tecnologias'],
          avatarState: 'thinking',
          nextFlow: 'timeline_discussion',
          shouldOpenWhatsApp: true
        }
      ],

      location: [
        {
          response: this.language === 'pt'
            ? "Sou do Brasil! 🇧🇷 Trabalho remotamente e já colaborei com equipes de várias partes do mundo. A tecnologia nos conecta independente da localização! E você, de onde é?"
            : "I'm from Brazil! 🇧🇷 I work remotely and have already collaborated with teams from various parts of the world. Technology connects us regardless of location! What about you, where are you from?",
          suggestions: ['Remoto', 'Colaboração', 'Tecnologias', 'Seu Local'],
          avatarState: 'happy',
          nextFlow: 'location_exchange'
        }
      ],

      general: [
        {
          response: this.language === 'pt'
            ? "Hmm, não entendi muito bem. Mas tudo bem! Que tal eu te mostrar algumas opções do que posso te ajudar?"
            : "Hmm, I didn't understand very well. But that's okay! How about I show you some options of what I can help you with?",
          suggestions: ['Projetos', 'Experiência', 'Tecnologias', 'Contato'],
          avatarState: 'thinking',
          nextFlow: 'clarification_menu'
        },
        {
          response: this.language === 'pt'
            ? "Desculpe, não consegui entender. Mas posso te ajudar com várias coisas! Que tal escolher um tópico?"
            : "Sorry, I couldn't understand. But I can help you with several things! How about choosing a topic?",
          suggestions: ['Ver Projetos', 'Minha Experiência', 'Tecnologias', 'Falar no WhatsApp'],
          avatarState: 'thinking',
          nextFlow: 'topic_selection'
        },
        {
          response: this.language === 'pt'
            ? "Não entendi, mas tudo bem! Posso te ajudar com meus projetos, experiência profissional, tecnologias que uso, ou podemos conversar no WhatsApp. O que te interessa?"
            : "I didn't understand, but that's okay! I can help you with my projects, professional experience, technologies I use, or we can chat on WhatsApp. What interests you?",
          suggestions: ['Projetos', 'Experiência', 'Tecnologias', 'WhatsApp'],
          avatarState: 'thinking',
          nextFlow: 'help_menu'
        }
      ],

      // Fluxo para quando não entende nada
      unclear: [
        {
          response: this.language === 'pt'
            ? "Ops! Não entendi o que você quis dizer. Mas posso te ajudar com várias coisas! Que tal escolher uma opção?"
            : "Oops! I didn't understand what you meant. But I can help you with several things! How about choosing an option?",
          suggestions: ['Projetos', 'Experiência', 'Tecnologias', 'Contato'],
          avatarState: 'thinking',
          nextFlow: 'help_menu'
        },
        {
          response: this.language === 'pt'
            ? "Desculpe, não consegui processar sua mensagem. Mas posso te mostrar o que sei fazer! Que tal explorar?"
            : "Sorry, I couldn't process your message. But I can show you what I know how to do! How about exploring?",
          suggestions: ['Ver Projetos', 'Minha Carreira', 'Stack Técnico', 'Conversar'],
          avatarState: 'thinking',
          nextFlow: 'exploration_menu'
        }
      ],

      // Fluxo de ajuda e direcionamento
      help_menu: [
        {
          response: this.language === 'pt'
            ? "Perfeito! Posso te ajudar com várias coisas. Escolha o que mais te interessa:"
            : "Perfect! I can help you with several things. Choose what interests you most:",
          suggestions: ['Meus Projetos', 'Minha Experiência', 'Tecnologias', 'Colaboração'],
          avatarState: 'talking',
          nextFlow: 'main_help'
        }
      ],

      // Fluxo de exploração
      exploration: [
        {
          response: this.language === 'pt'
            ? "Que bom! Vamos explorar juntos! Posso te mostrar meus projetos, contar sobre minha experiência, ou falar sobre as tecnologias que uso. O que você gostaria de saber?"
            : "Great! Let's explore together! I can show you my projects, tell you about my experience, or talk about the technologies I use. What would you like to know?",
          suggestions: ['Projetos', 'Experiência', 'Tecnologias', 'WhatsApp'],
          avatarState: 'excited',
          nextFlow: 'exploration_choice'
        }
      ],

      // Fluxos de direcionamento específicos
      clarification_menu: [
        {
          response: this.language === 'pt'
            ? "Perfeito! Escolha uma das opções abaixo e eu te ajudo com mais detalhes:"
            : "Perfect! Choose one of the options below and I'll help you with more details:",
          suggestions: ['Meus Projetos', 'Minha Carreira', 'Tecnologias', 'Colaboração'],
          avatarState: 'talking',
          nextFlow: 'detailed_help'
        }
      ],

      // Detectar quando usuário escolhe uma sugestão
      'meus projetos': [
        {
          response: this.language === 'pt'
            ? "Ótimo! Meus projetos são minha paixão! Tenho o Singulare Reab (reabilitação infantil), Avante Tech (site institucional) e Monemii (plataforma Agrotech). Qual te interessa mais?"
            : "Great! My projects are my passion! I have Singulare Reab (child rehabilitation), Avante Tech (institutional website) and Monemii (Agrotech platform). Which one interests you more?",
          suggestions: ['Singulare', 'Avante Tech', 'Monemii', 'Tecnologias'],
          avatarState: 'excited',
          nextFlow: 'project_selection'
        }
      ],

      'minha carreira': [
        {
          response: this.language === 'pt'
            ? "Perfeito! Minha jornada profissional começou na INOVE, depois Avante Tech, e agora no GREat. Cada experiência me ensinou muito! Que aspecto te interessa?"
            : "Perfect! My professional journey started at INOVE, then Avante Tech, and now at GREat. Each experience taught me a lot! What aspect interests you?",
          suggestions: ['INOVE', 'Avante Tech', 'GREat', 'Habilidades'],
          avatarState: 'talking',
          nextFlow: 'career_details'
        }
      ],

      'tecnologias': [
        {
          response: this.language === 'pt'
            ? "Excelente! Trabalho com React, Node.js, Python, MongoDB, Docker... Sempre aprendendo coisas novas! Qual tecnologia te interessa?"
            : "Excellent! I work with React, Node.js, Python, MongoDB, Docker... Always learning new things! Which technology interests you?",
          suggestions: ['React', 'Node.js', 'Python', 'MongoDB'],
          avatarState: 'excited',
          nextFlow: 'technology_selection'
        }
      ],

      'colaboração': [
        {
          response: this.language === 'pt'
            ? "Que legal! Adoro colaborar e trabalhar em equipe! Que tipo de projeto você tem em mente? Posso ajudar com desenvolvimento web, mobile, ou consultoria!"
            : "How cool! I love collaborating and working in teams! What kind of project do you have in mind? I can help with web development, mobile, or consulting!",
          suggestions: ['Projeto Web', 'Projeto Mobile', 'Consultoria', 'WhatsApp'],
          avatarState: 'excited',
          nextFlow: 'collaboration_types'
        }
      ],

      topic_selection: [
        {
          response: this.language === 'pt'
            ? "Ótima escolha! Vou te mostrar o que sei sobre esse tópico. O que mais te interessa?"
            : "Great choice! I'll show you what I know about this topic. What else interests you?",
          suggestions: ['Mais Detalhes', 'Outros Tópicos', 'WhatsApp', 'Projetos'],
          avatarState: 'talking',
          nextFlow: 'topic_details'
        }
      ],

      help_menu: [
        {
          response: this.language === 'pt'
            ? "Perfeito! Posso te ajudar com várias coisas. Escolha o que mais te interessa:"
            : "Perfect! I can help you with several things. Choose what interests you most:",
          suggestions: ['Meus Projetos', 'Minha Experiência', 'Tecnologias', 'Colaboração'],
          avatarState: 'talking',
          nextFlow: 'main_help'
        }
      ],

      exploration_menu: [
        {
          response: this.language === 'pt'
            ? "Vamos explorar! Posso te mostrar várias coisas interessantes. Que tal começar?"
            : "Let's explore! I can show you several interesting things. How about starting?",
          suggestions: ['Projetos', 'Experiência', 'Tecnologias', 'Contato'],
          avatarState: 'excited',
          nextFlow: 'exploration_start'
        }
      ]
    };

    return responses[intent] || responses.general;
  }

  // Resposta contextual baseada no histórico
  getContextualResponse(intent, message, context) {
    const lastMessages = this.conversationHistory.slice(-3);
    const lastTopics = lastMessages.map(msg => msg.topic).filter(Boolean);
    
    // Se já falou sobre projetos, dar respostas mais específicas
    if (lastTopics.includes('projects') && intent === 'projects') {
      return {
        response: this.language === 'pt'
          ? "Ah, você quer saber mais sobre meus projetos! 😊 Qual deles te chamou mais atenção? Posso te contar detalhes técnicos, desafios enfrentados, e resultados alcançados!"
          : "Ah, you want to know more about my projects! 😊 Which one caught your attention most? I can tell you technical details, challenges faced, and results achieved!",
        suggestions: ['Singulare', 'Avante Tech', 'Monemii', 'Tecnologias'],
        avatarState: 'excited',
        nextFlow: 'project_deep_dive'
      };
    }
    
    // Se já falou sobre tecnologias, aprofundar
    if (lastTopics.includes('technologies') && intent === 'technologies') {
      return {
        response: this.language === 'pt'
          ? "Perfeito! 💻 Vamos aprofundar nas tecnologias! Qual stack te interessa mais? Posso te contar sobre arquiteturas, padrões de código, e melhores práticas que uso!"
          : "Perfect! 💻 Let's dive deeper into technologies! Which stack interests you most? I can tell you about architectures, code patterns, and best practices I use!",
        suggestions: ['React Stack', 'Node.js Stack', 'Python Stack', 'Arquitetura'],
        avatarState: 'talking',
        nextFlow: 'technology_deep_dive'
      };
    }
    
    return null;
  }

  // Selecionar resposta aleatória
  selectRandomResponse(responses) {
    if (!responses || responses.length === 0) {
      return {
        response: this.language === 'pt'
          ? "Desculpe, não entendi. Que tal conversarmos no WhatsApp?"
          : "Sorry, I didn't understand. How about we chat on WhatsApp?",
        suggestions: ['WhatsApp', 'Projetos', 'Experiência', 'Tecnologias'],
        avatarState: 'thinking',
        shouldOpenWhatsApp: true
      };
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Processar mensagem completa
  processMessage(message) {
    const intent = this.detectIntent(message);
    const context = {
      history: this.conversationHistory.slice(-3),
      currentFlow: this.conversationFlow,
      lastTopic: this.lastTopic,
      depth: this.conversationDepth
    };
    
    const response = this.getResponse(intent, message, context);
    
    // Atualizar contexto
    this.conversationHistory.push({
      user: message,
      bot: response.response,
      intent,
      topic: intent,
      timestamp: new Date(),
      flow: response.nextFlow
    });
    
    this.currentContext = { ...this.currentContext, ...context };
    this.conversationFlow = response.nextFlow || this.conversationFlow;
    this.lastTopic = intent;
    this.conversationDepth++;

    const result = {
      response: response.response,
      suggestions: response.suggestions,
      avatarState: response.avatarState,
      shouldOpenWhatsApp: response.shouldOpenWhatsApp || false,
      intent,
      flow: response.nextFlow,
      context: this.currentContext
    };
    
    return result;
  }

  // Obter sugestões baseadas no fluxo atual
  getFlowSuggestions(flow) {
    const flowSuggestions = {
      main_menu: ['Projetos', 'Experiência', 'Tecnologias', 'Contato'],
      project_selection: ['Singulare', 'Avante Tech', 'Monemii', 'Tecnologias'],
      project_details: ['Ver Todos', 'Singulare', 'Avante Tech', 'Monemii'],
      experience_details: ['INOVE', 'Avante Tech', 'GREat', 'Habilidades'],
      technology_selection: ['React', 'Node.js', 'Python', 'MongoDB'],
      contact_methods: ['WhatsApp', 'Email', 'LinkedIn', 'Projetos'],
      collaboration_types: ['Projeto Web', 'Projeto Mobile', 'Consultoria', 'Freelance'],
      education_topics: ['Tutorial React', 'Tutorial Node.js', 'Tutorial Python', 'Mentoria'],
      hobbies_exchange: ['Gaming', 'Leitura', 'Ferramentas', 'Seus Hobbies'],
      general: ['WhatsApp', 'Projetos', 'Experiência', 'Tecnologias']
    };

    return flowSuggestions[flow] || flowSuggestions.general;
  }

  // Obter estado do avatar baseado na intenção
  getAvatarState(intent, response) {
    if (response && response.avatarState) {
      return response.avatarState;
    }
    
    const stateMap = {
      greeting: 'waving',
      projects: 'excited',
      singulare: 'excited',
      avante: 'talking',
      monemii: 'excited',
      experience: 'talking',
      inove: 'happy',
      great: 'excited',
      technologies: 'excited',
      react: 'excited',
      nodejs: 'talking',
      python: 'excited',
      contact: 'talking',
      collaboration: 'excited',
      education: 'talking',
      hobbies: 'happy',
      compliments: 'happy',
      thanks: 'happy',
      pricing: 'talking',
      timeline: 'thinking',
      location: 'happy',
      general: 'thinking'
    };

    return stateMap[intent] || 'thinking';
  }

  // Obter analytics
  getAnalytics() {
    return {
      totalMessages: this.conversationHistory.length,
      conversationDepth: this.conversationDepth,
      currentFlow: this.conversationFlow,
      lastTopic: this.lastTopic,
      popularIntents: this.getPopularIntents(),
      conversationContext: this.currentContext
    };
  }

  // Obter intenções mais populares
  getPopularIntents() {
    const intentCounts = {};
    this.conversationHistory.forEach(msg => {
      intentCounts[msg.intent] = (intentCounts[msg.intent] || 0) + 1;
    });
    
    return Object.entries(intentCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([intent, count]) => ({ intent, count }));
  }

  // Limpar histórico
  clearHistory() {
    this.conversationHistory = [];
    this.currentContext = {};
    this.conversationFlow = 'greeting';
    this.lastTopic = null;
    this.conversationDepth = 0;
  }
}

export default AdvancedConversationEngine;
