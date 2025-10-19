import {
  marcos,
  mateus,
  vancleida,
  mobile,
  backend,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  inove,
  avante_company,
  singulare,
  avante,
  monemii,
  threejs,
  great,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "feedbacks",
    title: "Testimonials",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  }
];

export const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

export const experiences = [
  {
    title: "Bolsista de Iniciação Acadêmica",
    company_name: "INOVE",
    icon: inove,
    iconBg: "#44005a", 
    date: "Ago 2022 - Set 2024",
    points: [
      "Executou eventos acadêmicos, incluindo Empreendei, Encontros Universitários, Palestras Ocasionais e Feira do Sebrae.",
      "Criou artes visuais para publicações em redes sociais usando Figma e Canva.",
      "Desenvolveu estratégias de engajamento estudantil e parcerias institucionais para expandir o alcance dos eventos acadêmicos.",
    ],
  },
  {
    title: "Diretor de Eventos e Capacitações",
    company_name: "INOVE",
    icon: inove,
    iconBg: "#44005a",
    date: "Nov 2024 - Jul 2025",
    points: [
      "Planejou, organizou e executou eventos acadêmicos e capacitações profissionais.",
      "Garantiu logística completa e desenvolveu métricas de qualidade e impacto para os eventos.",
      "Colaborou com equipes de marketing e design para garantir o sucesso e alcance dos eventos.",
    ],
  },
  {
    title: "Desenvolvedor Full Stack",
    company_name: "Avante Tech",
    icon: avante_company,
    iconBg: "#383E56",
    date: "Fev 2024 - Set 2025",
    points: [
      "Liderou equipe técnica como Tech Lead, coordenando desenvolvimento e garantindo qualidade do código.",
      "Desenvolveu protótipos no Figma para validação de UX/UI e comunicação com stakeholders.",
      "Criou sites responsivos utilizando React, Next.js, Tailwind, Bootstrap, Node.js, MongoDB.",
      "Planejou arquiteturas de software escaláveis e documentou sistemas com diagramas técnicos.",
      "Implementou APIs RESTful e gerenciou rotas no backend para integração de sistemas.",
    ],
  },
  {
    title: "Desenvolvedor Full Stack",
    company_name: "GREat",
    icon: great,
    iconBg: "#E6DEDD",
    date: "Set 2025 - Presente",
    points: [
      "Desenvolve componentes reutilizáveis em React e React Native para interfaces responsivas e modernas.",
      "Mantém documentação e integração eficiente entre sistemas frontend e backend.",
      "Realiza debugging e correção de erros em aplicações full-stack",
      "Implementa funcionalidades com React.js e tecnologias relacionadas para desenvolvimento web.",
    ],
  },
];

export const testimonials = [
  {
    testimonial:
      "Eu pensava que era impossível fazer um site tão bonito quanto nosso produto, mas Robson me provou o contrário.",
    name: "Vancleida Mendes",
    designation: "CEO",
    company: "Singulare",
    image: vancleida,
  },
  {
    testimonial:
      "Nunca conheci um desenvolvedor web que realmente se importa com o sucesso de seus clientes como Robson.",
    name: "Mateus",
    designation: "CFO",
    company: "Monemii Tec",
    image: mateus,
  },
  {
    testimonial:
      "Mais que um desenvolvedor talentoso, Robson é um profissional excepcional que transforma desafios em soluções.",   
    name: "Marcos Da Silva",
    designation: "CEO",
    company: "Avante Tech",
    image: marcos,
  },
];

export const projects = [
  {
    name: "Singulare Reab",
    description:
      "Landing page desenvolvida para apresentar os serviços especializados da empresa Singulare Reab em reabilitação infantil.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap",
        color: "pink-text-gradient",
      },
    ],
    image: singulare,
    source_code_link: "https://github.com/RobsonMendes37/site_singularereab",
    live_url: "https://singularereab.com.br",
  },
  {
    name: "Avante Tech",
    description:
      "Site institucional para a empresa Avante Tech, com o objetivo de mostrar os serviços oferecidos e captar clientes potenciais.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "node.js",
        color: "green-text-gradient",
      },
      {
        name: "tailwind CSS",
        color: "pink-text-gradient",
      },
    ],
    image: avante,
    source_code_link: "https://github.com/RobsonMendes37",
    live_url: "https://www.avantetechjr.com.br",
  },
  {
    name: "Monemii tec",
    description:
        "Uma plataforma digital para o setor Agrotech, que apresenta soluções de agrocomputação para o setor público e conecta tecnologia de ponta ao campo.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap",
        color: "pink-text-gradient",
      },
    ],
    image: monemii,
    source_code_link: "https://github.com/",
    live_url: "https://monemiitec.com.br",
  },
];

const contactInfo = {
  whatsapp: {
    phone: "85991497037",
    message: "Olá! Gostaria de entrar em contato sobre seus serviços de desenvolvimento."
  },
  email: "robsonqueirozmendes@gmail.com",
  social: {
    github: "https://github.com/RobsonMendes37",
    linkedin: "https://www.linkedin.com/in/robsonmendes37/"
  }
};

export { contactInfo };
export { colors, getThemeColors, getThemeClasses, componentColors } from './colors';
