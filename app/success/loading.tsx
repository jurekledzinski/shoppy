import styles from '@/components/shared/section/Section.module.css';
import { Loader, Section } from '@/components/shared';

const Loading = () => {
  return (
    <Section className={styles.sectionCentered}>
      <Loader position="center" size={30} />
    </Section>
  );
};

export default Loading;
