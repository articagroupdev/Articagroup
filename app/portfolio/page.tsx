'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Navbar from '../components/Navbar';
import styles from './portfolio.module.css';
import { MdPlayArrow, MdClose, MdEmail, MdCode, MdBrush, MdFullscreen, MdFullscreenExit, MdOpenInNew } from 'react-icons/md';
import { SiAdobe, SiAdobeaftereffects, SiAdobepremierepro, SiAdobephotoshop, SiCanva, SiWordpress, SiNextdotjs, SiReact } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface VideoInfo {
  image: string;
  videoLink?: string;
  websiteLink?: string;
  title?: string;
  videoTitle?: string;
  client?: string;
  tools?: string;
  description?: string;
}

interface PortfolioSection {
  id: string;
  heading: string;
  backgroundImage: string;
  galleryImages?: string[];
  videos?: VideoInfo[];
  designs?: VideoInfo[];
}

// Función helper para obtener los datos del portafolio desde las traducciones
const getPortfolioSections = (t: (key: string) => string): PortfolioSection[] => {
  // Helper para obtener traducción de proyecto con fallback
  const getProject = (section: string, key: string, field: 'title' | 'videoTitle' | 'client' | 'description', fallback: string) => {
    const translationKey = `portfolio.projects.${section}.${key}.${field}`;
    const translation = t(translationKey);
    return translation !== translationKey ? translation : fallback;
  };

  return [
  {
    id: 'first',
    heading: t('portfolio.sections.ediciones'),
    backgroundImage: '/img/Portafolio/fondo-edicion.webp',
    galleryImages: [
      '/img/Portafolio/videos/554937645_827209430252257_209248943060033629_n.avif',
      '/img/Portafolio/videos/590417600_1190962469666812_302998795666163362_n.avif',
      '/img/Portafolio/videos/videoframe_5450-scaled.avif',
      '/img/Portafolio/videos/videoframe_10849.avif',
      '/img/Portafolio/videos/videoframe_26173.avif',
      '/img/Portafolio/videos/videoframe_54502-scaled.avif',
      '/img/Portafolio/videos/525987874_724416670415618_4017155133578734076_n.avif',
    ],
    videos: [
      {
        image: '/img/Portafolio/videos/554937645_827209430252257_209248943060033629_n.avif',
        videoLink: 'https://res.cloudinary.com/dobuhpxof/video/upload/v1768505216/Magic-happens-_%EF%B8%8F-Were-thrilled-to-partner-with-an-amazing-company-from-South-Miami-bringing_1_ykbuj9.mp4',
        title: getProject('ediciones', 'miamiOutdoorMaster', 'title', 'Miami Outdoor Master'),
        videoTitle: getProject('ediciones', 'miamiOutdoorMaster', 'videoTitle', 'Testimonio de Cocina Exterio'),
        client: getProject('ediciones', 'miamiOutdoorMaster', 'client', 'Miami Outdoor Master'),
        tools: 'Adobe Suite, Premiere Pro, After Effects',
        description: getProject('ediciones', 'miamiOutdoorMaster', 'description', 'Artica produjo un video testimonial para Miami Outdoor Master destacando la satisfacción del cliente con la remodelación de su cocina exterior. La clienta elogia la profesionalidad, fiabilidad y atención al detalle, confirmando que su visión fue «traída a la vida» con trabajo a tiempo. El clip muestra la instalación de gabinetes (Novacel) y parrillas (Blaze). Este es un activo clave para generar confianza y recomendación.'),
      },
      {
        image: '/img/Portafolio/videos/590417600_1190962469666812_302998795666163362_n.avif',
        videoLink: 'https://res.cloudinary.com/dobuhpxof/video/upload/v1768418761/A%C3%BAn_no_conoc%C3%ADas_el_por_qu%C3%A9_de_nuestro_%C3%A9xito_en_el_mercado_digital_En_ARTICA_Group_manejamo_nkjfwd.mp4',
        title: getProject('ediciones', 'construccionMarcas', 'title', 'Construcción de Marcas Digitales'),
        videoTitle: getProject('ediciones', 'construccionMarcas', 'videoTitle', 'Construcción de Marcas Digitales'),
        client: getProject('ediciones', 'construccionMarcas', 'client', 'Artica Group'),
        tools: 'Adobe Suite, Premiere Pro, After Effects',
        description: getProject('ediciones', 'construccionMarcas', 'description', 'Esta pieza audiovisual corporativa y promocional fue desarrollada por Artica Group con el objetivo de establecer a la agencia como un socio estratégico clave en el ámbito digital. La propuesta de valor integral se articula en estrategia, creatividad y resultados tangibles para la construcción de marcas. El contenido detalla la especialización en creación de contenido personalizado y la activación de campañas publicitarias segmentadas (Facebook, Instagram, Google). Se enfatiza que el enfoque estratégico prioritario es la conversión de leads, garantizando un posicionamiento de marca efectivo y el crecimiento real de los clientes.'),
      },
      {
        image: '/img/Portafolio/videos/videoframe_5450-scaled.avif',
        videoLink: 'https://res.cloudinary.com/dobuhpxof/video/upload/v1768501830/AEREO-NAVIDENO-OTRA-MUSICA-1_ajgdll.mp4',
        title: getProject('ediciones', 'conectandoNavidades', 'title', 'Conectando Navidades'),
        videoTitle: getProject('ediciones', 'conectandoNavidades', 'videoTitle', 'Conectando Navidades'),
        client: getProject('ediciones', 'conectandoNavidades', 'client', 'HN SHIPPING EXPRESS'),
        tools: 'Adobe Suite, Premiere Pro, After Effects',
        description: getProject('ediciones', 'conectandoNavidades', 'description', 'El contenido, desarrollado por Artica Group, es un video corporativo con enfoque emocional dirigido a la comunidad venezolana en el extranjero. El objetivo fue establecer el servicio de envío aéreo de HN Shipping Express como un conector esencial de valores y afecto familiar durante la temporada navideña. La producción enfatizó visualmente las cajas con mensajes personales recibidas por las familias en Venezuela, destacando la eficiencia logística para una entrega oportuna. El material concluye con una llamada a la acción (CTA) de urgencia: «SOLICÍTALO Antes del 5 de diciembre», capitalizando la confiabilidad del servicio y el valor emocional.'),
      },
      {
        image: '/img/Portafolio/videos/videoframe_10849.avif',
        videoLink: 'https://res.cloudinary.com/dobuhpxof/video/upload/v1768502683/5_m7qsal.mp4',
        title: getProject('ediciones', 'toyotaPromocion', 'title', 'TOYOTA Promoción'),
        videoTitle: getProject('ediciones', 'toyotaPromocion', 'videoTitle', 'TOYOTA Promoción'),
        client: getProject('ediciones', 'toyotaPromocion', 'client', 'TOYOTA'),
        tools: 'Adobe Suite, Premiere Pro, After Effects',
        description: getProject('ediciones', 'toyotaPromocion', 'description', 'Este es un video promocional de alta calidad centrado en atraer a la comunidad cubana en Miami para la compra de un nuevo vehículo Toyota. El objetivo es comunicar los beneficios únicos y exclusivos disponibles para este segmento de clientes, incentivando la adquisición de un carro nuevo. ofreciendo beneficios exclusivos: 2 años de mantenimiento GRATIS, 4 años de garantía Bumper-to-Bumper y hasta 90 días para el primer pago. También se incluyó un descuento adicional de hasta $1,500 para los primeros cinco clientes. El video usó tomas dinámicas en el concesionario e incitó a «Agenda TU CITA hoy mismo»'),
      },
      {
        image: '/img/Portafolio/videos/videoframe_26173.avif',
        videoLink: 'https://res.cloudinary.com/dobuhpxof/video/upload/v1768503138/Realtor-video-AE-Blanco-y-negro-cc-1_rwqsrg.mp4',
        title: getProject('ediciones', 'tourInmobiliario', 'title', 'Tour Inmobiliario'),
        videoTitle: getProject('ediciones', 'tourInmobiliario', 'videoTitle', 'Tour Inmobiliario'),
        client: getProject('ediciones', 'tourInmobiliario', 'client', 'Campaña de Marketing residencial'),
        tools: 'Adobe Suite, Premiere Pro, After Effects',
        description: getProject('ediciones', 'tourInmobiliario', 'description', 'Desarrollamos esta pieza audiovisual profesional y dinámica para el segmento inmobiliario de lujo, con el objetivo de exhibir una residencia excepcional en Pinecrest y comunicar su valor de lujo y habitabilidad. El contenido se basa en una narración directa que guía al potencial comprador a través de sus características premium: tomas aéreas para impacto exterior, diseño de concepto abierto, cocina State of the art con acabados de mármol, y espacios flexibles (oficina privada/sala de juegos). El recorrido culmina en la suite principal con amenities de lujo. Este es un activo de marketing fundamental diseñado para generar interés calificado al posicionar la propiedad como una combinación óptima de confort, lujo y ubicación.'),
      },
      {
        image: '/img/Portafolio/videos/videoframe_54502-scaled.avif',
        videoLink: 'https://res.cloudinary.com/dobuhpxof/video/upload/v1768503525/POR-QUE-VENEZUELA_tjz3wf.mp4',
        title: getProject('ediciones', 'porQueVenezuela', 'title', 'POR QUÉ VENEZUELA'),
        videoTitle: getProject('ediciones', 'porQueVenezuela', 'videoTitle', 'POR QUÉ VENEZUELA'),
        client: getProject('ediciones', 'porQueVenezuela', 'client', 'Potencial de Inversión y RR.HH. en Venezuela'),
        tools: 'Adobe Suite, Premiere Pro, After Effects',
        description: getProject('ediciones', 'porQueVenezuela', 'description', 'Desarrollamos este segmento de entrevista profesional con el objetivo de proyectar una visión de negocios optimista sobre la inversión en Venezuela. La ejecutiva entrevistada sostiene que, pese a los desafíos, el país posee un «mucho potencial», destacando particularmente la calidad del capital humano y el «talento increíble» local. Ella revela que su estrategia corporativa se centró en desarrollar el departamento de Recursos Humanos en Venezuela, dada su profunda confianza en la fuerza laboral. La pieza audiovisual utiliza imágenes de Caracas y referencias culturales para reforzar la riqueza del país, sirviendo como un activo estratégico de comunicación que valida el potencial de inversión.'),
      },
      {
        image: '/img/Portafolio/videos/525987874_724416670415618_4017155133578734076_n.avif',
        videoLink: 'https://res.cloudinary.com/dobuhpxof/video/upload/v1768504884/Garantias-extendidas-la-marca-mas-vendidas-y-mejor-calificada-en-Estados-Unidos-de-vehiculos-a_te3mtm.mp4',
        title: getProject('ediciones', 'toyotaConfianza', 'title', 'Toyota'),
        videoTitle: getProject('ediciones', 'toyotaConfianza', 'videoTitle', 'Toyota Confianza'),
        client: getProject('ediciones', 'toyotaConfianza', 'client', 'Toyota'),
        tools: 'Adobe Suite, Premiere Pro, After Effects',
        description: getProject('ediciones', 'toyotaConfianza', 'description', 'Artica desarrolló una pieza clave de storytelling para Toyota, la marca de vehículos más vendida en EE. UU., con el objetivo de potenciar las ventas. La estrategia se centró en la confianza y durabilidad de la marca, argumentando que la alta fidelidad de los clientes a Toyota «no se improvisa». El video aborda preguntas sobre el rendimiento de vehículos anteriores del cliente. Además, el clip promueve activamente las soluciones de venta y financiamiento de la agencia, destacando que ofrecen modelos nuevos y usados, planes flexibles y un proceso rápido, apto incluso para clientes con ITIN o crédito desafiante. El ambiente festivo de la activación temática de circo (The Big Top) en el showroom refuerza la experiencia de compra emocionante y accesible.'),
      },
    ],
  },
  {
    id: 'second',
    heading: t('portfolio.sections.diseno'),
    backgroundImage: '/img/Portafolio/fondo-diseño.avif',
    galleryImages: [
      '/img/Portafolio/diseño grafico/DEST-WALLPANEL-EXT-HOME-DECOR.avif',
      '/img/Portafolio/diseño grafico/FLYER-PROYECTOS-DG-CONCEPT.avif',
      '/img/Portafolio/diseño grafico/HISTORIA-ADS-VENEZUELA-HN.avif',
      '/img/Portafolio/diseño grafico/PORTADA-KITCHEN-MIAMI-OUTDOORS.avif',
      '/img/Portafolio/diseño grafico/PORTADA-NIGHT-FANA-MILLING-CENTER.avif',
      '/img/Portafolio/diseño grafico/POST-LINKEDIN-RSG.avif',
      '/img/Portafolio/diseño grafico/THANKSGIVING-JET-AIR-4.avif',
    ],
    designs: [
      {
        image: '/img/Portafolio/diseño grafico/POST-LINKEDIN-RSG.avif',
        title: getProject('diseno', 'temporadaHuracanes', 'title', 'Temporada de Huracanes'),
        videoTitle: getProject('diseno', 'temporadaHuracanes', 'videoTitle', 'Temporada de Huracanes'),
        client: getProject('diseno', 'temporadaHuracanes', 'client', 'Rain Shield Gutters Corp'),
        tools: 'Adobe Photoshop, Canva',
        description: getProject('diseno', 'temporadaHuracanes', 'description', 'Desarrollamos esta pieza gráfica promocional para Rain Shield Gutters Corp., con un objetivo estratégico claro: apelar a la preocupación de los clientes por la temporada de huracanes para ofrecer una solución preventiva y generar ventas. El mensaje principal es de urgencia y solución: «The hurricane season is not over yet! And we have the formula to end the year Damage Free» (¡La temporada de huracanes aún no ha terminado! Y tenemos la fórmula para terminar el año Libre de Daños).'),
      },
      {
        image: '/img/Portafolio/diseño grafico/THANKSGIVING-JET-AIR-4.avif',
        title: getProject('diseno', 'thanksgivingJetAir', 'title', 'Campaña Emocional de Thanksgiving'),
        videoTitle: getProject('diseno', 'thanksgivingJetAir', 'videoTitle', 'Campaña Emocional de Thanksgiving'),
        client: getProject('diseno', 'thanksgivingJetAir', 'client', 'JET AIR MRO'),
        tools: 'Canva',
        description: getProject('diseno', 'thanksgivingJetAir', 'description', 'Desarrollamos esta pieza gráfica promocional para JET AIR MRO, enfocada en una campaña de marketing de temporada por Thanksgiving. El mensaje principal es «HAPPY THANKSGIVING». La estrategia busca humanizar la marca y asociar el servicio de transporte aéreo con los valores familiares. La imagen muestra una emotiva reunión en un aeropuerto, y el mensaje final invoca la gratitud. Este material es una herramienta de branding que busca generar una asociación emocional positiva con la empresa.'),
      },
      {
        image: '/img/Portafolio/diseño grafico/DEST-WALLPANEL-EXT-HOME-DECOR.avif',
        title: getProject('diseno', 'flyerAdHomeDecor', 'title', 'Flyer Promocional'),
        videoTitle: getProject('diseno', 'flyerAdHomeDecor', 'videoTitle', 'Flyer Promocional'),
        client: getProject('diseno', 'flyerAdHomeDecor', 'client', 'AD Home Decor'),
        tools: 'Adobe Photoshop, Canva',
        description: getProject('diseno', 'flyerAdHomeDecor', 'description', 'Desarrollamos para AD Home Decor un material gráfico promocional (flyer) centrado en el panel de pared exterior Black Exterior Design (código WPX-01). Este activo se diseñó para comunicar la estética moderna del producto, mostrando su aplicación en la fachada de una vivienda contemporánea. Además de la referencia visual, el flyer comunica las especificaciones técnicas exactas del panel en dimensiones de $8.5 \\times 144″ \\times 3/4″$, sirviendo como una herramienta de marketing directo que combina la estética premium con la información técnica esencial.'),
      },
      {
        image: '/img/Portafolio/diseño grafico/FLYER-PROYECTOS-DG-CONCEPT.avif',
        title: getProject('diseno', 'estrategiaIntegral', 'title', 'Estrategia Integral'),
        videoTitle: getProject('diseno', 'estrategiaIntegral', 'videoTitle', 'Estrategia Integral'),
        client: getProject('diseno', 'estrategiaIntegral', 'client', 'CONCEPT DESIGN'),
        tools: 'Adobe Photoshop',
        description: getProject('diseno', 'estrategiaIntegral', 'description', 'Desarrollamos este material gráfico promocional para CONCEPT DESIGN: STYLE & HOME, cuya propuesta de valor central se condensa en la promesa: "Más que diseño, creamos SOLUCIONES PARA TI". Este activo fue diseñado estratégicamente para comunicar la capacidad integral de la marca en la gestión de proyectos de diseño de interiores. La pieza segmenta visualmente la oferta en tres áreas de servicio clave, cada una representada por una imagen de alta calidad: INTERIOR DESIGN (enfocado en espacios comerciales), SOLUCIONES MODULARES (con foco en cocinas modernas y funcionales) y PROJECT MANAGEMENT (destacando la gestión y selección de materiales). El diseño utiliza una estética premium en tonos oscuros, proyectando sofisticación. El material concluye con un llamado a la acción (CTA) directo que busca impulsar la conversión y el inicio inmediato del proyecto por parte del cliente: «EMPECEMOS TU PROYECTO HOY MISMO».'),
      },
      {
        image: '/img/Portafolio/diseño grafico/HISTORIA-ADS-VENEZUELA-HN.avif',
        title: getProject('diseno', 'enviosInternacionalesHn', 'title', 'Envíos Internacionales'),
        videoTitle: getProject('diseno', 'enviosInternacionalesHn', 'videoTitle', 'Envíos Internacionales'),
        client: getProject('diseno', 'enviosInternacionalesHn', 'client', 'HN Shipping Express'),
        tools: 'Adobe Photoshop, Canva',
        description: getProject('diseno', 'enviosInternacionalesHn', 'description', 'Desarrollamos este material gráfico publicitario (flyer) para HN Shipping Express, con el objetivo de promover un servicio de envío específico a Venezuela. La pieza fue diseñada para destacar los beneficios logísticos clave para la comunidad en el extranjero. El mensaje principal de la campaña es la promoción de un servicio valorado y gratuito: REEMPAQUE y PICK UP GRATIS. El flyer utiliza una imagen de Caracas con un avión y un contenedor de envío, reforzando la idea de transporte aéreo y marítimo. La propuesta de valor se resume en una línea final de posicionamiento: «OPTIMIZAMOS TU ENVÍO PARA QUE AHORRES Y LO RECOGEMOS POR TI». Este material es una herramienta de marketing directo que busca atraer envíos al eliminar la barrera del reempaque y la recolección, comunicando conveniencia y ahorro.'),
      },
      {
        image: '/img/Portafolio/diseño grafico/PORTADA-KITCHEN-MIAMI-OUTDOORS.avif',
        title: getProject('diseno', 'enviosInternacionalesHn', 'title', 'Envíos Internacionales'),
        videoTitle: getProject('diseno', 'enviosInternacionalesHn', 'videoTitle', 'Envíos Internacionales'),
        client: getProject('diseno', 'enviosInternacionalesHn', 'client', 'HN Shipping Express'),
        tools: 'Adobe Photoshop, Canva',
        description: getProject('diseno', 'enviosInternacionalesHn', 'description', 'Desarrollamos este material gráfico publicitario (flyer) para HN Shipping Express, con el objetivo de promover un servicio de envío específico a Venezuela. La pieza fue diseñada para destacar los beneficios logísticos clave para la comunidad en el extranjero. El mensaje principal de la campaña es la promoción de un servicio valorado y gratuito: REEMPAQUE y PICK UP GRATIS. El flyer utiliza una imagen de Caracas con un avión y un contenedor de envío, reforzando la idea de transporte aéreo y marítimo. La propuesta de valor se resume en una línea final de posicionamiento: «OPTIMIZAMOS TU ENVÍO PARA QUE AHORRES Y LO RECOGEMOS POR TI». Este material es una herramienta de marketing directo que busca atraer envíos al eliminar la barrera del reempaque y la recolección, comunicando conveniencia y ahorro.'),
      },
      {
        image: '/img/Portafolio/diseño grafico/PORTADA-NIGHT-FANA-MILLING-CENTER.avif',
        title: getProject('diseno', 'servicioLaboratorioDental', 'title', 'Servicio de Laboratorio Dental'),
        videoTitle: getProject('diseno', 'servicioLaboratorioDental', 'videoTitle', 'Servicio de Laboratorio Dental'),
        client: getProject('diseno', 'servicioLaboratorioDental', 'client', 'FANA MILLING CENTER'),
        tools: 'Canva',
        description: getProject('diseno', 'servicioLaboratorioDental', 'description', 'Desarrollamos esta pieza gráfica promocional para FANA MILLING CENTER, cuyo objetivo es destacar su servicio de creación de Night Guard (férula de descarga). El mensaje principal enfatiza la precisión técnica: «Night Guard: from prescription to Perfect fit». La imagen central muestra el producto siendo manipulado por un técnico, comunicando profesionalismo y atención al detalle. Este material garantiza que el servicio abarca desde la prescripción hasta un ajuste final perfecto, posicionando al laboratorio como un proveedor de alta calidad y fiabilidad.'),
      },
      {
        image: '/img/Portafolio/diseño grafico/EMAIL-PICK-UP-HN.avif',
        title: getProject('diseno', 'servicioRecoleccionCarga', 'title', 'Servicio Gratuito de Recolección de Carga'),
        videoTitle: getProject('diseno', 'servicioRecoleccionCarga', 'videoTitle', 'Email Marketing'),
        client: getProject('diseno', 'servicioRecoleccionCarga', 'client', 'HN Shipping Express'),
        tools: 'Canva, Mailchimp',
        description: getProject('diseno', 'servicioRecoleccionCarga', 'description', 'Desarrollamos este diseño de campaña de Email Marketing para HN Shipping Express, con el objetivo de promover un servicio de valor añadido esencial: la recolección de carga (Pick Up) de manera gratuita en Miami. La estrategia se basa en un mensaje directo y altamente competitivo: «SÍ, GRATIS RETIRAMOS TU CARGA EN MIAMI SIN COBRARTE EL PICK UP». Visualmente, la pieza utiliza un formato vertical optimizado para la lectura móvil, con una imagen que refuerza la conveniencia del servicio a domicilio, mostrando una mano que entrega una caja en la puerta de una casa.'),
      },
      {
        image: '/img/Portafolio/diseño grafico/EMAIL-SEASON-RSG.avif',
        title: getProject('diseno', 'emailMantenimientoEstacional', 'title', 'Email Mantenimiento Estacional'),
        videoTitle: getProject('diseno', 'emailMantenimientoEstacional', 'videoTitle', 'Email Marketing'),
        client: getProject('diseno', 'emailMantenimientoEstacional', 'client', 'Rain Shield Gutters'),
        tools: 'Canva, Mailchimp',
        description: getProject('diseno', 'emailMantenimientoEstacional', 'description', 'Desarrollamos este diseño de campaña de Email Marketing para Rain Shield Gutters Corp. (RSG), con el objetivo estratégico de impulsar la venta de servicios de mantenimiento de canaletas antes del inicio de la temporada de festividades. La estrategia se fundamenta en un enfoque de gestión del tiempo y calidad de vida, utilizando el mensaje principal: «The holiday season means gatherings, Not gutter cleaning» (La temporada de vacaciones significa reuniones, no limpieza de canaletas). Esta formulación apela directamente al valor del tiempo del cliente, posicionando el servicio de RSG como la solución que permite disfrutar las fiestas sin preocuparse por el mantenimiento. Visualmente, la pieza contrasta un acercamiento a la canaleta con una escena borrosa de reunión familiar, reforzando el mensaje de delegar el trabajo preventivo.'),
      },
      {
        image: '/img/Portafolio/diseño grafico/THANKSGIVING.avif',
        title: getProject('diseno', 'thanksgivingSkyway', 'title', 'Campaña Emocional de Thanksgiving'),
        videoTitle: getProject('diseno', 'thanksgivingSkyway', 'videoTitle', 'Email Marketing'),
        client: getProject('diseno', 'thanksgivingSkyway', 'client', 'Skyway'),
        tools: 'Canva, Mailchimp',
        description: getProject('diseno', 'thanksgivingSkyway', 'description', 'Desarrollamos este diseño de campaña de Email Marketing para SKYWAY FAMILY CARGO LLC, con el objetivo de generar un mensaje de branding estacional y de gratitud centrado en la festividad de Thanksgiving (Día de Acción de Gracias). El mensaje principal es una expresión de agradecimiento directa al cliente: «GRACIAS A CADA ENVÍO QUE HACES CON NOSOTROS», asociando el uso del servicio con la consolidación del «compromiso, responsabilidad y cercanía» de la marca. Visualmente, la pieza utiliza una imagen emotiva de un paquete entregado en una puerta durante el otoño, lo que refuerza la conexión entre los servicios logísticos (COURIER • MAILBOX • EXPORT • STORAGE) y el valor familiar.'),
      },
      {
        image: '/img/Portafolio/diseño grafico/EMAIL-CORTE-Y-CANTEO-DG-CONCEPT-1.avif',
        title: getProject('diseno', 'emailCorteCanteo', 'title', 'Email Servicio de Corte y Canteo'),
        videoTitle: getProject('diseno', 'emailCorteCanteo', 'videoTitle', 'Email Marketing'),
        client: getProject('diseno', 'emailCorteCanteo', 'client', 'CONCEPT DESIGN'),
        tools: 'Canva, Mailchimp',
        description: getProject('diseno', 'emailCorteCanteo', 'description', 'Desarrollamos este diseño de campaña de Email Marketing para CONCEPT DESIGN: STYLE & HOME, promocionando el servicio técnico de CORTE Y CANTEO. El mensaje principal utiliza el slogan: «Dale forma a tus proyectos con nuestro servicio». El contenido destaca la maquinaria de alta tecnología que garantiza «medidas exactas» y «Bordes perfectos». El diseño está optimizado para la lectura móvil y su Llamado a la Acción (CTA) finaliza con «ASEGURA LA PRECISIÓN QUE TU PROYECTO MERECE».'),
      },
    ],
  },
  {
    id: 'third',
    heading: t('portfolio.sections.email'),
    backgroundImage: '/img/Portafolio/fondo-email.webp',
    galleryImages: [
      '/img/Portafolio/email marketing/EMAIL-CORTE-Y-CANTEO-DG-CONCEPT-1.avif',
      '/img/Portafolio/email marketing/EMAIL-PICK-UP-HN.avif',
      '/img/Portafolio/email marketing/EMAIL-SEASON-RSG.avif',
      '/img/Portafolio/email marketing/THANKSGIVING.avif',
    ],
    designs: [
      {
        image: '/img/Portafolio/email marketing/EMAIL-PICK-UP-HN.avif',
        title: getProject('email', 'servicioRecoleccionCarga', 'title', 'Servicio Gratuito de Recolección de Carga'),
        videoTitle: getProject('email', 'servicioRecoleccionCarga', 'videoTitle', 'Email Marketing'),
        client: getProject('email', 'servicioRecoleccionCarga', 'client', 'HN Shipping Express'),
        tools: 'Canva, Mailchimp',
        description: getProject('email', 'servicioRecoleccionCarga', 'description', 'Desarrollamos este diseño de campaña de Email Marketing para HN Shipping Express, con el objetivo de promover un servicio de valor añadido esencial: la recolección de carga (Pick Up) de manera gratuita en Miami. La estrategia se basa en un mensaje directo y altamente competitivo: «SÍ, GRATIS RETIRAMOS TU CARGA EN MIAMI SIN COBRARTE EL PICK UP». Visualmente, la pieza utiliza un formato vertical optimizado para la lectura móvil, con una imagen que refuerza la conveniencia del servicio a domicilio, mostrando una mano que entrega una caja en la puerta de una casa.'),
      },
      {
        image: '/img/Portafolio/email marketing/EMAIL-SEASON-RSG.avif',
        title: getProject('email', 'emailMantenimientoEstacional', 'title', 'Email Mantenimiento Estacional'),
        videoTitle: getProject('email', 'emailMantenimientoEstacional', 'videoTitle', 'Email Marketing'),
        client: getProject('email', 'emailMantenimientoEstacional', 'client', 'Rain Shield Gutters'),
        tools: 'Canva, Mailchimp',
        description: getProject('email', 'emailMantenimientoEstacional', 'description', 'Desarrollamos este diseño de campaña de Email Marketing para Rain Shield Gutters Corp. (RSG), con el objetivo estratégico de impulsar la venta de servicios de mantenimiento de canaletas antes del inicio de la temporada de festividades. La estrategia se fundamenta en un enfoque de gestión del tiempo y calidad de vida, utilizando el mensaje principal: «The holiday season means gatherings, Not gutter cleaning» (La temporada de vacaciones significa reuniones, no limpieza de canaletas). Esta formulación apela directamente al valor del tiempo del cliente, posicionando el servicio de RSG como la solución que permite disfrutar las fiestas sin preocuparse por el mantenimiento. Visualmente, la pieza contrasta un acercamiento a la canaleta con una escena borrosa de reunión familiar, reforzando el mensaje de delegar el trabajo preventivo.'),
      },
      {
        image: '/img/Portafolio/email marketing/THANKSGIVING.avif',
        title: getProject('email', 'thanksgivingSkyway', 'title', 'Campaña Emocional de Thanksgiving'),
        videoTitle: getProject('email', 'thanksgivingSkyway', 'videoTitle', 'Email Marketing'),
        client: getProject('email', 'thanksgivingSkyway', 'client', 'Skyway'),
        tools: 'Canva, Mailchimp',
        description: getProject('email', 'thanksgivingSkyway', 'description', 'Desarrollamos este diseño de campaña de Email Marketing para SKYWAY FAMILY CARGO LLC, con el objetivo de generar un mensaje de branding estacional y de gratitud centrado en la festividad de Thanksgiving (Día de Acción de Gracias). El mensaje principal es una expresión de agradecimiento directa al cliente: «GRACIAS A CADA ENVÍO QUE HACES CON NOSOTROS», asociando el uso del servicio con la consolidación del «compromiso, responsabilidad y cercanía» de la marca. Visualmente, la pieza utiliza una imagen emotiva de un paquete entregado en una puerta durante el otoño, lo que refuerza la conexión entre los servicios logísticos (COURIER • MAILBOX • EXPORT • STORAGE) y el valor familiar.'),
      },
      {
        image: '/img/Portafolio/email marketing/EMAIL-CORTE-Y-CANTEO-DG-CONCEPT-1.avif',
        title: getProject('email', 'emailCorteCanteo', 'title', 'Email Servicio de Corte y Canteo'),
        videoTitle: getProject('email', 'emailCorteCanteo', 'videoTitle', 'Email Marketing'),
        client: getProject('email', 'emailCorteCanteo', 'client', 'CONCEPT DESIGN'),
        tools: 'Canva, Mailchimp',
        description: getProject('email', 'emailCorteCanteo', 'description', 'Desarrollamos este diseño de campaña de Email Marketing para CONCEPT DESIGN: STYLE & HOME, promocionando el servicio técnico de CORTE Y CANTEO. El mensaje principal utiliza el slogan: «Dale forma a tus proyectos con nuestro servicio». El contenido destaca la maquinaria de alta tecnología que garantiza «medidas exactas» y «Bordes perfectos». El diseño está optimizado para la lectura móvil y su Llamado a la Acción (CTA) finaliza con «ASEGURA LA PRECISIÓN QUE TU PROYECTO MERECE».'),
      },
    ],
  },
  {
    id: 'fourth',
    heading: t('portfolio.sections.web'),
    backgroundImage: '/img/Portafolio/fondo-web.webp',
    galleryImages: [
      '/img/Portafolio/diseño web/1.png',
      '/img/Portafolio/diseño web/2.png',
      '/img/Portafolio/diseño web/3.png',
      '/img/Portafolio/diseño web/4.png',
      '/img/Portafolio/diseño web/5.png',
      '/img/Portafolio/diseño web/6.png',
    ],
    designs: [
      {
        image: '/img/Portafolio/diseño web/6.png',
        title: getProject('web', 'plataformaFinanciamiento', 'title', 'Plataforma de Financiamiento'),
        videoTitle: getProject('web', 'plataformaFinanciamiento', 'videoTitle', 'Desarrollo Web'),
        client: getProject('web', 'plataformaFinanciamiento', 'client', 'CREDIT WITH RAMI'),
        tools: 'Next JS',
        websiteLink: 'https://creditwithrami.com/',
        description: getProject('web', 'plataformaFinanciamiento', 'description', 'Desarrollamos esta plataforma web corporativa para CREDIT WITH RAMI: BUSINESS FUNDING, cuyo objetivo es ofrecer una solución digital simplificada para que los propietarios de negocios en EE. UU. accedan a capital de financiamiento. La solución fue diseñada full responsive, lo cual garantiza una accesibilidad y experiencia de usuario perfectas en dispositivos móviles y de escritorio.'),
      },
      {
        image: '/img/Portafolio/diseño web/5.png',
        title: getProject('web', 'plataformaCorporativa4101', 'title', 'Plataforma Corporativa'),
        videoTitle: getProject('web', 'plataformaCorporativa4101', 'videoTitle', 'Desarrollo Web'),
        client: getProject('web', 'plataformaCorporativa4101', 'client', '4101'),
        tools: 'React JS',
        websiteLink: 'https://www.4101media.com/',
        description: getProject('web', 'plataformaCorporativa4101', 'description', 'Desarrollamos esta plataforma web corporativa para 4101 Media, la sede en Venezuela de la empresa, con el objetivo de posicionarla como una productora audiovisual estratégica que acelera el crecimiento de marcas en el ámbito digital. El sitio fue diseñado full responsive, lo cual se evidencia en la vista optimizada para dispositivos de escritorio y móviles. La propuesta de valor se comunica de manera directa en la portada: «Aceleramos el Crecimiento de tu Marca en el Mundo Digital». La descripción complementaria enfatiza el uso de estrategias de marketing digital y contenido de alto impacto para impulsar empresas y emprendedores. La navegación es integral, incluyendo secciones clave como «Nosotros», «Servicios», «Academia» y «Portafolio», y utiliza llamados a la acción (CTAs) prominentemente ubicados como «Ver Proyectos» y «Nuestros Servicios» para guiar la interacción del usuario. Este desarrollo es un activo digital clave que refuerza la identidad de marca y facilita la conversión de prospectos interesados en servicios audiovisuales estratégicos.'),
      },
      {
        image: '/img/Portafolio/diseño web/3.png',
        title: getProject('web', 'plataformaCatalogoInteriores', 'title', 'Plataforma de Catalogo Diseño de Interiores'),
        videoTitle: getProject('web', 'plataformaCatalogoInteriores', 'videoTitle', 'Desarrollo Web'),
        client: getProject('web', 'plataformaCatalogoInteriores', 'client', 'AD HOME DECOR'),
        tools: 'Wordpress',
        websiteLink: 'https://aydhomedecor.com/',
        description: getProject('web', 'plataformaCatalogoInteriores', 'description', 'Desarrollamos esta plataforma web corporativa para AD HOME DECOR, con el objetivo de establecer un catalogo digital que posicione a la marca como «LA SOLUCIÓN INTEGRAL EN DECORACIÓN DE TUS ESPACIOS». La solución fue diseñada full responsive, garantizando la optimización y accesibilidad en dispositivos de escritorio y móviles.'),
      },
      {
        image: '/img/Portafolio/diseño web/4.png',
        title: getProject('web', 'plataformaEcommerceVynk', 'title', 'Plataforma E-commerce'),
        videoTitle: getProject('web', 'plataformaEcommerceVynk', 'videoTitle', 'Desarrollo Web'),
        client: getProject('web', 'plataformaEcommerceVynk', 'client', 'Vynk'),
        tools: 'Wordpress',
        websiteLink: 'https://vynk.us/',
        description: getProject('web', 'plataformaEcommerceVynk', 'description', 'Desarrollamos esta plataforma web para VYNK, una marca enfocada en la comercialización de equipos de fotografía y video profesional. El objetivo del proyecto fue establecer una presencia digital moderna y optimizada para el comercio electrónico de productos de alta tecnología. El sitio fue diseñado full responsive, lo que garantiza una navegación y experiencia de usuario perfectas tanto en la vista de escritorio como en la móvil.'),
      },
      {
        image: '/img/Portafolio/diseño web/1.png',
        title: getProject('web', 'plataformaEcommerceZx', 'title', 'Plataforma E-commerce'),
        videoTitle: getProject('web', 'plataformaEcommerceZx', 'videoTitle', 'Desarrollo Web'),
        client: getProject('web', 'plataformaEcommerceZx', 'client', 'ZX'),
        tools: 'Wordpress',
        websiteLink: 'https://zxline.us/',
        description: getProject('web', 'plataformaEcommerceZx', 'description', 'Desarrollamos una plataforma de comercio electrónico de alto impacto visual para la marca ZX. La solución fue desarrollada full responsive, garantizando la optimización para dispositivos de escritorio y móviles. El diseño se centró en el branding y el storytelling («IT ALL STARTS WITH A DESIRE»). La plataforma incluye un e-commerce completamente integrado con navegación intuitiva, sirviendo como un activo digital clave para la venta y el posicionamiento premium de la marca.'),
      },
      {
        image: '/img/Portafolio/diseño web/2.png',
        title: getProject('web', 'plataformaDigitalCorporativa', 'title', 'Plataforma Digital corporativa'),
        videoTitle: getProject('web', 'plataformaDigitalCorporativa', 'videoTitle', 'Desarrollo Web'),
        client: getProject('web', 'plataformaDigitalCorporativa', 'client', 'FANA Milling Center'),
        tools: 'Next JS',
        websiteLink: 'https://fanamillingcenter.com/es',
        description: getProject('web', 'plataformaDigitalCorporativa', 'description', 'Desarrollamos esta plataforma web corporativa para FANA Milling Center, un laboratorio especializado en Fresado Dental de Precisión. El objetivo del proyecto fue establecer una presencia digital robusta que comunicara la alta tecnología y la confiabilidad del servicio. La arquitectura del sitio fue diseñada full responsive, garantizando una experiencia de usuario óptima tanto en escritorio como en dispositivos móviles.'),
      },
    ],
  },
  ];
};

