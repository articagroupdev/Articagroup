# Animación de Scroll Hero - Documentación

## ¿Qué hace esta animación?

Esta animación utiliza **GSAP ScrollTrigger** para crear un efecto impresionante donde el Hero se "encapsula" o "se dobla" en un cuadro más pequeño al hacer scroll, aterrizando en una sección de galería/servicios debajo.

## Archivos Creados

1. **`app/components/HeroScrollEffect.tsx`** - Componente principal con la animación
2. **`app/components/HeroScrollEffect.module.css`** - Estilos CSS para la animación

## Cómo Usar

### Opción 1: Reemplazar el Hero actual

En `app/page.tsx`:

```tsx
import HeroScrollEffect from './components/HeroScrollEffect';

export default function Home() {
  return (
    <main>
      <HeroScrollEffect />
      {/* Resto de componentes */}
    </main>
  );
}
```

### Opción 2: Alternar entre Heroes

```tsx
import Hero from './components/Hero';
import HeroScrollEffect from './components/HeroScrollEffect';

export default function Home() {
  return (
    <main>
      {/* Usa HeroScrollEffect para animación o Hero para normal */}
      <HeroScrollEffect />
      {/* <Hero /> */}
      {/* Resto de componentes */}
    </main>
  );
}
```

## Cómo Funciona la Animación

### 1. **Position Fixed + Z-Index**
- El contenido del hero usa `position: fixed` para mantenerse visible durante el scroll
- Un z-index alto asegura que esté sobre la galería durante la transición

### 2. **Cálculo Dinámico de Posiciones**
- `getBoundingClientRect()` obtiene la posición exacta del "slot objetivo" en la galería
- Se calcula matemáticamente:
  - **Scale**: Qué tan pequeño debe hacerse el hero
  - **TranslateX/Y**: A dónde debe moverse el hero

### 3. **GSAP Timeline**
La animación tiene 3 pasos sincronizados:
1. **Fade out del texto** (0.3s) - El texto del hero desaparece
2. **Transformación del hero** (1s) - Se reduce y mueve al slot
3. **Fade in del contenido del slot** (0.4s) - Aparece el nuevo contenido

### 4. **ScrollTrigger Pin**
- `pin: true` congela el hero mientras ocurre la animación
- `scrub: 1` vincula el progreso de la animación al scroll del usuario

## Personalización

### Cambiar los Elementos de la Galería

En `HeroScrollEffect.tsx`, busca la sección `scroll-effect-gallery-grid` (línea ~1000):

```tsx
<div className="scroll-effect-gallery-grid">
  {/* Añade o modifica estos elementos */}
  <div className="scroll-effect-gallery-item">
    <div className="scroll-effect-item-content">
      <span className="scroll-effect-item-icon">💼</span>
      <h3>Tu Título</h3>
      <p>Tu descripción</p>
    </div>
  </div>
  
  {/* NO MUEVAS el elemento con scroll-effect-target-slot */}
  <div ref={targetSlotRef} className="scroll-effect-target-slot">
    {/* Aquí aterrizará el hero */}
  </div>
</div>
```

### Cambiar los Colores del Slot Objetivo

En `HeroScrollEffect.module.css`, busca `.scroll-effect-target-slot` (línea ~150):

```css
:global(.scroll-effect-target-slot) {
  /* Cambia estos colores */
  background: linear-gradient(135deg, #13B9D5 0%, #0FA8C2 100%);
  /* O usa un color sólido */
  background: #13B9D5;
}
```

### Ajustar la Velocidad de la Animación

En `HeroScrollEffect.tsx`, busca el timeline (línea ~180):

```tsx
// 1. Cambiar la velocidad del fade out del texto
tl.to(heroText, {
  opacity: 0,
  scale: 0.8,
  duration: 0.3, // ← Cambia esto (más alto = más lento)
  ease: 'power2.in'
}, 0);

// 2. Cambiar la velocidad de la transformación
tl.to(heroContent, {
  scale: finalTransform.scale,
  x: finalTransform.translateX,
  y: finalTransform.translateY,
  borderRadius: '16px',
  duration: 1, // ← Cambia esto
  ease: 'power2.inOut'
}, 0.15);
```

### Cambiar el Radio de Borde del Hero al Transformarse

En `HeroScrollEffect.tsx`, línea ~190:

```tsx
tl.to(heroContent, {
  // ...
  borderRadius: '16px', // ← Cambia esto (ej: '24px', '32px', '50%')
  // ...
});
```

### Ajustar la Suavidad del Scroll

En `HeroScrollEffect.tsx`, línea ~150:

```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    // ...
    scrub: 1, // ← Cambia esto (0 = instantáneo, 2 = muy suave)
    // ...
  }
});
```

## Modificar el Contenido del Slot Objetivo

El "slot objetivo" es donde aterriza el hero. Puedes cambiar su contenido:

```tsx
<div
  ref={targetSlotRef}
  className="scroll-effect-target-slot"
>
  <div ref={targetSlotContentRef} className="scroll-effect-item-content">
    {/* Cambia este contenido */}
    <span className="scroll-effect-item-icon">🎯</span>
    <h3>Tu Nuevo Título</h3>
    <p>Tu nueva descripción</p>
  </div>
</div>
```

## Sección Footer

La sección footer al final permite continuar el scroll. Puedes personalizarla:

```tsx
<section className="scroll-effect-footer">
  <h2>Tu Título</h2>
  <p>Tu descripción</p>
  {/* Agrega más contenido aquí si quieres */}
</section>
```

## Debugging

### Mostrar Marcadores de ScrollTrigger

En `HeroScrollEffect.tsx`, línea ~150:

```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    // ...
    markers: true, // ← Cambia false a true para ver los marcadores
    // ...
  }
});
```

Esto mostrará líneas verdes/rojas en la página que indican dónde empieza y termina la animación.

### Ver el Slot Objetivo

En `HeroScrollEffect.module.css`, al final del archivo:

```css
/* Descomenta esto para ver el borde del slot objetivo */
/*
:global(.scroll-effect-target-slot) {
  border: 3px dashed #ff0000 !important;
}
*/
```

## Responsive Design

La animación ya está optimizada para móviles. El grid de la galería se ajusta automáticamente:

- **Desktop**: 3 columnas
- **Tablet**: 2 columnas
- **Móvil**: 1 columna

## Notas Importantes

1. **No elimines los refs**: Los `ref` son cruciales para que la animación funcione
2. **Mantén el orden**: El slot objetivo debe estar en el grid de la galería
3. **Z-index**: Si tienes problemas de superposición, ajusta el z-index en el CSS

## Troubleshooting

### La animación no funciona
- Verifica que GSAP y ScrollTrigger estén instalados: `npm install gsap`
- Asegúrate de que `isReady` de LanguageContext esté funcionando

### El hero no aterriza en el lugar correcto
- La animación se recalcula automáticamente en resize
- Verifica que el slot objetivo tenga la clase correcta

### El contenido del slot no aparece
- Revisa que `targetSlotContentRef` esté correctamente asignado
- Verifica que la opacidad inicial en CSS sea 0

## Créditos

Esta animación está inspirada en efectos modernos de scroll de sitios web premium y utiliza la potente librería GSAP ScrollTrigger para lograr transiciones suaves y precisas.

## Soporte

Si tienes problemas con la animación, verifica:
1. Que GSAP esté instalado correctamente
2. Que no haya errores en la consola del navegador
3. Que los refs estén correctamente asignados a los elementos
