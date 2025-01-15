import styles from './Tabs.module.css';
import { classNames } from '@/helpers';

import { TabsPanelProps } from './types';

export const TabsPanel = ({ className, children }: TabsPanelProps) => {
  return (
    <div className={classNames(styles.tabsPanel, className!)} role="tabpanel">
      {children}
    </div>
  );
};
