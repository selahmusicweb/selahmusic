/**
 * Sistema de Cursos - SelahMusic
 * Gestiona el acceso y contenido de los cursos
 */

class CourseSystem {
    constructor() {
        this.courses = this.initializeCourses();
        this.init();
    }

    /**
     * Inicializa el sistema de cursos
     */
    init() {
        this.bindEvents();
    }

    /**
     * Vincula eventos a los elementos del DOM
     */
    bindEvents() {
        // Event listeners para modal de cursos
        window.addEventListener('click', (event) => {
            const courseModal = document.getElementById('courseModal');
            if (event.target === courseModal) {
                this.closeCourseModal();
            }
        });
    }

    /**
     * Inicializa la estructura de cursos
     * @returns {Object} - Objeto con todos los cursos disponibles
     */
    initializeCourses() {
        return {
            adorador: {
                title: '¿Qué es un adorador?',
                subtitle: 'Fundamentos espirituales de la adoración',
                category: 'fundamento',
                lessons: [
                    {
                        id: 1,
                        title: 'Lección 1: La esencia de la adoración',
                        description: 'Descubre qué significa adorar en espíritu y verdad según Juan 4:23-24',
                        duration: '25 min',
                        type: 'video'
                    },
                    {
                        id: 2,
                        title: 'Lección 2: El corazón del adorador',
                        description: 'Características bíblicas de un verdadero adorador',
                        duration: '30 min',
                        type: 'video'
                    },
                    {
                        id: 3,
                        title: 'Lección 3: Adoración vs. Entretenimiento',
                        description: 'Diferencias fundamentales entre adorar y entretener',
                        duration: '20 min',
                        type: 'video'
                    },
                    {
                        id: 4,
                        title: 'Lección 4: La vida como adoración',
                        description: 'Cómo vivir una vida de adoración continua (Romanos 12:1)',
                        duration: '35 min',
                        type: 'video'
                    },
                    {
                        id: 5,
                        title: 'Lección 5: El llamado del adorador',
                        description: 'Tu propósito y responsabilidad como adorador',
                        duration: '28 min',
                        type: 'video'
                    }
                ]
            },
            biblicos: {
                title: 'Fundamentos Bíblicos',
                subtitle: 'Base escritural para el ministerio musical',
                category: 'fundamento',
                lessons: [
                    {
                        id: 1,
                        title: 'Lección 1: La música en las Escrituras',
                        description: 'Recorrido bíblico desde el Antiguo hasta el Nuevo Testamento',
                        duration: '40 min',
                        type: 'video'
                    },
                    {
                        id: 2,
                        title: 'Lección 2: Los Salmos como modelo',
                        description: 'Estructura y propósito de los cánticos bíblicos',
                        duration: '35 min',
                        type: 'video'
                    },
                    {
                        id: 3,
                        title: 'Lección 3: El ministerio levítico',
                        description: 'Organización y propósito del ministerio musical en el templo',
                        duration: '45 min',
                        type: 'video'
                    },
                    {
                        id: 4,
                        title: 'Lección 4: Adoración en el Nuevo Testamento',
                        description: 'La adoración cristiana según el modelo apostólico',
                        duration: '38 min',
                        type: 'video'
                    },
                    {
                        id: 5,
                        title: 'Lección 5: Teología de la adoración',
                        description: 'Principios doctrinales para el ministerio musical',
                        duration: '42 min',
                        type: 'video'
                    }
                ]
            },
            instrumento: {
                title: 'Introducción al Instrumento',
                subtitle: 'Primeros pasos musicales con propósito ministerial',
                category: 'fundamento',
                lessons: [
                    {
                        id: 1,
                        title: 'Lección 1: Elección del instrumento',
                        description: 'Cómo elegir el instrumento según tu llamado y contexto',
                        duration: '20 min',
                        type: 'video'
                    },
                    {
                        id: 2,
                        title: 'Lección 2: Fundamentos técnicos',
                        description: 'Postura, respiración y técnicas básicas',
                        duration: '30 min',
                        type: 'video'
                    },
                    {
                        id: 3,
                        title: 'Lección 3: Primeros acordes y escalas',
                        description: 'Base musical práctica para comenzar a tocar',
                        duration: '35 min',
                        type: 'video'
                    },
                    {
                        id: 4,
                        title: 'Lección 4: Ritmo y tiempo',
                        description: 'Desarrollo del sentido rítmico y métrico',
                        duration: '25 min',
                        type: 'video'
                    },
                    {
                        id: 5,
                        title: 'Lección 5: Tu primera canción',
                        description: 'Aplicación práctica tocando tu primer himno o canto',
                        duration: '40 min',
                        type: 'video'
                    }
                ]
            },
            guitarra: {
                title: 'Guitarra Acústica',
                subtitle: 'Domina la guitarra para la adoración congregacional',
                category: 'practica',
                lessons: [
                    {
                        id: 1,
                        title: 'Módulo 1: Acordes básicos y avanzados',
                        description: 'Aprende los acordes esenciales: mayores, menores, séptimas y sus inversiones',
                        duration: '50 min',
                        type: 'video'
                    },
                    {
                        id: 2,
                        title: 'Módulo 2: Técnicas de rasgueo',
                        description: 'Patrones rítmicos para diferentes estilos de adoración y alabanza',
                        duration: '45 min',
                        type: 'video'
                    },
                    {
                        id: 3,
                        title: 'Módulo 3: Fingerpicking y arpegios',
                        description: 'Técnicas de dedos para momentos íntimos y baladas de adoración',
                        duration: '60 min',
                        type: 'video'
                    },
                    {
                        id: 4,
                        title: 'Módulo 4: Transposición y uso del capo',
                        description: 'Adapta cualquier canción a la tonalidad del cantante',
                        duration: '35 min',
                        type: 'video'
                    },
                    {
                        id: 5,
                        title: 'Módulo 5: Repertorio de adoración',
                        description: 'Aprende 20 canciones clásicas y contemporáneas de adoración',
                        duration: '90 min',
                        type: 'video'
                    },
                    {
                        id: 6,
                        title: 'Módulo 6: Dinámicas y expresión',
                        description: 'Cómo crear atmósferas de adoración a través de tu guitarra',
                        duration: '40 min',
                        type: 'video'
                    }
                ]
            },
            piano: {
                title: 'Piano para Adoración',
                subtitle: 'Desarrolla tu técnica pianística con propósito ministerial',
                category: 'practica',
                lessons: [
                    {
                        id: 1,
                        title: 'Módulo 1: Técnica y postura correcta',
                        description: 'Fundamentos técnicos para tocar sin lesiones y con fluidez',
                        duration: '35 min',
                        type: 'video'
                    },
                    {
                        id: 2,
                        title: 'Módulo 2: Acordes y progresiones',
                        description: 'Progresiones armónicas más usadas en la música cristiana',
                        duration: '55 min',
                        type: 'video'
                    },
                    {
                        id: 3,
                        title: 'Módulo 3: Improvisación básica',
                        description: 'Crea introducciones, interludios y finales espontáneos',
                        duration: '70 min',
                        type: 'video'
                    },
                    {
                        id: 4,
                        title: 'Módulo 4: Acompañamiento congregacional',
                        description: 'Técnicas para liderar la congregación desde el piano',
                        duration: '48 min',
                        type: 'video'
                    },
                    {
                        id: 5,
                        title: 'Módulo 5: Arreglos y voicings',
                        description: 'Enriquece tus acordes con extensiones y alteraciones',
                        duration: '65 min',
                        type: 'video'
                    },
                    {
                        id: 6,
                        title: 'Módulo 6: Repertorio clásico y contemporáneo',
                        description: 'Himnos tradicionales y canciones modernas de adoración',
                        duration: '85 min',
                        type: 'video'
                    }
                ]
            },
            teoria: {
                title: 'Teoría Musical',
                subtitle: 'Fundamentos teóricos para músicos de adoración',
                category: 'practica',
                lessons: [
                    {
                        id: 1,
                        title: 'Módulo 1: Escalas y modos musicales',
                        description: 'Escalas mayores, menores y modos griegos aplicados a la adoración',
                        duration: '60 min',
                        type: 'video'
                    },
                    {
                        id: 2,
                        title: 'Módulo 2: Círculo de quintas',
                        description: 'Comprende las relaciones tonales y modulaciones',
                        duration: '45 min',
                        type: 'video'
                    },
                    {
                        id: 3,
                        title: 'Módulo 3: Progresiones armónicas',
                        description: 'Las progresiones más usadas en música cristiana y su función',
                        duration: '55 min',
                        type: 'video'
                    },
                    {
                        id: 4,
                        title: 'Módulo 4: Análisis de canciones',
                        description: 'Descompón y comprende la estructura de himnos y canciones modernas',
                        duration: '50 min',
                        type: 'video'
                    },
                    {
                        id: 5,
                        title: 'Módulo 5: Intervalos y acordes',
                        description: 'Construcción de acordes y sus inversiones',
                        duration: '40 min',
                        type: 'video'
                    },
                    {
                        id: 6,
                        title: 'Módulo 6: Composición básica',
                        description: 'Principios para crear tus propias melodías y armonías',
                        duration: '75 min',
                        type: 'video'
                    }
                ]
            }
        };
    }

