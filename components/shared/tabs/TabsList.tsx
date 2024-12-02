import { TabsListProps } from './types';
import styles from './Tabs.module.css';

export const TabsList = ({ children }: TabsListProps) => {
  return (
    <div className={styles.tabsList} role="tablist">
      {children}
    </div>
  );
};
