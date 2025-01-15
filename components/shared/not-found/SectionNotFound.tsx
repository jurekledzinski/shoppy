'use client';
import styles from './SectionNotFound.module.css';
import stylesButton from '@styles/buttons.module.css';
import stylesSection from '@/components/shared/section/Section.module.css';
import { Button } from '../button';
import { Section } from '../section';
import { useRouter } from 'next/navigation';

export const SectionNotFound = () => {
  const router = useRouter();

  return (
    <Section className={stylesSection.sectionCentered}>
      <h3 className={styles.title}>Page not found!</h3>
      <Button
        className={stylesButton.buttonConfirm}
        text="Back to previous page"
        onClick={() => router.back()}
      />
    </Section>
  );
};
