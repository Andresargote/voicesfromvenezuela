import { merriweather } from '@/src/fonts';
import styles from '../../styles/subheader.module.css';
import Marquee from 'react-fast-marquee';

export function Subheader() {
  return (
    <section>
      <div className={styles.subheader_title}>
        <h3 className={merriweather.className}>
          Secuestrados y asesinados por el régimen
        </h3>
      </div>
      <div className={styles.subheader_list}>
        <Marquee autoFill={true} speed={20}>
          <ul>
            <li>Juan Pablo Pernalete (20 años)</li>
            <li>Neomar Lander (17 años)</li>
            <li>Miguel Castillo (27 años)</li>
            <li>David Vallenilla (22 años)</li>
            <li>Paúl Moreno (24 años)</li>
            <li>Fabián Urbina (17 años)</li>
            <li>Armando Cañizales (18 años)</li>
            <li>Ramón Martínez (29 años)</li>
          </ul>
        </Marquee>
      </div>
    </section>
  );
}
