'use client';
import { useLocale } from 'next-intl';
import styles from '../../styles/language-select.module.css';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
];
export default function LanguageSelect() {
  const locale = useLocale();

  const changeLocale = (v: React.ChangeEvent<HTMLSelectElement>) => {
    const split = window.location.href.split('/');
    const findIndexLocale = split.findIndex((e) => e === 'en' || e === 'es');
    split[findIndexLocale] = v.target.value;

    window.location.href = split.join('/');
  };

  return (
    <select
      className={styles.select}
      name='select_language'
      value={locale}
      onChange={changeLocale}
    >
      {LANGUAGES.map((language) => (
        <option key={language.code} value={language.code}>
          {language.name}
        </option>
      ))}
    </select>
  );
}
