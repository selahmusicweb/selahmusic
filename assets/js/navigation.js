/**
 * Sistema de Navegación - SelahMusic
 * Gestiona la navegación suave y estado activo de los enlaces
 */

class NavigationSystem {
    constructor() {
        this.sections = ['hero', 'raiz', 'fundamento', 'practica', 'legado', 'contacto'];
        this.navLinks = [];
        this.scrollIndicator = null;
        this.isScrolling = false;
        this.init();
    }

    /**
     * Inicializa el sistema de navegación
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.updateScrollIndicator();
    }

    /**
     * Cachea elementos del DOM para mejor rendimiento
     */
    cacheElements() {
        this.navLinks = Array.from(document.querySelectorAll('.nav-link'));
        this.scrollIndicator = document.querySelector('.scroll-indicator');
    }

    /**
     * Vincula eventos de navegación
     */
    bindEvents() {
        // Event listener para scroll
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // Event listener para resize
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
        
        // Event listeners para navegación táctil en móviles
        this.bindTouchNavigation();
    }

    /**
     * Throttle function para optimizar performance
     * @param {Function} func - Función a throttlear
     * @param {number} limit - Límite en ms
     * @returns {Function} - Función throttleada
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    /**
     * Maneja el evento de scroll
     */
    handleScroll() {
        if (this.isScrolling) return;
        
        this.updateScrollIndicator();
        this.updateActiveNavLink();
    }

    /**
     * Maneja el evento de resize
     */
    handleResize() {
        // Recalcular posiciones si es necesario
        this.updateActiveNavLink();
    }

    /**
     * Actualiza la visibilidad del indicador de scroll
     */
    updateScrollIndicator() {
        if (!this.scrollIndicator) return;
        
        const scrollY = window.scrollY;
        const opacity = scrollY > 100 ? '0' : '1';
        const transform = scrollY > 100 
            ? 'translateX(-50%) translateY(20px)' 
            : 'translateX(-50%) translateY(0)';
        
        this.scrollIndicator.style.opacity = opacity;
        this.scrollIndicator.style.transform = transform;
    }

    /**
     * Actualiza el enlace de navegación activo
     */
    updateActiveNavLink() {
        let currentSection = this.getCurrentSection();
        
        // Remover clase active de todos los enlaces
        this.navLinks.forEach(link => link.classList.remove('active'));
        
        // Agregar clase active al enlace correspondiente
        const activeIndex = this.sections.indexOf(currentSection);
        if (activeIndex !== -1 && this.navLinks[activeIndex]) {
            this.navLinks[activeIndex].classList.add('active');
        }
    }

    /**
     * Determina la sección actual basada en el scroll
     * @returns {string} - ID de la sección actual
     */
    getCurrentSection() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const offset = 100; // Offset para activar antes de llegar exactamente a la sección
        
        for (const sectionId of this.sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                const sectionTop = scrollY + rect.top;
                const sectionBottom = sectionTop + rect.height;
                
                // Verificar si estamos en esta sección
                if (scrollY + offset >= sectionTop && scrollY + offset < sectionBottom) {
                    return sectionId;
                }
                
                // Para la última sección, verificar si estamos cerca del final
                if (sectionId === 'contacto' && scrollY + windowHeight >= document.body.scrollHeight - 50) {
                    return sectionId;
                }
            }
        }
        
        return 'hero'; // Default a hero si no se encuentra ninguna sección
    }

    /**
     * Navega a una sección específica con scroll suave
     * @param {string} sectionId - ID de la sección destino
     */
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        this.isScrolling = true;
        
        // Calcular offset para la navbar fija
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const sectionTop = section.offsetTop - navbarHeight;
        
        // Scroll suave personalizado para mejor control
        this.smoothScrollTo(sectionTop, 800, () => {
            this.isScrolling = false;
            this.updateActiveNavLink();
        });
        
        // Actualizar inmediatamente el enlace activo
        this.setActiveNavLink(sectionId);
    }

    /**
     * Implementación de scroll suave personalizado
     * @param {number} targetPosition - Posición objetivo
     * @param {number} duration - Duración en ms
     * @param {Function} callback - Función de callback
     */
    smoothScrollTo(targetPosition, duration, callback) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function (ease-in-out)
            const ease = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                if (callback) callback();
            }
        };
        
        requestAnimationFrame(animation);
    }

    /**
     * Establece manualmente el enlace activo
     * @param {string} sectionId - ID de la sección
     */
    setActiveNavLink(sectionId) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        
        const index = this.sections.indexOf(sectionId);
        if (index !== -1 && this.navLinks[index]) {
            this.navLinks[index].classList.add('active');
        }
    }

    /**
     * Vincula navegación táctil para dispositivos móviles
     */
    bindTouchNavigation() {
        let startY = 0;
        let isSwipeNavigation = false;
        
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isSwipeNavigation = false;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (Math.abs(e.touches[0].clientY - startY) > 50) {
                isSwipeNavigation = true;
            }
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (isSwipeNavigation) {
                const endY = e.changedTouches[0].clientY;
                const deltaY = startY - endY;
                
                // Swipe hacia arriba (scroll down)
                if (deltaY > 100) {
                    this.navigateToNextSection();
                }
                // Swipe hacia abajo (scroll up)
                else if (deltaY < -100) {
                    this.navigateToPreviousSection();
                }
            }
        }, { passive: true });
    }

    /**
     * Navega a la siguiente sección
     */
    navigateToNextSection() {
        const currentSection = this.getCurrentSection();
        const currentIndex = this.sections.indexOf(currentSection);
        
        if (currentIndex < this.sections.length - 1) {
            const nextSection = this.sections[currentIndex + 1];
            this.scrollToSection(nextSection);
        }
    }

    /**
     * Navega a la sección anterior
     */
    navigateToPreviousSection() {
        const currentSection = this.getCurrentSection();
        const currentIndex = this.sections.indexOf(currentSection);
        
        if (currentIndex > 0) {
            const previousSection = this.sections[currentIndex - 1];
            this.scrollToSection(previousSection);
        }
    }

    /**
     * Habilita/deshabilita navegación automática
     * @param {boolean} enabled - Si está habilitada
     */
    setAutoNavigation(enabled) {
        this.autoNavigationEnabled = enabled;
    }

    /**
     * Obtiene la posición de una sección
     * @param {string} sectionId - ID de la sección
     * @returns {Object} - Objeto con top, bottom, height
     */
    getSectionPosition(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return null;
        
        const rect = section.getBoundingClientRect();
        const scrollY = window.pageYOffset;
        
        return {
            top: scrollY + rect.top,
            bottom: scrollY + rect.bottom,
            height: rect.height,
            element: section
        };
    }

    /**
     * Verifica si una sección está visible en el viewport
     * @param {string} sectionId - ID de la sección
     * @returns {boolean} - True si está visible
     */
    isSectionVisible(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return false;
        
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        return rect.top < windowHeight && rect.bottom > 0;
    }
}

// Crear instancia global del sistema de navegación
const navigationSystem = new NavigationSystem();

// Funciones globales para compatibilidad con HTML
window.scrollToSection = (sectionId) => navigationSystem.scrollToSection(sectionId);

// Agregar indicadores de progreso de scroll
window.addEventListener('load', () => {
    // Crear barra de progreso de scroll
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FACC15, #F59E0B);
        z-index: 999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Actualizar barra de progreso en scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});
