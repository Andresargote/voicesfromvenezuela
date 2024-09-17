import Balancer from 'react-wrap-balancer';
import styles from '../../ui/styles/page.module.css';
import { createClient } from '../../utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Testimonials } from '@/src/ui/components/testimonial/page';
import { Subheader } from '@/src/ui/components/subheader';

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
    message: locale === 'es' ? d.message : d[`message_${locale}`],
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
      <Subheader />
      <main className={styles.main}>
        <section className={styles.cta}>
          <h2 className={styles.cta_title}>
            <Balancer>{t('whatIs')}</Balancer>
          </h2>
          <Link className={styles.cta_btn} href='/compartir'>
            Comparte tu historia
          </Link>
        </section>
        <section className={styles.testimonials_container}>
          {error && (
            <p className={styles.error}>
              <Balancer>{t('error')}</Balancer>
            </p>
          )}
          {!error && formattedData?.length && (
            <>
              <p className={styles.testimonials_counter}>
                {formattedData?.length} {t('testimonialsCounter')}
              </p>
              <Testimonials formattedData={formattedData} />
            </>
          )}
        </section>
      </main>
    </>
  );
}
