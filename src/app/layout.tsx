import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import '../ui/styles/globals.css';

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
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
