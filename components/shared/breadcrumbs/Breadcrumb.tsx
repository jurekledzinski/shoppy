import Link from 'next/link';
import styles from './Breadcrumbs.module.css';
import { BreadcrumbProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Breadcrumb = ({ icon, text, path }: BreadcrumbProps) => {
  return (
    <Link className={styles.breadcrumb} href={path}>
      <span>{text}</span>
      {icon ? (
        <span className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </span>
      ) : (
        <span className={styles.icon}></span>
      )}
    </Link>
  );
};
