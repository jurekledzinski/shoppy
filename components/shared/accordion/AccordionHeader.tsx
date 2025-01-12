import styles from './Accordion.module.css';
import { AccordionHeaderProps } from './types';

export const AccordionHeader = ({
  checked,
  name,
  title,
  onChange,
  onClick,
}: AccordionHeaderProps) => {
  return (
    <header className={styles.header}>
      <input
        checked={checked}
        className={styles.radioButton}
        id={name}
        name={'option'}
        type="radio"
        value={name}
        {...(onChange && { onChange })}
        onClick={() => onClick && onClick(name)}
        readOnly
      />
      <label className={styles.label} htmlFor={name}>
        {title}
      </label>
    </header>
  );
};
