import { useParams } from 'react-router';
import { PaletteName, PaletteViewer } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store';
import { changeColor, changePaletteName } from '@/store/palettes';
import styles from './PalettePage.module.scss';


export const PalettePage = () => {
  let params = useParams();
  const dispatch = useAppDispatch();
  const palette = useAppSelector(state => params.uuid ? state.palettes.data[params.uuid] : undefined);

  return (
    <div className={styles['palette-page']}>
      {palette && (
        <>
          <div>
            <PaletteName
              name={palette?.name || ''}
              onChange={name => {
                dispatch(changePaletteName({ uuid: palette.uuid, name }));
              }}
            />
          </div>
          <div>
            <PaletteViewer
              colors={palette.colors}
              onChange={(uuidColor, newColor) => {
                dispatch(changeColor({ uuidPalette: palette.uuid, uuidColor, newColor }));
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
