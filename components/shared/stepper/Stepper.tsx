import { StepperProps } from './types';
import styles from './Stepper.module.css';

export const Stepper = ({ children }: StepperProps) => {
  return <div className={styles.stepper}>{children}</div>;
};
