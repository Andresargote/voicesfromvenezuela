import { merriweather } from '@/src/fonts';
import styles from '../../styles/subheader.module.css';
import Marquee from 'react-fast-marquee';
import { createClient } from '@/src/utils/supabase/server';
import { getTranslations } from 'next-intl/server';

export async function Subheader() {
  const t = await getTranslations('subHeader');
  const supabaseClient = createClient();
  const { data, error } = await supabaseClient.from('sequestered').select('name');

  if (error || data.length === 0) {
    return null;
  }

  return (
    <section>
      <div className={styles.subheader_title}>
        <h3 className={merriweather.className}>{t('title')}</h3>
      </div>

      <div className={styles.subheader_list}>
        <Marquee autoFill={true} speed={12}>
          <ul>
            {data.map((s) => (
              <li key={s.name}>{s.name}</li>
            ))}
          </ul>
        </Marquee>
      </div>

      <div className={styles.data_from}>
        <p>
          {t('from')}{' '}
          <a href='https://vzlalibre.my.canva.site/vzlalibre#page-2' target='_blank'>
            vzlibre
          </a>
        </p>
      </div>
    </section>
  );
}
