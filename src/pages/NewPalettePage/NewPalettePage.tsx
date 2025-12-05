import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PaletteName, PaletteViewer } from '@/components';
import { Button } from '@/ui';
import { PalettesServices } from '@/services/palettes';
import { useAppDispatch } from '@/store';
import { addPalette } from '@/store/palettes';
import { ROUTES } from '@/constants';
import type { IColor } from '@/types';
import styles from './NewPalettePage.module.scss';

export const NewPalettePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [paletteName, setPaletteName] = useState('');
  const [paletteColors, setPaletteColors] = useState<IColor[]>(PalettesServices.getDefaultColors());

  return (
    <div className={styles['new-palette-page']}>
      <div>
        <PaletteName name={paletteName} onChange={name => setPaletteName(name)} />
      </div>
      <div>
        <PaletteViewer
          colors={paletteColors}
          changeColor={(uuid, newColor) =>
            setPaletteColors(
              paletteColors.map(item => (item.uuid === uuid ? { ...item, hex: newColor } : item)),
            )
          }
          addColor={color =>
            setPaletteColors([...paletteColors, { hex: color, uuid: crypto.randomUUID() }])
          }
          removeColor={uuid => setPaletteColors(paletteColors.filter(item => item.uuid !== uuid))}
          changeComment={(uuid, comment) =>
            setPaletteColors(
              paletteColors.map(item => (item.uuid === uuid ? { ...item, comment } : item)),
            )
          }
          moveColor={(upperUuid, movedUuid) => {
            PalettesServices.moveColors(paletteColors, upperUuid, movedUuid);
            setPaletteColors([...paletteColors]);
          }}
        />
      </div>
      <div>
        <Button
          text="Сохранить палитру"
          disabled={!paletteName}
          onClick={() => {
            dispatch(addPalette({ name: paletteName, colors: paletteColors }));
            navigate(ROUTES.main());
          }}
          title={!paletteName ? 'Введите название палитры' : 'Сохранить палитру'}
        />
      </div>
    </div>
  );
};
