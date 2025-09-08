/**
 * Script Principal - SelahMusic
 * Coordinador principal y funcionalidades generales
 */

class SelahMusicApp {
    constructor() {
        this.isLoaded = false;
        this.init();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        this.bindEvents();
        this.initializeComponents();
        this.setupAccessibility();
        this.loadAnalytics();
    }

    /**
     * Vincula eventos globales
     */
    bindEvents() {
        // Event listener para carga de la página
        window.addEventListener('load', () => {
            this.onPageLoad();
        });

        // Event listener para cambios de visibilidad
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // Event listener para errores no capturados
        window.addEventListener('error', (event) => {
            this.handleError(event);
        });

        // Event listeners para formularios
        this.bindFormEvents();
    }

    /**
     * Inicializa componentes de la aplicación
     */
    initializeComponents() {
        // Inicializar animaciones de entrada
        this.initializeAnimations();
        
        // Inicializar lazy loading para imágenes
        this.initializeLazyLoading();
        
        // Inicializar tooltips y efectos hover
        this.initializeInteractiveElements();
    }

    /**
     * Se ejecuta cuando la página se carga completamente
     */
    onPageLoad() {
        this.isLoaded = true;
        
        // Remover loader si existe
        this.removeLoader();
        
        // Inicializar animaciones de entrada
        this.triggerEntranceAnimations();
        
        // Configurar intersección observer para animaciones
        this.setupIntersectionObserver();
        
        console.log('SelahMusic App cargado correctamente');
    }

