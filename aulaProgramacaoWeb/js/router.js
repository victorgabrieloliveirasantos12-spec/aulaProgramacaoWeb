// Imports
import { Templates } from './templates.js';
import { APP_CONFIG } from './config.js';
import { UIManager } from './services/ui.js';

/**
 * Gerencia o roteamento da aplicação SPA
 */
export class Router {
    constructor() {
        // Configuração das rotas
        this.routes = {
            '#': {
                title: 'Home',
                template: Templates.home,
                auth: false
            },
            '#projetos': {
                title: 'Projetos',
                template: Templates.projects,
                auth: false
            },
            '#cadastro': {
                title: 'Cadastro',
                template: Templates.register,
                auth: false
            },
            '#login': {
                title: 'Login',
                template: Templates.login,
                auth: false
            }
        };

        // Estado inicial
        this.currentRoute = window.location.hash || '#';
        this.app = document.getElementById('app');
        this.ui = new UIManager();
        
        // Inicializar
        this.init();
    }

    /**
     * Inicializa o router
     */
    init() {
        // Event handlers
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Click handler para links internos
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                this.navigateTo(link.getAttribute('href'));
            }
        });

        // Renderizar rota inicial
        this.handleRoute();
    }

    /**
     * Lida com a mudança de rota
     */
    async handleRoute() {
        try {
            const hash = window.location.hash || '#';
            const route = this.routes[hash];

            // Verificar se a rota existe
            if (!route) {
                this.navigateTo('#');
                return;
            }

            // Verificar autenticação
            if (route.auth && !this.isAuthenticated()) {
                this.ui.showToast('Você precisa estar logado para acessar esta página', 'warning');
                this.navigateTo('#login', { returnUrl: hash });
                return;
            }

            // Atualizar título
            document.title = `${APP_CONFIG.app.name} - ${route.title}`;

            // Renderizar conteúdo
            const content = await route.template();
            this.app.innerHTML = content;

            // Atualizar UI
            this.updateNavigation();
            window.scrollTo(0, 0);

        } catch (error) {
            console.error('Erro ao renderizar rota:', error);
            this.ui.showToast('Erro ao carregar a página', 'error');
        }
    }

    /**
     * Navega para uma rota específica
     */
    navigateTo(hash, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${hash}?${queryString}` : hash;
        window.location.hash = url;
    }

    /**
     * Atualiza o estado de navegação na UI
     */
    updateNavigation() {
        document.querySelectorAll('nav a').forEach(link => {
            const isCurrent = link.getAttribute('href') === window.location.hash;
            if (isCurrent) {
                link.setAttribute('aria-current', 'page');
                link.classList.add('active');
            } else {
                link.removeAttribute('aria-current');
                link.classList.remove('active');
            }
        });
    }

    /**
     * Verifica se o usuário está autenticado
     */
    isAuthenticated() {
        const userData = localStorage.getItem(APP_CONFIG.storage.userKey);
        return Boolean(userData);
    }

    /**
     * Obtém parâmetros da query string
     */
    getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return Object.fromEntries(params.entries());
    }
}