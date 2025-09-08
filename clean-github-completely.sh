#!/bin/bash

echo "🧹 LIMPIEZA COMPLETA DEL REPOSITORIO GITHUB"
echo "============================================"

# Configuración del repositorio
REPO_URL="https://github.com/selahmusicweb/selahmusic.git"

echo "📋 Repositorio a limpiar: $REPO_URL"
echo ""

# Crear directorio temporal
TEMP_DIR="/tmp/selahmusic-cleanup-$(date +%s)"
echo "📁 Creando directorio temporal: $TEMP_DIR"

# Clonar el repositorio
echo "📥 Clonando repositorio actual..."
if git clone "$REPO_URL" "$TEMP_DIR"; then
    cd "$TEMP_DIR"
    
    echo ""
    echo "📊 CONTENIDO ACTUAL DEL REPOSITORIO:"
    echo "===================================="
    
    # Mostrar archivos actuales
    echo "📁 Archivos y carpetas encontrados:"
    ls -la | grep -v "^total"
    
    echo ""
    echo "📄 Archivos específicos:"
    find . -type f -not -path "./.git/*" | head -20
    
    echo ""
    echo "🗑️  INICIANDO LIMPIEZA COMPLETA..."
    echo "=================================="
    
    # Eliminar TODOS los archivos y carpetas (excepto .git)
    echo "🧹 Eliminando todos los archivos..."
    find . -mindepth 1 -not -path "./.git" -not -path "./.git/*" -delete 2>/dev/null || true
    
    # Verificar que está limpio
    echo "✅ Verificando limpieza..."
    REMAINING_FILES=$(find . -type f -not -path "./.git/*" | wc -l | xargs)
    
    if [ "$REMAINING_FILES" -eq 0 ]; then
        echo "✅ Repositorio completamente limpio"
        
        # Commit de limpieza
        echo "💾 Creando commit de limpieza..."
        git add -A
        git commit -m "🧹 LIMPIEZA COMPLETA - Preparando para SelahMusic 2025

- Eliminados todos los archivos del proyecto anterior
- Repositorio completamente limpio
- Listo para nuevo proyecto SelahMusic 2025" || echo "ℹ️  Repositorio ya estaba vacío"
        
        # Push de limpieza
        echo "⬆️  Subiendo limpieza a GitHub..."
        git push origin main 2>/dev/null || git push origin master 2>/dev/null || git push
        
        echo ""
        echo "🎉 ¡LIMPIEZA COMPLETADA EXITOSAMENTE!"
        echo "===================================="
        echo "✅ El repositorio GitHub está completamente limpio"
        echo "✅ Listo para subir SelahMusic 2025"
        echo ""
        echo "🚀 SIGUIENTE PASO:"
        echo "Ejecuta: ./deploy-to-github.sh"
        
    else
        echo "❌ Error: Quedan $REMAINING_FILES archivos"
        find . -type f -not -path "./.git/*"
    fi
    
    # Limpiar directorio temporal
    cd - > /dev/null
    rm -rf "$TEMP_DIR"
    
else
    echo "❌ Error: No se pudo clonar el repositorio"
    echo "💡 Posibles causas:"
    echo "   - Repositorio no existe o está vacío (esto es bueno)"
    echo "   - Problemas de conectividad"
    echo "   - Permisos insuficientes"
    echo ""
    echo "🚀 Puedes intentar subir directamente:"
    echo "   ./deploy-to-github.sh"
fi

echo ""
echo "✨ Proceso de limpieza finalizado"
