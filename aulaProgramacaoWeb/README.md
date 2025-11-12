# Portal ONG - Plataforma de Voluntariado e Gestão Social

## 📋 Sobre o Projeto

O **Portal ONG** é uma plataforma web profissional desenvolvida para conectar Organizações Não Governamentais (ONGs), voluntários, doadores e apoiadores. A plataforma oferece funcionalidades essenciais para gestão de projetos sociais, engajamento de voluntários e captação de recursos.

Este projeto foi desenvolvido como parte de uma disciplina de Programação Web, aplicando fundamentos de **HTML5 semântico**, **CSS3 responsivo** e **JavaScript interativo**.

## 🎯 Objetivos

- Aplicar fundamentos de HTML5 na criação de estruturas semânticas complexas
- Implementar leiautes responsivos e sistemas de design usando CSS3 avançado
- Desenvolver funcionalidades interativas com JavaScript
- Integrar ferramentas de versionamento e acessibilidade web
- Simular um ambiente de desenvolvimento profissional

## 🚀 Funcionalidades Principais

### Páginas Implementadas

1. **Página Inicial (index.html)**
   - Apresentação da organização
   - Missão, visão e valores
   - Histórico e impacto
   - Seção "Como Participar"
   - Informações de contato
   - Images: hero-ong.jpg, team-org.jpg

2. **Projetos Sociais (projeto.html)**
   - Listagem de 6 projetos sociais em diferentes categorias
   - Sistema de filtros por categoria e localização
   - Cards com informações detalhadas de cada projeto
   - Call-to-action para voluntariado
   - Images: placeholder-project.jpg (múltiplas)

3. **Cadastro de Voluntários (cadastro.html)**
   - Formulário complexo com validação HTML5 nativa
   - Seções agrupadas logicamente:
     - Informações Pessoais (Nome, E-mail, CPF, Telefone, Data de Nascimento)
     - Localização (Endereço, CEP, Cidade, Estado - todos os 27 estados brasileiros)
     - Áreas de Interesse (checkboxes para categorias)
     - Configuração de Senha
     - Termos e Condições
   - Máscaras de input para CPF, Telefone e CEP via JavaScript
   - Validação nativa com padrões (patterns)
   - Image: profile.jpg

### Recursos Técnicos

- ✅ **3+ páginas HTML5 semânticas**
- ✅ **Hierarquia de títulos (h1-h6) lógica e consistente**
- ✅ **Imagens em cada página com alt text descritivo**
- ✅ **Formulário avançado com validação HTML5**
- ✅ **Máscaras de input (CPF, Telefone, CEP)**
- ✅ **Design responsivo mobile-first**
- ✅ **Acessibilidade WCAG (aria-labels, semantic HTML)**
- ✅ **Favicon e ícones PWA**
- ✅ **Footer com redes sociais e newsletter**

## 📁 Estrutura do Projeto

```
aulaProgramacaoWeb/
├── index.html                 # Página inicial
├── projeto.html              # Página de projetos
├── cadastro.html             # Página de cadastro
├── manifest.json             # Manifesto PWA
├── create_images.py          # Script para gerar imagens
├── generate-images.html      # Página para gerar imagens (browser)
├── serve.ps1                 # Script para servir arquivos (PowerShell)
│
├── images/                   # Pasta de imagens
│   ├── favicon.ico          # Ícone do site
│   ├── hero-ong.svg         # Hero image (formato SVG)
│   ├── profile.svg          # Perfil placeholder
│   ├── team-org.svg         # Equipe placeholder
│   ├── placeholder-project.svg # Projeto placeholder
│   ├── icon-192x192.png     # Ícone PWA (pequeno)
│   └── icon-512x512.png     # Ícone PWA (grande)
│
├── js/                       # Arquivos JavaScript
│   ├── app.js               # Inicialização da aplicação
│   ├── main.js              # Funções principais
│   ├── config.js            # Configurações
│   ├── events.js            # Manipulação de eventos
│   ├── form-validation.js   # Validação de formulários
│   ├── input-masks.js       # Máscaras de input (CPF, TEL, CEP)
│   ├── router.js            # Roteamento SPA
│   ├── templates.js         # Templates de componentes
│   ├── projects.js          # Lógica de projetos
│   ├── animations.js        # Animações
│   └── services/            # Serviços e utilitários
│       ├── ui.js            # Manipulação de UI
│       ├── users.js         # Gerenciamento de usuários
│       ├── projects.js      # Serviço de projetos
│       ├── validation.js    # Validação
│       └── animations.js    # Serviço de animações
│
├── styles/                   # Arquivos CSS
│   ├── main.css             # Estilos principais
│   ├── global.css           # Estilos globais
│   ├── header.css           # Estilos do header
│   ├── footer.css           # Estilos do footer
│   └── components.css       # Componentes reutilizáveis
│
└── README.md                # Este arquivo
```

