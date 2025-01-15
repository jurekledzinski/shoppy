import styles from '@/components/shared/section/Section.module.css';
import stylesLoader from '@/components/shared/loader/Loader.module.css';
import { Loader, Section } from '@/components/shared';

const Loading = () => {
  return (
    <Section className={styles.sectionCentered}>
      <Loader className={stylesLoader.loaderBigger} />
    </Section>
  );
};

export default Loading;
