/**
 * Input Masks
 * Módulo para aplicar máscaras em campos de formulário
 */

const InputMasks = {
    /**
     * Máscara para CPF: XXX.XXX.XXX-XX
     */
    cpfMask: function(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{2})$/, '$1-$2')
            .slice(0, 14);
    },

    /**
     * Máscara para Telefone: (XX) XXXXX-XXXX
     */
    phoneMask: function(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{0,2})/, '($1')
            .replace(/(\(\d{2})(\d{0,5})/, '$1) $2')
            .replace(/(\)\ \d{4})(\d{1,4})/, '$1-$2')
            .slice(0, 15);
    },

    /**
     * Máscara para CEP: XXXXX-XXX
     */
    cepMask: function(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 9);
    },

    /**
     * Aplica máscara ao digitar
     */
    applyMask: function(input, maskFunction) {
        input.addEventListener('input', function() {
            this.value = maskFunction(this.value);
        });
    },

    /**
     * Inicializa todas as máscaras do formulário
     */
    init: function() {
        // Máscara de CPF
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            this.applyMask(cpfInput, this.cpfMask.bind(this));
        }

        // Máscara de Telefone
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            this.applyMask(phoneInput, this.phoneMask.bind(this));
        }

        // Máscara de CEP
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            this.applyMask(cepInput, this.cepMask.bind(this));
        }
    }
};

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    InputMasks.init();
});
