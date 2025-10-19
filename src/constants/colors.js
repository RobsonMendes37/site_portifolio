// Sistema de Cores Centralizado
export const colors = {
  // Cores Base
  primary: {
    dark: "#050816",
    light: "#d4c4a8"  // Fundo principal bege/creme mais escuro
  },
  secondary: {
    dark: "#aaa6c3", 
    light: "#7a6348"  // Texto secundário marrom suave (5% mais escuro)
  },
  tertiary: {
    dark: "#151030",
    light: "#ebe4d1"  // Cards bege mais claro (5% mais escuro)
  },
  
  // Cores de Fundo
  background: {
    dark: "#050816",
    light: "#d4c4a8"  // Fundo principal bege/creme mais escuro
  },
  card: {
    dark: "#151030",
    light: "#ebe4d1"  // Cards bege mais claro (5% mais escuro)
  },
  black: {
    100: {
      dark: "#100d25",
      light: "#e6ddd0"  // Fundo secundário bege claro (5% mais escuro)
    },
    200: {
      dark: "#090325", 
      light: "#ddd7c8"  // Bordas e divisórias bege médio (5% mais escuro)
    }
  },
  
  // Cores de Texto
  text: {
    primary: {
      dark: "#ffffff",
      light: "#2f2a1f"  // Texto principal marrom escuro (5% mais escuro)
    },
    secondary: {
      dark: "#aaa6c3",
      light: "#7a6348"  // Texto secundário marrom suave (5% mais escuro)
    },
    white: {
      dark: "#f3f3f3",
      light: "#2f2a1f"  // Texto principal marrom escuro (5% mais escuro)
    }
  },
  
  // Cores de Acento
  accent: {
    purple: "#915EFF",      // Destaque principal (mantém original para dark mode)
    violet: "#804dee",      // Destaque vibrante (mantém original para dark mode)
    green: "#bed286",       // Destaque principal verde suave (light mode)
    pink: "#bf61ff",
    orange: "#f12711",
    yellow: "#f5af19"
  },

  // Imagens de Fundo
  heroBackground: {
    dark: "herobg.png",
    light: "herobg_light.png"
  },
  
  // Cores de Status
  status: {
    success: "#10b981",
    warning: "#f59e0b", 
    error: "#ef4444",
    info: "#3b82f6"
  },
  
  // Cores de Gradiente
  gradients: {
    violet: "linear-gradient(-90deg, #804dee 0%, rgba(60, 51, 80, 0) 100%)",
    greenPink: "linear-gradient(90.13deg, #00cea8 1.9%, #bf61ff 97.5%)",
    black: "linear-gradient(to right, #434343, #000000)",
    orange: "linear-gradient(to top, #f12711, #f5af19)",
    green: "linear-gradient(to top, #11998e, #38ef7d)",
    blue: "linear-gradient(to top, #2f80ed, #56ccf2)",
    pink: "linear-gradient(to top, #ec008c, #fc6767)"
  }
};

// Função para obter cores baseadas no tema
export const getThemeColors = (theme = 'dark') => ({
  primary: colors.primary[theme],
  secondary: colors.secondary[theme],
  tertiary: colors.tertiary[theme],
  background: colors.background[theme],
  card: colors.card[theme],
  text: {
    primary: colors.text.primary[theme],
    secondary: colors.text.secondary[theme],
    white: colors.text.white[theme]
  },
  black: {
    100: colors.black[100][theme],
    200: colors.black[200][theme]
  },
  heroBackground: colors.heroBackground[theme]
});

// Classes CSS para Tailwind
export const getThemeClasses = (theme = 'dark') => ({
  background: theme === 'dark' ? 'bg-primary' : 'bg-white',
  card: theme === 'dark' ? 'bg-tertiary' : 'bg-white',
  text: {
    primary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    secondary: theme === 'dark' ? 'text-secondary' : 'text-gray-600',
    white: theme === 'dark' ? 'text-white-100' : 'text-gray-900'
  },
  border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
});

// Cores específicas para componentes
export const componentColors = {
  navbar: {
    background: {
      dark: 'bg-primary',
      light: 'bg-white'
    },
    text: {
      dark: 'text-white',
      light: 'text-gray-900'
    }
  },
  hero: {
    background: {
      dark: 'bg-primary',
      light: 'bg-white'
    },
    text: {
      dark: 'text-white',
      light: 'text-gray-900'
    }
  },
  footer: {
    background: {
      dark: 'bg-tertiary',
      light: 'bg-gray-50'
    },
    text: {
      dark: 'text-white',
      light: 'text-gray-900'
    }
  },
  whatsapp: {
    background: 'bg-green-500',
    hover: 'hover:bg-green-600'
  },
  themeToggle: {
    background: {
      dark: 'bg-tertiary',
      light: 'bg-gray-100'
    },
    hover: {
      dark: 'hover:bg-secondary',
      light: 'hover:bg-gray-200'
    }
  },
  avatar: {
    background: {
      dark: 'bg-tertiary',
      light: 'bg-[#2f2a1f]'
    },
    hover: {
      dark: 'hover:bg-secondary',
      light: 'hover:bg-[#1a1610]'
    },
    chat: {
      background: {
        dark: 'bg-tertiary',
        light: 'bg-white'
      },
      border: {
        dark: 'border-gray-700',
        light: 'border-gray-200'
      }
    }
  }
};

export default colors;
