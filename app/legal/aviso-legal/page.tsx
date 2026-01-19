import NavbarLegal from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../legal.module.css';

export default function AvisoLegal() {
  return (
    <>
      <NavbarLegal />
      <div className={styles.legalPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>Aviso Legal</h1>
          
          <div className={styles.content}>
            <section>
              <p>
                <strong>Artica Group LLC</strong> es el titular y proveedor de servicios de la sociedad de la 
                información de este sitio web.
              </p>
            </section>

            <section>
              <h2>Datos de la Empresa</h2>
              <ul>
                <li><strong>Nombre de la Empresa:</strong> Artica Group LLC</li>
                <li><strong>Dirección Fiscal:</strong> 3550 NW 85TH CT #100 APT 447 MIAMI, FL 33122, Estados Unidos</li>
                <li><strong>Dirección Comercial:</strong> 7701 NW 46th St Suite 1-A, Miami, FL 33166, Estados Unidos</li>
              </ul>
            </section>

            <section>
              <h2>Información de Registro</h2>
              <ul>
                <li><strong>Document Number:</strong> L22000322400</li>
                <li><strong>FEI/EIN Number:</strong> 88-3388560</li>
                <li><strong>Date Filed:</strong> 07/20/2022</li>
                <li><strong>Effective Date:</strong> 07/15/2022</li>
                <li><strong>State:</strong> Florida (FL)</li>
                <li><strong>Status:</strong> ACTIVE</li>
              </ul>
            </section>

            <section>
              <h2>Sobre este Sitio Web</h2>
              <p>
                El acceso al sitio web de <strong>Artica Group LLC</strong> es gratuito, a menos que se indique 
                lo contrario en las condiciones particulares de servicios específicos, donde se detallarán los 
                precios, impuestos aplicables y gastos de envío, si los hubiere.
              </p>
              <p>
                Este aviso legal se complementa con nuestra Política de Privacidad, nuestras Condiciones Generales 
                de Uso y, en su caso, con las condiciones particulares de cada servicio ofrecido en este sitio web.
              </p>
            </section>

            <section>
              <h2>Servicios Ofrecidos</h2>
              <p>
                <strong>Artica Group LLC</strong> ofrece los siguientes servicios de marketing digital:
              </p>
              <ul>
                <li>Creación de contenido audiovisual</li>
                <li>Campañas publicitarias (Ads)</li>
                <li>Community Management</li>
                <li>Diseño gráfico</li>
                <li>Desarrollo web</li>
                <li>Edición de video</li>
                <li>Posicionamiento y comunicación estratégica</li>
                <li>Publicidad online</li>
              </ul>
            </section>

            <section>
              <h2>Propiedad Intelectual</h2>
              <p>
                Todos los contenidos de este sitio web, incluyendo textos, fotografías, gráficos, imágenes, 
                iconos, tecnología, software, así como su diseño gráfico y códigos fuente, constituyen una 
                obra cuya propiedad pertenece a <strong>Artica Group LLC</strong>, sin que puedan entenderse 
                cedidos al usuario ninguno de los derechos de explotación sobre los mismos más allá de lo 
                estrictamente necesario para el correcto uso de la web.
              </p>
            </section>

            <section>
              <h2>Responsabilidad</h2>
              <p>
                <strong>Artica Group LLC</strong> no se hace responsable de los daños y perjuicios de cualquier 
                naturaleza que pudieran derivarse de la disponibilidad y continuidad técnica del funcionamiento 
                del sitio web. En ningún caso <strong>Artica Group LLC</strong> será responsable de los daños 
                y perjuicios que puedan producirse por el uso y/o mala utilización del sitio web.
              </p>
            </section>

            <section>
              <h2>Datos de Contacto</h2>
              <p>
                Para contactar con <strong>Artica Group LLC</strong>, puede dirigirse a través de la siguiente 
                dirección de correo electrónico:{' '}
                <a href="mailto:info@articagroup.us">info@articagroup.us</a>
                {' '}o al siguiente número de teléfono:{' '}
                <a href="tel:+13056195878">+1 (305) 619-5878</a>
              </p>
              <p>
                <strong>Horario de atención:</strong> Lunes a Domingo de 9:00 AM a 5:00 PM (EST)
              </p>
              <p>
                <strong>Dirección Comercial:</strong> 7701 NW 46th St Suite 1-A, Miami, FL 33166, Estados Unidos
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
