'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../legal.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function CondicionesUsoPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 50 });
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }

      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll('section');
        gsap.set(sections, { opacity: 0, y: 40 });

        gsap.to(sections, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.legalPage}>
      <Navbar />
      
      <div className={styles.container}>
        <h1
          ref={titleRef}
          className={styles.title}
        >
          Condiciones Generales de Uso
        </h1>

        <div ref={contentRef} className={styles.content}>
          <section>
            <h2>1. Objeto</h2>
            <p>
              Los términos y condiciones contenidos en estas Condiciones Generales de Uso (en adelante, «Condiciones») regulan el acceso y uso del sitio web de Artica Group LLC (en adelante, «Sitio Web»).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              La utilización del Sitio Web implica la aceptación plena y sin reservas de todas y cada una de las Condiciones aquí recogidas, así como de la Política de Privacidad y, en su caso, de las condiciones particulares que puedan establecerse para servicios específicos.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Se entiende por «Sitio Web» este sitio web y cualquier otro al que el Usuario acceda a través de la navegación en este Sitio Web que sea propiedad y esté gestionado por Artica Group LLC, incluyendo todos los datos, textos, gráficos, imágenes, animaciones, creaciones musicales, vídeos, sonidos, dibujos, fotografías, diseños y cualquier otro contenido incluido en el mismo.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              El acceso al Sitio Web implica que el Usuario adquiere una serie de derechos y obligaciones destinados a garantizar el adecuado disfrute de los servicios y contenidos ofrecidos por Artica Group LLC.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              El Usuario es consciente de que el acceso y utilización de los servicios y contenidos del Sitio Web se realiza bajo su única y exclusiva responsabilidad.
            </p>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              La condición de Usuario se adquiere mediante el acceso al Sitio Web.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              2. Gratuidad del Acceso
            </h2>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              El acceso y/o utilización del Sitio Web es gratuito, excepto para aquellos servicios que se señalen específicamente con un precio en sus respectivas condiciones particulares.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              3. Registro de Usuarios (Si aplica)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Para el acceso y/o utilización de determinados servicios del Sitio Web que requieran registro, el Usuario deberá proporcionar la información solicitada y aceptar las condiciones particulares correspondientes. El Usuario se compromete a proporcionar información precisa y actualizada.
            </p>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Artica Group LLC se reserva el derecho de denegar o retirar el acceso al Sitio Web y/o a los servicios ofrecidos sin previo aviso cuando se incumplan estas Condiciones, las condiciones particulares que regulen un determinado servicio o la Política de Privacidad.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              4. Menores de Edad
            </h2>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Los menores de edad deberán obtener el consentimiento de sus padres, tutores o representantes legales antes de utilizar los servicios del Sitio Web que requieran la recopilación de datos personales. Artica Group LLC no se responsabiliza del uso del Sitio Web por menores de edad sin la debida autorización.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              5. Propiedad Intelectual e Industrial
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Todo el contenido del Sitio Web, incluyendo, sin limitación, bases de datos, diseño gráfico, fotografías, logos, marcas, imágenes, audio, video, documentos, código fuente (HTML y Javascript), y cualquier otro material publicado, está protegido por derechos de propiedad intelectual e industrial pertenecientes a Artica Group LLC o a terceros.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              El Usuario se abstendrá de reproducir, copiar, distribuir, comunicar públicamente, transformar o modificar los servicios y contenidos del Sitio Web sin la autorización expresa de Artica Group LLC o del titular de los derechos correspondientes.
            </p>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Queda prohibida la utilización de la información obtenida a través del Sitio Web para enviar publicidad, comunicaciones con fines de venta directa o con cualquier otra finalidad comercial, así como la comercialización o divulgación de dicha información de cualquier modo.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              6. Correcta Utilización del Sitio Web
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              El Usuario se compromete a utilizar el Sitio Web y sus servicios de conformidad con la legislación vigente, estas Condiciones y las condiciones particulares que puedan aplicarse a servicios específicos.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              En particular, el Usuario se abstendrá de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <li>Utilizar el Sitio Web con fines ilícitos, lesivos de derechos de terceros o que puedan dañar, deteriorar o impedir el acceso o funcionamiento del mismo.</li>
              <li>Utilizar los servicios total o parcialmente para promocionar, vender o divulgar publicidad o información propia o de terceros sin autorización previa y por escrito de Artica Group LLC.</li>
              <li>Realizar cualquier acción que pueda dañar, alterar, interrumpir o generar errores en el Sitio Web o en los sistemas de Artica Group LLC o de terceros.</li>
              <li>Introducir virus, programas maliciosos o cualquier otro código dañino que pueda afectar el Sitio Web.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Artica Group LLC se reserva los siguientes derechos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <li>Modificar las condiciones de acceso al Sitio Web, técnica o no, de forma unilateral y sin previo aviso a los usuarios.</li>
              <li>Establecer condiciones particulares y la exigencia de un precio u otros requisitos para el acceso a determinados servicios y/o contenidos.</li>
              <li>Limitar, excluir o condicionar el acceso de los usuarios cuando no se garanticen las condiciones de correcta utilización del Sitio Web.</li>
              <li>Finalizar la prestación de un servicio o suministro de un contenido en cualquier momento.</li>
              <li>Modificar, suprimir o actualizar todo o parte de los contenidos o servicios ofrecidos a través del Sitio Web sin necesidad de previo aviso.</li>
              <li>Emprender cualquier acción legal que resulte conveniente para la protección de los derechos de Artica Group LLC.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              7. Condiciones de Uso de los Servicios
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              A través de su Sitio Web, Artica Group LLC puede ofrecer diversos servicios, cuyas condiciones de uso específicas se detallan a continuación:
            </p>
            
            <h3 className="text-xl font-semibold text-[#272F66] mt-6 mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              7.1 Creación de Contenido:
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Los Usuarios que soliciten servicios de creación de contenido (textos, imágenes, videos, etc.) a Artica Group LLC se comprometen a proporcionar la información necesaria de manera precisa y completa para la correcta ejecución del servicio. La propiedad intelectual del contenido creado será transferida al Usuario una vez que el servicio haya sido completamente pagado y entregado, salvo acuerdo específico por escrito entre Artica Group LLC y el Usuario. Artica Group LLC se reserva el derecho de utilizar muestras del contenido creado para fines promocionales internos, respetando la confidencialidad de la información sensible del Usuario.
            </p>

            <h3 className="text-xl font-semibold text-[#272F66] mt-6 mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              7.2 Publicidad Online:
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Los Usuarios que contraten servicios de publicidad online a través de Artica Group LLC serán responsables de proporcionar los materiales publicitarios (anuncios, creatividades, enlaces, etc.) de acuerdo con las especificaciones técnicas requeridas por las plataformas publicitarias (Google Ads, redes sociales, etc.). Artica Group LLC gestionará las campañas publicitarias de acuerdo con la estrategia acordada con el Usuario, pero no garantiza resultados específicos en términos de clics, impresiones, conversiones o retorno de la inversión, ya que estos dependen de diversos factores externos a la gestión de Artica Group LLC. El Usuario se compromete a cumplir con las políticas publicitarias de las plataformas utilizadas y a mantener indemne a Artica Group LLC ante cualquier reclamación derivada del contenido de sus anuncios.
            </p>

            <h3 className="text-xl font-semibold text-[#272F66] mt-6 mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              7.3 Estrategias de Ventas:
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Los servicios de estrategias de ventas ofrecidos por Artica Group LLC tienen como objetivo asesorar y guiar al Usuario en la optimización de sus procesos y técnicas de venta online. El Usuario reconoce que la implementación de dichas estrategias y los resultados obtenidos dependen en gran medida de sus propios esfuerzos, recursos y las condiciones del mercado. Artica Group LLC no garantiza un aumento específico en las ventas como resultado directo de la implementación de las estrategias propuestas. La información y recomendaciones proporcionadas por Artica Group LLC se basan en su experiencia y conocimiento del mercado, pero constituyen una guía y no una garantía de éxito.
            </p>

            <h3 className="text-xl font-semibold text-[#272F66] mt-6 mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              7.4 Disposiciones Generales para los Servicios:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <li>La contratación de cualquiera de los servicios ofrecidos por Artica Group LLC a través del Sitio Web estará sujeta a la aceptación de las condiciones particulares que se establezcan para cada servicio específico.</li>
              <li>Artica Group LLC se reserva el derecho de modificar, suspender o interrumpir la prestación de cualquiera de los servicios ofrecidos en el Sitio Web en cualquier momento y sin necesidad de previo aviso.</li>
              <li>El Usuario se compromete a utilizar los servicios de conformidad con la legislación vigente, las presentes Condiciones Generales de Uso y las condiciones particulares de cada servicio.</li>
              <li>Artica Group LLC se reserva el derecho de rechazar cualquier solicitud de servicio que considere inapropiada o que pueda infringir derechos de terceros o la legislación vigente.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              8. Protección de Datos Personales
            </h2>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Artica Group LLC garantiza la confidencialidad y el tratamiento de los datos personales facilitados por los usuarios de acuerdo con la legislación vigente en materia de protección de datos.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Para más información sobre el tratamiento de datos personales, el Usuario puede acceder a la{' '}
              <Link href="/legal/politica-privacidad" className="text-[#13B9D5] hover:text-[#0FA8C2] transition-colors">
                Política de Privacidad
              </Link>{' '}
              de Artica Group LLC.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              9. Hipervinculos
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              El Usuario que desee incluir dentro de su página web cualquier tipo de enlace (link, hipervínculo, frame o similar) que dirija al Sitio Web de Artica Group LLC o a cualquiera de sus páginas, deberá cumplir con las siguientes condiciones:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <li>No se realizarán manifestaciones o indicaciones falsas, inexactas o incorrectas sobre el Sitio Web de Artica Group LLC o sus contenidos.</li>
              <li>El enlace únicamente permitirá el acceso al Sitio Web de Artica Group LLC y a sus servicios, pero no podrá reproducirlos de ninguna forma (por ejemplo, mediante «in-line links», «deep-links», «framing», etc.) sin la autorización expresa y por escrito de Artica Group LLC.</li>
              <li>No se declarará ni se dará a entender que Artica Group LLC ha autorizado dicho enlace o que ha supervisado o asumido de alguna manera los contenidos o servicios ofrecidos o puestos a disposición en la página web en la que se establece el enlace.</li>
              <li>La página web en la que se establezca el enlace no contendrá ninguna marca, nombre comercial, rótulo de establecimiento, denominación, logotipo, eslogan u otros signos distintivos pertenecientes a Artica Group LLC, salvo aquellos que hayan sido expresamente autorizados.</li>
              <li>La página web en la que se establezca el enlace no contendrá informaciones o contenidos ilícitos, contrarios a la moral y a las buenas costumbres generalmente aceptadas, ni tampoco contendrá contenidos que violen cualesquiera derechos de terceros.</li>
              <li>El establecimiento del enlace no implicará en ningún caso la existencia de relaciones entre Artica Group LLC y el propietario de la página web en la que se establezca, ni la aceptación o aprobación por parte de Artica Group LLC de sus contenidos o servicios allí ofrecidos o puestos a disposición del público.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              10. Responsabilidades
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Artica Group LLC no se responsabiliza de las consecuencias derivadas del incumplimiento por parte del Usuario de estas Condiciones o de las condiciones particulares que regulen servicios específicos.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Los servicios a los que se accede a través del Sitio Web, incluyendo cualquier acción o relación entre los Usuarios y los anunciantes, se consideran realizados directamente entre dichas partes, quedando Artica Group LLC exenta de cualquier responsabilidad.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              En caso de responsabilidad exigible a Artica Group LLC, ésta se limitará a los daños y perjuicios directa y efectivamente causados por su actuación, sin incluir en ningún caso el lucro cesante.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Artica Group LLC podrá interrumpir o modificar el acceso al Sitio Web sin previo aviso, sin generar responsabilidad alguna por ello.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Artica Group LLC no se responsabiliza del mal funcionamiento del sistema debido a causas técnicas o de terceros.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Artica Group LLC declina cualquier responsabilidad respecto a los servicios y contenidos que se encuentren fuera del Sitio Web o que sean ofrecidos por terceros a través de enlaces.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Artica Group LLC no controla la totalidad del contenido del Sitio Web y no se responsabiliza de los daños y perjuicios derivados de la existencia de virus u otros elementos dañinos, ni de los daños que puedan causar al hardware o software de los Usuarios.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Los enlaces a otros sitios web se proporcionan únicamente con fines informativos y no implican sugerencia, invitación o recomendación por parte de Artica Group LLC, quien no se responsabiliza del resultado obtenido a través de dichos enlaces.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Artica Group LLC no controla ni ofrece garantías sobre la identidad de los Usuarios ni sobre la veracidad de los datos proporcionados por los mismos.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Artica Group LLC queda exenta de cualquier responsabilidad por daños y perjuicios en los siguientes casos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <li>Imposibilidad o dificultades de conexión a la red de comunicaciones.</li>
              <li>Interrupción, suspensión o cancelación del acceso al Sitio Web.</li>
              <li>Falta de disponibilidad o continuidad del funcionamiento del Sitio Web o de sus servicios y contenidos.</li>
              <li>Respecto a los servicios y contenidos ofrecidos por terceros prestadores de servicios.</li>
              <li>Del tratamiento y utilización posterior de datos personales realizados por terceros ajenos a Artica Group LLC.</li>
              <li>De la calidad y velocidad de acceso al Sitio Web y de las condiciones técnicas del Usuario.</li>
              <li>Retrasos o fallos en el acceso o funcionamiento del Sitio Web debido a fuerza mayor.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              11. Uso de Cookies y Dispositivos de Almacenamiento y Recuperación de Datos
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Artica Group LLC utiliza cookies y dispositivos de almacenamiento y recuperación de datos en los equipos terminales del Usuario cuando éste navega por el Sitio Web.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              La utilización de cookies se realiza bajo las condiciones y con las finalidades descritas en la{' '}
              <Link href="/legal/politica-cookies" className="text-[#13B9D5] hover:text-[#0FA8C2] transition-colors">
                Política de Cookies
              </Link>.
            </p>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Para más información sobre el uso de cookies, el Usuario debe acceder a dicha política específica.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              12. Nulidad y Anulabilidad
            </h2>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              En caso de que alguna cláusula de estas Condiciones resultara nula o anulable, en su totalidad o en parte, dicha nulidad o anulabilidad no afectará a la validez de las restantes cláusulas, que conservarán su plena eficacia, salvo que la parte que alegue su nulidad o anulabilidad pruebe que sin la cláusula afectada no podrán cumplirse los fines perseguidos por estas Condiciones.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              13. Legislación Aplicable y Jurisdicción Competente
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Estas Condiciones Generales de Uso se rigen por las leyes del Estado de Florida, Estados Unidos.
            </p>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Para la resolución de cualquier controversia o conflicto que pudiera derivarse de la interpretación o aplicación de estas Condiciones, el Usuario y Artica Group LLC se someten a la jurisdicción exclusiva de los tribunales del Condado de Miami-Dade, Florida, Estados Unidos, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              Buzón de Contacto
            </h2>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              El buzón de contacto del Sitio Web está concebido para proporcionar información sobre nuestros productos y servicios. Las preguntas remitidas a través de este servicio no tienen, en ningún caso, la consideración legal de queja, ni puede derivarse de la contestación efecto jurídico vinculante alguno.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
