import { useNavigate, useParams } from 'react-router';
import { PaletteName, PaletteViewer } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store';
import { Button, ColorSelector } from '@/ui';
import {
  addColor,
  changeColor,
  changeColorComment,
  changePaletteName,
  removeColor,
  moveColor,
  removePalette,
} from '@/store/palettes';
import { ROUTES } from '@/constants';
import styles from './PalettePage.module.scss';

export const PalettePage = () => {
  let params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const palette = useAppSelector(state => params.uuid ? state.palettes.data[params.uuid] : undefined);

  return (
    <div className={styles['palette-page']}>
      {palette && (
        <>
            <PaletteName
              name={palette?.name || ''}
              onChange={name => {
                dispatch(changePaletteName({ uuid: palette.uuid, name }));
              }}
            />
            <PaletteViewer
              colors={palette.colors}
              changeColor={(uuidColor, newColor) => {
                dispatch(changeColor({ uuidPalette: palette.uuid, uuidColor, newColor }));
              }}
              removeColor={uuidColor => {
                dispatch(removeColor({ uuidPalette: palette.uuid, uuidColor }));
              }}
              changeComment={(uuidColor, comment) => {
                dispatch(changeColorComment({ uuidPalette: palette.uuid, uuidColor, comment }));
              }}
              moveColor={(upperUuid, movedUuid) => {
                dispatch(moveColor({ uuidPalette: palette.uuid, upperUuid, movedUuid }));
              }}
            />
          <div className={styles['palette-page__controls']}>
            <ColorSelector
              id="add-color"
              buttonText="Добавить цвет"
              onChange={color => {
                dispatch(addColor({ uuidPalette: palette.uuid, color }));
              }}
              value=""
            />
            <Button
              text="Удалить палитру"
              onClick={() => {
                dispatch(removePalette(palette.uuid));
                navigate(ROUTES.main());
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
