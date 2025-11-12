// Importar todos os serviços necessários
import { Router } from './router.js';
import { UIManager } from './services/ui.js';
import { ProjectsManager } from './services/projects.js';
import { AnimationManager } from './services/animations.js';
import { APP_CONFIG } from './config.js';

/**
 * Classe principal da aplicação
 * Responsável por inicializar e coordenar todos os serviços
 */
class App {
    constructor() {
        this.router = null;
        this.ui = new UIManager();
        this.projectsManager = new ProjectsManager();
        this.animationManager = new AnimationManager();
        this.config = APP_CONFIG;
    }

    /**
     * Inicializa a aplicação
     */
    async init() {
        try {
            console.log('Inicializando aplicação...');

            // Aguardar o DOM estar pronto
            await this.waitForDOM();
            console.log('DOM carregado');

            // Inicializar UI primeiro para garantir que elementos básicos estejam prontos
            await this.ui.init();
            console.log('UI inicializada');
            
            // Inicializar gerenciadores
            await this.projectsManager.init();
            await this.animationManager.init();
            console.log('Gerenciadores inicializados');
            
            // Carregar tema inicial
            this.ui.setTheme(this.config.ui.theme);
            console.log('Tema carregado');

            // Registrar service worker para funcionalidades offline
            await this.registerServiceWorker();
            
            // Inicializar router por último para garantir que tudo está pronto
            this.router = new Router();
            console.log('Router inicializado');
            
            // Configurar manipuladores globais
            this.setupGlobalHandlers();
            console.log('Handlers globais configurados');

            console.log('Aplicação inicializada com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar a aplicação:', error);
            this.ui.showToast('Erro ao inicializar a aplicação', 'error');
        }
    }

    /**
     * Registra o service worker para funcionalidades offline
     */
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registrado:', registration);
            } catch (error) {
                console.error('Erro ao registrar Service Worker:', error);
            }
        }
    }

    /**
     * Configura manipuladores de eventos globais
     */
    setupGlobalHandlers() {
        // Manipular erros não tratados
        window.addEventListener('error', (event) => {
            console.error('Erro global:', event.error);
            this.ui.showToast('Ocorreu um erro inesperado', 'error');
        });

        // Manipular promessas rejeitadas não tratadas
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Promessa rejeitada não tratada:', event.reason);
            this.ui.showToast('Ocorreu um erro inesperado', 'error');
        });

        // Manipular estado offline/online
        window.addEventListener('online', () => {
            this.ui.showToast('Conexão restaurada', 'success');
        });

        window.addEventListener('offline', () => {
            this.ui.showToast('Você está offline', 'warning');
        });

        // Manipular alterações de tema
        window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
            this.ui.setTheme(e.matches ? 'dark' : 'light');
        });

        // Manipular alterações de tamanho da tela
        window.addEventListener('resize', () => {
            this.animationManager.handleResize();
        });
    }

    /**
     * Aguarda o DOM estar pronto
     */
    waitForDOM() {
        return new Promise(resolve => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => resolve());
            } else {
                resolve();
            }
        });
    }

    /**
     * Inicia a aplicação
     */
    start() {
        this.init().catch(error => {
            console.error('Erro fatal:', error);
            // Tentar recuperar estado consistente
            this.ui.showToast('Erro ao iniciar a aplicação. Tente recarregar a página.', 'error');
        });
    }
}

// Exportar instância única da aplicação
const app = new App();
export default app;

// Inicializar a aplicação
app.start();