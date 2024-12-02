import styles from './Tabs.module.css';
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
          ? [styles.tab, styles.active, className].filter(Boolean).join(' ')
          : [styles.tab, className].filter(Boolean).join(' ')
      }
      onClick={() => onClick(id)}
      {...props}
      role="tab"
      title={title}
    >
      {children}
    </button>
  );
};
