import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Tooltip } from '@mui/material';
import { PaletteName, PaletteViewer, PaletteModelsSelector } from '@/components';
import { ColorSelector } from '@/ui';
import { PalettesServices } from '@/services/palettes';
import { useAppDispatch } from '@/store';
import { addPalette } from '@/store/palettes';
import { ROUTES } from '@/constants';
import { type IColor, EColorModel } from '@/types';
import styles from './NewPalettePage.module.scss';

export const NewPalettePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [paletteName, setPaletteName] = useState('Новая палитра');
  const [paletteColors, setPaletteColors] = useState<IColor[]>(PalettesServices.getDefaultColors());
  const [paletteModels, setpaletteModels] = useState<EColorModel[] | undefined>();

  return (
    <div className={styles['new-palette-page']}>
      <PaletteName name={paletteName} onChange={name => setPaletteName(name)} />
      <PaletteModelsSelector models={paletteModels} onChange={models => setpaletteModels(models)} />
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
      <div className={styles['new-palette-page__controls']}>
        <ColorSelector
          id="add-color"
          target="Добавить цвет"
          onChange={color =>
            setPaletteColors([...paletteColors, { value: color, uuid: crypto.randomUUID() }])
          }
        />
        <Tooltip title={!paletteName ? 'Введите название палитры' : 'Сохранить палитру'}>
          <span>
            <Button
              variant="contained"
              disabled={!paletteName}
              onClick={() => {
                dispatch(addPalette({ name: paletteName, colors: paletteColors }));
                navigate(ROUTES.main());
              }}>
              Сохранить палитру
            </Button>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};
