# SelahMusic 2025 - Plataforma de Formación Musical y Espiritual

## 🎵 Descripción del Proyecto

SelahMusic es una plataforma web moderna diseñada para formar adoradores que combinen excelencia musical con profundidad espiritual. Nuestro enfoque integral abarca desde la vida devocional hasta la técnica musical avanzada.

## 🚀 Características Principales

### ✨ **Diseño Moderno y Responsivo**
- Interfaz elegante con gradientes y animaciones suaves
- Totalmente responsive para todos los dispositivos
- Optimizado para accesibilidad web (ARIA, navegación por teclado)
- Efectos visuales avanzados con CSS puro

### 🎯 **Sistema Educativo Estructurado**
- **Raíz**: Vida devocional e intimidad con Dios
- **Fundamento**: Formación ministerial y musical básica
- **Práctica**: Cursos técnicos especializados
- **Legado**: Comunidad y producción musical

### 🔐 **Sistema de Autenticación**
- Registro e inicio de sesión local
- Gestión de usuarios con localStorage
- Acceso controlado a contenidos exclusivos
- Perfiles de usuario personalizados

### 📚 **Gestión de Cursos**
- Cursos categorizados por nivel
- Seguimiento de progreso individual
- Contenido multimedia estructurado
- Sistema de lecciones y módulos

### 🎨 **Experiencia de Usuario Avanzada**
- Navegación suave entre secciones
- Animaciones de entrada progresivas
- Efectos parallax sutiles
- Indicadores de progreso de scroll

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **HTML5**: Estructura semántica y accesible
- **CSS3**: 
  - Variables CSS personalizadas
  - Flexbox y Grid Layout
  - Animaciones y transiciones
  - Media queries para responsive design
- **JavaScript (ES6+)**:
  - Clases y módulos
  - APIs del navegador (IntersectionObserver, LocalStorage)
  - Event handling avanzado
  - Programación orientada a objetos

### **Arquitectura**
- **Modular**: Separación por responsabilidades
- **Escalable**: Fácil agregar nuevas funcionalidades
- **Mantenible**: Código bien documentado y organizado
- **Performance**: Optimizado para carga rápida

## 📁 Estructura del Proyecto

```
selahmusic-2025/
├── index.html                 # Página principal
├── README.md                  # Documentación del proyecto
└── assets/
    ├── css/
    │   ├── main.css          # Variables, reset y utilidades
    │   ├── components.css    # Componentes específicos
    │   └── responsive.css    # Adaptaciones móviles y modales
    └── js/
        ├── auth.js           # Sistema de autenticación
        ├── courses.js        # Gestión de cursos
        ├── navigation.js     # Navegación y scroll
        └── main.js           # Coordinador principal
```

## 🎨 Paleta de Colores

| Color | Hex Code | Uso |
|-------|----------|-----|
| Dorado Principal | `#FACC15` | Acentos, CTAs, elementos destacados |
| Azul Oscuro | `#0B0F19` | Fondo principal, textos principales |
| Azul Secundario | `#1a1f2e` | Gradientes, áreas secundarias |
| Azul Práctica | `#2563EB` | Sección de práctica, elementos activos |
| Texto Claro | `#e2e8f0` | Textos sobre fondos oscuros |
| Texto Oscuro | `#1e293b` | Textos sobre fondos claros |

## 🎯 Secciones de la Página

### 1. **Hero Section**
- Presentación principal de SelahMusic
- Call-to-action prominente
- Animación de scroll indicator

### 2. **Raíz - Devocional** (Fondo Dorado)
- Devocional 365 días
- Podcast "Ser Hallado en Él"
- Altar en Casa

### 3. **Fundamento - Formación** (Fondo Negro)
- ¿Qué es un adorador?
- Fundamentos bíblicos
- Introducción al instrumento
- Sistema de registro para acceso

### 4. **Práctica - Cursos Técnicos** (Fondo Blanco)
- Guitarra acústica
- Piano para adoración
- Teoría musical
- Acceso para usuarios registrados

### 5. **Legado - Comunidad** (Fondo Azul)
- Estudio de grabación Selah
- Proyectos con propósito
- Comunidad de apoyo mutuo

### 6. **Contacto** (Fondo Oscuro)
- Formulario de contacto completo
- Selección de etapa de interés
- Validación en tiempo real

## 🔧 Funcionalidades Técnicas

### **Sistema de Autenticación**
```javascript
// Registro de usuario
authSystem.handleRegister(event)

// Inicio de sesión
authSystem.handleLogin(event)

// Verificación de acceso
authSystem.isAuthenticated()
```

### **Gestión de Cursos**
```javascript
// Verificar acceso a curso
courseSystem.checkAccess('guitarra')

// Mostrar contenido
courseSystem.showCourseContent('piano')

// Progreso del usuario
courseSystem.getCourseProgress('teoria')
```

### **Navegación Suave**
```javascript
// Navegar a sección
navigationSystem.scrollToSection('fundamento')

// Navegación automática
navigationSystem.navigateToNextSection()
```

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: `< 480px`
- **Tablet**: `481px - 768px`
- **Desktop**: `> 768px`

### **Adaptaciones Móviles**
- Navegación vertical colapsable
- Tarjetas en columna única
- Formularios optimizados para touch
- Modales de pantalla completa

## ⚡ Optimizaciones de Performance

### **Carga Rápida**
- CSS y JS modulares y minificables
- Lazy loading de imágenes
- Throttling en eventos de scroll
- Animaciones optimizadas con CSS

### **Experiencia de Usuario**
- Feedback inmediato en interacciones
- Estados de carga y error
- Validación en tiempo real
- Notificaciones no intrusivas

## 🎵 Cursos Disponibles

### **Fundamento** (Acceso gratuito con registro)
1. **¿Qué es un adorador?** - 5 lecciones (138 min)
2. **Fundamentos bíblicos** - 5 lecciones (200 min)
3. **Introducción al instrumento** - 5 lecciones (150 min)

### **Práctica** (Acceso con suscripción)
1. **Guitarra Acústica** - 6 módulos (360 min)
2. **Piano para Adoración** - 6 módulos (358 min)
3. **Teoría Musical** - 6 módulos (325 min)

## 🚀 Instalación y Uso

### **Desarrollo Local**
```bash
# Clonar el proyecto
git clone [repositorio]

# Abrir en servidor local
# Usar extensión Live Server de VS Code
# O cualquier servidor HTTP estático
```

### **Despliegue**
```bash
# El proyecto es estático, puede desplegarse en:
# - GitHub Pages
# - Netlify
# - Vercel
# - Servidor web tradicional
```

## 🔮 Futuras Mejoras

### **Próximas Funcionalidades**
- [ ] Backend completo con base de datos
- [ ] Sistema de pagos integrado
- [ ] Videos y contenido multimedia
- [ ] Chat en vivo para soporte
- [ ] App móvil nativa
- [ ] Certificaciones digitales

### **Mejoras Técnicas**
- [ ] Service Workers para cache
- [ ] Web push notifications
- [ ] Análisis de usuarios
- [ ] A/B testing
- [ ] CDN para assets

## 📞 Contacto y Soporte

- **Email**: info@selahmusic.cl
- **Website**: selahmusic.cl
- **Soporte**: Formulario de contacto integrado

## 📄 Licencia

Proyecto desarrollado para SelahMusic. Todos los derechos reservados.

---

**Desarrollado con ❤️ para formar adoradores que marquen generaciones**
