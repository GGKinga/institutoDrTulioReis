/**
 * cms.js — Content Management System for Instituto Dr Túlio Reis
 * Uses localStorage for data persistence (no server required).
 */
const CMS = (() => {
  const STORAGE_KEY = 'idtr_cms_v1';

  const defaultData = {
    settings: {
      siteName: 'Instituto Dr Túlio Reis',
      tagline: 'Saúde & Performance',
      phone: '(11) 99999-9999',
      whatsapp: '5511999999999',
      email: 'contato@institutodrtulioreis.com.br',
      address: 'Rua da Saúde, 100 — Jardim América, São Paulo — SP',
      facebook: 'https://facebook.com/',
      instagram: 'https://instagram.com/',
      youtube: '',
      linkedin: '',
      heroTitle: 'Sua Saúde e Performance em Boas Mãos',
      heroSubtitle: 'Cuidamos de você com excelência, ciência e dedicação personalizada.',
      heroCta: 'Agendar Consulta',
      about: 'O Instituto Dr Túlio Reis é um centro de excelência em saúde e performance, ' +
        'dedicado a oferecer cuidados integrais para atletas e pacientes que buscam qualidade de vida. ' +
        'Com uma equipe multidisciplinar altamente qualificada, unimos medicina, nutrição, fisioterapia ' +
        'e psicologia para resultados extraordinários.',
    },
    services: [
      { id: 1, title: 'Medicina Esportiva', description: 'Avaliação e acompanhamento médico especializado para atletas e praticantes de atividade física de todos os níveis.', icon: 'fa-heartbeat', active: true },
      { id: 2, title: 'Nutrição Esportiva', description: 'Planejamento alimentar personalizado para otimizar o desempenho físico e promover a saúde a longo prazo.', icon: 'fa-apple-alt', active: true },
      { id: 3, title: 'Fisioterapia', description: 'Tratamento e reabilitação de lesões musculoesqueléticas com técnicas modernas e eficazes.', icon: 'fa-hand-holding-heart', active: true },
      { id: 4, title: 'Psicologia Esportiva', description: 'Suporte psicológico para melhorar o foco, a motivação e a resiliência mental de atletas e pacientes.', icon: 'fa-brain', active: true },
      { id: 5, title: 'Avaliação Física', description: 'Testes e avaliações funcionais completas para identificar seu nível de condicionamento e traçar metas reais.', icon: 'fa-dumbbell', active: true },
      { id: 6, title: 'Reabilitação', description: 'Programas de reabilitação pós-cirúrgica e pós-lesão com acompanhamento contínuo e individualizado.', icon: 'fa-procedures', active: true },
    ],
    team: [
      { id: 1, name: 'Dr. Túlio Reis', role: 'Fundador — Médico Esportivo', bio: 'Especialista em Medicina Esportiva com mais de 15 anos de experiência. Formado pela USP, com pós-graduação em Harvard.', photo: '', active: true },
      { id: 2, name: 'Dra. Ana Silva', role: 'Nutricionista Esportiva', bio: 'Especialista em nutrição para alta performance, com ampla experiência em acompanhamento de atletas de elite.', photo: '', active: true },
      { id: 3, name: 'Dr. Carlos Santos', role: 'Fisioterapeuta', bio: 'Especialista em reabilitação esportiva e tratamento de lesões musculoesqueléticas.', photo: '', active: true },
      { id: 4, name: 'Dra. Maria Costa', role: 'Psicóloga Esportiva', bio: 'Especialista em psicologia do esporte e treinamento mental para otimização do desempenho.', photo: '', active: true },
    ],
    testimonials: [
      { id: 1, name: 'João Mendes', role: 'Maratonista Amateur', text: 'O Instituto transformou minha preparação. Com o acompanhamento do Dr. Túlio e da equipe, quebrei meu recorde pessoal em 12 minutos!', rating: 5, active: true },
      { id: 2, name: 'Carla Oliveira', role: 'Paciente', text: 'Após minha cirurgia no joelho, a reabilitação aqui foi essencial. Voltei a correr em tempo recorde graças ao time de fisioterapia.', rating: 5, active: true },
      { id: 3, name: 'Ricardo Lima', role: 'Ciclista Profissional', text: 'A abordagem integrada do Instituto é diferenciada. Nutrição, psicologia e medicina trabalhando juntas fez toda a diferença na minha temporada.', rating: 5, active: true },
    ],
    gallery: [],
    articles: [
      { id: 1, title: 'Como a nutrição impacta o seu desempenho esportivo', slug: 'nutricao-desempenho-esportivo', excerpt: 'Saiba como uma alimentação adequada pode ser o diferencial para atingir seus objetivos esportivos.', content: '', author: 'Dra. Ana Silva', date: '2024-03-15', published: true, coverImage: '' },
      { id: 2, title: 'Lesões mais comuns no esporte e como preveni-las', slug: 'lesoes-comuns-prevencao', excerpt: 'Conheça as lesões mais frequentes entre atletas e praticantes de atividade física, e saiba como se proteger.', content: '', author: 'Dr. Carlos Santos', date: '2024-02-20', published: true, coverImage: '' },
    ],
    appointments: [],
    messages: [],
  };

  // ──────────────────────────────────────────────────────────────────
  // Core helpers
  // ──────────────────────────────────────────────────────────────────
  function _read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(defaultData));
      const stored = JSON.parse(raw);
      // Merge top-level keys so new defaults are always present
      return Object.assign({}, defaultData, stored, {
        settings: Object.assign({}, defaultData.settings, stored.settings || {}),
      });
    } catch {
      return JSON.parse(JSON.stringify(defaultData));
    }
  }

  function _write(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // ──────────────────────────────────────────────────────────────────
  // Public API
  // ──────────────────────────────────────────────────────────────────
  function get(key) {
    const data = _read();
    return key ? data[key] : data;
  }

  function set(key, value) {
    const data = _read();
    data[key] = value;
    _write(data);
  }

  function addItem(collection, item) {
    const data = _read();
    item.id = Date.now() + Math.floor(Math.random() * 1000);
    item.createdAt = new Date().toISOString();
    if (!data[collection]) data[collection] = [];
    data[collection].push(item);
    _write(data);
    return item;
  }

  function updateItem(collection, id, updates) {
    const data = _read();
    const idx = (data[collection] || []).findIndex(i => String(i.id) === String(id));
    if (idx !== -1) {
      data[collection][idx] = Object.assign({}, data[collection][idx], updates);
      _write(data);
      return data[collection][idx];
    }
    return null;
  }

  function deleteItem(collection, id) {
    const data = _read();
    data[collection] = (data[collection] || []).filter(i => String(i.id) !== String(id));
    _write(data);
  }

  function getItem(collection, id) {
    return (get(collection) || []).find(i => String(i.id) === String(id)) || null;
  }

  function reset() {
    _write(JSON.parse(JSON.stringify(defaultData)));
  }

  function init() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      _write(JSON.parse(JSON.stringify(defaultData)));
    }
  }

  return { get, set, addItem, updateItem, deleteItem, getItem, reset, init };
})();
