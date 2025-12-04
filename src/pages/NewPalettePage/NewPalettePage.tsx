import { useState } from 'react';
import { PaletteName, PaletteViewer } from '@/components';
import { Button } from '@/ui';
import { PalettesServices } from '@/services/palettes';
import { useAppDispatch } from '@/store';
import { addPalette } from '@/store/palettes';
import type { IColor } from '@/types';
import styles from './NewPalettePage.module.scss';



export const NewPalettePage = () => {
  const dispatch = useAppDispatch();
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
          onChange={(uuid, newColor) =>
            setPaletteColors(
              paletteColors.map(item => (item.uuid === uuid ? { ...item, hex: newColor } : item)),
            )
          }
        />
      </div>
      <div>
        <Button
          text="Сохранить палитру"
          onClick={() => dispatch(addPalette({ name: paletteName, colors: paletteColors }))}
        />
      </div>
    </div>
  );
};
