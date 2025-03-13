import styles from './Tabs.module.css';
import { classNames } from '@/helpers';
import { TabProps } from './types';

export const Tab = ({
  activeTab,
  className,
  children,
  id,
  onClick,
  title,
  ...props
}: TabProps) => {
  return (
    <button
      className={
        id === activeTab
          ? classNames(styles.tab, styles.active, className!)
          : classNames(styles.tab, className!)
      }
      onClick={() => onClick(id.toLowerCase())}
      {...props}
      role="tab"
      title={title}
    >
      {children}
    </button>
  );
};