    /**
     * Verifica el acceso a un curso específico
     * @param {string} courseType - Tipo de curso
     */
    checkAccess(courseType) {
        if (!authSystem.isAuthenticated()) {
            authSystem.showNotification('Necesitas registrarte para acceder a los cursos. ¡Es gratis!', 'info');
            authSystem.openRegistrationModal();
            return;
        }
        
        // Usuario autenticado, mostrar contenido del curso
        this.showCourseContent(courseType);
    }

    /**
     * Muestra el contenido de un curso específico
     * @param {string} courseType - Tipo de curso
     */
    showCourseContent(courseType) {
        const course = this.courses[courseType];
        if (!course) {
            authSystem.showNotification('Curso no encontrado', 'error');
            return;
        }
        
        // Actualizar contenido del modal
        document.getElementById('courseTitle').textContent = course.title;
        document.getElementById('courseSubtitle').textContent = course.subtitle;
        
        // Generar contenido HTML
        const contentHTML = this.generateCourseContentHTML(course);
        document.getElementById('courseContent').innerHTML = contentHTML;
        
        // Mostrar modal
        document.getElementById('courseModal').style.display = 'block';
        
        // Agregar animación de entrada
        setTimeout(() => {
            document.querySelector('.course-modal .modal-content').classList.add('fade-in');
        }, 100);
    }

