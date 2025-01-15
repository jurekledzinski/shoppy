'use client';
import styles from './Breadcrumbs.module.css';
import { BreadcrumbTextProps } from './types';
import { usePathname } from 'next/navigation';

export const BreadcrumbText = ({ path, text }: BreadcrumbTextProps) => {
  const pathname = usePathname();

  return (
    <span className={path === pathname ? styles.active : styles.text}>
      {text}
    </span>
  );
};
