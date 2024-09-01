import styles from '../../../ui/styles/page.module.css';
import Link from 'next/link';
import { ShareForm } from '../../../ui/components/share-form';

export default function Share() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.header_container}>
            <h1 className={styles.header_title}>
              <Link href='/'>Voices from Venezuela</Link>
            </h1>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <ShareForm />
        </div>
      </main>
    </>
  );
}
