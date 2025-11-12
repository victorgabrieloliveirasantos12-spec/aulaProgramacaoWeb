// Gerenciamento de Projetos
const loadProjects = async (filters = {}) => {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    try {
        showLoading(projectsGrid);

        // Aqui você faria a chamada real para sua API
        // Por enquanto, vamos simular com dados estáticos
        const response = await fetch('/api/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar projetos');
        }

        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        hideLoading(projectsGrid);
    }
};

const renderProjects = (projects) => {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    projects.forEach(project => {
        const projectCard = document.createElement('article');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="Imagem do projeto ${project.title}" class="lazy" data-src="${project.image}">
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
        `;
        projectsGrid.appendChild(projectCard);
    });
};

// Filtros de Projeto
const setupProjectFilters = () => {
    const filterForm = document.getElementById('filter-form');
    if (!filterForm) return;

    filterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(filterForm);
        const filters = Object.fromEntries(formData.entries());
        
        await loadProjects(filters);
    });
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    setupProjectFilters();
    loadProjects();
});

// Paginação
const setupPagination = () => {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;

    pagination.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (e.target.tagName === 'A') {
            const page = e.target.dataset.page;
            await loadProjects({ page });
            
            // Atualiza a URL sem recarregar a página
            history.pushState({}, '', `?page=${page}`);
        }
    });
};