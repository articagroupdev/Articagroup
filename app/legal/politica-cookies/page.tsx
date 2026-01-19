import NavbarLegal from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../legal.module.css';

export default function PoliticaCookies() {
  return (
    <>
      <NavbarLegal />
      <div className={styles.legalPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>Política de Cookies</h1>
          
          <div className={styles.content}>
            <section>
              <p>
                Este sitio web utiliza cookies para mejorar su experiencia de navegación y analizar nuestro tráfico.
              </p>
            </section>

            <section>
              <h2>1. ¿Qué son las cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un 
                sitio web. Ayudan a que el sitio funcione correctamente y proporcionan información a los 
                propietarios del sitio.
              </p>
            </section>

            <section>
              <h2>2. Tipos de Cookies que utilizamos</h2>
              
              <h3>Cookies Necesarias</h3>
              <p>
                Esenciales para que el sitio funcione y usted pueda navegar por él.
              </p>

              <h3>Cookies de Análisis</h3>
              <p>
                Nos permiten contar las visitas y fuentes de tráfico para medir y mejorar el rendimiento de 
                nuestro sitio (por ejemplo, Google Analytics).
              </p>

              <h3>Cookies de Marketing</h3>
              <p>
                Se utilizan para rastrear a los visitantes a través de las webs con el fin de mostrar anuncios 
                relevantes, como el píxel de Facebook (fbpx).
              </p>
            </section>

            <section>
              <h2>3. Control de Cookies</h2>
              <p>
                Usted puede elegir aceptar o rechazar las cookies. La mayoría de los navegadores web aceptan 
                cookies automáticamente, pero generalmente puede modificar la configuración de su navegador 
                para rechazarlas si lo prefiere. Tenga en cuenta que esto puede impedir que aproveche plenamente 
                el sitio web.
              </p>
            </section>

            <section>
              <h2>4. Cambios en la Política</h2>
              <p>
                Podemos actualizar esta Política de Cookies periódicamente. Le recomendamos revisar esta página 
                regularmente.
              </p>
            </section>

            <section>
              <h2>Datos de Contacto</h2>
              <p><strong>Empresa:</strong> Artica Group LLC</p>
              <p><strong>Dirección:</strong> 7701 NW 46th St Suite 1-A, Miami, FL 33166, Estados Unidos</p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:info@articagroup.us">info@articagroup.us</a>
              </p>
              <p>
                <strong>Teléfono:</strong>{' '}
                <a href="tel:+13056195878">+1 (305) 619-5878</a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
