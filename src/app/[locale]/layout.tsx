import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import '../../ui/styles/globals.css';
import { routing } from '../../i18n/routing';
import { ReactNode } from 'react';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations('metadata');

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    viewport: 'width=device-width, initial-scale=1',
    author: 'Andres Argote',
    creator: 'Andres Argote',
    publisher: 'Andres Argote',
    robots: 'index, follow',
    canonical: 'https://voicesfromvenezuela.com',
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: 'https://voicesfromvenezuela.com',
      /*image: {
        url: 'https://voicesfromvenezuela.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: t('title'),
      },todo */
      site_name: 'Voices from Venezuela',
    },
    twitter: {
      /*card: 'summary_large_image', todo*/
      title: t('title'),
      description: t('description'),
      /*image: {
        url: 'https://voicesfromvenezuela.com/images/og-image.jpg',
        alt: t('title'),
      },todo */
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
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
