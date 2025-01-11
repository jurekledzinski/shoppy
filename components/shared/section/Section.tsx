import styles from './Section.module.css';
import { classNames } from '@/helpers';
import { SectionProps } from './types';

export const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={classNames(styles.section, className!)}>
      {children}
    </section>
  );
};
