# 🚀 Guia Rápido de Teste - Portal ONG

## ✅ Para Validar o Projeto

### 1. Abra o Projeto no Navegador

#### Opção A: Python (Recomendado)
```bash
# No terminal, navegue até a pasta do projeto
cd "c:\Users\Samsung\OneDrive\Área de Trabalho\aulaProgramacaoWeb\aulaProgramacaoWeb"

# Execute
python -m http.server 8000

# Abra no navegador
# http://localhost:8000
```

#### Opção B: PowerShell (Windows)
```powershell
# Na pasta do projeto
.\serve.ps1
# Ou faça duplo clique no arquivo serve.ps1
```

#### Opção C: Abrir Direto
```
Clique com botão direito em index.html → Abrir com → Navegador
```

---

## 📋 Checklist de Teste

### Página Inicial (index.html)
- [ ] Título: "Bem-vindo ao Portal ONG" (h1)
- [ ] 3 imagens visíveis (hero-ong, team-org, etc)
- [ ] Seções: Missão/Visão/Valores, História, Impacto, Como Participar
- [ ] Contato com endereço, telefone e email
- [ ] Link "Explorar Projetos" funciona (vai para projeto.html)
- [ ] Link "Participar" funciona (vai para cadastro.html)
- [ ] Footer com links, redes sociais e newsletter

### Página de Projetos (projeto.html)
- [ ] Título: "Nossos Projetos Sociais" (h1)
- [ ] 6 cards de projetos em grid responsivo
- [ ] Cada card tem: imagem, título, categoria, descrição, localização, vagas, botão
- [ ] Filtros funcionam (categoria e localização)
- [ ] Imagens carregam com lazy loading
- [ ] Layout responsivo em mobile

### Página de Cadastro (cadastro.html)
- [ ] Formulário com h1 "Faça Parte da Nossa Comunidade"
- [ ] **Campos verificados**:
  - [ ] Nome Completo (obrigatório)
  - [ ] Email (obrigatório, validação)
  - [ ] CPF (obrigatório, máscara 000.000.000-00)
  - [ ] Telefone (obrigatório, máscara (11) 99999-9999)
  - [ ] Data de Nascimento (obrigatório, tipo date)
  - [ ] Endereço (obrigatório)
  - [ ] CEP (obrigatório, máscara 00000-000)
  - [ ] Cidade (obrigatório)
  - [ ] Estado (select com 27 estados)
- [ ] **Máscaras funcionando**:
  - [ ] Digite "12345678901" em CPF → aparece "123.456.789-01"
  - [ ] Digite "11987654321" em Telefone → aparece "(11) 98765-4321"
  - [ ] Digite "01234567" em CEP → aparece "01234-567"
- [ ] Checkboxes de áreas de interesse funcionam
- [ ] Campos de senha com confirmação
- [ ] Checkbox de Termos (obrigatório)
- [ ] Botão "Criar minha conta" presente

---

## 🎨 Verificar Responsividade

### No Navegador (F12 - DevTools)

1. **Testar Mobile (320px)**
   - [ ] Abra DevTools (F12)
   - [ ] Clique em "Toggle device toolbar" (Ctrl+Shift+M)
   - [ ] Selecione iPhone/Mobile 320px
   - [ ] Verifique se o menu hambúrguer aparece
   - [ ] Toque em menu → deve expandir
   - [ ] Conteúdo não deve sair da tela

2. **Testar Tablet (768px)**
   - [ ] Mude para Tablet
   - [ ] Layout deve ser intermediário (nem mobile, nem desktop)
   - [ ] Menu deve estar acessível

3. **Testar Desktop (1024px+)**
   - [ ] Volte para desktop view
   - [ ] Layout deve estar completo
   - [ ] Grid de projetos com múltiplas colunas
   - [ ] Menu horizontal (sem hambúrguer)

---

## ♿ Testar Acessibilidade

1. **Navegação por Teclado**
   - [ ] Pressione Tab repetidamente
   - [ ] Veja os links e botões ficarem focados (outline visível)
   - [ ] Tab em todos os campos do formulário
   - [ ] Escape fecha menu (se implementado)

2. **Leitores de Tela** (opcional)
   - [ ] Use Narrator (Windows) ou VoiceOver (Mac)
   - [ ] Verifique se ARIA labels são lidos

3. **Contraste**
   - [ ] Texto deve ser legível em todos os backgrounds
   - [ ] Verifique com ferramentas como WCAG Contrast Checker

---

## 🔍 Verificar Imagens

- [ ] Todas as imagens estão carregando
- [ ] Imagens têm alt text descritivo
- [ ] Imagens são responsivas (não quebram layout em mobile)
- [ ] Lazy loading ativo (inspecione com DevTools)

---

## 🧪 Testar Validação de Formulário

1. **Tente enviar o formulário vazio**
   - [ ] Navegador deve mostrar mensagem de erro

2. **Email inválido**
   - [ ] Digite "abc" em email
   - [ ] Navegador avisa que não é email válido

3. **CPF inválido**
   - [ ] Digite "123" em CPF
   - [ ] Deve rejeitar (padrão incorreto)

4. **Senhas não conferem**
   - [ ] Digite "abc123456" em senha
   - [ ] Digite "xyz123456" em confirmar
   - [ ] Deve avisar que não conferem

---

## 📊 Testar Performance

1. **DevTools → Lighthouse**
   - [ ] Abra DevTools (F12)
   - [ ] Clique em "Lighthouse"
   - [ ] Clique em "Generate report"
   - [ ] Verifique pontuação (almeja 80+)

2. **Tempo de Carregamento**
   - [ ] DevTools → Network
   - [ ] Recarregue a página
   - [ ] Tempo total deve ser < 5 segundos

---

## 🔗 Links Internos Funcionam?

- [ ] index.html → projeto.html (botão "Explorar Projetos")
- [ ] index.html → cadastro.html (botão "Participar")
- [ ] projeto.html → cadastro.html (botão "Saiba Mais")
- [ ] projeto.html → index.html (Logo/Home)
- [ ] cadastro.html → index.html (Logo/Home)
- [ ] Footer links navegam corretamente

---

## ✨ Validar CSS

- [ ] Dark mode ativo (fundo escuro)
- [ ] Cores consistentes (azul primário, verde secundário)
- [ ] Tipografia clara (Poppins)
- [ ] Espaçamento equilibrado
- [ ] Hover effects funcionam (botões mudam cor)
- [ ] Transições suaves ao passar mouse

---

## 🎯 Resultado Final

Se todos os items acima forem ✅, o projeto está:
- ✅ Funcionalmente completo
- ✅ Responsivo
- ✅ Acessível
- ✅ Bem estruturado
- ✅ Pronto para apresentação

---

## 💡 Dicas

- Limpe cache do navegador se algo não funcionar (Ctrl+Shift+Delete)
- Tente em diferentes navegadores (Chrome, Firefox, Safari, Edge)
- Se as máscaras não funcionarem, verifique o console (F12 → Console) para erros
- Para debug, abra DevTools e inspecione elementos (F12)

**Sucesso! 🎉**
