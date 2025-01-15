'use client';
import { Button } from '../button';
import styles from './NotFound.module.css';
import stylesButton from '@styles/buttons.module.css';
import stylesSection from '@/components/shared/section/Section.module.css';
import { useRouter } from 'next/navigation';
import { Section } from '../section';

export const SectionNotFound = () => {
  const router = useRouter();

  return (
    <Section className={stylesSection.sectionCentered}>
      <h3 className={styles.title}>Page not found!</h3>
      <Button
        className={stylesButton.buttonConfirm}
        text="Go to home page"
        onClick={() => router.replace('/')}
      />
    </Section>
  );
};
