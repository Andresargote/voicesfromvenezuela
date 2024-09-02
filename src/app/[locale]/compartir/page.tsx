import styles from '../../../ui/styles/page.module.css';
import { ShareForm } from '../../../ui/components/share-form';
import Header from '@/src/ui/components/header';

export default function Share() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <ShareForm />
        </div>
      </main>
    </>
  );
}
