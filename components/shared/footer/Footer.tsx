import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      All rights reserved © {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
