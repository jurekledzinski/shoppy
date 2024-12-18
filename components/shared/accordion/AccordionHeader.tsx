import styles from './Accordion.module.css';
import { AccordionHeaderProps } from './types';

export const AccordionHeader = ({
  name,
  onChange,
  title,
}: AccordionHeaderProps) => {
  return (
    <header className={styles.header}>
      <input
        className={styles.radioButton}
        id={name}
        name="option"
        type="radio"
        value={name}
        onChange={onChange}
        defaultChecked={name === 'login'}
      />
      <label className={styles.label} htmlFor={name}>
        {title}
      </label>
    </header>
  );
};
