'use client';
import styles from './Breadcrumbs.module.css';
import { BreadcrumbsProps } from './types';

export const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  return <div className={styles.breadcrumbs}>{children}</div>;
};
