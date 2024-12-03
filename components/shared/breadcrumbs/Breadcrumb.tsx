import Link from 'next/link';
import styles from './Breadcrumbs.module.css';
import { BreadcrumbProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BreadcrumbText } from './BreadcrumbText';

export const Breadcrumb = ({ icon, text, path, query }: BreadcrumbProps) => {
  return (
    <Link className={styles.breadcrumb} href={query ? `${path}${query}` : path}>
      <BreadcrumbText path={path} text={text ?? ''} />
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
