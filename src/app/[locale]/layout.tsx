import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import '../../ui/styles/globals.css';
import { routing } from '../../i18n/routing';
import { ReactNode } from 'react';
import Header from '@/src/ui/components/header';
import styles from '../../ui/styles/page.module.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations('metadata');

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    author: 'Andres Argote',
    creator: 'Andres Argote',
    publisher: 'Andres Argote',
    robots: 'index, follow',
    canonical: `${process.env.VERCEL_URL}`,
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `${process.env.VERCEL_URL}`,
      image: {
        url: `${process.env.VERCEL_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: t('title'),
      },
      site_name: 'Voices from Venezuela',
    },
    twitter: {
      title: t('title'),
      description: t('description'),
      image: {
        url: `${process.env.VERCEL_URL}/api/og`,
        alt: t('title'),
      },
    },
    icons: {
      icon: ['/assets/favicon.ico'],
      apple: ['/assets/apple-touch-icon.png'],
      shortcut: ['/assets/apple-touch-icon.png'],
    },
  };
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};
export default async function RootLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          {children}
          <footer className={styles.footer}>
            <p>Creado por Andres Argote</p>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
