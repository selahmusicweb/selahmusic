/**
 * Sistema de Autenticación - SelahMusic
 * Gestiona el login, registro y estado de usuario
 */

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    /**
     * Inicializa el sistema de autenticación
     */
    init() {
        this.loadUserFromStorage();
        this.updateUserInterface();
        this.bindEvents();
    }

    /**
     * Carga el usuario desde localStorage
     */
    loadUserFromStorage() {
        const savedUser = localStorage.getItem('selahUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    /**
     * Actualiza la interfaz según el estado del usuario
     */
    updateUserInterface() {
        const loginSection = document.getElementById('loginSection');
        const userSection = document.getElementById('userSection');
        const userName = document.getElementById('userName');

        if (this.currentUser) {
            loginSection.style.display = 'none';
            userSection.style.display = 'flex';
            userName.textContent = this.currentUser.name;
        } else {
            loginSection.style.display = 'block';
            userSection.style.display = 'none';
        }
    }

    /**
     * Vincula eventos a los elementos del DOM
     */
    bindEvents() {
        // Event listeners para modales
        window.addEventListener('click', (event) => {
            const authModal = document.getElementById('authModal');
            if (event.target === authModal) {
                this.closeModal();
            }
        });
    }

    /**
     * Abre el modal de login
     */
    openLoginModal() {
        document.getElementById('authModal').style.display = 'block';
        this.switchTab('login');
    }

    /**
     * Abre el modal de registro
     */
    openRegistrationModal() {
        document.getElementById('authModal').style.display = 'block';
        this.switchTab('register');
    }

    /**
     * Cierra el modal de autenticación
     */
    closeModal() {
        document.getElementById('authModal').style.display = 'none';
        this.clearFormErrors();
    }

    /**
     * Cambia entre tabs de login y registro
     * @param {string} tab - 'login' o 'register'
     */
    switchTab(tab) {
        // Actualizar botones de tab
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        if (tab === 'login') {
            document.querySelector('.tab-button:first-child').classList.add('active');
            document.getElementById('loginTab').classList.add('active');
        } else {
            document.querySelector('.tab-button:last-child').classList.add('active');
            document.getElementById('registerTab').classList.add('active');
        }
        
        this.clearFormErrors();
    }

    /**
     * Limpia mensajes de error de los formularios
     */
    clearFormErrors() {
        document.querySelectorAll('.error-message, .success-message').forEach(el => el.textContent = '');
    }

    /**
     * Maneja el proceso de login
     * @param {Event} event - Evento del formulario
     */
    handleLogin(event) {
        event.preventDefault();
        this.clearFormErrors();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Obtener usuarios registrados
        const users = JSON.parse(localStorage.getItem('selahUsers') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('selahUser', JSON.stringify(this.currentUser));
            this.updateUserInterface();
            this.closeModal();
            this.showNotification('¡Bienvenido de vuelta! Ya puedes acceder a todos los cursos.', 'success');
        } else {
            document.getElementById('loginMessage').textContent = 'Credenciales incorrectas. Verifica tu email y contraseña.';
        }
    }

    /**
     * Maneja el proceso de registro
     * @param {Event} event - Evento del formulario
     */
    handleRegister(event) {
        event.preventDefault();
        this.clearFormErrors();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validación
        if (!this.validateRegistration(name, email, password, confirmPassword)) {
            return;
        }
        
        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            registrationDate: new Date().toISOString(),
            courses: []
        };
        
        // Guardar usuario
        const users = JSON.parse(localStorage.getItem('selahUsers') || '[]');
        users.push(newUser);
        localStorage.setItem('selahUsers', JSON.stringify(users));
        
        // Auto login
        this.currentUser = newUser;
        localStorage.setItem('selahUser', JSON.stringify(this.currentUser));
        this.updateUserInterface();
        this.closeModal();
        
        this.showNotification('¡Registro exitoso! Bienvenido a SelahMusic. Ya puedes acceder a todos los cursos de fundamento.', 'success');
    }

    /**
     * Valida los datos de registro
     * @param {string} name - Nombre del usuario
     * @param {string} email - Email del usuario
     * @param {string} password - Contraseña
     * @param {string} confirmPassword - Confirmación de contraseña
     * @returns {boolean} - True si la validación es exitosa
     */
    validateRegistration(name, email, password, confirmPassword) {
        let hasErrors = false;
        
        if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Las contraseñas no coinciden';
            hasErrors = true;
        }
        
        if (password.length < 6) {
            document.getElementById('registerPasswordError').textContent = 'La contraseña debe tener al menos 6 caracteres';
            hasErrors = true;
        }
        
        // Verificar si el email ya existe
        const users = JSON.parse(localStorage.getItem('selahUsers') || '[]');
        if (users.find(u => u.email === email)) {
            document.getElementById('registerEmailError').textContent = 'Este email ya está registrado';
            hasErrors = true;
        }
        
        if (!name.trim()) {
            document.getElementById('registerNameError').textContent = 'El nombre es requerido';
            hasErrors = true;
        }
        
        if (!this.isValidEmail(email)) {
            document.getElementById('registerEmailError').textContent = 'Ingresa un email válido';
            hasErrors = true;
        }
        
        return !hasErrors;
    }

    /**
     * Valida formato de email
     * @param {string} email - Email a validar
     * @returns {boolean} - True si el email es válido
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Cierra sesión del usuario
     */
    logout() {
        this.currentUser = null;
        localStorage.removeItem('selahUser');
        this.updateUserInterface();
        this.showNotification('Has cerrado sesión correctamente.', 'info');
    }

    /**
     * Verifica si el usuario está autenticado
     * @returns {boolean} - True si el usuario está logueado
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }

    /**
     * Obtiene el usuario actual
     * @returns {Object|null} - Datos del usuario actual
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Muestra notificaciones al usuario
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de notificación (success, error, info)
     */
    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos inline para la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '3000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        });
        
        // Colores según el tipo
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Eliminar después de 4 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Crear instancia global del sistema de autenticación
const authSystem = new AuthSystem();

// Funciones globales para compatibilidad con HTML
window.openLoginModal = () => authSystem.openLoginModal();
window.openRegistrationModal = () => authSystem.openRegistrationModal();
window.closeModal = () => authSystem.closeModal();
window.switchTab = (tab) => authSystem.switchTab(tab);
window.handleLogin = (event) => authSystem.handleLogin(event);
window.handleRegister = (event) => authSystem.handleRegister(event);
window.logout = () => authSystem.logout();
