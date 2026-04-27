/**
 * admin.js — Shared admin panel utilities for Instituto Dr Túlio Reis
 * Handles: authentication, sidebar active state, toast notifications.
 */
const Admin = (() => {
  const SESSION_KEY = 'idtr_admin_session';
  const CREDENTIALS = { username: 'admin', password: 'admin@idtr2024' };

  // ── Auth ─────────────────────────────────────────────────────────
  function isLoggedIn() {
    return !!sessionStorage.getItem(SESSION_KEY);
  }

  function checkAuth() {
    if (!isLoggedIn()) {
      window.location.href = 'index.html';
    }
  }

  function login(username, password) {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username, at: Date.now() }));
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
  }

  // ── Sidebar ───────────────────────────────────────────────────────
  function initSidebar() {
    const page = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
      if (link.getAttribute('href') === page) {
        link.classList.add('active');
      }
    });

    // Mobile hamburger toggle
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('adminSidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
      });
    }

    // Logout button
    document.querySelectorAll('[data-action="logout"]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        logout();
      });
    });
  }

  // ── Toast notifications ───────────────────────────────────────────
  function showToast(message, type = 'success') {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle',
    };
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
    };

    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;display:flex;flex-direction:column;gap:.5rem;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      display:flex;align-items:center;gap:.75rem;padding:.85rem 1.25rem;
      border-radius:.5rem;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,.15);
      border-left:4px solid ${colors[type] || colors.success};
      font-size:.9rem;min-width:260px;max-width:360px;
      animation:toastIn .3s ease;
    `;
    toast.innerHTML = `
      <i class="fas ${icons[type] || icons.success}" style="color:${colors[type]};font-size:1.1rem;flex-shrink:0;"></i>
      <span>${message}</span>
      <button onclick="this.parentElement.remove()" style="margin-left:auto;background:none;border:none;cursor:pointer;color:#6b7280;font-size:1rem;">&times;</button>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  // ── Confirm dialog ────────────────────────────────────────────────
  function confirm(message) {
    return window.confirm(message);
  }

  // ── Format helpers ────────────────────────────────────────────────
  function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('pt-BR');
  }

  function formatDateTime(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('pt-BR');
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ── Badge helpers ─────────────────────────────────────────────────
  function badge(text, color) {
    return `<span class="admin-badge admin-badge--${color}">${text}</span>`;
  }

  return { isLoggedIn, checkAuth, login, logout, initSidebar, showToast, confirm, formatDate, formatDateTime, escapeHtml, badge };
})();

// Inject global toast animation style once
(function injectStyle() {
  const s = document.createElement('style');
  s.textContent = '@keyframes toastIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}';
  document.head.appendChild(s);
})();
