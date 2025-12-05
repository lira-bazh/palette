import { PaletteItem, AddPalette } from './components';
import { useAppSelector } from '@/store';
import styles from './MainPage.module.scss'


export const MainPage = () => {
  const palettes = useAppSelector(state => state.palettes.data);

  return (
    <div className={styles['main-page']}>
      <h1>Выберите палитру</h1>
      <div className={styles['palettes-list']}>
        {Object.values(palettes).map(item => (
          <PaletteItem key={item.uuid} palette={item} />
        ))}
        <AddPalette />
      </div>
    </div>
  );
}
