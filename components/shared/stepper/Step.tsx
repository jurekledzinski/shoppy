'use client';
import Link from 'next/link';
import styles from './Stepper.module.css';
import { StepperIcon } from './StepperIcon';
import { StepperLabel } from './StepperLabel';
import { StepProps } from './types';
import { usePathname } from 'next/navigation';

export const Step = ({ completed, icon, label, path }: StepProps) => {
  const currentPathname = usePathname();
  
  return (
    <Link
      href={`${path}`}
      className={`${styles.step} ${
        completed ? styles.completed : styles.step
      } ${path === currentPathname ? styles.active : styles.step}`}
    >
      <StepperIcon icon={icon} />
      <StepperLabel label={label} />
    </Link>
  );
};
