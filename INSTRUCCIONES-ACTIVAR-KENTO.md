# Instrucciones para Activar la Fuente KENTO

## 📦 Paso 1: Extraer el archivo ZIP

1. Localiza el archivo `Kento-Font.zip` que descargaste
2. Extrae el contenido del ZIP
3. Deberías ver archivos `.ttf` y/o `.otf`

## 🔄 Paso 2: Convertir a formatos web (IMPORTANTE)

Los archivos `.ttf` y `.otf` son muy pesados para web. Necesitas convertirlos a:
- **KENTO.woff2** (formato moderno, más pequeño)
- **KENTO.woff** (formato alternativo)
- **KENTO.otf** (puedes usar el original como fallback)

### Herramientas de conversión online:

1. **CloudConvert** (Recomendado): https://cloudconvert.com/ttf-to-woff2
   - Sube tu archivo `.ttf` o `.otf`
   - Selecciona formato de salida: `woff2`
   - Descarga el archivo convertido
   - Repite para `woff`

2. **FontSquirrel Webfont Generator**: https://www.fontsquirrel.com/tools/webfont-generator
   - Sube tu archivo
   - Selecciona "Expert" para más opciones
   - Marca "WOFF" y "WOFF2"
   - Descarga el ZIP con los formatos convertidos

3. **Online Font Converter**: https://convertio.co/es/ttf-woff2/
   - Similar a CloudConvert

## 📁 Paso 3: Colocar los archivos

Una vez convertidos, coloca los archivos en:

```
public/
  └── fonts/
      ├── KENTO.woff2  (convertido)
      ├── KENTO.woff   (convertido)
      └── KENTO.otf    (original del ZIP, o convertido)
```

**Importante**: Los nombres de archivo deben ser exactamente:
- `KENTO.woff2` (todo mayúsculas)
- `KENTO.woff` (todo mayúsculas)
- `KENTO.otf` (todo mayúsculas)

## ✅ Paso 4: Activar en el código

Una vez que los archivos estén en `public/fonts/`, avísame y activaré la fuente en el código automáticamente.

O si prefieres hacerlo manualmente:

1. Abre `app/globals.css`
2. Descomenta las líneas 38-48 (quita los `/*` y `*/`)
3. Cambia la línea 55 de:
   ```css
   --font-kento: "Arial Black", "Arial", sans-serif;
   ```
   a:
   ```css
   --font-kento: "KENTO", "Arial Black", "Arial", sans-serif;
   ```

## 🧪 Paso 5: Verificar

1. Reinicia el servidor: `npm run dev`
2. Abre el navegador en `http://localhost:3000`
3. Abre DevTools (F12) → pestaña "Network"
4. Filtra por "font" y verifica que se carguen (código 200)
5. Inspecciona un título (h1, h2, etc.) y verifica que la fuente sea "KENTO"

---

## ⚠️ Nota sobre la licencia

DafontFree generalmente ofrece fuentes para uso personal. Para uso comercial de Artica Group, considera:
- Verificar la licencia del archivo descargado
- Si es solo personal, comprar licencia comercial en Envato Elements o Creative Fabrica
