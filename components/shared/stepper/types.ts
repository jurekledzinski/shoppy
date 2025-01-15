import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type StepperProps = {
  children: React.ReactNode;
};

export type StepProps = {
  completed: boolean;
  icon: IconDefinition;
  label: string;
  path: string;
};

export type StepperIconProps = {
  icon: IconDefinition;
};

export type StepperLabelProps = {
  label: React.ReactNode;
};
