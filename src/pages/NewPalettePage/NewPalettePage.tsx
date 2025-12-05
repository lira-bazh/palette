import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PaletteName, PaletteViewer } from '@/components';
import { Button, ColorSelector, Tooltip } from '@/ui';
import { PalettesServices } from '@/services/palettes';
import { useAppDispatch } from '@/store';
import { addPalette } from '@/store/palettes';
import { ROUTES } from '@/constants';
import type { IColor } from '@/types';
import styles from './NewPalettePage.module.scss';

export const NewPalettePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [paletteName, setPaletteName] = useState('Новая палитра');
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
      <div className={styles['new-palette-page__controls']}>
        <ColorSelector
          id="add-color"
          buttonText="Добавить цвет"
          onChange={color =>
            setPaletteColors([...paletteColors, { hex: color, uuid: crypto.randomUUID() }])
          }
          value=""
        />
        <Tooltip id="save-arror" text={!paletteName ? 'Введите название палитры' : 'Сохранить палитру'} disabled={!!paletteName}>
        <Button
          text="Сохранить палитру"
          disabled={!paletteName}
          onClick={() => {
            dispatch(addPalette({ name: paletteName, colors: paletteColors }));
            navigate(ROUTES.main());
          }}
        />
        </Tooltip>
      </div>
    </div>
  );
};
