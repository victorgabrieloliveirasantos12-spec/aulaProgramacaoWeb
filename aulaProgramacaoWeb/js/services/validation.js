import { APP_CONFIG } from '../config.js';

// Sistema de Validação de Formulários
export const FormValidation = {
    rules: {
        required: (value) => value.trim() !== '' || 'Este campo é obrigatório',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'E-mail inválido',
        password: (value) => {
            const { minLength, requireNumbers, requireLetters } = APP_CONFIG.validation.password;
            const hasMinLength = value.length >= minLength;
            const hasNumber = requireNumbers ? /\d/.test(value) : true;
            const hasLetter = requireLetters ? /[A-Za-z]/.test(value) : true;

            if (!hasMinLength) return `A senha deve ter no mínimo ${minLength} caracteres`;
            if (!hasNumber) return 'A senha deve conter pelo menos um número';
            if (!hasLetter) return 'A senha deve conter pelo menos uma letra';
            return true;
        },
        passwordConfirm: (value, form) => {
            const password = form.querySelector('input[name="password"]')?.value;
            return value === password || 'As senhas não coincidem';
        },
        phone: (value) => {
            const stripped = value.replace(/\D/g, '');
            return stripped.length >= 10 || 'Número de telefone inválido';
        }
    },

    showError(input, message) {
        const field = input.closest('.form-field');
        if (!field) return;
        
        field.classList.add('error');
        const errorElement = field.querySelector('.error-message') || 
            Object.assign(document.createElement('span'), {
                className: 'error-message'
            });
        errorElement.textContent = message;
        
        if (!field.contains(errorElement)) {
            field.appendChild(errorElement);
        }

        input.setAttribute('aria-invalid', 'true');
    },

    clearError(input) {
        const field = input.closest('.form-field');
        if (!field) return;
        
        field.classList.remove('error');
        field.querySelector('.error-message')?.remove();
        input.setAttribute('aria-invalid', 'false');
    },

    validateField(input, form) {
        this.clearError(input);
        
        // Validação de campo obrigatório
        if (input.hasAttribute('required')) {
            const isValid = this.rules.required(input.value);
            if (isValid !== true) {
                this.showError(input, isValid);
                return false;
            }
        }

        // Validações específicas por tipo
        const validations = {
            email: () => this.rules.email(input.value),
            password: () => this.rules.password(input.value),
            tel: () => this.rules.phone(input.value)
        };

        if (input.name === 'confirmPassword') {
            const isValid = this.rules.passwordConfirm(input.value, form);
            if (isValid !== true) {
                this.showError(input, isValid);
                return false;
            }
        }

        const validation = validations[input.type];
        if (validation) {
            const isValid = validation();
            if (isValid !== true) {
                this.showError(input, isValid);
                return false;
            }
        }

        return true;
    },

    validateForm(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input, form)) {
                isValid = false;
            }
        });

        return isValid;
    }
};