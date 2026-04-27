# Instituto Dr Túlio Reis — Saúde & Performance

Site institucional com painel administrativo completo para gerenciar todos os conteúdos do site.

## 🚀 Como usar

Abra `index.html` diretamente no navegador (ou sirva com qualquer servidor HTTP estático).

### Área Administrativa

Acesse `/admin/` ou clique em "Admin" no menu do site.

**Credenciais padrão:**
- **Usuário:** `admin`  
- **Senha:** `admin@idtr2024`

> ⚠️ Altere a senha no arquivo `assets/js/admin.js` antes de colocar em produção.

## 📁 Estrutura do Projeto

```
institutoDrTulioReis/
├── index.html                    # Site público
├── assets/
│   ├── css/
│   │   ├── style.css             # Estilos do site público
│   │   └── admin.css             # Estilos do painel admin
│   └── js/
│       ├── cms.js                # Camada de dados (localStorage)
│       ├── admin.js              # Utilitários do admin
│       ├── sidebar.js            # Sidebar compartilhada do admin
│       └── main.js               # JavaScript do site público
└── admin/
    ├── index.html                # Login
    ├── dashboard.html            # Dashboard
    ├── servicos.html             # Gerenciar serviços
    ├── equipe.html               # Gerenciar equipe
    ├── depoimentos.html          # Gerenciar depoimentos
    ├── agendamentos.html         # Gerenciar agendamentos
    ├── mensagens.html            # Ver mensagens de contato
    ├── galeria.html              # Gerenciar galeria
    ├── artigos.html              # Gerenciar artigos/blog
    └── configuracoes.html        # Configurações do site
```

## 🛠 Funcionalidades

### Site Público
- ✅ Design responsivo e profissional
- ✅ Seções: Hero, Sobre, Serviços, Equipe, Depoimentos, Galeria, Artigos, Contato
- ✅ Formulário de agendamento (salva no painel admin)
- ✅ Botão de WhatsApp flutuante
- ✅ Animações suaves com Intersection Observer
- ✅ Conteúdo carregado dinamicamente pelo CMS

### Painel Administrativo
- ✅ Login seguro com sessão de navegador
- ✅ **Dashboard** — estatísticas, agendamentos e mensagens recentes
- ✅ **Serviços** — CRUD completo com ícones Font Awesome
- ✅ **Equipe** — CRUD com suporte a foto via URL
- ✅ **Depoimentos** — CRUD com avaliação por estrelas
- ✅ **Agendamentos** — gerenciamento de status (Novo → Confirmado → Concluído)
- ✅ **Mensagens** — caixa de entrada com leitura e resposta por e-mail
- ✅ **Galeria** — adicionar/remover imagens com preview
- ✅ **Artigos** — editor de blog com rascunho/publicação
- ✅ **Configurações** — todas as informações do site em um só lugar
- ✅ Notificações de toast
- ✅ Layout responsivo (mobile-friendly)

## 💾 Armazenamento de Dados

Os dados são armazenados no **localStorage** do navegador sob a chave `idtr_cms_v1`. Isso significa:
- Não requer servidor ou banco de dados
- Os dados persistem entre sessões no mesmo navegador
- Para backup, use as Configurações → exportar (futuro)

## 🎨 Tecnologias

- HTML5, CSS3, JavaScript puro (Vanilla JS)
- [Bootstrap Icons via Font Awesome 6](https://fontawesome.com/)
- [Google Fonts — Poppins](https://fonts.google.com/specimen/Poppins)
- localStorage para persistência de dados

## 📞 Contato Padrão

Configure as informações de contato em **Admin → Configurações**.
