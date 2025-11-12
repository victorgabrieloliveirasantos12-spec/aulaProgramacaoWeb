import { router } from './router.js';
import { UIState } from './services/ui.js';
import { FormManager } from './services/form.js';
import { UserManager } from './services/users.js';
import { Toast } from './services/ui.js';
import { Loading } from './services/ui.js';
import { FormValidation } from './services/validation.js';

export class EventManager {
    constructor() {
        this.userManager = new UserManager();
        this.formManager = new FormManager();
        
        this.init();
    }

    init() {
        this.setupNavigationEvents();
        this.setupFormEvents();
        this.setupUIEvents();
    }

    setupNavigationEvents() {
        // Delegar eventos de navegação para links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                router.navigate(href);
            }
        });

        // Fechar menu mobile ao clicar em um link
        document.addEventListener('click', (e) => {
            const link = e.target.closest('nav a');
            if (link && window.innerWidth <= UIState.breakpoints.mobile) {
                const nav = document.querySelector('.nav-list');
                const menuToggle = document.querySelector('.menu-toggle');
                if (nav && menuToggle) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    setupFormEvents() {
        // Delegação de eventos para formulários
        document.addEventListener('submit', async (e) => {
            if (e.target.matches('form')) {
                e.preventDefault();
                await this.handleFormSubmit(e.target);
            }
        });

        // Salvar rascunhos de formulários
        document.addEventListener('input', (e) => {
            if (e.target.matches('form input, form select, form textarea')) {
                const form = e.target.closest('form');
                if (form?.id) {
                    this.handleFormChange(form);
                }
            }
        });

        // Validação em tempo real
        document.addEventListener('blur', (e) => {
            if (e.target.matches('form input, form select, form textarea')) {
                FormValidation.validateField(e.target, e.target.closest('form'));
            }
        });

        // Aviso de alterações não salvas
        window.addEventListener('beforeunload', (e) => {
            const forms = document.querySelectorAll('form[data-warn-unsaved]');
            for (const form of forms) {
                if (this.formManager.hasUnsavedChanges(form.id)) {
                    e.preventDefault();
                    e.returnValue = '';
                    return;
                }
            }
        });
    }

    setupUIEvents() {
        // Toggle de tema
        const themeToggle = document.querySelector('#theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const newTheme = UIState.theme === 'dark' ? 'light' : 'dark';
                UIState.setTheme(newTheme);
            });
        }

        // Toggle de menu mobile
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav-list');
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
                menuToggle.classList.toggle('open');
                nav.classList.toggle('active');
            });
        }
    }

    async handleFormSubmit(form) {
        if (!FormValidation.validateForm(form)) {
            return;
        }

        const submitButton = form.querySelector('[type="submit"]');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            Loading.show(submitButton);

            switch (form.id) {
                case 'registerForm':
                    await this.handleRegistration(data, form);
                    break;
                case 'loginForm':
                    await this.handleLogin(data, form);
                    break;
                // Adicione outros casos conforme necessário
            }
        } catch (error) {
            Toast.show(error.message, 'error');
        } finally {
            Loading.hide(submitButton);
        }
    }

    async handleRegistration(data, form) {
        try {
            await this.userManager.createUser(data);
            this.formManager.clearDraft(form.id);
            Toast.show('Cadastro realizado com sucesso!', 'success');
            form.reset();
            router.navigate('#');
        } catch (error) {
            Toast.show(error.message, 'error');
        }
    }

    async handleLogin(data, form) {
        try {
            const user = await this.userManager.login(data);
            Toast.show('Login realizado com sucesso!', 'success');
            form.reset();
            router.navigate('#');
        } catch (error) {
            Toast.show(error.message, 'error');
        }
    }

    handleFormChange(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        this.formManager.saveDraft(form.id, data);
    }
}