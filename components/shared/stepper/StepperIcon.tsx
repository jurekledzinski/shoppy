import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StepperIconProps } from './types';
import styles from './Stepper.module.css';

export const StepperIcon = ({ icon }: StepperIconProps) => {
  return (
    <span className={styles.icon}>
      <FontAwesomeIcon icon={icon} />
    </span>
  );
};
