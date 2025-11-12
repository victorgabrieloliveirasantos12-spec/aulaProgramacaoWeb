import { APP_CONFIG } from '../config.js';

// Small UI state manager
export const UIState = {
  theme: (APP_CONFIG && APP_CONFIG.theme && APP_CONFIG.theme.default) || 'light',
  setTheme(theme) {
    this.theme = theme;
    try { document.documentElement.setAttribute('data-theme', theme); } catch (e) {}
    if (APP_CONFIG && APP_CONFIG.theme && APP_CONFIG.theme.storage) {
      localStorage.setItem(APP_CONFIG.theme.storage, theme);
    }
  },
  setLoading(isLoading) {
    try { document.documentElement.dataset.loading = isLoading ? 'true' : 'false'; } catch (e) {}
  }
};

// Toast helper
export const Toast = {
  container: null,
  init() {
    this.container = document.querySelector('.toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      this.container.setAttribute('aria-live', 'polite');
      this.container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(this.container);
    }
  },
  show(message, type = 'info') {
    if (!this.container) this.init();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    this.container.appendChild(toast);

    const duration = (APP_CONFIG && APP_CONFIG.ui && APP_CONFIG.ui.toastDuration) || 3000;
    setTimeout(() => toast.remove(), duration);
  }
};

// Modal helper
export const Modal = {
  open(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  },
  close(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  },
  init() {
    document.addEventListener('click', (e) => {
      // Abrir modal
      const openTrigger = e.target.closest('[data-modal-target]');
      if (openTrigger) {
        const target = openTrigger.getAttribute('data-modal-target');
        this.open(target);
      }

      // Fechar modal
      if (e.target.closest('.modal-close')) {
        const modal = e.target.closest('.modal');
        if (modal && modal.id) this.close(modal.id);
      }

      // Clique fora do modal para fechar
      const modalBackdrop = e.target.closest('.modal');
      if (modalBackdrop && e.target === modalBackdrop && modalBackdrop.id) {
        this.close(modalBackdrop.id);
      }
    });
  }
};

// Loading helper
export const Loading = {
  show(element) {
    if (!element) return;
    if (element instanceof HTMLButtonElement) element.setAttribute('disabled', 'true');
    element.setAttribute('aria-busy', 'true');
    UIState.setLoading(true);
  },
  hide(element) {
    if (!element) return;
    if (element instanceof HTMLButtonElement) element.removeAttribute('disabled');
    element.setAttribute('aria-busy', 'false');
    UIState.setLoading(false);
  }
};

// Simple UI manager
export class UIManager {
  constructor() {
    this.menuToggle = null;
    this.mainNav = null;
  }

  init() {
    Toast.init();
    this.menuToggle = document.querySelector('.menu-toggle');
    this.mainNav = document.querySelector('.main-nav');
    if (this.menuToggle && this.mainNav) this.setupMobileMenu();
  }

  setupMobileMenu() {
    if (!this.menuToggle || !this.mainNav) return;
    this.menuToggle.addEventListener('click', () => {
      const isExpanded = this.menuToggle.getAttribute('aria-expanded') === 'true';
      this.menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
      this.mainNav.classList.toggle('active');
      this.menuToggle.classList.toggle('active');
    });

    this.mainNav.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (target && target.classList.contains('nav-link')) {
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.mainNav.classList.remove('active');
      }
    });
  }

  showToast(message, type = 'info') {
    Toast.show(message, type);
  }

  setTheme(theme) {
    UIState.setTheme(theme);
  }
}

// Initialize some behaviors on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  Toast.init();
  Modal.init();
});

export default UIManager;
