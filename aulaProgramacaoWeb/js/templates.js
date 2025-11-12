export class Templates {
    static home() {
        return `
            <div class="home-page">
                <section class="hero" aria-labelledby="hero-title">
                    <div class="container">
                        <div class="hero-content">
                            <h1 id="hero-title">Bem-vindo ao Portal ONG</h1>
                            <p class="subtitle">Conectando causas, voluntários e recursos para transformar comunidades</p>
                            <div class="hero-buttons">
                                <a href="projeto.html" class="btn btn-primary">Explorar Projetos</a>
                                <a href="cadastro.html" class="btn btn-outline">Quero Ajudar</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="about-section" aria-labelledby="about-title">
                    <div class="container">
                        <div class="about-grid">
                            <div class="about-media">
                                <img src="images/profile.svg" alt="Foto representativa da organização" class="profile-image" loading="lazy">
                                <div class="experience-card">
                                    <span class="number">4+</span>
                                    <span class="text">Anos de<br>Experiência</span>
                                </div>
                            </div>
                            <div class="about-content">
                                <h2 id="about-title">Sobre Nós</h2>
                                <p class="lead">Movemos iniciativas sociais através da colaboração entre ONGs, voluntários e doadores. Nosso objetivo é gerar impacto mensurável nas comunidades atendidas.</p>
                                <div class="skills-grid">
                                    <div class="skill-card">
                                        <svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12 21l-8-9h16l-8 9z"/>
                                        </svg>
                                        <h3>Front-end</h3>
                                        <p>Interfaces responsivas e acessíveis</p>
                                    </div>
                                    <div class="skill-card">
                                        <svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M4 6h16M4 12h16M4 18h16"/>
                                        </svg>
                                        <h3>Back-end</h3>
                                        <p>APIs e sistemas confiáveis</p>
                                    </div>
                                    <div class="skill-card">
                                        <svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                        <h3>Impacto Social</h3>
                                        <p>Projetos que transformam realidades</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="featured-projects" id="featured-projects" aria-labelledby="featured-title">
                    <div class="container">
                        <header class="section-header">
                            <h2 id="featured-title">Projetos em Destaque</h2>
                            <p>Confira alguns dos nossos trabalhos mais recentes</p>
                        </header>
                        <div class="projects-grid">
                            ${typeof Projects !== 'undefined' ? Projects.getFeaturedProjects() : ''}
                        </div>
                        <div class="section-footer">
                            <a href="projeto.html" class="btn btn-secondary">Ver Todos os Projetos</a>
                        </div>
                    </div>
                </section>

                <section class="cta-section">
                    <div class="container">
                        <div class="cta-content">
                            <h2>Quer Fazer Diferença?</h2>
                            <p>Junte-se a nossa rede de voluntários e parceiros para ampliar o impacto.</p>
                            <a href="cadastro.html" class="btn btn-primary btn-large">Quero Ser Voluntário</a>
                        </div>
                        <ul class="stats-list">
                            <li class="stat-item">
                                <span class="stat-number">50+</span>
                                <span class="stat-label">Projetos<br>Concluídos</span>
                            </li>
                            <li class="stat-item">
                                <span class="stat-number">10.000+</span>
                                <span class="stat-label">Pessoas<br>Impactadas</span>
                            </li>
                            <li class="stat-item">
                                <span class="stat-number">1.000+</span>
                                <span class="stat-label">Voluntários</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        `;
    }

    static projects() {
        return `
            <section class="projects-page">
                <div class="container">
                    <h1>Meus Projetos</h1>
                    <div class="filter-container">
                        <form id="filter-form" class="filter-form" role="search">
                            <div class="filter-group">
                                <label for="category">Categoria</label>
                                <select id="category" name="category">
                                    <option value="">Todas</option>
                                    <option value="web">Web</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="desktop">Desktop</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label for="tech">Tecnologia</label>
                                <select id="tech" name="tech">
                                    <option value="">Todas</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Filtrar</button>
                        </form>
                    </div>
                    <div class="projects-grid">
                        ${typeof Projects !== 'undefined' ? Projects.getAllProjects() : ''}
                    </div>
                    <div class="pagination" aria-label="Paginação de projetos"></div>
                </div>
            </section>
        `;
    }

    static register() {
        return `
            <section class="register-page">
                <div class="container">
                    <div class="form-container">
                        <h1>Criar Conta</h1>
                        <form id="registerForm" class="register-form">
                            <div class="form-field">
                                <label for="name">Nome Completo</label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div class="form-field">
                                <label for="email">E-mail</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-field">
                                <label for="password">Senha</label>
                                <input type="password" id="password" name="password" required>
                            </div>
                            <div class="form-field">
                                <label for="confirmPassword">Confirmar Senha</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required>
                            </div>
                            <div class="terms-group">
                                <label class="checkbox-item">
                                    <input type="checkbox" name="terms" required>
                                    <span>Li e aceito os Termos de Uso</span>
                                </label>
                            </div>
                            <button type="submit" class="submit-button">Criar minha conta</button>
                        </form>
                        <div class="form-footer">
                            <p>Já tem uma conta? <a href="#login">Fazer login</a></p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    static login() {
        return `
            <section class="login-page">
                <div class="container">
                    <div class="form-container">
                        <h1>Login</h1>
                        <form id="loginForm" class="login-form">
                            <div class="form-field">
                                <label for="loginEmail">E-mail</label>
                                <input type="email" id="loginEmail" name="email" required>
                            </div>
                            <div class="form-field">
                                <label for="loginPassword">Senha</label>
                                <input type="password" id="loginPassword" name="password" required>
                            </div>
                            <button type="submit" class="submit-button">Entrar</button>
                        </form>
                        <div class="form-footer">
                            <p>Ainda não tem uma conta? <a href="#cadastro">Cadastre-se</a></p>
                            <p><a href="#recuperar-senha">Esqueceu sua senha?</a></p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    static notFound() {
        return `
            <section class="not-found-page">
                <div class="container">
                    <h1>Página não encontrada</h1>
                    <p>A página que você está procurando não existe ou foi movida.</p>
                    <a href="index.html" class="btn btn-primary">Voltar para o início</a>
                </div>
            </section>
        `;
    }

    static error() {
        return `
            <section class="error-page">
                <div class="container">
                    <h1>Ops! Algo deu errado</h1>
                    <p>Ocorreu um erro ao carregar a página. Por favor, tente novamente mais tarde.</p>
                    <a href="index.html" class="btn btn-primary">Voltar para o início</a>
                </div>
            </section>
        `;
    }
}