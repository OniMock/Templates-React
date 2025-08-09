# Template de Sistema de Internacionalização (i18n)

Este template fornece um sistema completo de internacionalização para aplicações React/TypeScript, incluindo detecção automática de idioma, persistência via cookies, seletor visual de idiomas com bandeiras, e arquitetura escalável para múltiplos idiomas.

## 🚀 Características

- ✅ **Detecção automática de idioma** baseada no navegador
- ✅ **Persistência via cookies** para lembrar a preferência do usuário
- ✅ **Seletor visual** com bandeiras dos países
- ✅ **Suporte a variáveis** nas traduções (ex: `{name}`, `{year}`)
- ✅ **TypeScript** com tipagem completa
- ✅ **12 idiomas pré-configurados**
- ✅ **Interface responsiva** e moderna
- ✅ **Fallback inteligente** para idiomas não encontrados

## 📦 Dependências Necessárias

```bash
npm install lucide-react flag-icons
```

### Dependências de desenvolvimento (se usando Tailwind CSS):
```bash
npm install -D tailwindcss-animate
```

## 🛠️ Como Usar Este Template

### 1. Copie os arquivos para seu projeto:

```
src/
├── contexts/
│   ├── LanguageContext.ts
│   ├── LanguageProvider.tsx
│   └── LanguageSelector.tsx
├── hooks/
│   └── use-language.ts
├── types/
│   └── language.ts
├── utils/
│   └── cookies.ts
└── lang/
    ├── index.ts
    ├── en.ts
    ├── pt-br.ts
    └── [outros idiomas...]
```

### 2. Configure o CSS para as bandeiras:

Adicione ao seu arquivo CSS principal (index.css ou App.css):

```css
@import "flag-icons/css/flag-icons.min.css";
```

### 3. Configure o Provider na raiz da aplicação:

```tsx
// main.tsx ou App.tsx
import { LanguageProvider } from './contexts/LanguageProvider';

function App() {
  return (
    <LanguageProvider>
      {/* Sua aplicação aqui */}
    </LanguageProvider>
  );
}
```

### 4. Use o hook em qualquer componente:

```tsx
import { useLanguage } from './hooks/use-language';

function MeuComponente() {
  const { t, currentLanguage, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.message', { name: 'João' })}</p>
    </div>
  );
}
```

### 5. Adicione o seletor de idiomas:

```tsx
import LanguageSelector from './contexts/LanguageSelector';

function Header() {
  return (
    <header>
      {/* Outros elementos do header */}
      <LanguageSelector />
    </header>
  );
}
```

## 📝 Adicionando Novas Traduções

### 1. Crie um novo arquivo de idioma:

```typescript
// src/lang/fr.ts
import { LanguageFile } from '../types/language';

const fr: LanguageFile = {
  config: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: 'fr', // Código da bandeira (flag-icons)
  },
  translations: {
    'welcome.title': 'Bienvenue',
    'welcome.message': 'Bonjour {name}!',
    // Adicione suas traduções aqui
  },
};

export default fr;
```

### 2. Registre o idioma no index.ts:

```typescript
// src/lang/index.ts
import fr from './fr';

export const languageFiles: Record<string, LanguageFile> = {
  // ... outros idiomas
  fr, // Adicione aqui
};
```

## 🎨 Customização do Seletor

O componente `LanguageSelector` pode ser customizado alterando as classes CSS. Ele usa:

- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **Flag Icons** para bandeiras dos países

### ⚠️ IMPORTANTE - Tema do Seletor:

**O seletor deve seguir o tema do seu site/aplicação:**
- Se seu site usa tema escuro, adapte as cores para tema escuro
- Se seu site usa tema claro, adapte as cores para tema claro
- Se tem suporte a múltiplos temas, implemente a mesma lógica no seletor

### Exemplo de customização:

```tsx
// Modifique as classes no LanguageSelector.tsx para seguir seu tema
// Tema escuro (exemplo atual):
className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 glass-card hover:bg-white/10 rounded-lg"

// Tema claro (exemplo):
className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-300 bg-white/80 hover:bg-white/90 rounded-lg border border-gray-200"
```

### Adaptação Automática de Tema:

Se seu site suporta múltiplos temas, você pode usar classes condicionais:

```tsx
// Exemplo com tema dinâmico
const isDark = theme === 'dark'; // ou use seu hook de tema

className={`flex items-center gap-2 px-3 py-2 transition-colors duration-300 rounded-lg ${
  isDark 
    ? 'text-gray-300 hover:text-white glass-card hover:bg-white/10' 
    : 'text-gray-700 hover:text-gray-900 bg-white/80 hover:bg-white/90 border border-gray-200'
}`}
```

## 🌍 Idiomas Pré-configurados

- 🇺🇸 English (en)
- 🇧🇷 Português Brasil (pt-br)
- 🇨🇳 中文 (zh)
- 🇪🇸 Español (es)
- 🇮🇳 हिन्दी (hi)
- 🇸🇦 العربية (ar)
- 🇫🇷 Français (fr)
- 🇷🇺 Русский (ru)
- 🇩🇪 Deutsch (de)
- 🇮🇹 Italiano (it)
- 🇯🇵 日本語 (ja)
- 🇰🇷 한국어 (ko)

## 🔧 Configurações Avançadas

### Alterar idioma padrão:

```typescript
// src/contexts/LanguageProvider.tsx
const DEFAULT_LANGUAGE = 'pt-br'; // Altere aqui
```

### Alterar nome do cookie:

```typescript
// src/contexts/LanguageProvider.tsx
const LANGUAGE_COOKIE = 'meu_idioma_preferido'; // Altere aqui
```

### Alterar tempo de expiração do cookie:

```typescript
// src/utils/cookies.ts
setCookie(name, value, 730); // 730 dias = 2 anos
```

## 🤖 Prompt para IA

Use este prompt quando quiser que uma IA implemente este sistema:

---

**PROMPT PARA IA:**

Implemente um sistema completo de internacionalização (i18n) em React/TypeScript usando este template. O sistema deve incluir:

1. **Estrutura de arquivos**: Copie exatamente a estrutura de pastas e arquivos do template
2. **Dependências**: Instale `lucide-react` e `flag-icons`
3. **Provider**: Configure o LanguageProvider na raiz da aplicação
4. **Traduções**: Crie arquivos de tradução para pelo menos inglês e português brasileiro
5. **Seletor**: Implemente o LanguageSelector no header/navegação
6. **Hook**: Use o hook useLanguage nos componentes que precisam de tradução
7. **CSS**: Configure as flag-icons no CSS principal
8. **Cookies**: O sistema deve persistir a preferência do usuário
9. **Detecção**: Deve detectar automaticamente o idioma do navegador
10. **Variáveis**: Suporte a variáveis nas traduções usando {variavel}

Siga exatamente a estrutura e padrões do template fornecido. Adapte apenas as chaves de tradução para o contexto específico do projeto.

---

## 📚 Exemplo de Uso Completo

Veja a pasta `exemplo/` para um projeto completo funcionando com este sistema de internacionalização.

## 🐛 Troubleshooting

### Bandeiras não aparecem:
- Verifique se importou o CSS: `@import "flag-icons/css/flag-icons.min.css";`
- Confirme se instalou: `npm install flag-icons`

### Traduções não funcionam:
- Verifique se o LanguageProvider está envolvendo sua aplicação
- Confirme se as chaves de tradução existem nos arquivos de idioma

### Idioma não persiste:
- Verifique se os cookies estão habilitados no navegador
- Confirme se o domínio permite cookies

## 📄 Licença

Este template é de uso livre. Adapte conforme necessário para seus projetos.