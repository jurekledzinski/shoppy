import Link from 'next/link';
import styles from './Header.module.css';
import { HeaderProps } from './types';

const Header = ({ children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h2 className={styles.logo}>
          <Link href="/">Shoppy</Link>
        </h2>
        <div>{children}</div>
      </nav>
    </header>
  );
};

export default Header;
