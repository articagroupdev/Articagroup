'use client';

import NavbarLegal from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../legal.module.css';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function PoliticaCookies() {
  const { t } = useLanguage();
  
  return (
    <>
      <NavbarLegal />
      <div className={styles.legalPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('legal.politicaCookies.title')}</h1>
          
          <div className={styles.content}>
            <section>
              <p>
                {t('legal.politicaCookies.intro')}
              </p>
            </section>

            <section>
              <h2>{t('legal.politicaCookies.section1.title')}</h2>
              <p>
                {t('legal.politicaCookies.section1.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.politicaCookies.section2.title')}</h2>
              
              <h3>{t('legal.politicaCookies.section2.necessary.title')}</h3>
              <p>
                {t('legal.politicaCookies.section2.necessary.text')}
              </p>

              <h3>{t('legal.politicaCookies.section2.analytics.title')}</h3>
              <p>
                {t('legal.politicaCookies.section2.analytics.text')}
              </p>

              <h3>{t('legal.politicaCookies.section2.marketing.title')}</h3>
              <p>
                {t('legal.politicaCookies.section2.marketing.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.politicaCookies.section3.title')}</h2>
              <p>
                {t('legal.politicaCookies.section3.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.politicaCookies.section4.title')}</h2>
              <p>
                {t('legal.politicaCookies.section4.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.politicaCookies.contact.title')}</h2>
              <p><strong>{t('legal.politicaCookies.contact.company')}</strong> {t('legal.politicaCookies.contact.companyValue')}</p>
              <p><strong>{t('legal.politicaCookies.contact.address')}</strong> {t('legal.politicaCookies.contact.addressValue')}</p>
              <p>
                <strong>{t('legal.politicaCookies.contact.email')}</strong>{' '}
                <a href="mailto:info@articagroup.us">{t('legal.politicaCookies.contact.emailValue')}</a>
              </p>
              <p>
                <strong>{t('legal.politicaCookies.contact.phone')}</strong>{' '}
                <a href="tel:+13056195878">{t('legal.politicaCookies.contact.phoneValue')}</a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
