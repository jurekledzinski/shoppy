import styles from './Header.module.css';
import { HeaderProps } from './types';

const Header = ({ children }: HeaderProps) => {
  return <nav className={styles.nav}>{children}</nav>;
};

export default Header;
