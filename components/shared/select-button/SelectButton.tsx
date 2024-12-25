import styles from './SelectButton.module.css';
import { SelectButtonProps } from './types';

export const SelectButton = ({
  selected,
  onClick,
  text,
  ...props
}: SelectButtonProps) => {
  return (
    <button
      {...props}
      className={selected ? styles.selected : styles.button}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
