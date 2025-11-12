// Importar módulos
import { APP_CONFIG, $, $$ } from './config.js';
import { UIState, Toast, Modal, Loading } from './services/ui.js';
import { FormValidation } from './services/validation.js';
import { UserManager, FormManager } from './services/users.js';
import { ProjectsManager } from './services/projects.js';
import { AnimationManager } from './services/animations.js';

// Inicialização dos serviços
const userManager = new UserManager();
const projectsManager = new ProjectsManager();
const animationManager = new AnimationManager();

// Inicialização dos Eventos do DOM
const DOMEvents = {
    init() {
        this.setupNavigationEvents();
        this.setupFormEvents();
        this.setupUIEvents();
        
        // Inicializar outros serviços
        Modal.init();
        Toast.init();
        projectsManager.init();
        animationManager.init();
    },

    setupNavigationEvents() {
        $$('.nav-list a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) {
                    window.location.hash = href;
                }
            });
        });
    },

    setupFormEvents() {
        document.addEventListener('submit', (e) => {
            if (e.target.matches('form')) {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.matches('form input, form select, form textarea')) {
                const form = e.target.closest('form');
                if (form && form.id) {
                    this.handleFormChange(form);
                }
            }
        });
    },

    setupUIEvents() {
        // Theme Toggle
        const themeToggle = $('#theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const newTheme = UIState.theme === 'dark' ? 'light' : 'dark';
                UIState.setTheme(newTheme);
            });
        }
    },

    async handleFormSubmit(form) {
        if (!FormValidation.validateForm(form)) {
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            Loading.show(form.querySelector('[type="submit"]'));

            if (form.id === 'registerForm') {
                await this.handleRegistration(data, form);
            } else if (form.id === 'loginForm') {
                await this.handleLogin(data, form);
            }
        } catch (error) {
            Toast.show(error.message, 'error');
        } finally {
            Loading.hide(form.querySelector('[type="submit"]'));
        }
    },

    async handleRegistration(data, form) {
        try {
            await userManager.createUser(data);
            FormManager.clearDraft(form.id);
            Toast.show('Cadastro realizado com sucesso!', 'success');
            form.reset();
            window.location.hash = '#';
        } catch (error) {
            Toast.show(error.message, 'error');
        }
    },

    async handleLogin(data, form) {
        try {
            const user = userManager.findUserByEmail(data.email);
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            // Aqui você implementaria a lógica de verificação de senha
            
            Toast.show('Login realizado com sucesso!', 'success');
            form.reset();
            window.location.hash = '#';
        } catch (error) {
            Toast.show(error.message, 'error');
        }
    },

    handleFormChange(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        FormManager.saveDraft(form.id, data);
    }
};

// Inicialização do Aplicativo
document.addEventListener('DOMContentLoaded', () => {
    DOMEvents.init();
    
    // Carregar tema inicial
    UIState.setTheme(UIState.theme);
});
            
        
    ;

    return isValid;
;

const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message') || document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    input.setAttribute('aria-invalid', 'true');
};

const clearError = (input) => {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove();
    }
    input.setAttribute('aria-invalid', 'false');
};

// Gerenciamento de Toast Notifications
const showToast = (message, type = 'info') => {
    // ensure toast container exists
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    container.appendChild(toast);

    // Auto-remove
    setTimeout(() => {
        toast.remove();
    }, 3000);
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Gerenciamento de formulários
    const forms = $$('form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm(form)) {
                return;
            }

            const submitButton = form.querySelector('[type="submit"]');
            showLoading(submitButton);

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar formulário');
                }

                showToast('Formulário enviado com sucesso!', 'success');
                form.reset();
            } catch (error) {
                showToast(error.message, 'error');
            } finally {
                hideLoading(submitButton);
            }
        });
    });

    // Navegação responsiva
    const menuToggle = $('.menu-toggle');
    const nav = $('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('active');
            menuToggle.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
    }
    
    // Submenu toggles (mobile): click to expand
    const submenuParents = $$('.has-submenu > a');
    submenuParents.forEach(anchor => {
        anchor.addEventListener('click', (ev) => {
            // on small screens, toggle submenu instead of navigating
            if (window.matchMedia(`(max-width: ${getComputedStyle(document.documentElement).getPropertyValue('--bp-md') || 768}px)`).matches) {
                ev.preventDefault();
                const parent = anchor.parentElement;
                parent.classList.toggle('open');
                const expanded = parent.classList.contains('open');
                anchor.setAttribute('aria-expanded', expanded);
            }
        });
    });

    // Close mobile nav when a link is clicked (improves UX)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            // only close on small screens when nav is active
            if (nav.classList.contains('active') && window.matchMedia(`(max-width: ${getComputedStyle(document.documentElement).getPropertyValue('--bp-md') || 768}px)`).matches) {
                nav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
});

