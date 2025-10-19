# Sistema de Cores Centralizado

## 📋 Visão Geral

Este sistema centraliza todas as cores do projeto em um único local, facilitando a manutenção e consistência visual.

## 🎨 Estrutura das Cores

### Cores Base
```javascript
import { colors } from '../constants/colors';

// Cores principais
colors.primary.dark    // "#050816"
colors.primary.light   // "#f8fafc"
colors.secondary.dark  // "#aaa6c3"
colors.secondary.light // "#64748b"
```

### Cores de Acento
```javascript
colors.accent.purple   // "#915EFF"
colors.accent.violet   // "#804dee"
colors.accent.green    // "#00cea8"
colors.accent.pink     // "#bf61ff"
```

### Cores de Status
```javascript
colors.status.success  // "#10b981"
colors.status.warning  // "#f59e0b"
colors.status.error    // "#ef4444"
colors.status.info     // "#3b82f6"
```

## 🔧 Como Usar

### 1. Importar as Cores
```javascript
import { colors, getThemeColors, componentColors } from '../constants/colors';
```

### 2. Usar em Componentes
```javascript
const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <div 
      style={{ 
        backgroundColor: colors.primary[theme],
        color: colors.text.primary[theme]
      }}
    >
      Conteúdo
    </div>
  );
};
```

### 3. Usar Classes CSS
```javascript
import { getThemeClasses } from '../constants/colors';

const classes = getThemeClasses(theme);
// classes.background, classes.text.primary, etc.
```

### 4. Usar Cores de Componentes
```javascript
import { componentColors } from '../constants/colors';

// Para botões
className={`${componentColors.whatsapp.background} ${componentColors.whatsapp.hover}`}

// Para navbar
className={`${componentColors.navbar.background[theme]} ${componentColors.navbar.text[theme]}`}
```

## 🎯 Vantagens

- ✅ **Consistência**: Todas as cores em um local
- ✅ **Manutenção**: Fácil de alterar cores globalmente
- ✅ **Temas**: Suporte nativo a dark/light mode
- ✅ **Tipagem**: IntelliSense para todas as cores
- ✅ **Performance**: Cores otimizadas e reutilizáveis

## 📝 Exemplos Práticos

### Botão com Cores Centralizadas
```javascript
const Button = ({ variant = 'primary' }) => {
  const { theme } = useTheme();
  
  const buttonStyles = {
    primary: {
      backgroundColor: colors.accent.purple,
      color: colors.text.primary[theme]
    },
    secondary: {
      backgroundColor: colors.secondary[theme],
      color: colors.text.primary[theme]
    }
  };
  
  return (
    <button style={buttonStyles[variant]}>
      Clique aqui
    </button>
  );
};
```

### Card com Tema Adaptativo
```javascript
const Card = () => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  
  return (
    <div 
      style={{
        backgroundColor: themeColors.card,
        color: themeColors.text.primary,
        border: `1px solid ${themeColors.border}`
      }}
    >
      Conteúdo do card
    </div>
  );
};
```

## 🔄 Migração

Para migrar componentes existentes:

1. **Substituir cores hardcoded**:
   ```javascript
   // Antes
   className="bg-[#050816] text-white"
   
   // Depois
   className={`${componentColors.hero.background[theme]} ${componentColors.hero.text[theme]}`}
   ```

2. **Usar cores de acento**:
   ```javascript
   // Antes
   style={{ color: '#915EFF' }}
   
   // Depois
   style={{ color: colors.accent.purple }}
   ```

3. **Aplicar temas dinamicamente**:
   ```javascript
   // Antes
   className="text-white"
   
   // Depois
   className={getThemeClasses(theme).text.primary}
   ```
