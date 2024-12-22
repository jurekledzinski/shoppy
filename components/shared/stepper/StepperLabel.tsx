import { StepperLabelProps } from './types';
import styles from './Stepper.module.css';

export const StepperLabel = ({ label }: StepperLabelProps) => {
  return <span className={styles.label}>{label}</span>;
};