## 🎨 Design e UX

### Paleta de Cores
- **Primário**: Azul (#3b82f6) - Confiança e profissionalismo
- **Secundário**: Verde (#10b981) - Crescimento e impacto social
- **Acentos**: Ciano (#06b6d4), Laranja (#f59e0b)
- **Fundos**: Dark mode (#0f172a, #1e293b)

### Tipografia
- **Font Principal**: Poppins (Google Fonts)
- **Hierarquia**: H1-H6 com tamanhos e pesos definidos

### Responsividade
- **Mobile-first**: Design começando em 320px
- **Breakpoints**: 480px, 768px, 1024px, 1280px
- **Flexbox e Grid**: Para layouts adaptáveis

## ✨ Funcionalidades JavaScript

### Máscaras de Input (input-masks.js)
```javascript
// CPF: 000.000.000-00
// Telefone: (11) 99999-9999
// CEP: 00000-000
```

### Validação de Formulário
- Validação nativa HTML5 com padrões (pattern)
- Feedback visual de erros
- Confirmação de senha
- Verificação de termos

## 🔧 Como Executar

### Opção 1: Servidor Python
```bash
python -m http.server 8000
```
Acesse: `http://localhost:8000`

### Opção 2: Servidor PowerShell (Windows)
```powershell
.\serve.ps1
```

### Opção 3: Abrir diretamente no navegador
Basta abrir qualquer arquivo `.html` no navegador

## 📱 Requisitos de Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões recentes)
- **Responsivo**: Mobile (320px), Tablet (768px), Desktop (1024px+)
- **Acessibilidade**: WCAG 2.1 nível AA
- **PWA**: Suporta instalação como app (manifest.json)

## 🔍 SEO e Meta Tags

Todas as páginas incluem:
- Meta description (até 160 caracteres)
- Meta keywords relevantes
- Favicon
- Apple touch icon
- Manifest para PWA
- Open Graph (recomendado adicionar)

## 📋 Checklist de Requisitos

- [x] 3+ páginas HTML com estrutura semântica
- [x] Hierarquia de títulos lógica (h1-h6)
- [x] Imagens em cada página com alt text
- [x] Página inicial com informações da organização e contato
- [x] Página de projetos com voluntariado e doações
- [x] Página de cadastro com validação
- [x] Formulário com inputs: Nome, Email, CPF, Telefone, Data de Nascimento, Endereço, CEP, Cidade, Estado
- [x] Validação nativa HTML5
- [x] Agrupamento lógico de campos
- [x] Máscaras para CPF, Telefone, CEP
- [x] Design responsivo mobile-first
- [x] Acessibilidade web (WCAG)
- [x] Performance otimizada (lazy loading)

## 🎓 Conceitos Aplicados

### HTML5
- Semântica: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Formulários: tipos de input, validação nativa, datalists
- Multimídia: `<img>`, `<figure>`, `<figcaption>`
- Acessibilidade: ARIA labels, roles

### CSS3
- Custom properties (CSS Variables)
- Flexbox e Grid
- Media queries (mobile-first)
- Animações e transições
- Pseudo-classes e pseudo-elementos

### JavaScript (ES6+)
- Event listeners
- Máscaras de input com regex
- Manipulação de DOM
- Validação de formulários
- LocalStorage (quando necessário)

## 📝 Notas para Desenvolvimento Futuro

1. **Backend**: Integrar API REST para salvar dados de cadastro
2. **Autenticação**: Sistema de login e autenticação
3. **Dashboard**: Painel administrativo para ONGs
4. **Pagamentos**: Integração com gateway de pagamento para doações
5. **Email**: Sistema de notificações por email
6. **Banco de Dados**: Persistência de dados
7. **Analytics**: Google Analytics ou similar
8. **CMS**: Sistema para gerenciar projetos dinamicamente

## 👥 Créditos

Desenvolvido como projeto acadêmico em Programação Web.

## 📄 Licença

Este projeto é fornecido como material educacional.

---

**Última atualização**: Novembro 2025

Para mais informações, entre em contato através da página de contato do portal.