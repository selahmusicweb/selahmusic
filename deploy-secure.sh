#!/bin/bash

echo "🔐 DEPLOY SEGURO SELAHMUSIC 2025"
echo "==============================="

# Verificar directorio
if [ ! -f "index.html" ]; then
    echo "❌ Error: Ejecuta desde /Users/juanlizamah/Desktop/proyectos/selahmusic-2025"
    exit 1
fi

echo "📁 Directorio verificado ✅"

# Limpiar git previo
echo "🧹 Limpiando configuración anterior..."
rm -rf .git

# Configurar Git
echo "⚙️ Configurando Git..."
git init
git config user.name "selahmusicweb"

echo ""
echo "📧 Ingresa tu email de GitHub:"
read -p "Email: " user_email
git config user.email "$user_email"

# Agregar archivos
echo "📦 Agregando archivos al repositorio..."
git add .

# Commit
echo "💾 Creando commit..."
git commit -m "🎵 SelahMusic 2025 - Plataforma Completa

✨ Características:
- Sistema de autenticación local
- Gestión de cursos estructurados  
- Diseño responsive moderno
- CSS y JavaScript modulares
- Documentación completa

📁 Estructura:
- index.html - Página principal
- assets/css/ - Estilos organizados
- assets/js/ - Scripts modulares  
- README.md - Documentación

🚀 Listo para producción"

# Configurar remote
echo "🔗 Configurando repositorio remoto..."
git remote add origin https://github.com/selahmusicweb/selahmusic.git
git branch -M main

# Configurar credenciales de forma segura
echo ""
echo "🔑 CONFIGURACIÓN DE CREDENCIALES"
echo "================================"
echo ""
echo "Necesito configurar tus credenciales de GitHub:"
echo ""

# Solicitar username
echo "👤 Usuario de GitHub:"
read -p "Username: " github_user

# Solicitar token de forma segura (no se muestra en pantalla)
echo ""
echo "🔐 Token de GitHub (no se mostrará al escribir):"
echo "💡 Usa el token que creaste en GitHub Settings > Tokens"
read -s -p "Token: " github_token
echo ""

# Configurar credenciales temporalmente
git config credential.helper store

# Crear archivo de credenciales temporal
echo "https://$github_user:$github_token@github.com" > ~/.git-credentials-temp

# Usar credenciales temporales
git config credential.helper "store --file ~/.git-credentials-temp"

echo ""
echo "🚀 Subiendo proyecto a GitHub..."
echo "================================"

# Intentar push
if git push -u origin main; then
    echo ""
    echo "🎉 ¡ÉXITO COMPLETO!"
    echo "=================="
    echo "✅ Proyecto SelahMusic 2025 subido correctamente"
    echo "🌐 Ve a: https://github.com/selahmusicweb/selahmusic"
    echo ""
    echo "📋 Archivos subidos:"
    echo "   ✅ index.html"
    echo "   ✅ README.md"
    echo "   ✅ assets/css/ (3 archivos)"
    echo "   ✅ assets/js/ (4 archivos)"
    echo "   ✅ .gitignore"
    echo ""
    echo "🎯 Tu sitio web está listo!"
else
    echo ""
    echo "❌ Error en la subida"
    echo "==================="
    echo ""
    echo "Posibles soluciones:"
    echo "1. Verifica que el token tenga permisos 'repo'"
    echo "2. Verifica que el repositorio existe"
    echo "3. Intenta de nuevo con:"
    echo "   git push -u origin main"
fi

# Limpiar credenciales temporales
rm -f ~/.git-credentials-temp
git config --unset credential.helper

echo ""
echo "🔒 Credenciales temporales limpiadas por seguridad"
echo "✅ Deploy script completado"
