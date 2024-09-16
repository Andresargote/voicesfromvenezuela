'use client';
import { useLocale } from 'next-intl';
import styles from '../../styles/language-select.module.css';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'fr', name: 'Français' },
];
export default function LanguageSelect() {
  const locale = useLocale();

  const existLanguage = (e: string) => LANGUAGES.some((l) => l.code === e);

  const changeLocale = (v: React.ChangeEvent<HTMLSelectElement>) => {
    const split = window.location.href.split('/');
    const findIndexLocale = split.findIndex((e) => existLanguage(e));
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