    /**
     * Remueve el loader de la página
     */
    removeLoader() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    }

    /**
     * Inicializa animaciones de entrada
     */
    initializeAnimations() {
        // Configurar animaciones para elementos que entran al viewport
        const animatedElements = document.querySelectorAll(
            '.card, .fundamento-card, .practica-card, .legado-card, .hero-content, .section-header'
        );
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
        });
    }

    /**
     * Dispara animaciones de entrada
     */
    triggerEntranceAnimations() {
        // Animar hero content inmediatamente
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    /**
     * Configura el Intersection Observer para animaciones
     */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observar elementos animables
        const elementsToAnimate = document.querySelectorAll(
            '.card, .fundamento-card, .practica-card, .legado-card, .section-header'
        );
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Inicializa lazy loading para imágenes
     */
    initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores sin soporte
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    /**
     * Inicializa elementos interactivos
     */
    initializeInteractiveElements() {
        // Agregar efectos de ripple a botones
        this.addRippleEffect();
        
        // Configurar parallax suave
        this.setupParallax();
        
        // Inicializar tooltips
        this.initializeTooltips();
    }

    /**
     * Agrega efecto ripple a botones
     */
    addRippleEffect() {
        const buttons = document.querySelectorAll(
            '.cta-button, .course-button, .inscription-button, .submit-button, .login-button'
        );

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

                // Agregar estilos de animación si no existen
                if (!document.querySelector('#ripple-styles')) {
                    const style = document.createElement('style');
                    style.id = 'ripple-styles';
                    style.textContent = `
                        @keyframes ripple {
                            to {
                                transform: scale(2);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }

                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    /**
     * Configura efectos de parallax suaves
     */
    setupParallax() {
        const parallaxElements = document.querySelectorAll('.hero, .raiz-section, .fundamento-section');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const rate = scrolled * -0.2 * (index + 1);
                element.style.transform = `translateY(${rate}px)`;
            });
        }, { passive: true });
    }

    /**
     * Inicializa tooltips
     */
    initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.dataset.tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    /**
     * Muestra tooltip
     * @param {Element} element - Elemento que activa el tooltip
     * @param {string} text - Texto del tooltip
     */
    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.id = 'global-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: #1e293b;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.875rem;
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';

        setTimeout(() => tooltip.style.opacity = '1', 10);
    }

    /**
     * Oculta tooltip
     */
    hideTooltip() {
        const tooltip = document.getElementById('global-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 200);
        }
    }

    /**
     * Vincula eventos de formularios
     */
    bindFormEvents() {
        // Formulario de contacto
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        }

        // Validación en tiempo real
        this.setupRealTimeValidation();
    }

    /**
     * Configura validación en tiempo real
     */
    setupRealTimeValidation() {
        const inputs = document.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                this.validateField(e.target);
            });
            
            input.addEventListener('input', (e) => {
                if (e.target.classList.contains('error')) {
                    this.validateField(e.target);
                }
            });
        });
    }

    /**
     * Valida un campo específico
     * @param {Element} field - Campo a validar
     */
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let message = '';

        // Validación según el tipo
        if (field.required && !value) {
            isValid = false;
            message = 'Este campo es requerido';
        } else if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Ingresa un email válido';
        } else if (field.minLength && value.length < field.minLength) {
            isValid = false;
            message = `Mínimo ${field.minLength} caracteres`;
        }

        // Aplicar estilos de validación
        if (isValid) {
            field.classList.remove('error');
            field.style.borderColor = '#10b981';
        } else {
            field.classList.add('error');
            field.style.borderColor = '#ef4444';
        }

        // Mostrar mensaje de error
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
        }

        return isValid;
    }

    /**
     * Valida formato de email
     * @param {string} email - Email a validar
     * @returns {boolean} - True si es válido
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Maneja el envío del formulario de contacto
     * @param {Event} event - Evento del formulario
     */
    handleContactSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            etapa: formData.get('etapa'),
            mensaje: formData.get('mensaje'),
            timestamp: new Date().toISOString()
        };
        
        // Validar datos
        if (!this.validateContactForm(data)) {
            return;
        }
        
        // Simular envío (aquí se integraría con backend)
        this.submitContactForm(data)
            .then(() => {
                this.showSuccessMessage();
                event.target.reset();
            })
            .catch((error) => {
                this.showErrorMessage(error.message);
            });
    }

    /**
     * Valida el formulario de contacto
     * @param {Object} data - Datos del formulario
     * @returns {boolean} - True si es válido
     */
    validateContactForm(data) {
        const errors = [];
        
        if (!data.nombre || data.nombre.trim().length < 2) {
            errors.push('Nombre debe tener al menos 2 caracteres');
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Email inválido');
        }
        
        if (!data.etapa) {
            errors.push('Debes seleccionar una etapa');
        }
        
        if (errors.length > 0) {
            this.showErrorMessage(errors.join(', '));
            return false;
        }
        
        return true;
    }

    /**
     * Simula el envío del formulario
     * @param {Object} data - Datos a enviar
     * @returns {Promise} - Promesa del envío
     */
    submitContactForm(data) {
        return new Promise((resolve, reject) => {
            // Simular llamada a API
            setTimeout(() => {
                // Guardar en localStorage como backup
                const contacts = JSON.parse(localStorage.getItem('selahContacts') || '[]');
                contacts.push(data);
                localStorage.setItem('selahContacts', JSON.stringify(contacts));
                
                resolve();
            }, 1000);
        });
    }

    /**
     * Muestra mensaje de éxito
     */
    showSuccessMessage() {
        authSystem.showNotification(
            '¡Gracias por tu interés! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto para comenzar tu transformación musical y espiritual.',
            'success'
        );
    }

    /**
     * Muestra mensaje de error
     * @param {string} message - Mensaje de error
     */
    showErrorMessage(message) {
        authSystem.showNotification(message, 'error');
    }

    /**
     * Configura accesibilidad
     */
    setupAccessibility() {
        // Configurar navegación por teclado
        this.setupKeyboardNavigation();
        
        // Configurar ARIA labels
        this.setupAriaLabels();
        
        // Configurar focus visible
        this.setupFocusManagement();
    }

    /**
     * Configura navegación por teclado
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Navegación con flechas en secciones
            if (e.key === 'ArrowDown' && e.ctrlKey) {
                e.preventDefault();
                navigationSystem.navigateToNextSection();
            } else if (e.key === 'ArrowUp' && e.ctrlKey) {
                e.preventDefault();
                navigationSystem.navigateToPreviousSection();
            }
            
            // Escape para cerrar modales
            if (e.key === 'Escape') {
                authSystem.closeModal();
                courseSystem.closeCourseModal();
            }
        });
    }

    /**
     * Configura ARIA labels
     */
    setupAriaLabels() {
        // Agregar labels a elementos interactivos
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            link.setAttribute('aria-label', `Navegar a sección ${this.getSectionName(index)}`);
        });
        
        // Agregar roles ARIA
        document.querySelector('.navbar').setAttribute('role', 'navigation');
        document.querySelector('.hero').setAttribute('role', 'banner');
        document.querySelector('.contacto-section').setAttribute('role', 'contentinfo');
    }

    /**
     * Obtiene el nombre de la sección por índice
     * @param {number} index - Índice de la sección
     * @returns {string} - Nombre de la sección
     */
    getSectionName(index) {
        const names = ['Inicio', 'Devocional', 'Fundamento', 'Práctica', 'Comunidad', 'Contacto'];
        return names[index] || 'Desconocida';
    }

    /**
     * Configura manejo de focus
     */
    setupFocusManagement() {
        // Mejorar visibilidad del focus
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 2px solid #FACC15;
                outline-offset: 2px;
            }
            
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: #FACC15;
                color: #000;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 9999;
            }
            
            .skip-link:focus {
                top: 6px;
            }
        `;
        document.head.appendChild(style);
        
        // Agregar skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Saltar al contenido principal';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /**
     * Maneja cambios de visibilidad de la página
     */
    handleVisibilityChange() {
        if (document.hidden) {
            // Página oculta - pausar animaciones, etc.
            console.log('Página oculta');
        } else {
            // Página visible - reanudar actividades
            console.log('Página visible');
        }
    }

    /**
     * Maneja errores no capturados
     * @param {Event} event - Evento de error
     */
    handleError(event) {
        console.error('Error no capturado:', event.error);
        
        // En producción, enviar error a servicio de logging
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                'description': event.error.message,
                'fatal': false
            });
        }
    }

    /**
     * Carga analytics y tracking
     */
    loadAnalytics() {
        // Aquí se cargarían Google Analytics, Facebook Pixel, etc.
        // Por ahora solo logging básico
        console.log('Analytics initialized');
    }

    /**
     * Obtiene métricas de rendimiento
     * @returns {Object} - Métricas de rendimiento
     */
    getPerformanceMetrics() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            return {
                loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
            };
        }
        return {};
    }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.selahMusicApp = new SelahMusicApp();
});

// Funciones globales para compatibilidad con HTML
window.handleContactSubmit = (event) => {
    if (window.selahMusicApp) {
        window.selahMusicApp.handleContactSubmit(event);
    }
};
