import styles from '../../../ui/styles/page.module.css';
import { ShareForm } from '../../../ui/components/share-form';

export default function Share() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ShareForm />
      </div>
    </main>
  );
}
