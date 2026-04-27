/**
 * sidebar.js — Injects the shared admin sidebar HTML.
 * Include BEFORE admin.js on every admin page (except login).
 */
(function injectSidebar() {
  const html = `
<aside class="admin-sidebar" id="adminSidebar">
  <div class="sidebar-brand">
    <div class="sidebar-brand-icon"><i class="fas fa-heartbeat"></i></div>
    <div>
      <div class="sidebar-brand-text">Dr Túlio Reis</div>
      <div class="sidebar-brand-sub">Painel Administrativo</div>
    </div>
  </div>

  <nav class="sidebar-nav">
    <div class="sidebar-section-label">Principal</div>
    <a href="dashboard.html">
      <span class="icon"><i class="fas fa-tachometer-alt"></i></span> Dashboard
    </a>

    <div class="sidebar-section-label">Conteúdo do Site</div>
    <a href="servicos.html">
      <span class="icon"><i class="fas fa-stethoscope"></i></span> Serviços
    </a>
    <a href="equipe.html">
      <span class="icon"><i class="fas fa-user-md"></i></span> Equipe
    </a>
    <a href="depoimentos.html">
      <span class="icon"><i class="fas fa-comments"></i></span> Depoimentos
    </a>
    <a href="galeria.html">
      <span class="icon"><i class="fas fa-images"></i></span> Galeria
    </a>
    <a href="artigos.html">
      <span class="icon"><i class="fas fa-newspaper"></i></span> Artigos
    </a>

    <div class="sidebar-section-label">Atendimento</div>
    <a href="agendamentos.html" id="sidebarApptLink">
      <span class="icon"><i class="fas fa-calendar-check"></i></span> Agendamentos
      <span class="sidebar-badge" id="sidebarApptBadge" style="display:none">0</span>
    </a>
    <a href="mensagens.html" id="sidebarMsgLink">
      <span class="icon"><i class="fas fa-envelope"></i></span> Mensagens
      <span class="sidebar-badge" id="sidebarMsgBadge" style="display:none">0</span>
    </a>

    <div class="sidebar-section-label">Sistema</div>
    <a href="configuracoes.html">
      <span class="icon"><i class="fas fa-cog"></i></span> Configurações
    </a>
    <a href="../index.html" target="_blank">
      <span class="icon"><i class="fas fa-external-link-alt"></i></span> Ver Site
    </a>
  </nav>

  <div class="sidebar-footer">
    <a href="#" data-action="logout">
      <i class="fas fa-sign-out-alt"></i> Sair
    </a>
  </div>
</aside>`;

  const placeholder = document.getElementById('sidebarPlaceholder');
  if (placeholder) {
    placeholder.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML('afterbegin', html);
  }

  // Update notification badges
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof CMS === 'undefined') return;
    const appointments = (CMS.get('appointments') || []).filter(a => a.status === 'novo');
    const messages = (CMS.get('messages') || []).filter(m => !m.read);

    const apptBadge = document.getElementById('sidebarApptBadge');
    if (apptBadge && appointments.length > 0) {
      apptBadge.textContent = appointments.length;
      apptBadge.style.display = '';
    }
    const msgBadge = document.getElementById('sidebarMsgBadge');
    if (msgBadge && messages.length > 0) {
      msgBadge.textContent = messages.length;
      msgBadge.style.display = '';
    }
  });
})();
