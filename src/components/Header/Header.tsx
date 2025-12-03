import { NavLink } from 'react-router';
import { ThemeSettings } from './components';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles['header__link']}>
        Главная
      </NavLink>
      <ThemeSettings />
    </header>
  );
};
