import { merriweather } from '@/src/fonts';
import Balancer from 'react-wrap-balancer';
import styles from '../../styles/testimonials.module.css';

type Props = {
  formattedData: {
    id: string;
    created_at: string;
    message: string;
    formatted_date: string;
  }[];
};

export function Testimonials({ formattedData }: Props) {
  return (
    <ul className={styles.testimonials}>
      {formattedData?.map((d) => {
        return (
          <li key={d.id} className={styles.testimonial}>
            <div className={styles.testimonial_content}>
              <p>
                <Balancer>{d.message}</Balancer>
              </p>
            </div>
            <div className={styles.testimonial_footer}>
              <time dateTime={d.created_at} className={merriweather.className}>
                {d.formatted_date}
              </time>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
