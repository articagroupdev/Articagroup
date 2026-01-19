'use client';

import NavbarLegal from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../legal.module.css';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function AvisoLegal() {
  const { t } = useLanguage();
  
  return (
    <>
      <NavbarLegal />
      <div className={styles.legalPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('legal.avisoLegal.title')}</h1>
          
          <div className={styles.content}>
            <section>
              <p>
                <strong>Artica Group LLC</strong> {t('legal.avisoLegal.intro')}
              </p>
            </section>

            <section>
              <h2>{t('legal.avisoLegal.companyData.title')}</h2>
              <ul>
                <li><strong>{t('legal.avisoLegal.companyData.name')}</strong> {t('legal.avisoLegal.companyData.nameValue')}</li>
                <li><strong>{t('legal.avisoLegal.companyData.fiscalAddress')}</strong> {t('legal.avisoLegal.companyData.fiscalAddressValue')}</li>
                <li><strong>{t('legal.avisoLegal.companyData.commercialAddress')}</strong> {t('legal.avisoLegal.companyData.commercialAddressValue')}</li>
              </ul>
            </section>

            <section>
              <h2>{t('legal.avisoLegal.registrationInfo.title')}</h2>
              <ul>
                <li><strong>{t('legal.avisoLegal.registrationInfo.documentNumber')}</strong> {t('legal.avisoLegal.registrationInfo.documentNumberValue')}</li>
                <li><strong>{t('legal.avisoLegal.registrationInfo.feiEin')}</strong> {t('legal.avisoLegal.registrationInfo.feiEinValue')}</li>
                <li><strong>{t('legal.avisoLegal.registrationInfo.dateFiled')}</strong> {t('legal.avisoLegal.registrationInfo.dateFiledValue')}</li>
                <li><strong>{t('legal.avisoLegal.registrationInfo.effectiveDate')}</strong> {t('legal.avisoLegal.registrationInfo.effectiveDateValue')}</li>
                <li><strong>{t('legal.avisoLegal.registrationInfo.state')}</strong> {t('legal.avisoLegal.registrationInfo.stateValue')}</li>
                <li><strong>{t('legal.avisoLegal.registrationInfo.status')}</strong> {t('legal.avisoLegal.registrationInfo.statusValue')}</li>
              </ul>
            </section>

            <section>
              <h2>{t('legal.avisoLegal.aboutWebsite.title')}</h2>
              <p>
                {t('legal.avisoLegal.aboutWebsite.text1')}
              </p>
              <p>
                {t('legal.avisoLegal.aboutWebsite.text2')}
              </p>
            </section>

            <section>
              <h2>{t('legal.avisoLegal.services.title')}</h2>
              <p>
                <strong>Artica Group LLC</strong> {t('legal.avisoLegal.services.intro')}
              </p>
              <ul>
                {(() => {
                  const list = t('legal.avisoLegal.services.list');
                  return Array.isArray(list) ? list.map((service, index) => (
                    <li key={index}>{service}</li>
                  )) : null;
                })()}
              </ul>
            </section>

            <section>
              <h2>{t('legal.avisoLegal.intellectualProperty.title')}</h2>
              <p>
                {t('legal.avisoLegal.intellectualProperty.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.avisoLegal.responsibility.title')}</h2>
              <p>
                {t('legal.avisoLegal.responsibility.text')}
              </p>
            </section>

            <section>
              <h2>{t('legal.avisoLegal.contact.title')}</h2>
              <p>
                {t('legal.avisoLegal.contact.text1')}{' '}
                <a href="mailto:info@articagroup.us">{t('legal.avisoLegal.contact.email')}</a>
                {' '}{t('legal.avisoLegal.contact.text2')}{' '}
                <a href="tel:+13056195878">{t('legal.avisoLegal.contact.phone')}</a>
              </p>
              <p>
                <strong>{t('legal.avisoLegal.contact.schedule')}</strong> {t('legal.avisoLegal.contact.scheduleValue')}
              </p>
              <p>
                <strong>{t('legal.avisoLegal.contact.address')}</strong> {t('legal.avisoLegal.contact.addressValue')}
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