/* Modal helpers and event delegation - allow elements to open modals using data-modal-target */
const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
};

const closeModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
};

document.addEventListener('click', (e) => {
    // open modal
    const openTrigger = e.target.closest('[data-modal-target]');
    if (openTrigger) {
        const target = openTrigger.getAttribute('data-modal-target');
        openModal(target);
    }

    // close modal
    if (e.target.closest('.modal-close')) {
        const modal = e.target.closest('.modal');
        if (modal && modal.id) closeModal(modal.id);
    }

    // click outside modal-panel to close
    const modalBackdrop = e.target.closest('.modal');
    if (modalBackdrop && e.target === modalBackdrop) {
        if (modalBackdrop.id) closeModal(modalBackdrop.id);
    }
});

/* Improve showLoading/hideLoading visuals: add/remove 'disabled' attr on buttons */
const originalShowLoading = showLoading;
showLoading = (element) => {
    if (element) {
        element.setAttribute('disabled', 'true');
    }
    originalShowLoading(element);
};

const originalHideLoading = hideLoading;
hideLoading = (element) => {
    if (element) {
        element.removeAttribute('disabled');
    }
    originalHideLoading(element);
};

// Lazy loading de imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    $$('img.lazy').forEach(img => imageObserver.observe(img));
}

/* ===================== SPA Router & Templates ===================== */
const STORAGE_USERS_KEY = 'portalong_users_v1';
let _unsavedForm = false;

const templates = {
    home: () => `
        <section class="hero" aria-labelledby="hero-title">
            <h1 id="hero-title">Transformando Vidas através da Solidariedade</h1>
            <p>Conectamos pessoas que querem ajudar a causas que precisam de apoio</p>
            <div class="cta-buttons">
                <a href="#/register" class="btn btn-primary">Quero ser Voluntário</a>
                <a href="#/donate" class="btn btn-secondary">Fazer uma Doação</a>
            </div>
        </section>
        <section aria-labelledby="mission-title">
            <h2 id="mission-title">Nossa Missão</h2>
            <div class="mission-cards row">
                <article class="col-span-4">
                    <h3>Missão</h3>
                    <p>Conectar pessoas e recursos a projetos sociais transformadores</p>
                </article>
                <article class="col-span-4">
                    <h3>Visão</h3>
                    <p>Ser referência em transparência e efetividade no terceiro setor</p>
                </article>
                <article class="col-span-4">
                    <h3>Valores</h3>
                    <p>Transparência, Compromisso, Impacto Social, Colaboração</p>
                </article>
            </div>
        </section>
    `,

    projects: (filter) => {
        const users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
        // sample projects (would normally be fetched)
        const projects = [
            {id:1,title:'Projeto Escola',tags:['Educação'],summary:'Apoio escolar para comunidades.'},
            {id:2,title:'Limpeza de Parque',tags:['Meio Ambiente'],summary:'Mutirão para recuperação de áreas verdes.'},
            {id:3,title:'Clínica Comunitária',tags:['Saúde'],summary:'Ações de saúde preventiva.'}
        ];
        const cards = projects.map(p => `
            <div class="project-card">
                <div class="project-content">
                    <h3>${p.title}</h3>
                    <p class="text-muted">${p.tags.join(', ')}</p>
                    <p>${p.summary}</p>
                    <div style="margin-top:0.75rem"><a class="btn btn-tertiary" href="#/projects/${p.id}">Ver Projeto</a></div>
                </div>
            </div>
        `).join('\n');
        return `
            <section><h2>Projetos ${filter?'- '+filter:''}</h2>
            <div class="projects-grid">${cards}</div></section>
        `;
    },

    register: () => `
        <section aria-labelledby="registration-title" class="registration-section">
            <h2 id="registration-title">Cadastre-se</h2>
            <div class="registration-container">
                <form id="spa-register-form" class="registration-form" action="/register/volunteer" method="POST">
                    <div class="form-section">
                        <h3 class="form-section-title">Informações Pessoais</h3>
                        <div class="form-grid">
                            <div class="form-group"><label for="spa-name">Nome Completo*</label><input id="spa-name" name="name" required placeholder="Seu nome completo"></div>
                            <div class="form-group"><label for="spa-email">E-mail*</label><input id="spa-email" name="email" type="email" required placeholder="seu@email.com"></div>
                            <div class="form-group"><label for="spa-phone">Telefone*</label><input id="spa-phone" name="phone" type="tel" required placeholder="(11) 99999-9999"></div>
                            <div class="form-group"><label for="spa-birth">Data de Nascimento*</label><input id="spa-birth" name="birthDate" type="date" required></div>
                        </div>
                    </div>
                    <div class="form-section">
                        <h3 class="form-section-title">Configurar Senha</h3>
                        <div class="form-grid">
                            <div class="form-group"><label for="spa-password">Senha*</label><input id="spa-password" name="password" type="password" required placeholder="Mínimo 8 caracteres"><small id="pwd-help">Mínimo 8 caracteres, letras e números</small></div>
                            <div class="form-group"><label for="spa-confirm">Confirmar Senha*</label><input id="spa-confirm" name="confirmPassword" type="password" required placeholder="Digite a senha novamente"></div>
                        </div>
                    </div>
                    <div class="terms-group"><label class="checkbox-item"><input type="checkbox" name="terms" required><span>Li e aceito os Termos</span></label></div>
                    <button type="submit" class="submit-button"><span>Criar minha conta</span></button>
                </form>
            </div>
        </section>
    `
}

