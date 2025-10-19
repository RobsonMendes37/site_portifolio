class SimpleConversationEngine {
  constructor(language = 'pt') {
    this.language = language;
    this.currentFlow = 'main_menu';
  }

  setFlow(flow) {
    this.currentFlow = flow;
  }

  processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    
    // Resposta para cumprimentos
    if (lowerMessage === 'olá' || lowerMessage === 'oi' || lowerMessage === 'hello' || lowerMessage === 'hi') {
      return {
        response: this.language === 'pt' 
          ? "Oi! Que bom te ver por aqui! Eu sou o Robson virtual. Como posso te ajudar hoje?"
          : "Hi! Great to see you here! I'm virtual Robson. How can I help you today?",
        suggestions: [],
        avatarState: 'waving',
        shouldOpenWhatsApp: false,
        intent: 'greeting',
        flow: 'main_menu'
      };
    }
    
    // Resposta para projetos
    if (lowerMessage === '1' && this.currentFlow === 'main_menu') {
      this.currentFlow = 'project_selection';
      const response = this.language === 'pt'
        ? "Ah, meus projetos! Tenho alguns bem legais!\n\n**Singulare Reab** - Landing page para reabilitação infantil\n**Avante Tech** - Site institucional moderno\n**Monemii** - Plataforma Agrotech\n\nQual projeto te interessa mais?\n\n1. Singulare Reab\n2. Avante Tech\n3. Monemii"
        : "Oh, my projects! I have some really cool ones!\n\n**Singulare Reab** - Child rehabilitation landing page\n**Avante Tech** - Modern institutional website\n**Monemii** - Agrotech platform\n\nWhich project interests you more?\n\n1. Singulare Reab\n2. Avante Tech\n3. Monemii";
      
      
      return {
        response: response,
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'projects',
        flow: 'project_selection'
      };
    }

    // Respostas específicas para projetos
    if (lowerMessage === '1' && this.currentFlow === 'project_selection') {
      return {
        response: this.language === 'pt'
          ? "O Singulare Reab! Foi um projeto muito especial! Desenvolvi uma landing page completa para reabilitação infantil, com foco na experiência do usuário e acessibilidade. Usamos React, Node.js e MongoDB. Foi incrível ver o impacto positivo na vida das crianças!"
          : "Singulare Reab! It was a very special project! I developed a complete landing page for child rehabilitation, focusing on user experience and accessibility. We used React, Node.js and MongoDB. It was amazing to see the positive impact on children's lives!",
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'singulare',
        flow: 'project_technologies'
      };
    }
    
    if (lowerMessage === '2' && this.currentFlow === 'project_selection') {
      return {
        response: this.language === 'pt'
          ? "O Avante Tech! Site institucional moderno e responsivo! Desenvolvi uma plataforma completa com design clean, integração com APIs, e foco na conversão. Usamos React, Node.js, e implementamos analytics avançados. Foi um sucesso total!"
          : "Avante Tech! Modern and responsive institutional website! I developed a complete platform with clean design, API integration, and conversion focus. We used React, Node.js, and implemented advanced analytics. It was a total success!",
        suggestions: [],
        avatarState: 'talking',
        shouldOpenWhatsApp: false,
        intent: 'avante_tech',
        flow: 'project_technologies'
      };
    }
    
    if (lowerMessage === '3' && this.currentFlow === 'project_selection') {
      return {
        response: this.language === 'pt'
          ? "O Monemii! Plataforma Agrotech inovadora! Desenvolvi uma solução completa para gestão agrícola, com dashboards interativos, relatórios em tempo real, e integração com sensores IoT. Usamos React, Node.js, Python e MongoDB. Tecnologia a serviço da agricultura!"
          : "Monemii! Innovative Agrotech platform! I developed a complete solution for agricultural management, with interactive dashboards, real-time reports, and IoT sensor integration. We used React, Node.js, Python and MongoDB. Technology at the service of agriculture!",
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'monemii',
        flow: 'project_technologies'
      };
    }
    
    if (lowerMessage.includes('singulare') || lowerMessage.includes('reab')) {
      return {
        response: this.language === 'pt'
          ? "O Singulare Reab! Foi um projeto muito especial! Desenvolvi uma landing page completa para reabilitação infantil, com foco na experiência do usuário e acessibilidade. Usamos React, Node.js e MongoDB. Foi incrível ver o impacto positivo na vida das crianças!"
          : "Singulare Reab! It was a very special project! I developed a complete landing page for child rehabilitation, focusing on user experience and accessibility. We used React, Node.js and MongoDB. It was amazing to see the positive impact on children's lives!",
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'singulare',
        flow: 'project_technologies'
      };
    }

    if (lowerMessage.includes('avante tech') || lowerMessage.includes('avante')) {
      return {
        response: this.language === 'pt'
          ? "O Avante Tech! Um site institucional completo que desenvolvi! Focamos em apresentar os serviços da empresa de forma profissional e moderna. Usei React, Next.js, Tailwind CSS e integração com APIs. O resultado foi um site responsivo e performático!"
          : "Avante Tech! A complete institutional website I developed! We focused on presenting the company's services in a professional and modern way. I used React, Next.js, Tailwind CSS and API integration. The result was a responsive and performant website!",
        suggestions: [],
        avatarState: 'talking',
        shouldOpenWhatsApp: false,
        intent: 'avante_tech',
        flow: 'project_technologies'
      };
    }

    if (lowerMessage.includes('monemii')) {
      return {
        response: this.language === 'pt'
          ? "O Monemii! Uma plataforma Agrotech fascinante! Desenvolvi uma solução digital para o setor agrícola, conectando tecnologia de ponta ao campo. Usei React Native para mobile, Node.js para backend, e integração com sistemas de IoT. Foi desafiador e muito gratificante!"
          : "Monemii! A fascinating Agrotech platform! I developed a digital solution for the agricultural sector, connecting cutting-edge technology to the field. I used React Native for mobile, Node.js for backend, and IoT systems integration. It was challenging and very rewarding!",
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'monemii',
        flow: 'project_technologies'
      };
    }
    
    // Resposta para tecnologias
    if (lowerMessage === '3' && this.currentFlow === 'main_menu') {
      this.currentFlow = 'technology_selection';
      return {
        response: this.language === 'pt'
          ? "Adoro tecnologia! Trabalho principalmente com:\n\n**React** - Frontend moderno\n**Node.js** - Backend poderoso\n**Python** - Automação e dados\n**MongoDB** - Banco de dados\n\nQual tecnologia te interessa mais?\n\n1. React\n2. Node.js\n3. Python\n4. MongoDB"
          : "I love technology! I work mainly with:\n\n**React** - Modern frontend\n**Node.js** - Powerful backend\n**Python** - Automation and data\n**MongoDB** - Database\n\nWhich technology interests you more?\n\n1. React\n2. Node.js\n3. Python\n4. MongoDB",
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'technologies',
        flow: 'technology_selection'
      };
    }

    // Respostas específicas para tecnologias - apenas números
    if (lowerMessage === '1' && this.currentFlow === 'technology_selection') {
      return {
        response: this.language === 'pt'
          ? "React! Minha paixão! Desenvolvo interfaces modernas e responsivas, uso hooks, context API, e sempre busco as melhores práticas. Já criei componentes reutilizáveis, gerenciamento de estado com Redux, e integração com APIs. É incrível ver a evolução do React!"
          : "React! My passion! I develop modern and responsive interfaces, use hooks, context API, and always seek best practices. I've created reusable components, state management with Redux, and API integration. It's amazing to see React's evolution!",
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'react',
        flow: 'react_details'
      };
    }

    if (lowerMessage === '2' && this.currentFlow === 'technology_selection') {
      return {
        response: this.language === 'pt'
          ? "Node.js! Poderoso para backend! Desenvolvo APIs RESTful, integração com bancos de dados, autenticação JWT, e sempre foco em performance e escalabilidade. Já trabalhei com Express, Socket.io, e microserviços!"
          : "Node.js! Powerful for backend! I develop RESTful APIs, database integration, JWT authentication, and always focus on performance and scalability. I've worked with Express, Socket.io, and microservices!",
        suggestions: [],
        avatarState: 'talking',
        shouldOpenWhatsApp: false,
        intent: 'nodejs',
        flow: 'nodejs_details'
      };
    }

    if (lowerMessage === '3' && this.currentFlow === 'technology_selection') {
      return {
        response: this.language === 'pt'
          ? "Python! Versátil e poderoso! Uso para automação, análise de dados, scripts, e desenvolvimento web com Django/Flask. Já criei bots, integrações com APIs, e soluções de automação que economizaram muito tempo!"
          : "Python! Versatile and powerful! I use it for automation, data analysis, scripts, and web development with Django/Flask. I've created bots, API integrations, and automation solutions that saved a lot of time!",
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'python',
        flow: 'python_details'
      };
    }

    if (lowerMessage === '4' && this.currentFlow === 'technology_selection') {
      return {
        response: this.language === 'pt'
          ? "MongoDB! Banco de dados NoSQL incrível! Trabalho com schemas flexíveis, consultas complexas, agregações, e sempre foco em performance. Já implementei índices otimizados, replicação, e integração com aplicações Node.js!"
          : "MongoDB! Amazing NoSQL database! I work with flexible schemas, complex queries, aggregations, and always focus on performance. I've implemented optimized indexes, replication, and Node.js application integration!",
        suggestions: [],
        avatarState: 'talking',
        shouldOpenWhatsApp: false,
        intent: 'mongodb',
        flow: 'mongodb_details'
      };
    }
    
    // Resposta para experiência
    if (lowerMessage === '2' && this.currentFlow === 'main_menu') {
      this.currentFlow = 'experience_selection';
      return {
        response: this.language === 'pt'
          ? "Minha jornada tem sido incrível!\n\n**INOVE** - Bolsista e Diretor de Eventos\n**Avante Tech** - Tech Lead\n**GREat** - Full Stack Developer (atual)\n\nQual experiência te interessa mais?\n\n1. INOVE\n2. Avante Tech\n3. GREat"
          : "My journey has been incredible!\n\n**INOVE** - Scholar and Events Director\n**Avante Tech** - Tech Lead\n**GREat** - Full Stack Developer (current)\n\nWhich experience interests you more?\n\n1. INOVE\n2. Avante Tech\n3. GREat",
        suggestions: [],
        avatarState: 'talking',
        shouldOpenWhatsApp: false,
        intent: 'experience',
        flow: 'experience_selection'
      };
    }

    // Respostas específicas para experiências
    if (lowerMessage === '1' && this.currentFlow === 'experience_selection') {
      return {
        response: this.language === 'pt'
          ? "A INOVE! Foi onde tudo começou! Como bolsista, executei eventos acadêmicos, criei artes visuais e desenvolvi estratégias de engajamento. Depois como Diretor de Eventos, planejei e executei capacitações profissionais. Foi uma experiência transformadora!"
          : "INOVE! That's where it all started! As a scholar, I executed academic events, created visual arts and developed engagement strategies. Then as Events Director, I planned and executed professional training. It was a transformative experience!",
        suggestions: [],
        avatarState: 'happy',
        shouldOpenWhatsApp: false,
        intent: 'inove',
        flow: 'inove_details'
      };
    }
    
    if (lowerMessage === '2' && this.currentFlow === 'experience_selection') {
      return {
        response: this.language === 'pt'
          ? "A Avante Tech! Como Tech Lead, lidero uma equipe incrível! Desenvolvo soluções inovadoras, gerencio projetos complexos, e sempre busco as melhores práticas. Foi onde aprendi a liderar e a pensar em escala. Uma experiência que me transformou como profissional!"
          : "Avante Tech! As Tech Lead, I lead an incredible team! I develop innovative solutions, manage complex projects, and always seek best practices. It's where I learned to lead and think at scale. An experience that transformed me as a professional!",
        suggestions: [],
        avatarState: 'talking',
        shouldOpenWhatsApp: false,
        intent: 'avante_tech',
        flow: 'avante_tech_details'
      };
    }
    
    if (lowerMessage === '3' && this.currentFlow === 'experience_selection') {
      return {
        response: this.language === 'pt'
          ? "A GREat! Minha atual posição como Full Stack Developer! Desenvolvo soluções completas, do frontend ao backend, sempre pensando em performance e escalabilidade. É onde aplico tudo que aprendi e continuo evoluindo. Uma jornada incrível!"
          : "GREat! My current position as Full Stack Developer! I develop complete solutions, from frontend to backend, always thinking about performance and scalability. It's where I apply everything I've learned and continue to evolve. An incredible journey!",
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'great',
        flow: 'great_details'
      };
    }
    
    if (lowerMessage.includes('inove')) {
      return {
        response: this.language === 'pt'
          ? "A INOVE! Foi onde tudo começou! Como bolsista, executei eventos acadêmicos, criei artes visuais e desenvolvi estratégias de engajamento. Depois como Diretor de Eventos, planejei e executei capacitações profissionais. Foi uma experiência transformadora!"
          : "INOVE! That's where it all started! As a scholar, I executed academic events, created visual arts and developed engagement strategies. Then as Events Director, I planned and executed professional training. It was a transformative experience!",
        suggestions: [],
        avatarState: 'happy',
        shouldOpenWhatsApp: false,
        intent: 'inove',
        flow: 'inove_details'
      };
    }

    if (lowerMessage.includes('avante') || lowerMessage.includes('avante tech')) {
      return {
        response: this.language === 'pt'
          ? "A Avante Tech! Foi uma experiência incrível como Tech Lead! Lidei com desenvolvimento de sistemas, liderança de equipe, e implementação de soluções tecnológicas. Aprendi muito sobre gestão de projetos e arquitetura de software!"
          : "Avante Tech! It was an incredible experience as Tech Lead! I dealt with system development, team leadership, and implementation of technological solutions. I learned a lot about project management and software architecture!",
        suggestions: [],
        avatarState: 'talking',
        shouldOpenWhatsApp: false,
        intent: 'avante',
        flow: 'avante_details'
      };
    }

    if (lowerMessage.includes('great') || lowerMessage.includes('grat')) {
      return {
        response: this.language === 'pt'
          ? "O GREat! Minha experiência atual! Estou desenvolvendo componentes reutilizáveis em React e React Native, mantendo documentação eficiente e implementando funcionalidades full-stack. É incrível trabalhar com tecnologias modernas e sempre aprendendo coisas novas!"
          : "GREat! My current experience! I'm developing reusable components in React and React Native, maintaining efficient documentation and implementing full-stack features. It's amazing to work with modern technologies and always learning new things!",
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'great',
        flow: 'great_details'
      };
    }
    
    // Resposta para contato
    if (lowerMessage === '4' && this.currentFlow === 'main_menu') {
      this.currentFlow = 'contact_selection';
      return {
        response: this.language === 'pt'
          ? "Que bom que quer falar comigo!\n\n**WhatsApp** - Conversa direta\n**Email** - Contato profissional\n**LinkedIn** - Rede profissional\n**Colaboração** - Trabalhar juntos\n\nQual opção te interessa?\n\n1. WhatsApp\n2. Email\n3. LinkedIn\n4. Colaboração"
          : "Great that you want to talk to me!\n\n**WhatsApp** - Direct chat\n**Email** - Professional contact\n**LinkedIn** - Professional network\n**Collaboration** - Work together\n\nWhich option interests you?\n\n1. WhatsApp\n2. Email\n3. LinkedIn\n4. Collaboration",
        suggestions: [],
        avatarState: 'talking',
        shouldOpenWhatsApp: false,
        intent: 'contact',
        flow: 'contact_selection'
      };
    }
    
    // Respostas específicas para contato
    if (lowerMessage === '1' && this.currentFlow === 'contact_selection') {
      return {
        response: this.language === 'pt'
          ? "Perfeito! Vamos conversar pelo WhatsApp! É a forma mais rápida e direta de nos comunicarmos. Você pode me encontrar no botão do WhatsApp aqui no site, ou me chamar diretamente. Estou sempre disponível para trocar uma ideia!"
          : "Perfect! Let's chat on WhatsApp! It's the fastest and most direct way to communicate. You can find me on the WhatsApp button here on the site, or call me directly. I'm always available to chat!",
        suggestions: [],
        avatarState: 'happy',
        shouldOpenWhatsApp: true,
        intent: 'whatsapp',
        flow: 'whatsapp_contact'
      };
    }
    
    if (lowerMessage === '2' && this.currentFlow === 'contact_selection') {
      return {
        response: this.language === 'pt'
          ? "Ótimo! Email é perfeito para conversas mais formais e profissionais. Você pode me enviar um email com detalhes sobre seu projeto, proposta de colaboração, ou qualquer dúvida. Respondo sempre em até 24 horas!"
          : "Great! Email is perfect for more formal and professional conversations. You can send me an email with details about your project, collaboration proposal, or any questions. I always respond within 24 hours!",
        suggestions: [],
        avatarState: 'talking',
        shouldOpenWhatsApp: false,
        intent: 'email',
        flow: 'email_contact'
      };
    }
    
    if (lowerMessage === '3' && this.currentFlow === 'contact_selection') {
      return {
        response: this.language === 'pt'
          ? "Excelente! LinkedIn é ideal para networking profissional! Lá você pode ver meu portfólio completo, recomendações, e acompanhar minha jornada profissional. É onde compartilho insights sobre tecnologia e desenvolvimento!"
          : "Excellent! LinkedIn is ideal for professional networking! There you can see my complete portfolio, recommendations, and follow my professional journey. It's where I share insights about technology and development!",
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'linkedin',
        flow: 'linkedin_contact'
      };
    }
    
    if (lowerMessage === '4' && this.currentFlow === 'contact_selection') {
      return {
        response: this.language === 'pt'
          ? "Fantástico! Adoro colaborações! Seja para projetos freelance, parcerias, ou troca de conhecimentos, sempre estou aberto a novas oportunidades. Vamos criar algo incrível juntos! Me conta mais sobre sua ideia!"
          : "Fantastic! I love collaborations! Whether for freelance projects, partnerships, or knowledge exchange, I'm always open to new opportunities. Let's create something amazing together! Tell me more about your idea!",
        suggestions: [],
        avatarState: 'excited',
        shouldOpenWhatsApp: false,
        intent: 'collaboration',
        flow: 'collaboration_contact'
      };
    }
    
    // Respostas para "nenhum das opções"
    if (lowerMessage.includes('nenhum') || lowerMessage.includes('nenhuma') || lowerMessage.includes('nada') || lowerMessage.includes('não') || lowerMessage.includes('não me interessa') || lowerMessage.includes('não quero')) {
      return {
        response: this.language === 'pt'
          ? "Tudo bem! Sem problemas! Se mudar de ideia e quiser saber mais sobre mim, é só falar! Posso te ajudar com projetos, experiência, tecnologias ou qualquer outra coisa. Estou aqui quando precisar!"
          : "That's okay! No problem! If you change your mind and want to know more about me, just say so! I can help you with projects, experience, technologies or anything else. I'm here when you need me!",
        suggestions: [],
        avatarState: 'happy',
        shouldOpenWhatsApp: false,
        intent: 'decline',
        flow: 'decline_response'
      };
    }

    // Resposta padrão para mensagens não entendidas
    return {
      response: this.language === 'pt'
        ? "Hmm, não entendi muito bem. Mas tudo bem!\n\nPosso te ajudar com:\n1. Meus projetos\n2. Minha experiência\n3. Tecnologias que uso\n4. Contato e colaboração\n\nDigite o número da opção que te interessa!"
        : "Hmm, I didn't understand very well. But that's okay!\n\nI can help you with:\n1. My projects\n2. My experience\n3. Technologies I use\n4. Contact and collaboration\n\nType the number of the option that interests you!",
      suggestions: [],
      avatarState: 'thinking',
      shouldOpenWhatsApp: false,
      intent: 'general',
      flow: 'help_menu'
    };
  }
}

export default SimpleConversationEngine;
