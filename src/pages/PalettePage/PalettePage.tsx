import { useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '@/ui';
import { PaletteName, PaletteViewer } from './components';
import { useAppDispatch, useAppSelector } from '@/store';
import { addPalette } from '@/store/palettes';
import { PalettesServices } from '@/services/palettes';
import type { IColor } from '@/types';
import styles from './PalettePage.module.scss';


export const PalettePage = () => {
  let params = useParams();
  const dispatch = useAppDispatch();
  const palette = useAppSelector(state => state.palettes.data.find(item => item.uuid === params.uuid));
  const [paletteName, setPaletteName] = useState(palette?.name || '');
  const [paletteColor] = useState<IColor[]>(palette?.colors || PalettesServices.DEFAULT_COLORS);

  return (
    <div className={styles['palette-page']}>
      <div>
        <PaletteName name={paletteName} onChange={name => setPaletteName(name)} />
      </div>
      <div>
        <PaletteViewer colors={paletteColor} />
      </div>
      {!palette && (
        <div>
          <Button
            text="Сохранить палитру"
            onClick={() => dispatch(addPalette({ name: paletteName, colors: paletteColor }))}
          />
        </div>
      )}
    </div>
  );
};
