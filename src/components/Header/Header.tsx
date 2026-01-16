import { NavLink } from 'react-router';
import { IconButton, Tooltip } from '@mui/material';
import { GithubIcon } from '@/ui/Icons';
import { ThemeSettings } from './components';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles['header__link']}>
        Главная
      </NavLink>
      <div className={styles['header__right']}>
        <Tooltip title="Перейти на Github">
          <IconButton
            href="https://github.com/lira-bazh/palette"
            target="_blank"
            className={styles['header__github']}>
            <GithubIcon />
          </IconButton>
        </Tooltip>
        <ThemeSettings />
      </div>
    </header>
  );
};
