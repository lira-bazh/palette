import { useMemo, useState, type FC, type ReactNode } from 'react';
import { Button, TextField } from '@mui/material';
import Color, { type ColorInstance } from 'color';
import styles from './ColorSelector.module.scss';
import { useTextColor } from '@/hooks/useTextColor';

interface IColorSelectorProps {
  id: string;
  defaultValue?: string;
  onChange: (color: string) => void;
  target?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const getColorObj = (color: string): undefined | ColorInstance => {
  if (color === '') return undefined;

  try {
    const colorObj = Color(color);
    return colorObj;
  } catch (error) {
    return undefined;
  }
};

export const ColorSelector: FC<IColorSelectorProps> = ({
  id,
  target,
  className,
  defaultValue,
  onChange,
  style,
}) => {
  const [color, setColor] = useState(defaultValue ?? '');

  const colorObj = useMemo(() => getColorObj(color), [color]);
  const isError = colorObj === undefined && color !== '';
  const buttonColorText = useTextColor(colorObj);

  return (
    <>
      <Button variant="contained" popoverTarget={id} className={className} style={style}>
        {target}
      </Button>
      <div
        className={styles['color-selector']}
        id={id}
        popover="auto"
        onToggle={e => {
          if (e.newState === 'closed') {
            setColor(defaultValue ?? '');
          }
        }}
        >
        <div className={styles['color-selector__conteiner']}>
          <TextField
            fullWidth
            label="Введите цвет"
            variant="outlined"
            value={color}
            onChange={e => {
              setColor(e.target.value);
            }}
            error={isError}
            helperText={isError ? 'Неверный формат цвета' : ''}
          />
          <Button
            variant={color === '' || isError ? 'outlined' : 'contained'}
            style={{ backgroundColor: color || 'transparent', color: buttonColorText }}
            onClick={() => {
              const colorFormat = Color(color).string();
              onChange(colorFormat)
            }}
            disabled={isError}
            popoverTarget={id}
            popoverTargetAction="hide">
            {defaultValue ? 'Изменить' : 'Добавить'}
          </Button>
        </div>
      </div>
    </>
  );
};
