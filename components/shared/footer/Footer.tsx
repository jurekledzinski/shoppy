import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      All rights reserved © {new Date().getFullYear()}
    </footer>
  );
};
