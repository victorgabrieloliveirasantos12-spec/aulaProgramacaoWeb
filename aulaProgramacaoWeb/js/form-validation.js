// Formulário de Cadastro
const setupRegistrationForm = () => {
    const volunteerForm = document.getElementById('volunteer-form');
    const typeButtons = document.querySelectorAll('.registration-type button');

    if (!volunteerForm || !typeButtons.length) return;

    // Alternar entre tipos de cadastro
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Aqui você poderia alternar entre diferentes formulários
            // Por exemplo, mostrar formulário de ONG ou de voluntário
        });
    });

    // Validação de confirmação de senha
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    const validatePasswordMatch = () => {
        if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'As senhas não conferem');
            return false;
        }
        clearError(confirmPasswordInput);
        return true;
    };

    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validatePasswordMatch);
    }

    // Validação de telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }
            if (value.length > 9) {
                value = `${value.slice(0, 9)}-${value.slice(9)}`;
            }
            
            e.target.value = value;
        });
    }

    // Validação ao enviar
    volunteerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(volunteerForm) || !validatePasswordMatch()) {
            return;
        }

        const submitButton = volunteerForm.querySelector('[type="submit"]');
        showLoading(submitButton);

        try {
            const formData = new FormData(volunteerForm);
            const response = await fetch(volunteerForm.action, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro ao realizar cadastro');
            }

            showToast('Cadastro realizado com sucesso!', 'success');
            volunteerForm.reset();
            
            // Redirecionar para página de sucesso ou dashboard
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            hideLoading(submitButton);
        }
    });
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setupRegistrationForm();
});