    /**
     * Genera el HTML del contenido del curso
     * @param {Object} course - Datos del curso
     * @returns {string} - HTML generado
     */
    generateCourseContentHTML(course) {
        const totalDuration = this.calculateTotalDuration(course.lessons);
        const lessonCount = course.lessons.length;
        
        return `
            <div class="course-header" style="margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="color: #64748b; font-size: 0.9rem;">${lessonCount} lecciones</span>
                    <span style="color: #64748b; font-size: 0.9rem;">Duración total: ${totalDuration}</span>
                </div>
                <div style="background: linear-gradient(135deg, #FACC15 0%, #F59E0B 100%); height: 4px; border-radius: 2px; margin-bottom: 1rem;"></div>
            </div>
            
            <h3 style="color: #FACC15; margin-bottom: 1.5rem; font-size: 1.3rem;">📋 Contenido del Curso</h3>
            
            <ul class="lesson-list">
                ${course.lessons.map((lesson, index) => `
                    <li class="lesson-item" data-lesson-id="${lesson.id}">
                        <div style="display: flex; align-items: flex-start; gap: 1rem;">
                            <div style="background: #FACC15; color: #000; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; flex-shrink: 0;">
                                ${index + 1}
                            </div>
                            <div style="flex: 1;">
                                <div class="lesson-title" style="display: flex; justify-content: space-between; align-items: center;">
                                    <span>${lesson.title}</span>
                                    <span style="color: #64748b; font-size: 0.8rem; font-weight: normal;">${lesson.duration}</span>
                                </div>
                                <div class="lesson-description">${lesson.description}</div>
                                <div style="margin-top: 0.5rem;">
                                    <span style="background: rgba(37, 99, 235, 0.1); color: #2563EB; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.75rem; font-weight: 500;">
                                        📹 ${lesson.type === 'video' ? 'Video' : 'Material'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                `).join('')}
            </ul>
            
            <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(250, 204, 21, 0.1); border-radius: 15px; text-align: center; border: 2px solid rgba(250, 204, 21, 0.2);">
                <div style="margin-bottom: 1rem;">
                    <span style="font-size: 2rem;">🚀</span>
                </div>
                <h4 style="color: #FACC15; margin-bottom: 1rem; font-size: 1.2rem;">¡Contenido completo disponible próximamente!</h4>
                <p style="color: #e2e8f0; margin-bottom: 1.5rem; line-height: 1.6; font-size: 0.95rem;">
                    Este es el contenido que tendrás disponible. Estamos preparando videos de alta calidad, 
                    materiales descargables, ejercicios prácticos y evaluaciones para cada lección.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem; flex-wrap: wrap;">
                    <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">
                        ✅ Videos HD
                    </span>
                    <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">
                        ✅ Material PDF
                    </span>
                    <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">
                        ✅ Ejercicios
                    </span>
                </div>
            </div>
        `;
    }

    /**
     * Calcula la duración total del curso
     * @param {Array} lessons - Array de lecciones
     * @returns {string} - Duración total formateada
     */
    calculateTotalDuration(lessons) {
        let totalMinutes = 0;
        
        lessons.forEach(lesson => {
            const duration = lesson.duration.match(/(\d+)\s*min/);
            if (duration) {
                totalMinutes += parseInt(duration[1]);
            }
        });
        
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}min`;
        } else {
            return `${minutes}min`;
        }
    }

    /**
     * Cierra el modal de cursos
     */
    closeCourseModal() {
        const modal = document.getElementById('courseModal');
        const modalContent = modal.querySelector('.modal-content');
        
        // Animación de salida
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
            modalContent.classList.remove('fade-in');
        }, 200);
    }

    /**
     * Obtiene información de un curso específico
     * @param {string} courseType - Tipo de curso
     * @returns {Object|null} - Datos del curso
     */
    getCourseInfo(courseType) {
        return this.courses[courseType] || null;
    }

    /**
     * Obtiene todos los cursos por categoría
     * @param {string} category - Categoría de cursos
     * @returns {Array} - Array de cursos de la categoría
     */
    getCoursesByCategory(category) {
        return Object.entries(this.courses)
            .filter(([key, course]) => course.category === category)
            .map(([key, course]) => ({ ...course, id: key }));
    }

    /**
     * Marca una lección como completada
     * @param {string} courseType - Tipo de curso
     * @param {number} lessonId - ID de la lección
     */
    markLessonAsCompleted(courseType, lessonId) {
        if (!authSystem.isAuthenticated()) return;
        
        const user = authSystem.getCurrentUser();
        if (!user.courses) user.courses = [];
        
        let courseProgress = user.courses.find(c => c.courseId === courseType);
        if (!courseProgress) {
            courseProgress = {
                courseId: courseType,
                completedLessons: [],
                progress: 0,
                startDate: new Date().toISOString()
            };
            user.courses.push(courseProgress);
        }
        
        if (!courseProgress.completedLessons.includes(lessonId)) {
            courseProgress.completedLessons.push(lessonId);
            
            // Calcular progreso
            const totalLessons = this.courses[courseType].lessons.length;
            courseProgress.progress = Math.round((courseProgress.completedLessons.length / totalLessons) * 100);
            
            // Guardar en localStorage
            localStorage.setItem('selahUser', JSON.stringify(user));
            
            authSystem.showNotification(`¡Lección completada! Progreso: ${courseProgress.progress}%`, 'success');
        }
    }

    /**
     * Obtiene el progreso de un curso
     * @param {string} courseType - Tipo de curso
     * @returns {Object} - Objeto con el progreso del curso
     */
    getCourseProgress(courseType) {
        if (!authSystem.isAuthenticated()) return { progress: 0, completedLessons: [] };
        
        const user = authSystem.getCurrentUser();
        if (!user.courses) return { progress: 0, completedLessons: [] };
        
        const courseProgress = user.courses.find(c => c.courseId === courseType);
        return courseProgress || { progress: 0, completedLessons: [] };
    }
}

// Crear instancia global del sistema de cursos
const courseSystem = new CourseSystem();

// Funciones globales para compatibilidad con HTML
window.checkAccess = (courseType) => courseSystem.checkAccess(courseType);
window.closeCourseModal = () => courseSystem.closeCourseModal();
