import { merriweather } from '@/src/fonts';
import Balancer from 'react-wrap-balancer';
import styles from '../../styles/testimonials.module.css';
import ScreenShot from '../screen-shot';

type Props = {
  formattedData: {
    id: string;
    created_at: string;
    message: string;
    formatted_date: string;
    category: string | null;
  }[];
};

export function Testimonials({ formattedData }: Props) {
  return (
    <ul className={styles.testimonials}>
      {formattedData?.map((d) => {
        return (
          <li key={d.id} className={styles.testimonial}>
            <div className={styles.testimonial_content} id={d.id}>
              <p>
                <Balancer>{d.message}</Balancer>
              </p>
            </div>
            <div className={styles.testimonial_footer}>
              <div className={styles.testimonial_footer_info}>
                {d.category && (
                  <span
                    className={`${styles.testimonial_category} ${merriweather.className}`}
                  >
                    {d.category}
                  </span>
                )}
                <time dateTime={d.created_at} className={merriweather.className}>
                  {d.formatted_date}
                </time>
              </div>
              <ScreenShot elementId={d.id} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
