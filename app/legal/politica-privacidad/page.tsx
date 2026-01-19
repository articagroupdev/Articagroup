'use client';

import NavbarLegal from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../legal.module.css';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function PoliticaPrivacidad() {
  const { t } = useLanguage();
  
  return (
    <>
      <NavbarLegal />
      <div className={styles.legalPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('legal.politicaPrivacidad.title')}</h1>
          
          <div className={styles.content}>
            <section>
              <p>
                {t('legal.politicaPrivacidad.intro')}
              </p>
            </section>

            <section>
              <h2>{t('legal.politicaPrivacidad.section1.title')}</h2>
              <p>
                {t('legal.politicaPrivacidad.section1.text')}
              </p>
              <ul>
                {(() => {
                  const list = t('legal.politicaPrivacidad.section1.list');
                  return Array.isArray(list) ? list.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) : null;
                })()}
              </ul>
            </section>

            <section>
              <h2>{t('legal.politicaPrivacidad.section2.title')}</h2>
              <p>{t('legal.politicaPrivacidad.section2.text')}</p>
              <ul>
                {(() => {
                  const list = t('legal.politicaPrivacidad.section2.list');
                  return Array.isArray(list) ? list.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) : null;
                })()}
              </ul>
            </section>

            <section>
              <h2>{t('legal.politicaPrivacidad.section3.title')}</h2>
              <p>
                {t('legal.politicaPrivacidad.section3.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.politicaPrivacidad.section4.title')}</h2>
              <p>
                {t('legal.politicaPrivacidad.section4.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.politicaPrivacidad.section5.title')}</h2>
              <p>
                {t('legal.politicaPrivacidad.section5.text')}{' '}
                <a href="mailto:info@articagroup.us">{t('legal.politicaPrivacidad.contact.emailValue')}</a>.
              </p>
            </section>

            <section>
              <h2>{t('legal.politicaPrivacidad.contact.title')}</h2>
              <p><strong>{t('legal.politicaPrivacidad.contact.company')}</strong> {t('legal.politicaPrivacidad.contact.companyValue')}</p>
              <p><strong>{t('legal.politicaPrivacidad.contact.address')}</strong> {t('legal.politicaPrivacidad.contact.addressValue')}</p>
              <p>
                <strong>{t('legal.politicaPrivacidad.contact.email')}</strong>{' '}
                <a href="mailto:info@articagroup.us">{t('legal.politicaPrivacidad.contact.emailValue')}</a>
              </p>
              <p>
                <strong>{t('legal.politicaPrivacidad.contact.phone')}</strong>{' '}
                <a href="tel:+13056195878">{t('legal.politicaPrivacidad.contact.phoneValue')}</a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
