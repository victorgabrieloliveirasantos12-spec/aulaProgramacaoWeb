import { APP_CONFIG } from '../config.js';

// Sistema de Gerenciamento de Usuários
export class UserManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem(APP_CONFIG.storageKeys.users) || '[]');
    }

    saveUsers() {
        localStorage.setItem(APP_CONFIG.storageKeys.users, JSON.stringify(this.users));
    }

    createUser(userData) {
        if (this.findUserByEmail(userData.email)) {
            throw new Error('E-mail já cadastrado');
        }

        const user = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };

        this.users.push(user);
        this.saveUsers();
        return user;
    }

    findUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    updateUser(id, data) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error('Usuário não encontrado');
        }

        const updatedUser = {
            ...this.users[index],
            ...data,
            updatedAt: new Date().toISOString()
        };

        this.users[index] = updatedUser;
        this.saveUsers();
        return updatedUser;
    }

    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error('Usuário não encontrado');
        }

        this.users.splice(index, 1);
        this.saveUsers();
    }
}

// Sistema de Gestão de Rascunhos de Formulário
export class FormManager {
    static saveDraft(formId, data) {
        const drafts = JSON.parse(localStorage.getItem(APP_CONFIG.storageKeys.drafts) || '{}');
        drafts[formId] = {
            data,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(APP_CONFIG.storageKeys.drafts, JSON.stringify(drafts));
    }

    static getDraft(formId) {
        const drafts = JSON.parse(localStorage.getItem(APP_CONFIG.storageKeys.drafts) || '{}');
        return drafts[formId]?.data;
    }

    static clearDraft(formId) {
        const drafts = JSON.parse(localStorage.getItem(APP_CONFIG.storageKeys.drafts) || '{}');
        delete drafts[formId];
        localStorage.setItem(APP_CONFIG.storageKeys.drafts, JSON.stringify(drafts));
    }
}