import { MoonIcon, SunIcon } from '@/ui/Icons';
import { useAppSelector, useAppDispatch } from '@/store';
import { changeTheme } from '@/store/theme';
import styles from './ThemeSettings.module.scss';
import { Tooltip } from '@/ui';

export const ThemeSettings = () => {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);

  const themeProps = {
    className: styles.themeBtn,
    onClick: () => dispatch(changeTheme()),
    title: 'Сменить цветоую тему',
  };

  return (
    <Tooltip id="theme-settings-tooltip" text={isDarkTheme ? "Переключить на светлую тему" : "Переключить на тёмную тему"}>
      {isDarkTheme ? <SunIcon {...themeProps} /> : <MoonIcon {...themeProps} />}
    </Tooltip>
  );
}
