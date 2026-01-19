import NavbarLegal from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../legal.module.css';

export default function PoliticaPrivacidad() {
  return (
    <>
      <NavbarLegal />
      <div className={styles.legalPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>Política de Privacidad</h1>
          
          <div className={styles.content}>
            <section>
              <p>
                En <strong>Artica Group LLC</strong>, valoramos su privacidad. Esta política explica cómo 
                recopilamos, usamos y protegemos su información personal.
              </p>
            </section>

            <section>
              <h2>1. Información que Recopilamos</h2>
              <p>
                Recopilamos información que usted nos proporciona directamente a través de nuestros formularios 
                de contacto o suscripción a la newsletter, tales como:
              </p>
              <ul>
                <li>Nombre y apellido</li>
                <li>Dirección de correo electrónico</li>
                <li>Nombre de la empresa</li>
                <li>Número de teléfono</li>
              </ul>
            </section>

            <section>
              <h2>2. Uso de la Información</h2>
              <p>Utilizamos su información para:</p>
              <ul>
                <li>Responder a sus consultas sobre nuestros servicios</li>
                <li>Enviar boletines informativos (newsletter) y actualizaciones de marketing</li>
                <li>Mejorar la experiencia del usuario en nuestro sitio web</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section>
              <h2>3. Protección de Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales 
                contra el acceso no autorizado, la alteración o la divulgación.
              </p>
            </section>

            <section>
              <h2>4. Compartir con Terceros</h2>
              <p>
                No vendemos ni alquilamos su información personal a terceros. Podemos compartir datos con 
                proveedores de servicios de confianza que nos ayudan a operar nuestro sitio (como servicios 
                de hosting o plataformas de email marketing), siempre bajo acuerdos de confidencialidad.
              </p>
            </section>

            <section>
              <h2>5. Sus Derechos</h2>
              <p>
                Usted tiene derecho a acceder, corregir o solicitar la eliminación de sus datos personales. 
                Para ejercer estos derechos, puede contactarnos en{' '}
                <a href="mailto:info@articagroup.us">info@articagroup.us</a>.
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
