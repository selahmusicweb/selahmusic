#!/bin/bash

echo "🔐 DEPLOY PARA REPOSITORIO PRIVADO - SelahMusic 2025"
echo "=================================================="

echo "⚠️  NOTA: Este repositorio es PRIVADO"
echo "Se requiere autenticación para acceder"
echo ""

# Verificar si estamos en el directorio correcto
if [ ! -f "index.html" ]; then
    echo "❌ Error: No estás en el directorio correcto"
    echo "Ejecuta: cd /Users/juanlizamah/Desktop/proyectos/selahmusic-2025"
    exit 1
fi

echo "📁 Directorio verificado ✅"
echo ""

# Limpiar cualquier git existente
if [ -d ".git" ]; then
    echo "🧹 Limpiando repositorio Git anterior..."
    rm -rf .git
fi

# Inicializar Git
echo "📁 Inicializando Git..."
git init

# Configurar usuario
echo "👤 Configurando usuario Git..."
read -p "Ingresa tu nombre de usuario de GitHub: " github_username
read -p "Ingresa tu email de GitHub: " github_email

git config user.name "$github_username"
git config user.email "$github_email"

# Agregar archivos
echo "📦 Agregando archivos..."
git add .

# Commit
echo "💾 Creando commit..."
git commit -m "🎵 SelahMusic 2025 - Proyecto completo

✨ Características principales:
- Plataforma web moderna para formación musical
- Sistema de autenticación local  
- Gestión de cursos estructurados
- Diseño responsive y accesible
- CSS y JavaScript modulares

📁 Estructura completa:
- index.html - Página principal
- assets/css/ - Estilos modulares  
- assets/js/ - Scripts modulares
- README.md - Documentación

🎯 Listo para producción"

# Configurar remote
echo "🔗 Configurando repositorio remoto..."
git remote add origin https://github.com/selahmusicweb/selahmusic.git

# Preparar para push
git branch -M main

echo ""
echo "🚀 LISTO PARA SUBIR A GITHUB"
echo "=========================="
echo ""
echo "OPCIONES:"
echo ""
echo "1️⃣  PUSH AUTOMÁTICO (requiere autenticación):"
echo "   git push -u origin main"
echo ""
echo "2️⃣  PUSH CON TOKEN (más seguro):"
echo "   - Ve a GitHub → Settings → Personal Access Tokens"
echo "   - Genera nuevo token con permisos 'repo'"
echo "   - Ejecuta: git push -u origin main"
echo "   - Usuario: tu_usuario"
echo "   - Contraseña: tu_token_generado"
echo ""
echo "3️⃣  SUBIDA MANUAL:"
echo "   - Ve a https://github.com/selahmusicweb/selahmusic"
echo "   - Upload files manualmente"
echo ""

read -p "¿Quieres intentar el push automático ahora? (s/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[SsYy]$ ]]; then
    echo "🚀 Intentando push..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "🎉 ¡ÉXITO! Proyecto subido correctamente"
        echo "🌐 Ve a: https://github.com/selahmusicweb/selahmusic"
    else
        echo "❌ Error en push. Usa una de las otras opciones."
    fi
else
    echo "📋 Push cancelado. Usa los comandos mostrados arriba."
fi

echo ""
echo "✅ Deploy script completado"
