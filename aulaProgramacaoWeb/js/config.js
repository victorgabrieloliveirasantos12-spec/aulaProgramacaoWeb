// Configurações globais da aplicação
export const APP_CONFIG = {
    app: {
        name: 'Meu Portfólio',
        version: '1.0.0',
        description: 'Portfólio de desenvolvedor web'
    },

    api: {
        baseUrl: 'https://api.example.com',
        endpoints: {
            projects: '/projects',
            users: '/users'
        },
        headers: {
            'Content-Type': 'application/json'
        }
    },

    ui: {
        toastDuration: 3000,
        breakpoints: {
            mobile: 768,
            tablet: 1024
        },
        transitions: {
            duration: 300
        }
    },

    theme: {
        default: 'light',
        storage: 'theme-preference'
    },

    routes: {
        home: 'index.html',
        projects: 'projeto.html',
        register: 'cadastro.html',
        login: 'cadastro.html#login'
    },

    storage: {
        keys: {
            theme: 'app_theme',
            users: 'app_users',
            drafts: 'form_drafts',
            session: 'user_session'
        }
    },

    validation: {
        // Regras gerais de validação
        password: {
            minLength: 8,
            requireNumbers: true,
            requireLetters: true
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        // Uploads / arquivos
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp']
    }
};

// Funções utilitárias
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

// Helper para debounce de funções
export const debounce = (fn, ms = 300) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(null, args), ms);
    };
};

// Helper para throttle de funções
export const throttle = (fn, ms = 300) => {
    let lastCallTime = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCallTime >= ms) {
            fn.apply(null, args);
            lastCallTime = now;
        }
    };
};

// Formatadores
export const formatters = {
    date(value, locale = 'pt-BR') {
        return new Date(value).toLocaleDateString(locale);
    },
    
    currency(value, locale = 'pt-BR', currency = 'BRL') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(value);
    },
    
    phone(value) {
        const stripped = value.replace(/\D/g, '');
        if (stripped.length === 11) {
            return stripped.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        }
        return stripped.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
};

// Validadores
export const validators = {
    required: (value) => value !== undefined && value !== null && value !== '',
    email: (value) => APP_CONFIG.validation.email.pattern.test(value),
    minLength: (value, min) => value.length >= min,
    maxLength: (value, max) => value.length <= max,
    number: (value) => !isNaN(parseFloat(value)) && isFinite(value),
    integer: (value) => Number.isInteger(Number(value)),
    url: (value) => {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    }
};