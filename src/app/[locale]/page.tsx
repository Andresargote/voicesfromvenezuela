import Balancer from 'react-wrap-balancer';
import styles from '../../ui/styles/page.module.css';
import { sourceCodePro } from '../../fonts';
import { createClient } from '../../utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import Header from '@/src/ui/components/header';
import Link from 'next/link';
import { Testimonials } from '@/src/ui/components/testimonial/page';

export default async function Home({
  params,
}: {
  params: {
    locale: string;
  };
}) {
  const { locale } = params;
  const supabaseClient = createClient();
  const { data, error } = await supabaseClient
    .from('testimonials')
    .select('*')
    .filter('status', 'eq', 'approved')
    .order('created_at', { ascending: false });

  const formattedData = data?.map((d) => ({
    ...d,
    message: locale === 'es' ? d.message : d.message_en,
    formatted_date: new Date(d.created_at).toLocaleDateString(
      locale === 'es' ? 'es-VE' : 'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    ),
  }));

  const t = await getTranslations('home');

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.cta}>
          <h2 className={styles.cta_title}>
            <Balancer>{t('whatIs')}</Balancer>
          </h2>
          <Link className={styles.cta_btn} href='/compartir'>
            Comparte tu historia
          </Link>
        </section>
        <section>
          {error && (
            <p className={styles.error}>
              <Balancer>{t('error')}</Balancer>
            </p>
          )}
          {!error && formattedData?.length && (
            <Testimonials formattedData={formattedData} />
          )}
        </section>
      </main>
    </>
  );
}
