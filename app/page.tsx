import Balancer from 'react-wrap-balancer';
import styles from './page.module.css';
import { sourceCodePro } from './fonts';
import Link from 'next/link';

export default function Home() {
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
            <Balancer>
              A Collection of Anonymous Voices Reflecting the Situation in Venezuela
            </Balancer>
          </h2>
          <p className={`${styles.main_goal}`}>
            <Balancer>
              This is a collection of anonymous voices reflecting the situation in
              Venezuela. The goal is to provide a platform for people to share their
              thoughts and experiences without fear of retaliation.
            </Balancer>
          </p>
          <div>
            <ul className={styles.testimonials_list}>
              <li className={styles.testimonials_list_item}>
                <time dateTime='' className={sourceCodePro.className}>
                  31 Sept 2024
                </time>
                <p>
                  <Balancer>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    suscipit, nunc sit amet aliquam ultricies, nisl velit ultrices libero,
                    nec tincidunt purus nunc nec justo.
                  </Balancer>
                </p>
              </li>
              <li className={styles.testimonials_list_item}>
                <time dateTime='' className={sourceCodePro.className}>
                  31 Sept 2024
                </time>
                <p>
                  <Balancer>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    suscipit, nunc sit amet aliquam ultricies, nisl velit ultrices libero,
                    nec tincidunt purus nunc nec justo.
                  </Balancer>
                </p>
              </li>
              <li className={styles.testimonials_list_item}>
                <time dateTime='' className={sourceCodePro.className}>
                  31 Sept 2024
                </time>
                <p>
                  <Balancer>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    suscipit, nunc sit amet aliquam ultricies, nisl velit ultrices libero,
                    nec tincidunt purus nunc nec justo.
                  </Balancer>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
