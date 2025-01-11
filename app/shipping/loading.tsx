import styles from '@/components/shared/section/Section.module.css';
import { Loader, Section } from '@/components/shared';

const Loading = () => {
  return (
    <Section className={styles.sectionCentered}>
      <Loader />
    </Section>
  );
};

export default Loading;
