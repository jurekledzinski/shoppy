import styles from './SelectButton.module.css';
import stylesButton from '@/styles/buttons.module.css';
import { classNames } from '@/helpers';
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
      className={
        selected
          ? classNames(stylesButton.buttonConfirm, styles.selected)
          : stylesButton.buttonConfirm
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};