const render = (html) => {
    const root = document.getElementById('app');
    if (!root) return;
    root.innerHTML = html;
    // after render, bind dynamic handlers (forms, modals, links)
    bindDynamic();
};

const parseRoute = (hash) => {
    const raw = (hash || location.hash || '#/').replace(/^#/, '') || '/';
    const [path, query] = raw.split('?');
    const params = {};
    if (query) query.split('&').forEach(pair => { const [k,v]=pair.split('='); params[k]=v; });
    return { path, params };
};

const loadRoute = () => {
    const { path, params } = parseRoute(location.hash);
    if (path === '/' || path === '') return render(templates.home());
    if (path.startsWith('/projects')) return render(templates.projects(params.filter));
    if (path === '/register') return render(templates.register());
    if (path === '/donate') return render('<section><h2>Doar</h2><p>Em breve...</p></section>');
    // fallback
    render('<section><h2>Página não encontrada</h2></section>');
};

const bindDynamic = () => {
    // bind forms rendered by SPA
    const forms = document.querySelectorAll('#app form');
    forms.forEach(form => {
        // avoid double-binding
        if (form.dataset.bound) return;
        form.dataset.bound = 'true';
        form.addEventListener('input', () => {
            _unsavedForm = true;
            // autosave draft
            try {
                const data = Object.fromEntries(new FormData(form).entries());
                localStorage.setItem('spa_form_draft', JSON.stringify(data));
            } catch (e) {}
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // basic consistency checks
            const fd = new FormData(form);
            const data = Object.fromEntries(fd.entries());
            // password confirm
            if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
                showToast('As senhas não coincidem', 'error');
                return;
            }

            // email uniqueness
            const users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
            if (users.find(u => u.email && u.email.toLowerCase() === (data.email||'').toLowerCase())) {
                showToast('Este e-mail já foi registrado', 'error');
                return;
            }

            // phone pattern check (digits only, length 10-11)
            if (data.phone) {
                const digits = (data.phone.match(/\d/g) || []).join('');
                if (digits.length < 10 || digits.length > 11) {
                    showToast('Telefone inválido. Use 10 ou 11 dígitos.', 'error');
                    return;
                }
            }

            // passes validation: save to localStorage as simulated backend
            users.push({ id: Date.now(), name: data.name, email: data.email, phone: data.phone });
            localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
            showToast('Cadastro realizado com sucesso', 'success');
            form.reset();
            localStorage.removeItem('spa_form_draft');
            _unsavedForm = false;
            // optional: redirect to home
            location.hash = '#/';
        });
    });

    // restore draft if present for register form
    const draft = localStorage.getItem('spa_form_draft');
    if (draft) {
        try {
            const obj = JSON.parse(draft);
            const form = document.querySelector('#app form');
            if (form) {
                Object.keys(obj).forEach(k => {
                    const el = form.elements[k];
                    if (el) el.value = obj[k];
                });
            }
        } catch (e) {}
    }

    // Attach modal openers within SPA content
    document.querySelectorAll('[data-modal-target]').forEach(btn => btn.addEventListener('click', (e) => {
        const target = btn.getAttribute('data-modal-target');
        if (target) openModal(target);
    }));
};

// Warn about unsaved changes
window.addEventListener('beforeunload', (e) => {
    if (_unsavedForm) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Router hooks
window.addEventListener('hashchange', () => {
    if (_unsavedForm && !confirm('Existem alterações não salvas. Deseja navegar mesmo assim?')) {
        // revert hash change
        history.pushState(null, '', document.location.hash);
        return;
    }
    loadRoute();
});

document.addEventListener('DOMContentLoaded', () => {
    // initial load
    loadRoute();
});