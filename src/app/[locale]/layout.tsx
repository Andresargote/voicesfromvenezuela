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
import { Analytics } from '@vercel/analytics/react';

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
    hreflang: routing.locales.map((locale) => ({
      lang: locale,
      url: `https://www.voicesfromvenezuela.com/${locale}`,
    })),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: 'https://www.voicesfromvenezuela.com',
      images: [
        {
          url: `https://www.voicesfromvenezuela.com/api/og`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
      site_name: 'Voices from Venezuela',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@andresargball',
      title: t('title'),
      description: t('description'),
      images: {
        url: `https://www.voicesfromvenezuela.com/api/og`,
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
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
