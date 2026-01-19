'use client';

import NavbarLegal from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../legal.module.css';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function CondicionesUso() {
  const { t } = useLanguage();
  
  return (
    <>
      <NavbarLegal />
      <div className={styles.legalPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('legal.condicionesUso.title')}</h1>
          
          <div className={styles.content}>
            <section>
              <p>
                {t('legal.condicionesUso.intro')}{' '}
                <a href={t('legal.condicionesUso.introLink')} target="_blank" rel="noopener noreferrer">
                  {t('legal.condicionesUso.introLink')}
                </a>
                {t('legal.condicionesUso.introEnd')}
              </p>
            </section>

            <section>
              <h2>{t('legal.condicionesUso.section1.title')}</h2>
              <p>
                {t('legal.condicionesUso.section1.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.condicionesUso.section2.title')}</h2>
              <p>
                {t('legal.condicionesUso.section2.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.condicionesUso.section3.title')}</h2>
              <p>
                {t('legal.condicionesUso.section3.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.condicionesUso.section4.title')}</h2>
              <p>
                {t('legal.condicionesUso.section4.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.condicionesUso.section5.title')}</h2>
              <p>
                {t('legal.condicionesUso.section5.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.condicionesUso.section6.title')}</h2>
              <p>
                {t('legal.condicionesUso.section6.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.condicionesUso.contact.title')}</h2>
              <p><strong>{t('legal.condicionesUso.contact.company')}</strong> {t('legal.condicionesUso.contact.companyValue')}</p>
              <p><strong>{t('legal.condicionesUso.contact.address')}</strong> {t('legal.condicionesUso.contact.addressValue')}</p>
              <p>
                <strong>{t('legal.condicionesUso.contact.email')}</strong>{' '}
                <a href="mailto:info@articagroup.us">{t('legal.condicionesUso.contact.emailValue')}</a>
              </p>
              <p>
                <strong>{t('legal.condicionesUso.contact.phone')}</strong>{' '}
                <a href="tel:+13056195878">{t('legal.condicionesUso.contact.phoneValue')}</a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
