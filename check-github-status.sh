#!/bin/bash

# Script COMPLETO para verificar y limpiar GitHub antes de subir SelahMusic 2025
# Ejecutar desde: /Users/juanlizamah/Desktop/proyectos/selahmusic-2025

echo "🔍 VERIFICACIÓN Y LIMPIEZA DE GITHUB - SelahMusic 2025"
echo "======================================================"

# URL del repositorio (ajustar si es necesario)
REPO_URL="https://github.com/selahmusicweb/selahmusic.git"
REPO_NAME="selahmusic"

echo "📋 Información del repositorio:"
echo "   URL: $REPO_URL"
echo "   Nombre: $REPO_NAME"
echo ""

# Función para verificar si el repositorio está vacío
check_repo_status() {
    echo "🔍 Verificando estado del repositorio remoto..."
    
    # Clonar en directorio temporal para verificar
    TEMP_DIR="/tmp/selahmusic-check-$(date +%s)"
    
    if git clone "$REPO_URL" "$TEMP_DIR" 2>/dev/null; then
        cd "$TEMP_DIR"
        
        # Contar archivos (excluyendo .git)
        FILE_COUNT=$(find . -type f -not -path "./.git/*" | wc -l | xargs)
        
        if [ "$FILE_COUNT" -eq 0 ]; then
            echo "✅ Repositorio está VACÍO - Listo para subir nuevo proyecto"
            REPO_STATUS="empty"
        else
            echo "⚠️  Repositorio contiene $FILE_COUNT archivos:"
            find . -type f -not -path "./.git/*" -exec basename {} \; | head -10
            REPO_STATUS="has_files"
        fi
        
        cd - > /dev/null
        rm -rf "$TEMP_DIR"
    else
        echo "❌ No se pudo acceder al repositorio. Puede estar vacío o no existir."
        REPO_STATUS="inaccessible"
    fi
}

# Función para limpiar repositorio remoto
clean_remote_repo() {
    echo ""
    echo "🧹 LIMPIEZA DEL REPOSITORIO REMOTO"
    echo "=================================="
    
    TEMP_DIR="/tmp/selahmusic-clean-$(date +%s)"
    
    echo "📥 Clonando repositorio para limpieza..."
    if git clone "$REPO_URL" "$TEMP_DIR"; then
        cd "$TEMP_DIR"
        
        echo "🗑️  Eliminando todos los archivos existentes..."
        # Eliminar todos los archivos excepto .git
        find . -type f -not -path "./.git/*" -delete
        find . -type d -not -path "./.git/*" -not -path "./.git" -not -path "." -exec rm -rf {} + 2>/dev/null || true
        
        echo "💾 Commit de limpieza..."
        git add -A
        git commit -m "🧹 Limpieza completa del repositorio para SelahMusic 2025" || echo "Repositorio ya estaba vacío"
        
        echo "⬆️  Subiendo limpieza..."
        git push origin main || git push origin master
        
        cd - > /dev/null
        rm -rf "$TEMP_DIR"
        
        echo "✅ Repositorio limpiado exitosamente"
    else
        echo "❌ Error al clonar repositorio para limpieza"
        exit 1
    fi
}

# Ejecutar verificación
check_repo_status

echo ""
echo "📊 RESULTADO DE LA VERIFICACIÓN:"
echo "================================"

case $REPO_STATUS in
    "empty")
        echo "✅ PERFECTO: El repositorio está vacío"
        echo "✅ Puedes proceder con el deploy usando el script principal"
        echo ""
        echo "🚀 Ejecuta ahora:"
        echo "   ./deploy-to-github.sh"
        ;;
    "has_files")
        echo "⚠️  ATENCIÓN: El repositorio contiene archivos del proyecto anterior"
        echo ""
        read -p "¿Quieres LIMPIAR el repositorio automáticamente? (s/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[SsYy]$ ]]; then
            clean_remote_repo
            echo ""
            echo "✅ Repositorio limpiado. Ahora puedes subir el nuevo proyecto:"
            echo "   ./deploy-to-github.sh"
        else
            echo "❌ Limpieza cancelada. Limpia manualmente el repositorio antes de continuar."
        fi
        ;;
    "inaccessible")
        echo "❓ No se pudo verificar el repositorio"
        echo "💡 Esto puede ser normal si el repositorio está vacío"
        echo ""
        echo "🚀 Puedes intentar subir directamente:"
        echo "   ./deploy-to-github.sh"
        ;;
esac

echo ""
echo "📋 RESUMEN:"
echo "- Si el repositorio está limpio ✅ → Ejecuta: ./deploy-to-github.sh"
echo "- Si necesitas limpiar manualmente ⚠️ → Ve a GitHub y borra los archivos"
echo "- Si hay dudas ❓ → Contacta para verificar manualmente"
