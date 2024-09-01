import Balancer from 'react-wrap-balancer';
import styles from '../../ui/styles/page.module.css';
import { sourceCodePro } from '../../fonts';
import Link from 'next/link';
import { createClient } from '../../utils/supabase/server';
import { getTranslations } from 'next-intl/server';

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
    .filter('status', 'eq', 'approved');

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
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.header_container}>
            <h1 className={styles.header_title}>
              <Link href='/'>Voices from Venezuela</Link>
            </h1>
            <Link href='/share' className={styles.cta_btn}>
              Comparte tu testimonio
            </Link>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <h2 className={styles.main_subtitle}>
            <Balancer>{t('subtitle')}</Balancer>
          </h2>
          <p className={`${styles.main_goal}`}>
            <Balancer>{t('goal')}</Balancer>
          </p>
          <div>
            {error && (
              <p className={styles.error}>
                <Balancer>{t('error')}</Balancer>
              </p>
            )}
            {!error && formattedData?.length && (
              <ul className={styles.testimonials_list}>
                {formattedData?.map((d) => {
                  return (
                    <li key={d.id} className={styles.testimonials_list_item}>
                      <time dateTime={d.created_at} className={sourceCodePro.className}>
                        {d.formatted_date}
                      </time>
                      <p>
                        <Balancer>{d.message}</Balancer>
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