export default function PortfolioPage() {
  const { t } = useLanguage();
  const portfolioSections = getPortfolioSections(t);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const outerWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const splitHeadingsRef = useRef<SplitType[]>([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  
  // Refs para el carousel
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRefs = useRef<(HTMLUListElement | null)[]>([]);
  const dragProxyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const nextButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  // Refs para la sección de información del video
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const [selectedDesignIndex, setSelectedDesignIndex] = useState<number | null>(null);
  const [selectedDesignImage, setSelectedDesignImage] = useState<string | null>(null);
  const transitionRef = useRef<SVGPathElement | null>(null);
  const videoInfoRef = useRef<HTMLDivElement | null>(null);
  const transitionWrapperRef = useRef<HTMLDivElement | null>(null);
  const designInfoRef = useRef<HTMLDivElement | null>(null);
  const designTransitionRef = useRef<SVGPathElement | null>(null);
  const designTransitionWrapperRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let Observer: any = null;
    let observerInstance: any = null;

    const initObserver = async () => {
      try {
        // Importación dinámica para evitar problemas de case-sensitivity
        // @ts-ignore - Observer tiene problemas de case-sensitivity en TypeScript
        const ObserverModule = await import('gsap/Observer');
        Observer = ObserverModule.Observer || ObserverModule.default;
        
        if (Observer) {
          gsap.registerPlugin(Observer);
        }

        const sections = sectionsRef.current.filter(Boolean);
        const images = imagesRef.current.filter(Boolean);
        const headings = headingsRef.current.filter(Boolean);
        const outerWrappers = outerWrappersRef.current.filter(Boolean);
        const innerWrappers = innerWrappersRef.current.filter(Boolean);

        if (sections.length === 0 || !Observer) return;

        // Inicializar SplitType para cada heading (solo si existe)
        splitHeadingsRef.current = headings
          .filter((heading): heading is HTMLHeadingElement => heading !== null)
          .map((heading) => {
            try {
              return new SplitType(heading, {
                types: 'chars,words,lines',
                lineClass: 'clip-text',
              });
            } catch (error) {
              console.warn('Error creating SplitType:', error);
              return null;
            }
          })
          .filter((split): split is SplitType => split !== null);

        const wrap = (index: number) => {
          return ((index % sections.length) + sections.length) % sections.length;
        };

        // Configurar estados iniciales
        // La primera sección debe estar visible desde el inicio
        // Usar set inmediato y también estilos inline para asegurar visibilidad
        if (sections[0]) {
          gsap.set(sections[0], { autoAlpha: 1, zIndex: 1, visibility: 'visible', opacity: 1 });
          (sections[0] as HTMLElement).style.visibility = 'visible';
          (sections[0] as HTMLElement).style.opacity = '1';
          (sections[0] as HTMLElement).style.zIndex = '1';
        }
        if (outerWrappers[0]) {
          gsap.set(outerWrappers[0], { yPercent: 0 });
        }
        if (innerWrappers[0]) {
          gsap.set(innerWrappers[0], { yPercent: 0 });
        }
        if (images[0]) {
          gsap.set(images[0], { yPercent: 0 });
        }
        
        // Las demás secciones empiezan ocultas
        for (let i = 1; i < sections.length; i++) {
          gsap.set(sections[i], { autoAlpha: 0, zIndex: 0, visibility: 'hidden', opacity: 0 });
          if (outerWrappers[i]) {
            gsap.set(outerWrappers[i], { yPercent: 100 });
          }
          if (innerWrappers[i]) {
            gsap.set(innerWrappers[i], { yPercent: -100 });
          }
        }
        
        // Establecer el índice actual antes de crear el Observer
        currentIndexRef.current = 0;

        function gotoSection(index: number, direction: number) {
          index = wrap(index);
          animatingRef.current = true;

          const fromTop = direction === -1;
          const dFactor = fromTop ? -1 : 1;

          const tl = gsap.timeline({
            defaults: { duration: 1.25, ease: 'power1.inOut' },
            onComplete: () => {
              animatingRef.current = false;
            },
          });

          if (currentIndexRef.current >= 0 && currentIndexRef.current !== index) {
            gsap.set(sections[currentIndexRef.current], { zIndex: 0 });
            tl.to(images[currentIndexRef.current], { yPercent: -15 * dFactor })
              .set(sections[currentIndexRef.current], { autoAlpha: 0, visibility: 'hidden' });
          }

          gsap.set(sections[index], { autoAlpha: 1, zIndex: 1, visibility: 'visible' });

          tl.fromTo(
            [outerWrappers[index], innerWrappers[index]],
            {
              yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor),
            },
            {
              yPercent: 0,
            },
            0
          )
            .fromTo(
              images[index],
              { yPercent: 15 * dFactor },
              { yPercent: 0 },
              0
            )
            // Solo animar el texto si existe el heading y tiene chars
            if (splitHeadingsRef.current[index] && splitHeadingsRef.current[index].chars) {
              tl.fromTo(
                splitHeadingsRef.current[index].chars,
                {
                  autoAlpha: 0,
                  yPercent: 150 * dFactor,
                },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  duration: 1,
                  ease: 'power2',
                  stagger: {
                    each: 0.02,
                    from: 'random',
                  },
                },
                0.2
              );
            }

          currentIndexRef.current = index;
        }

        observerInstance = Observer.create({
          type: 'wheel,touch,pointer',
          wheelSpeed: -1,
          onDown: () => {
            if (!animatingRef.current) {
              gotoSection(currentIndexRef.current - 1, -1);
            }
          },
          onUp: () => {
            if (!animatingRef.current) {
              gotoSection(currentIndexRef.current + 1, 1);
            }
          },
          tolerance: 10,
          preventDefault: true,
        });

        // Función para esperar a que las imágenes se carguen antes de animar
        const waitForImagesAndAnimate = () => {
          const gallery = galleryRefs.current[0];
          if (!gallery) {
            setTimeout(waitForImagesAndAnimate, 200);
            return;
          }

          // Buscar todas las imágenes en el carousel (incluyendo las duplicadas)
          const allImages = gallery.querySelectorAll('li');
          
          if (allImages.length === 0) {
            setTimeout(waitForImagesAndAnimate, 200);
            return;
          }

          // Verificar que las imágenes de fondo estén cargadas
          let loadedCount = 0;
          const totalImages = allImages.length;
          let hasStarted = false;

          const checkImageLoaded = (element: HTMLElement) => {
            // Para imágenes de fondo, verificar que el estilo backgroundImage esté aplicado
            const bgImage = window.getComputedStyle(element).backgroundImage;
            if (bgImage && bgImage !== 'none') {
              // Crear una imagen para verificar que esté cargada
              const img = new Image();
              const urlMatch = bgImage.match(/url\(["']?([^"']+)["']?\)/);
              if (urlMatch && urlMatch[1]) {
                img.src = urlMatch[1];
                if (img.complete) {
                  loadedCount++;
                } else {
                  img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalImages && !hasStarted) {
                      startAnimations();
                    }
                  };
                  img.onerror = () => {
                    loadedCount++;
                    if (loadedCount === totalImages && !hasStarted) {
                      startAnimations();
                    }
                  };
                }
              } else {
                loadedCount++;
              }
            } else {
              loadedCount++;
            }

            if (loadedCount === totalImages && !hasStarted) {
              startAnimations();
            }
          };

          const startAnimations = () => {
            if (hasStarted) return;
            hasStarted = true;

            // Usar requestAnimationFrame para asegurar que el layout esté calculado
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                const entranceTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
                
                // Animar el título
                if (splitHeadingsRef.current[0] && splitHeadingsRef.current[0].chars) {
                  gsap.set(splitHeadingsRef.current[0].chars, {
                    autoAlpha: 0,
                    yPercent: 150,
                  });
                  
                  entranceTimeline.to(splitHeadingsRef.current[0].chars, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 1.2,
                    stagger: {
                      each: 0.02,
                      from: 'random',
                    },
                  }, 0);
                }
                
                // Animar el carousel (si existe)
                if (galleryRefs.current[0]) {
                  gsap.set(galleryRefs.current[0], {
                    opacity: 0,
                    y: 50,
                    scale: 0.95,
                  });
                  
                  entranceTimeline.to(galleryRefs.current[0], {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                  }, 0.3);
                }
                
                // Animar los botones de navegación del carousel
                if (prevButtonRefs.current[0] && nextButtonRefs.current[0]) {
                  gsap.set([prevButtonRefs.current[0], nextButtonRefs.current[0]], {
                    opacity: 0,
                    y: 30,
                  });
                  
                  entranceTimeline.to([prevButtonRefs.current[0], nextButtonRefs.current[0]], {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                  }, 0.6);
                }
              });
            });
          };

          // Verificar cada elemento del carousel
          allImages.forEach((li) => {
            checkImageLoaded(li as HTMLElement);
          });

          // Fallback: si después de 3 segundos no se han cargado todas, inicializar de todos modos
          setTimeout(() => {
            if (!hasStarted) {
              startAnimations();
            }
          }, 3000);
        };

        // Inicializar después de un pequeño delay para que el DOM esté listo
        setTimeout(() => {
          waitForImagesAndAnimate();
        }, 100);
      } catch (error) {
        console.warn('Observer plugin not available:', error);
      }
    };

    initObserver();

    return () => {
      if (observerInstance) {
        observerInstance.kill();
      }
      splitHeadingsRef.current.forEach((split) => {
        if (split && split.revert) {
          split.revert();
        }
      });
    };
  }, []);

  // Inicializar el carousel de la primera sección
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Inicializar carousels para todas las secciones que tengan galleryImages
    const sectionsWithGallery = portfolioSections
      .map((section, idx) => ({ section, idx }))
      .filter(({ section }) => section.galleryImages && section.galleryImages.length > 0);

    if (sectionsWithGallery.length === 0) return;

    const initCarousel = async (sectionIndex: number) => {
      try {
        // Importación dinámica de Draggable
        // @ts-ignore - Draggable tiene problemas de case-sensitivity en TypeScript
        const DraggableModule = await import('gsap/Draggable');
        const Draggable = DraggableModule.Draggable || DraggableModule.default;
        
        if (Draggable) {
          gsap.registerPlugin(Draggable);
        }

        const gallery = galleryRefs.current[sectionIndex];
        const cards = cardsRefs.current[sectionIndex];
        if (!gallery || !cards) return;

        let iteration = 0;

        // Obtener todas las imágenes del carousel
        const cardElements = Array.from(cards.querySelectorAll('li')) as HTMLElement[];

        // Configurar estado inicial
        gsap.set(cardElements, { xPercent: 400, opacity: 0, scale: 0 });

        const spacing = 0.1;
        const snapTime = gsap.utils.snap(spacing);

        // Función de animación para cada elemento
        const animateFunc = (element: HTMLElement) => {
          const tl = gsap.timeline();
          tl.fromTo(
            element,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              zIndex: 100,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: 'power1.in',
              immediateRender: false,
            }
          ).fromTo(
            element,
            { xPercent: 400 },
            { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
            0
          );
          return tl;
        };

        // Construir el loop sin fin
        const buildSeamlessLoop = (
          items: HTMLElement[],
          spacing: number,
          animateFunc: (item: HTMLElement) => gsap.core.Timeline
        ) => {
          const overlap = Math.ceil(1 / spacing);
          const startTime = items.length * spacing + 0.5;
          const loopTime = (items.length + overlap) * spacing + 1;
          const rawSequence = gsap.timeline({ paused: true });
          const seamlessLoop = gsap.timeline({
            paused: true,
            repeat: -1,
            onRepeat() {
              if (this._time === this._dur) {
                this._tTime += this._dur - 0.01;
              }
            },
          });

          const l = items.length + overlap * 2;
          let time, i, index;

          for (i = 0; i < l; i++) {
            index = i % items.length;
            time = i * spacing;
            rawSequence.add(animateFunc(items[index]), time);
            if (i <= items.length) {
              seamlessLoop.add('label' + i, time);
            }
          }

          rawSequence.time(startTime);
          seamlessLoop
            .to(rawSequence, {
              time: loopTime,
              duration: loopTime - startTime,
              ease: 'none',
            })
            .fromTo(
              rawSequence,
              { time: overlap * spacing + 1 },
              {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: 'none',
              }
            );
          return seamlessLoop;
        };

        const seamlessLoop = buildSeamlessLoop(cardElements, spacing, animateFunc);
        const playhead = { offset: 0 };
        const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

        const scrub = gsap.to(playhead, {
          offset: 0,
          onUpdate() {
            seamlessLoop.time(wrapTime(playhead.offset));
          },
          duration: 0.5,
          ease: 'power3',
          paused: true,
        });

        const progressToScroll = (progress: number) =>
          gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end);

        const wrap = (iterationDelta: number, scrollTo: number) => {
          iteration += iterationDelta;
          // No usar trigger.scroll() para evitar afectar el scroll global
          // En su lugar, actualizar directamente el progress
          const newProgress = scrollTo / trigger.end;
          currentProgress = gsap.utils.wrap(0, 1, newProgress);
          scrub.vars.offset = (iteration + currentProgress) * seamlessLoop.duration();
          scrub.invalidate().restart();
        };

        // Crear un contenedor de scroll virtual para el carousel
        // Esto evita que el scroll afecte la navbar
        const scrollContainer = document.createElement('div');
        scrollContainer.style.cssText = 'position: absolute; width: 1px; height: 3000px; top: 0; left: 0; pointer-events: none; opacity: 0; z-index: -1;';
        document.body.appendChild(scrollContainer);

        let currentProgress = 0;

        const trigger = ScrollTrigger.create({
          trigger: scrollContainer,
          start: 0,
          end: 3000,
          onUpdate(self) {
            const scroll = self.scroll();
            if (scroll > self.end - 1) {
              wrap(1, 2);
            } else if (scroll < 1 && self.direction < 0) {
              wrap(-1, self.end - 2);
            } else {
              currentProgress = self.progress;
              scrub.vars.offset = (iteration + currentProgress) * seamlessLoop.duration();
              scrub.invalidate().restart();
            }
          },
        });

        const scrollToOffset = (offset: number) => {
          const snappedTime = snapTime(offset);
          const progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
          const scroll = progressToScroll(progress);
          if (progress >= 1 || progress < 0) {
            return wrap(Math.floor(progress), scroll);
          }
          // Actualizar directamente el progress sin usar trigger.scroll para evitar afectar el scroll global
          currentProgress = gsap.utils.wrap(0, 1, progress);
          scrub.vars.offset = (iteration + currentProgress) * seamlessLoop.duration();
          scrub.invalidate().restart();
        };

        // Event listeners para los botones
        ScrollTrigger.addEventListener('scrollEnd', () => scrollToOffset(scrub.vars.offset));

        // Funciones para los botones
        const handleNext = () => {
          scrollToOffset(scrub.vars.offset + spacing);
        };

        const handlePrev = () => {
          scrollToOffset(scrub.vars.offset - spacing);
        };

        if (nextButtonRefs.current[sectionIndex]) {
          nextButtonRefs.current[sectionIndex]!.addEventListener('click', handleNext);
        }

        if (prevButtonRefs.current[sectionIndex]) {
          prevButtonRefs.current[sectionIndex]!.addEventListener('click', handlePrev);
        }

        // Funcionalidad de arrastre
        let draggableInstance: any = null;
        if (Draggable && dragProxyRefs.current[sectionIndex] && cards) {
          const dragProxy = dragProxyRefs.current[sectionIndex]!;
          draggableInstance = Draggable.create(dragProxy, {
            type: 'x',
            trigger: cards,
            onPress() {
              // @ts-ignore
              this.startOffset = scrub.vars.offset;
            },
            onDrag() {
              // @ts-ignore
              scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
              scrub.invalidate().restart();
            },
            onDragEnd() {
              scrollToOffset(scrub.vars.offset);
            },
          });
        }

        return () => {
          // Cleanup: matar todas las animaciones y event listeners
          if (trigger) trigger.kill();
          if (scrollContainer && scrollContainer.parentNode) {
            scrollContainer.parentNode.removeChild(scrollContainer);
          }
          seamlessLoop.kill();
          scrub.kill();
          if (draggableInstance && draggableInstance[0]) {
            draggableInstance[0].kill();
          }
          if (nextButtonRefs.current[sectionIndex]) {
            nextButtonRefs.current[sectionIndex]!.removeEventListener('click', handleNext);
          }
          if (prevButtonRefs.current[sectionIndex]) {
            prevButtonRefs.current[sectionIndex]!.removeEventListener('click', handlePrev);
          }
        };
      } catch (error) {
        console.warn('Error initializing carousel:', error);
      }
    };

    // Inicializar carousel para cada sección con galleryImages
    // Usar setTimeout para asegurar que las refs estén disponibles
    const initCarousels = () => {
      sectionsWithGallery.forEach(({ idx }) => {
        // Verificar que las refs estén disponibles antes de inicializar
        if (galleryRefs.current[idx] && cardsRefs.current[idx]) {
          initCarousel(idx);
        } else {
          // Si no están disponibles, intentar de nuevo después de un breve delay
          setTimeout(() => {
            if (galleryRefs.current[idx] && cardsRefs.current[idx]) {
              initCarousel(idx);
            }
          }, 100);
        }
      });
    };

    // Esperar a que el DOM esté completamente renderizado
    setTimeout(initCarousels, 200);
  }, []);

  return (
    <div className={styles.portfolioContainer}>
      <Navbar />
      {portfolioSections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => {
            if (el) sectionsRef.current[index] = el;
          }}
          className={`${styles.section} ${styles[section.id]} ${index === 0 ? styles.first : ''}`}
        >
          <div
            ref={(el) => {
              if (el) outerWrappersRef.current[index] = el;
            }}
            className={styles.outer}
          >
            <div
              ref={(el) => {
                if (el) innerWrappersRef.current[index] = el;
              }}
              className={styles.inner}
            >
              <div
                ref={(el) => {
                  if (el) imagesRef.current[index] = el;
                }}
                className={`${styles.bg} ${index === 0 ? styles.one : ''}`}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url(${section.backgroundImage})`,
                }}
              >
                <div className={styles.contentWrapper}>
                  <div className={styles.headingWrapper}>
                    <div className={styles.headingIcon}>
                      {index === 0 && <MdPlayArrow />}
                      {index === 1 && <MdBrush />}
                      {index === 2 && <MdEmail />}
                      {index === 3 && <MdCode />}
                    </div>
                    <h2
                      ref={(el) => {
                        if (el) {
                          headingsRef.current[index] = el;
                          if (index === 0) titleRef.current = el;
                        }
                      }}
                      className={styles.sectionHeading}
                    >
                      {section.heading}
                    </h2>
                  </div>
                  
                  {section.galleryImages && section.galleryImages.length > 0 && (
                    <div
                      ref={(el) => {
                        if (el) {
                          galleryRefs.current[index] = el;
                          if (index === 0) carouselRef.current = el;
                        }
                      }}
                      className={styles.gallery}
                    >
                      <ul
                        ref={(el) => {
                          if (el) cardsRefs.current[index] = el;
                        }}
                        className={styles.cards}
                      >
                        {[...section.galleryImages, ...section.galleryImages].map((image, imgIndex) => {
                          // Calcular el índice real de la imagen (sin duplicación)
                          const realImageIndex = imgIndex % section.galleryImages!.length;
                          // Buscar el video que coincida con la ruta de la imagen
                          const video = section.videos?.find(v => v.image === image);
                          // Codificar la URL para manejar espacios en los nombres de carpetas
                          const encodedImage = encodeURI(image);
                          return (
                            <li
                              key={imgIndex}
                              style={{
                                backgroundImage: `url(${encodedImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                              className={styles.cardItem}
                            >
                              {section.galleryImages && section.galleryImages.length > 0 && (
                                <button
                                  className={styles.videoInfoButton}
                                  onClick={() => {
                                    if (index === 0 && video) {
                                      // Buscar el índice del video en el array para mantener compatibilidad
                                      const videoIndex = section.videos?.findIndex(v => v.image === image) ?? -1;
                                      console.log('Video clicked:', videoIndex, video);
                                      setSelectedVideoIndex(videoIndex >= 0 ? videoIndex : null);
                                    } else if (index === 1 || index === 2 || index === 3) {
                                      // Sección de diseño gráfico, Email Marketing o Desarrollo Web
                                      const design = section.designs?.find(d => d.image === image);
                                      if (design) {
                                        const designIndex = section.designs?.findIndex(d => d.image === image) ?? -1;
                                        console.log('Design clicked:', designIndex, design, 'Section:', index);
                                        setSelectedDesignIndex(designIndex >= 0 ? designIndex : null);
                                        setSelectedDesignImage(image);
                                      } else {
                                        console.log('Image clicked but no design found:', image, section.id);
                                      }
                                    } else {
                                      // Para otras secciones, puedes agregar funcionalidad aquí
                                      console.log('Image clicked:', realImageIndex, section.id);
                                    }
                                  }}
                                  aria-label={
                                    index === 0 ? "Ver información del video" : 
                                    index === 1 ? "Ver diseño gráfico" :
                                    index === 2 ? "Ver email marketing" :
                                    "Ver desarrollo web"
                                  }
                                >
                                  {index === 0 && <MdPlayArrow className={styles.playIcon} />}
                                  {index === 1 && <MdBrush className={styles.playIcon} />}
                                  {index === 2 && <MdEmail className={styles.playIcon} />}
                                  {index === 3 && <MdCode className={styles.playIcon} />}
                                </button>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                      {section.galleryImages && section.galleryImages.length > 0 && (
                        <>
                          <div 
                            ref={(el) => {
                              if (index === 0) buttonsRef.current = el;
                            }}
                            className={styles.actions}
                          >
                            <button
                              ref={(el) => {
                                if (el) prevButtonRefs.current[index] = el;
                              }}
                              className={styles.prev}
                            >
                              {t('portfolio.buttons.prev')}
                            </button>
                            <button
                              ref={(el) => {
                                if (el) nextButtonRefs.current[index] = el;
                              }}
                              className={styles.next}
                            >
                              {t('portfolio.buttons.next')}
                            </button>
                          </div>
                          <div 
                            ref={(el) => {
                              if (el) dragProxyRefs.current[index] = el;
                            }} 
                            className={styles.dragProxy} 
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      
      {/* Sección de información del video con transición */}
      {selectedVideoIndex !== null && 
       portfolioSections[0].videos && 
       portfolioSections[0].videos[selectedVideoIndex] && (
        <VideoInfoSection
          video={portfolioSections[0].videos[selectedVideoIndex]}
          onClose={() => setSelectedVideoIndex(null)}
          transitionRef={transitionRef}
          videoInfoRef={videoInfoRef}
          transitionWrapperRef={transitionWrapperRef}
          t={t}
        />
      )}
      
      {selectedDesignIndex !== null && selectedDesignImage && (() => {
        // Buscar el diseño por la imagen clickeada en todas las secciones
        let designSection = null;
        let design = null;
        
        // Buscar en Web (index 3), Email (index 2), y Diseño gráfico (index 1)
        for (let i = 3; i >= 1; i--) {
          const section = portfolioSections[i];
          if (section?.designs) {
            const foundDesign = section.designs.find(d => d.image === selectedDesignImage);
            if (foundDesign) {
              design = foundDesign;
              designSection = section;
              break;
            }
          }
        }
        
        if (design && designSection) {
          // Si tiene websiteLink, es un proyecto de desarrollo web
          if (design.websiteLink) {
            return (
              <WebInfoSection
                design={design}
                onClose={() => {
                  setSelectedDesignIndex(null);
                  setSelectedDesignImage(null);
                }}
                transitionRef={designTransitionRef}
                designInfoRef={designInfoRef}
                transitionWrapperRef={designTransitionWrapperRef}
                t={t}
              />
            );
          } else {
            return (
              <DesignInfoSection
                design={design}
                onClose={() => {
                  setSelectedDesignIndex(null);
                  setSelectedDesignImage(null);
                }}
                transitionRef={designTransitionRef}
                designInfoRef={designInfoRef}
                transitionWrapperRef={designTransitionWrapperRef}
                t={t}
              />
            );
          }
        }
        return null;
      })()}
    </div>
  );
}

// Componente para la sección de información del video
function VideoInfoSection({
  video,
  onClose,
  transitionRef,
  videoInfoRef,
  transitionWrapperRef,
  t,
}: {
  video: VideoInfo;
  onClose: () => void;
  transitionRef: React.RefObject<SVGPathElement | null>;
  videoInfoRef: React.RefObject<HTMLDivElement | null>;
  transitionWrapperRef: React.RefObject<HTMLDivElement | null>;
  t: (key: string) => string;
}) {
  useEffect(() => {
    if (!transitionRef.current) return;

    const path = transitionRef.current;
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    // Usar animación de path en lugar de MorphSVG (que requiere plugin premium)
    const tl = gsap.timeline();
    
    // Animar el path manualmente
    tl.to(path, {
      attr: { d: start },
      ease: "power2.in",
      duration: 0.6,
    })
    .to(path, {
      attr: { d: end },
      ease: "power2.out",
      duration: 0.6,
    });

    // Mostrar el contenido después de la animación
    if (videoInfoRef.current) {
      // Asegurar que el contenido sea visible desde el inicio
      // Usar translateY en lugar de y para no interferir con el transform de centrado
      gsap.set(videoInfoRef.current, { 
        opacity: 0, 
        display: 'block', 
        visibility: 'visible',
        transform: 'translate(-50%, calc(-50% + 50px))' // Mantener centrado horizontal y agregar offset vertical inicial
      });
      gsap.to(videoInfoRef.current, {
        opacity: 1,
        transform: 'translate(-50%, -50%)', // Centrado perfecto
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });
    }

    return () => {
      tl.kill();
    };
  }, [transitionRef, videoInfoRef]);

  const handleClose = () => {
    if (!transitionRef.current || !videoInfoRef.current) return;

    const path = transitionRef.current;
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    // Ocultar contenido primero
    if (videoInfoRef.current) {
      gsap.to(videoInfoRef.current, {
        opacity: 0,
        transform: 'translate(-50%, calc(-50% + 50px))', // Mantener centrado horizontal
        duration: 0.4,
        ease: "power3.in",
      });
    }

    // Revertir la animación del path
    tl.to(path, {
      attr: { d: start },
      ease: "power2.in",
      duration: 0.6,
    })
    .to(path, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
      ease: "power2.out",
      duration: 0.6,
    });
  };

  return (
    <div className={styles.videoInfoOverlay} ref={transitionWrapperRef}>
      <div className={styles.transitionWrapper}>
        <svg
          className={styles.transition}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMin slice"
        >
          <defs>
            <linearGradient
              id="grad"
              x1={0}
              y1={0}
              x2={99}
              y2={99}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="rgb(39, 47, 102)" />
              <stop offset="1" stopColor="rgb(30, 37, 80)" />
            </linearGradient>
          </defs>
          <path
            ref={transitionRef}
            className={styles.path}
            stroke="url(#grad)"
            fill="url(#grad)"
            strokeWidth="2px"
            vectorEffect="non-scaling-stroke"
            d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
          />
        </svg>
      </div>
      
      <div ref={videoInfoRef} className={styles.videoInfoContent}>
        <button className={styles.closeButton} onClick={handleClose} aria-label={t('portfolio.modal.cerrar')}>
          <MdClose />
        </button>
        
        <div className={styles.videoInfoInner}>
          <div className={styles.videoInfoGrid}>
            {/* Columna izquierda: Reproductor de video */}
            <div className={styles.videoPlayerColumn}>
              {video.videoLink && video.videoLink !== '#' ? (
                <div className={styles.videoPlayer}>
                  <video
                    controls
                    className={styles.videoElement}
                    src={video.videoLink}
                    preload="metadata"
                    playsInline
                    crossOrigin="anonymous"
                  >
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>
              ) : (
                <div className={styles.videoPlayer}>
                  <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
                    Video no disponible
                  </p>
                </div>
              )}
            </div>
            
            {/* Columna derecha: Descripción */}
            <div className={styles.videoDescriptionColumn}>
              {video.title && (
                <p className={styles.videoTitleSmall}>{video.title}</p>
              )}
              
              <h3 className={styles.videoTitle}>Video</h3>
              
              {video.videoTitle && (
                <h2 className={styles.videoMainTitle}>{video.videoTitle}</h2>
              )}
              
              {video.client && (
                <p className={styles.videoClient}>{video.client}</p>
              )}
              
              {video.tools && (
                <div className={styles.videoTools}>
                  <h4 className={styles.videoToolsTitle}>{t('portfolio.modal.herramientasUtilizadas')}</h4>
                  <div className={styles.videoToolsList}>
                    {video.tools.split(',').map((tool, index) => {
                      const toolName = tool.trim();
                      let IconComponent = null;
                      
                      if (toolName.toLowerCase().includes('adobe suite') || toolName.toLowerCase().includes('adobe')) {
                        IconComponent = SiAdobe;
                      } else if (toolName.toLowerCase().includes('premiere')) {
                        IconComponent = SiAdobepremierepro;
                      } else if (toolName.toLowerCase().includes('after effects')) {
                        IconComponent = SiAdobeaftereffects;
                      }
                      
                      return (
                        <div key={index} className={styles.videoToolItem}>
                          {IconComponent && <IconComponent className={styles.videoToolIcon} />}
                          <span>{toolName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {video.description && (
                <div className={styles.videoDescription}>
                  <p>{video.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para la sección de información del diseño gráfico
function DesignInfoSection({
  design,
  onClose,
  transitionRef,
  designInfoRef,
  transitionWrapperRef,
  t,
}: {
  design: VideoInfo;
  onClose: () => void;
  transitionRef: React.RefObject<SVGPathElement | null>;
  designInfoRef: React.RefObject<HTMLDivElement | null>;
  transitionWrapperRef: React.RefObject<HTMLDivElement | null>;
  t: (key: string) => string;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!transitionRef.current) return;

    const path = transitionRef.current;
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    const tl = gsap.timeline();
    
    tl.to(path, {
      attr: { d: start },
      ease: "power2.in",
      duration: 0.6,
    })
    .to(path, {
      attr: { d: end },
      ease: "power2.out",
      duration: 0.6,
    });

    if (designInfoRef.current) {
      gsap.set(designInfoRef.current, { 
        opacity: 0, 
        display: 'block', 
        visibility: 'visible',
        transform: 'translate(-50%, calc(-50% + 50px))'
      });
      gsap.to(designInfoRef.current, {
        opacity: 1,
        transform: 'translate(-50%, -50%)',
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });
    }

    return () => {
      tl.kill();
    };
  }, [transitionRef, designInfoRef]);

  const handleClose = () => {
    if (!transitionRef.current || !designInfoRef.current) return;

    const path = transitionRef.current;
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    if (designInfoRef.current) {
      gsap.to(designInfoRef.current, {
        opacity: 0,
        transform: 'translate(-50%, calc(-50% + 50px))',
        duration: 0.4,
        ease: "power3.in",
      });
    }

    tl.to(path, {
      attr: { d: start },
      ease: "power2.in",
      duration: 0.6,
    })
    .to(path, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
      ease: "power2.out",
      duration: 0.6,
    });
  };

  return (
    <div className={styles.videoInfoOverlay} ref={transitionWrapperRef}>
      <div className={styles.transitionWrapper}>
        <svg
          className={styles.transition}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMin slice"
        >
          <path
            ref={transitionRef}
            d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
            fill="#272F66"
          />
        </svg>
      </div>
      
      <div ref={designInfoRef} className={styles.videoInfoContent}>
        <button className={styles.closeButton} onClick={handleClose} aria-label={t('portfolio.modal.cerrar')}>
          <MdClose />
        </button>
        
        <div className={styles.videoInfoInner}>
          <div className={styles.videoInfoGrid}>
            {/* Columna izquierda: Imagen del diseño */}
            <div className={styles.videoPlayerColumn}>
              {design.image ? (
                <div className={styles.videoPlayer} style={{ position: 'relative' }}>
                  <img
                    src={design.image}
                    alt={design.videoTitle || design.title || t('portfolio.modal.disenoGrafico')}
                    className={styles.videoElement}
                  />
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className={styles.fullscreenButton}
                    aria-label={t('portfolio.modal.verEnPantallaCompleta')}
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      background: 'rgba(0, 0, 0, 0.7)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '2.5rem',
                      height: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'white',
                      zIndex: 10,
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <MdFullscreen size={20} />
                  </button>
                </div>
              ) : (
                <div className={styles.videoPlayer}>
                  <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
                    {t('portfolio.modal.imagenNoDisponible')}
                  </p>
                </div>
              )}
            </div>
            
            {/* Overlay de pantalla completa - renderizado fuera del modal usando Portal */}
            {mounted && isFullscreen && createPortal(
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.98)',
                  zIndex: 999999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  cursor: 'pointer',
                  margin: 0,
                }}
                onClick={() => setIsFullscreen(false)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '3.5rem',
                    height: '3.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    zIndex: 1000000,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                    aria-label={t('portfolio.modal.cerrarPantallaCompleta')}
                >
                  <MdFullscreenExit size={28} />
                </button>
                <img
                  src={design.image}
                  alt={design.videoTitle || design.title || 'Diseño gráfico'}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxWidth: '95vw',
                    maxHeight: '95vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    cursor: 'default',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                  }}
                />
              </div>,
              document.body
            )}
            
            {/* Columna derecha: Descripción */}
            <div className={styles.videoDescriptionColumn}>
              {design.title && (
                <p className={styles.videoTitleSmall}>{design.title}</p>
              )}
              
              <h3 className={styles.videoTitle}>{t('portfolio.modal.disenoGrafico')}</h3>
              
              {design.videoTitle && (
                <h2 className={styles.videoMainTitle}>{design.videoTitle}</h2>
              )}
              
              {design.client && (
                <p className={styles.videoClient}>{design.client}</p>
              )}
              
              {design.tools && (
                <div className={styles.videoTools}>
                  <h4 className={styles.videoToolsTitle}>{t('portfolio.modal.herramientasUtilizadas')}</h4>
                  <div className={styles.videoToolsList}>
                    {design.tools.split(',').map((tool, index) => {
                      const toolName = tool.trim();
                      let IconComponent = null;
                      
                      if (toolName.toLowerCase().includes('photoshop')) {
                        IconComponent = SiAdobephotoshop;
                      } else if (toolName.toLowerCase().includes('canva')) {
                        IconComponent = SiCanva;
                      } else if (toolName.toLowerCase().includes('adobe suite') || toolName.toLowerCase().includes('adobe')) {
                        IconComponent = SiAdobe;
                      }
                      
                      return (
                        <div key={index} className={styles.videoToolItem}>
                          {IconComponent && <IconComponent className={styles.videoToolIcon} />}
                          <span>{toolName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {design.description && (
                <div className={styles.videoDescription}>
                  <p>{design.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para la sección de información de desarrollo web
function WebInfoSection({
  design,
  onClose,
  transitionRef,
  designInfoRef,
  transitionWrapperRef,
  t,
}: {
  design: VideoInfo;
  onClose: () => void;
  transitionRef: React.RefObject<SVGPathElement | null>;
  designInfoRef: React.RefObject<HTMLDivElement | null>;
  transitionWrapperRef: React.RefObject<HTMLDivElement | null>;
  t: (key: string) => string;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!transitionRef.current) return;

    const path = transitionRef.current;
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    const tl = gsap.timeline();
    
    tl.to(path, {
      attr: { d: start },
      ease: "power2.in",
      duration: 0.6,
    })
    .to(path, {
      attr: { d: end },
      ease: "power2.out",
      duration: 0.6,
    });

    if (designInfoRef.current) {
      gsap.set(designInfoRef.current, { 
        opacity: 0, 
        display: 'block', 
        visibility: 'visible',
        transform: 'translate(-50%, calc(-50% + 50px))'
      });
      gsap.to(designInfoRef.current, {
        opacity: 1,
        transform: 'translate(-50%, -50%)',
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });
    }

    return () => {
      tl.kill();
    };
  }, [transitionRef, designInfoRef]);

  const handleClose = () => {
    if (!transitionRef.current || !designInfoRef.current) return;

    const path = transitionRef.current;
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    if (designInfoRef.current) {
      gsap.to(designInfoRef.current, {
        opacity: 0,
        transform: 'translate(-50%, calc(-50% + 50px))',
        duration: 0.4,
        ease: "power3.in",
      });
    }

    tl.to(path, {
      attr: { d: start },
      ease: "power2.in",
      duration: 0.6,
    })
    .to(path, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
      ease: "power2.out",
      duration: 0.6,
    });
  };

  return (
    <div className={styles.videoInfoOverlay} ref={transitionWrapperRef}>
      <div className={styles.transitionWrapper}>
        <svg
          className={styles.transition}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMin slice"
        >
          <path
            ref={transitionRef}
            d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
            fill="#272F66"
          />
        </svg>
      </div>
      
      <div ref={designInfoRef} className={styles.videoInfoContent}>
        <button className={styles.closeButton} onClick={handleClose} aria-label={t('portfolio.modal.cerrar')}>
          <MdClose />
        </button>
        
        <div className={styles.videoInfoInner}>
          <div className={styles.videoInfoGrid}>
            {/* Columna izquierda: Imagen del proyecto web */}
            <div className={styles.videoPlayerColumn}>
              {design.image ? (
                <div className={styles.videoPlayer} style={{ position: 'relative' }}>
                  <img
                    src={design.image}
                    alt={design.videoTitle || design.title || 'Desarrollo Web'}
                    className={styles.videoElement}
                  />
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className={styles.fullscreenButton}
                    aria-label={t('portfolio.modal.verEnPantallaCompleta')}
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      background: 'rgba(0, 0, 0, 0.7)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '2.5rem',
                      height: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'white',
                      zIndex: 10,
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <MdFullscreen size={20} />
                  </button>
                </div>
              ) : (
                <div className={styles.videoPlayer}>
                  <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
                    {t('portfolio.modal.imagenNoDisponible')}
                  </p>
                </div>
              )}
            </div>
            
            {/* Overlay de pantalla completa - renderizado fuera del modal usando Portal */}
            {mounted && isFullscreen && createPortal(
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.98)',
                  zIndex: 999999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  cursor: 'pointer',
                  margin: 0,
                }}
                onClick={() => setIsFullscreen(false)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '3.5rem',
                    height: '3.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    zIndex: 1000000,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                    aria-label={t('portfolio.modal.cerrarPantallaCompleta')}
                >
                  <MdFullscreenExit size={28} />
                </button>
                <img
                  src={design.image}
                  alt={design.videoTitle || design.title || 'Desarrollo Web'}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxWidth: '95vw',
                    maxHeight: '95vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    cursor: 'default',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                  }}
                />
              </div>,
              document.body
            )}
            
            {/* Columna derecha: Descripción */}
            <div className={styles.videoDescriptionColumn}>
              {design.title && (
                <p className={styles.videoTitleSmall}>{design.title}</p>
              )}
              
              {design.videoTitle && (
                <h2 className={styles.videoMainTitle}>{design.videoTitle}</h2>
              )}
              
              {design.client && (
                <p className={styles.videoClient}>{design.client}</p>
              )}
              
              {design.tools && (
                <div className={styles.videoTools}>
                  <h4 className={styles.videoToolsTitle}>{t('portfolio.modal.herramientasUtilizadas')}</h4>
                  <div className={styles.videoToolsList}>
                    {design.tools.split(',').map((tool, index) => {
                      const toolName = tool.trim();
                      let IconComponent = null;
                      
                      if (toolName.toLowerCase().includes('wordpress')) {
                        IconComponent = SiWordpress;
                      } else if (toolName.toLowerCase().includes('next') || toolName.toLowerCase().includes('next.js') || toolName.toLowerCase().includes('nextjs')) {
                        IconComponent = SiNextdotjs;
                      } else if (toolName.toLowerCase().includes('react')) {
                        IconComponent = SiReact;
                      }
                      
                      return (
                        <div key={index} className={styles.videoToolItem}>
                          {IconComponent && <IconComponent className={styles.videoToolIcon} />}
                          <span>{toolName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {design.description && (
                <div className={styles.videoDescription}>
                  <p>{design.description}</p>
                </div>
              )}
              
              {/* Botón para visitar el sitio web */}
              {design.websiteLink && (
                <a
                  href={design.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '2rem',
                    padding: '0.875rem 1.75rem',
                    backgroundColor: '#13B9D5',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem',
                    width: 'fit-content',
                    minWidth: '200px',
                    boxShadow: '0 2px 8px rgba(19, 185, 213, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0fa5c0';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(19, 185, 213, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#13B9D5';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(19, 185, 213, 0.2)';
                  }}
                >
                  <span>{t('portfolio.modal.visitarSitioWeb')}</span>
                  <MdOpenInNew size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
