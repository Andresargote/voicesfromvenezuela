import Link from 'next/link';
import styles from '../../styles/header.module.css';
import { merriweather } from '@/src/fonts';
import LanguageSelect from '../language-select';

export default async function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <h1 className={`${merriweather.className} ${styles.header_title}`}>
          <Link href='/'>
            <span>Voices</span>
            <span>from</span>
            <span>Venezuela</span>
          </Link>
        </h1>
        <LanguageSelect />
      </div>
    </header>
  );
}
