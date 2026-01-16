import { Tooltip, IconButton, useColorScheme } from '@mui/material';
import { MoonIcon, SunIcon } from '@/ui/Icons';
import styles from './ThemeSettings.module.scss';

export const ThemeSettings = () => {
  const { mode, setMode } = useColorScheme();

  const themeProps = {
    className: styles.themeBtn,
    onClick: () => setMode(mode === 'dark' ? 'light' : 'dark'),
    title: 'Сменить цветоую тему',
  };

  return (
    <Tooltip title={mode === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}>
      <IconButton>
        {mode === 'dark' ? <SunIcon {...themeProps} /> : <MoonIcon {...themeProps} />}
      </IconButton>
    </Tooltip>
  );
}
