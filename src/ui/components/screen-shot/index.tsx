'use client';
import html2canvas from 'html2canvas';
import styles from '../../styles/screen-shot-button.module.css';
import { merriweather } from '@/src/fonts';
import { useTranslations } from 'next-intl';

export default function ScreenShot({ elementId }: { elementId: string }) {
  const t = useTranslations('screenShot');
  const doScreenShot = () => {
    const element = document.getElementById(elementId);

    if (!element) {
      return;
    }

    html2canvas(element, {
      scale: 2,
    }).then((canvas) => {
      const link = document.createElement('a');
      const generateTime = new Date().toISOString();
      link.download = `screenshot-${generateTime}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };
  return (
    <button
      onClick={doScreenShot}
      className={`${styles.screen_shot_btn} ${merriweather.className}`}
    >
      {t('title')}
    </button>
  );
}
