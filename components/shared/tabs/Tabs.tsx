import styles from './Tabs.module.css';
import { TabsProps } from './types';

export const Tabs = ({ children }: TabsProps) => {
  return <div className={styles.tabs}>{children}</div>;
};
