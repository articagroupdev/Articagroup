# Guía para Restaurar la Fuente KENTO

## 📋 Información sobre la Fuente KENTO

La fuente **KENTO** es parte del Manual de Marca de Artica Group y se utiliza para todos los títulos (h1, h2, h3, h4, h5, h6) en el sitio web.

## 🔍 Dónde Obtener la Fuente KENTO

### Opción 1: Descarga Gratuita (Verificar Licencia)
- **FreeFontDL**: https://freefontdl.com/kento-font/
- **DaFontFree**: https://www.dafontfree.co/kento-font/
- **BestFonts**: https://en.bestfonts.pro/font/kento

⚠️ **IMPORTANTE**: Verifica la licencia. Algunas versiones gratuitas son solo para uso personal.

### Opción 2: Licencia Comercial
- **Envato Elements**: https://elements.envato.com/kento-the-modern-sans-font-7HH59LH
  - Suscripción mensual: €14.50/mes
  - Incluye licencia comercial ilimitada
- **Creative Fabrica**: Versión comercial completa
- **Graphicfresh**: https://graphicfresh.com/product/kento-the-modern-sans-font/

## 📁 Pasos para Restaurar la Fuente

### Paso 1: Obtener los Archivos de Fuente

Necesitas los siguientes formatos (en orden de prioridad):
1. **KENTO.woff2** (formato moderno, más pequeño)
2. **KENTO.woff** (formato alternativo)
3. **KENTO.otf** (formato original, fallback)

### Paso 2: Convertir los Archivos (si es necesario)

Si solo tienes `.ttf` o `.otf`, puedes convertirlos a `.woff2` y `.woff` usando herramientas online:

**Herramientas de Conversión:**
- **CloudConvert**: https://cloudconvert.com/ttf-to-woff2
- **FontSquirrel Webfont Generator**: https://www.fontsquirrel.com/tools/webfont-generator
- **Online Font Converter**: https://convertio.co/es/ttf-woff2/

**Instrucciones de Conversión:**
1. Sube tu archivo `.ttf` o `.otf`
2. Selecciona el formato de salida (woff2, woff)
3. Descarga los archivos convertidos

### Paso 3: Colocar los Archivos

Coloca los archivos de fuente en la siguiente ubicación:

```
public/
  └── fonts/
      ├── KENTO.woff2  (preferido)
      ├── KENTO.woff   (alternativa)
      └── KENTO.otf    (fallback)
```

**Nota**: El directorio `public/fonts/` ya existe en el proyecto.

### Paso 4: Restaurar el Código CSS

Una vez que los archivos estén en su lugar, necesitas:

1. **Descomentar el @font-face** en `app/globals.css` (líneas 38-48)
2. **Restaurar la variable CSS** en `app/globals.css` (línea 54)

**Código a restaurar:**

```css
/* En app/globals.css, línea ~38 */
@font-face {
  font-family: "KENTO";
  src: url("/fonts/KENTO.woff2") format("woff2"),
       url("/fonts/KENTO.woff") format("woff"),
       url("/fonts/KENTO.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* En app/globals.css, línea ~54 */
--font-kento: "KENTO", "Arial Black", "Arial", sans-serif;
```

### Paso 5: Verificar que Funciona

1. Reinicia el servidor de desarrollo: `npm run dev`
2. Abre el navegador en `http://localhost:3000`
3. Abre las DevTools (F12) y ve a la pestaña "Network"
4. Filtra por "font" y verifica que las fuentes se cargan correctamente (código 200)
5. Inspecciona un título (h1, h2, etc.) y verifica que la fuente aplicada es "KENTO"

## 🔧 Solución de Problemas

### Error 404 en las fuentes
- Verifica que los archivos estén en `public/fonts/`
- Verifica que los nombres de archivo sean exactamente: `KENTO.woff2`, `KENTO.woff`, `KENTO.otf`
- Verifica que los archivos no estén corruptos

### La fuente no se aplica
- Limpia la caché del navegador (Ctrl+Shift+R)
- Verifica que el `@font-face` esté descomentado
- Verifica que la variable `--font-kento` incluya "KENTO" como primera opción

### La fuente se ve diferente
- Asegúrate de tener la versión correcta de la fuente (Regular, Bold, etc.)
- Verifica que el `font-weight` en el CSS coincida con el archivo de fuente

## 📝 Notas Adicionales

- La fuente KENTO se usa en todos los títulos según el Manual de Marca
- El fallback actual es "Arial Black" que funciona bien mientras no tengas la fuente
- Los formatos `.woff2` y `.woff` son más eficientes para web que `.otf` o `.ttf`
- Siempre incluye múltiples formatos para compatibilidad con diferentes navegadores

## ✅ Checklist Final

- [ ] Archivos de fuente descargados
- [ ] Archivos convertidos a woff2/woff (si es necesario)
- [ ] Archivos colocados en `public/fonts/`
- [ ] `@font-face` descomentado en `globals.css`
- [ ] Variable `--font-kento` restaurada
- [ ] Servidor reiniciado
- [ ] Fuente verificada en el navegador
