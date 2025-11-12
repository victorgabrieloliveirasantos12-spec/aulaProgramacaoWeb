import { APP_CONFIG } from '../config.js';
import { Loading } from './ui.js';
import { Toast } from './ui.js';

export class ProjectsManager {
    constructor() {
        this.projectsGrid = null;
        this.filterForm = null;
        this.pagination = null;
    }

    init() {
        this.projectsGrid = document.querySelector('.projects-grid');
        this.filterForm = document.getElementById('filter-form');
        this.pagination = document.querySelector('.pagination');

        this.setupEventListeners();
        this.loadProjects();
    }

    setupEventListeners() {
        // Configurar filtros
        if (this.filterForm) {
            this.filterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(this.filterForm);
                const filters = Object.fromEntries(formData.entries());
                await this.loadProjects(filters);
            });
        }

        // Configurar paginação
        if (this.pagination) {
            this.pagination.addEventListener('click', async (e) => {
                e.preventDefault();
                if (e.target.tagName === 'A') {
                    const page = e.target.dataset.page;
                    await this.loadProjects({ page });
                    history.pushState({}, '', `?page=${page}`);
                }
            });
        }
    }

    async loadProjects(filters = {}) {
        if (!this.projectsGrid) return;

        try {
            Loading.show(this.projectsGrid);

            const queryParams = new URLSearchParams(filters).toString();
            const url = `${APP_CONFIG.api.baseUrl}${APP_CONFIG.api.endpoints.projects}?${queryParams}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar projetos');
            }

            const projects = await response.json();
            this.renderProjects(projects);
        } catch (error) {
            Toast.show(error.message, 'error');
        } finally {
            Loading.hide(this.projectsGrid);
        }
    }

    renderProjects(projects) {
        if (!this.projectsGrid) return;

        this.projectsGrid.innerHTML = projects.map(project => `
            <article class="project-card">
                <img 
                    src="${project.image}" 
                    alt="Imagem do projeto ${project.title}" 
                    class="lazy" 
                    data-src="${project.image}"
                    loading="lazy"
                >
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p class="project-category">Categoria: ${project.category}</p>
                    <p class="project-description">${project.description}</p>
                    <div class="project-meta">
                        <span>Local: ${project.location}</span>
                        <span>Vagas: ${project.openings} voluntários</span>
                    </div>
                    <a href="/projetos/${project.id}" class="btn btn-secondary">Saiba Mais</a>
                </div>
            </article>
        `).join('');

        // Inicializar lazy loading para imagens
        this.initLazyLoading();
    }

    initLazyLoading() {
        const lazyImages = this.projectsGrid.querySelectorAll('img.lazy');
        
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

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}