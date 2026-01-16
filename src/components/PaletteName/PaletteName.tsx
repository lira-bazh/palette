import { type FC } from 'react';
import { TextField } from '@mui/material';
import styles from './PaletteName.module.scss'


interface IPaletteNameProps {
  name: string;
  onChange: (name: string) => void;
}

export const PaletteName: FC<IPaletteNameProps> = ({ name, onChange}) => {

  return (
    <div className={styles['palette-name']}>
      <TextField
        fullWidth
        variant="standard"
        label="Название палитры"
        placeholder="Введите название палитры"
        onChange={e => onChange(e.target.value)}
        value={name}
      />
    </div>
  );
};