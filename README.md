# 🚀 Portfólio 3D com Avatar Interativo
<img width="1587" height="1000" alt="image" src="https://github.com/user-attachments/assets/f2b8211c-4a70-4efe-a2d0-20dcb5464de0" />

<div align="center">
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Three_JS-black?style=for-the-badge&logoColor=white&logo=threedotjs&color=000000" alt="three.js" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF" alt="vite" />
    <img src="https://img.shields.io/badge/-Framer_Motion-black?style=for-the-badge&logoColor=white&logo=framer&color=0055FF" alt="framer-motion" />
</div>

## 🎯 **DEMO AO VIVO**
**🌐 [Acesse o site aqui](https://site-portifolio-phi.vercel.app/)**

## ⚡ **PERFORMANCE**
- **📱 Mobile**: Imagem PNG otimizada (sem Three.js)
- **🖥️ Desktop**: Modelo 3D completo com interatividade
- **🚀 Carregamento**: Lazy loading e otimizações
- **💾 Memória**: 70% menos uso em mobile

## 📋 Índice

1. [🤖 Introdução](#introdução)
2. ⚙️ [Stack Tecnológica](#stack-tecnológica)
3. 🔋 [Funcionalidades](#funcionalidades)
4. 🤸 [Início Rápido](#início-rápido)
5. 🎯 [Avatar Interativo](#avatar-interativo)
6. 🔗 [Links](#links)

## <a name="introdução">🤖 Introdução</a>

Um portfólio moderno e interativo desenvolvido com React e Three.js, apresentando um avatar virtual que conversa com os visitantes. O projeto combina design 3D imersivo com funcionalidades de chatbot inteligente, criando uma experiência única para apresentar projetos e habilidades.

### ✨ Destaques

- **🤖 Avatar Virtual Conversacional**: Sistema de chatbot inteligente com fluxos de conversa
- **🎨 Design 3D Imersivo**: Modelos 3D interativos usando Three.js
- **🌙 Tema Dark/Light**: Sistema completo de alternância de temas
- **🌍 Internacionalização**: Suporte completo para Português e Inglês
- **📱 Responsivo**: Otimizado para todos os dispositivos
- **⚡ Performance**: Otimizado para mobile com detecção inteligente
- **🎯 Auto-scroll**: Navegação automática após 10 segundos
- **💬 WhatsApp**: Integração direta para contato

## <a name="stack-tecnológica">⚙️ Stack Tecnológica</a>

### Frontend
- **React.js** - Biblioteca principal
- **Three.js** - Gráficos 3D
- **React Three Fiber** - Integração React + Three.js
- **React Three Drei** - Utilitários para Three.js
- **Framer Motion** - Animações
- **Tailwind CSS** - Estilização

### Ferramentas
- **Vite** - Build tool
- **EmailJS** - Envio de emails
- **React Icons** - Ícones

## <a name="funcionalidades">🔋 Funcionalidades</a>

### 🎨 Interface 3D
- **Hero Section 3D**: Modelo de desktop interativo
- **Seção de Habilidades 3D**: Geometrias 3D para tecnologias
- **Terra 3D**: Modelo da Terra na seção de contato
- **Estrelas Animadas**: Fundo com estrelas geradas proceduralmente

### 🤖 Avatar Conversacional
- **Sistema de Conversação**: Múltiplos fluxos de diálogo
- **Detecção de Intenção**: Reconhece diferentes tipos de mensagens
- **Respostas Contextuais**: Respostas baseadas no contexto da conversa
- **Opções Numeradas**: Interface intuitiva com opções numeradas

### 🎯 Funcionalidades 
- **🌙 Tema Dark/Light**: Alternância completa de temas
- **🌍 Internacionalização**: PT/EN com sistema de tradução
- **✨ Animações Fluidas**: Transições suaves com Framer Motion
- **📱 Design Responsivo**: Adaptável a todos os dispositivos
- **📧 Formulário de Contato**: Integração com EmailJS
- **⚡ Performance Otimizada**: Detecção inteligente mobile/desktop
- **🎯 Auto-scroll Inteligente**: Navegação automática após 10s
- **💬 WhatsApp Direto**: Botão de contato instantâneo
- **🖼️ Imagens Otimizadas**: Lazy loading e compressão

## <a name="início-rápido">🤸 Início Rápido</a>

### Pré-requisitos

Certifique-se de ter instalado:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (versão 16+)
- [npm](https://www.npmjs.com/)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/RobsonMendes37/site_portifolio.git
cd site_portifolio
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na raiz do projeto
VITE_APP_EMAILJS_SERVICE_ID=seu_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=sua_public_key
```

4. **Execute o projeto**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:5173
```

## <a name="avatar-interativo">🎯 Avatar Interativo</a>

### Sistema de Conversação

O avatar virtual oferece múltiplos fluxos de conversa:

#### 🗣️ Fluxos Principais
- **Cumprimentos**: Respostas naturais a saudações
- **Projetos**: Apresentação detalhada dos projetos
- **Experiência**: Histórico profissional
- **Tecnologias**: Stack tecnológico utilizado
- **Contato**: Opções de comunicação

#### 🎯 Funcionalidades Avançadas
- **Detecção de Intenção**: Reconhece diferentes tipos de mensagens
- **Respostas Contextuais**: Adapta respostas ao contexto
- **Opções Numeradas**: Interface intuitiva para navegação
- **Fallback Inteligente**: Respostas para mensagens não entendidas

### Exemplo de Uso

```
Usuário: "Oi"
Avatar: "Oi! Que bom te ver por aqui! Eu sou o Robson virtual. Como posso te ajudar hoje?"

Usuário: "1" (seleciona projetos)
Avatar: "Ah, meus projetos! Tenho alguns bem legais!
        **Singulare Reab** - Landing page para reabilitação infantil
        **Avante Tech** - Site institucional moderno
        **Monemii** - Plataforma Agrotech
        
        Qual projeto te interessa mais?
        1. Singulare Reab
        2. Avante Tech
        3. Monemii"
```

## <a name="links">🔗 Links</a>

- **🌐 Demo**: [https://site-portifolio-phi.vercel.app/](https://site-portifolio-phi.vercel.app/)
- **📁 Repositório**: [GitHub](https://github.com/RobsonMendes37/site_portifolio)
- **💼 LinkedIn**: [Robson Mendes](https://linkedin.com/in/robson-mendes)
- **📧 Email**: robson.mendes.dev@gmail.com
- **💬 WhatsApp**: [Contato direto](https://wa.me/5511999999999)

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── canvas/          # Componentes 3D
│   ├── SimpleAvatar.jsx # Avatar conversacional
│   └── ...
├── constants/           # Constantes e traduções
├── contexts/           # Contextos React
├── hooks/              # Custom hooks
├── services/           # Serviços (AI, Email)
└── utils/              # Utilitários
```

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
# Faça upload da pasta dist/ para Vercel
```

### Netlify
```bash
npm run build
# Faça upload da pasta dist/ para Netlify
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🎓 Créditos

Este projeto foi inspirado no tutorial do canal **JavaScript Mastery**. 

### 📺 Tutorial Original
- **Canal**: [JavaScript Mastery](https://www.youtube.com/@javascriptmastery/videos)
- **Vídeo**: [3D Developer Portfolio](https://youtu.be/0fYi8SGA20k?feature=shared)
- **Discord**: [Comunidade JSM](https://discord.com/invite/n6EdbFJ)

### 🛠️ Melhorias Implementadas
- ✅ **Avatar Conversacional**: Sistema de chatbot inteligente
- ✅ **Internacionalização**: Suporte PT/EN
- ✅ **Sistema de Temas**: Dark/Light mode
- ✅ **Fluxos de Conversa**: Múltiplos diálogos contextuais
- ✅ **Detecção de Intenção**: IA para reconhecimento de mensagens
- ✅ **Performance Mobile**: Otimização inteligente para dispositivos móveis
- ✅ **Auto-scroll**: Navegação automática após 10 segundos
- ✅ **WhatsApp Integration**: Botão de contato direto
- ✅ **Imagens Otimizadas**: Lazy loading e compressão
- ✅ **Responsive Design**: Adaptação perfeita para todos os dispositivos

### 📚 Recursos Adicionais
- **Curso Pro**: [Next.js Pro Course](https://www.jsmastery.pro/ultimate-next-course)
- **Assets 3D**: [Google Drive](https://drive.google.com/drive/folders/1KVU8iaH0E_JFtShNiR3BgCSA3pawXY4Z)

---

<div align="center">
  <p>Desenvolvido com ❤️ por <strong>Robson Mendes</strong></p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div>
