import NavbarLegal from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../legal.module.css';

export default function CondicionesUso() {
  return (
    <>
      <NavbarLegal />
      <div className={styles.legalPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>Condiciones de Uso</h1>
          
          <div className={styles.content}>
            <section>
              <p>
                Bienvenido a <strong>Artica Group LLC</strong>. Al acceder y utilizar nuestro sitio web{' '}
                <a href="https://articagroup.us/" target="_blank" rel="noopener noreferrer">
                  https://articagroup.us/
                </a>
                , usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso.
              </p>
            </section>

            <section>
              <h2>1. Aceptación de los Términos</h2>
              <p>
                El acceso a este sitio web implica la aceptación plena de estos términos. Si no está de acuerdo 
                con alguna parte de estos términos, no debe utilizar nuestros servicios ni acceder a este sitio.
              </p>
            </section>

            <section>
              <h2>2. Servicios</h2>
              <p>
                <strong>Artica Group</strong> ofrece servicios de marketing digital, creación de contenido, 
                campañas de Ads, Community Management, diseño gráfico, desarrollo web y edición de video. 
                Nos reservamos el derecho de modificar o interrumpir cualquier servicio en cualquier momento 
                sin previo aviso.
              </p>
            </section>

            <section>
              <h2>3. Propiedad Intelectual</h2>
              <p>
                Todo el contenido presente en este sitio, incluyendo textos, gráficos, logotipos, iconos, 
                imágenes y software, es propiedad de <strong>Artica Group LLC</strong> o de sus proveedores 
                de contenido y está protegido por las leyes de propiedad intelectual internacionales y de los 
                Estados Unidos.
              </p>
            </section>

            <section>
              <h2>4. Uso Permitido</h2>
              <p>
                Usted se compromete a utilizar el sitio web únicamente con fines lícitos. Queda prohibida la 
                reproducción, duplicación, copia o explotación de cualquier parte del sitio con fines comerciales 
                sin nuestro consentimiento expreso por escrito.
              </p>
            </section>

            <section>
              <h2>5. Limitación de Responsabilidad</h2>
              <p>
                <strong>Artica Group LLC</strong> no será responsable de ningún daño directo, indirecto o 
                incidental que resulte del uso o la imposibilidad de uso de este sitio o de los servicios 
                contratados a través de él.
              </p>
            </section>

            <section>
              <h2>6. Ley Aplicable</h2>
              <p>
                Estos términos se rigen por las leyes del Estado de Florida, Estados Unidos, sin tener en 
                cuenta sus conflictos de principios legales.
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
