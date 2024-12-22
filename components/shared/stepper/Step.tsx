import Link from 'next/link';
import { StepperIcon } from './StepperIcon';
import { StepperLabel } from './StepperLabel';
import { StepProps } from './types';
import styles from './Stepper.module.css';

export const Step = ({ completed, icon, label, path }: StepProps) => {
  return (
    <Link
      href={`${path}`}
      className={`${styles.step} ${completed ? styles.completed : styles.step}`}
    >
      <StepperIcon icon={icon} />
      <StepperLabel label={label} />
    </Link>
  );
};
