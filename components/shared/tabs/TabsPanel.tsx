import styles from './Tabs.module.css';

import { TabsPanelProps } from './types';

export const TabsPanel = ({ children }: TabsPanelProps) => {
  return (
    <div className={styles.tabsPanel} role="tabpanel">
      {children}
    </div>
  );
};
