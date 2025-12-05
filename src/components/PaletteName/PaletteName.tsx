import { type FC } from 'react';
import { Input } from '@/ui';
import { PenIcon } from '@/ui/Icons';
import { useEditText } from '@/hooks/useEditText';
import styles from './PaletteName.module.scss'

interface IPaletteNameProps {
  name: string;
  onChange: (name: string) => void;
}

export const PaletteName: FC<IPaletteNameProps> = ({ name, onChange}) => {
  const [editMode, setEditMode, refInput] = useEditText();

  return (
    <div className={styles['palette-name']}>
      {editMode ? (
        <Input
          ref={refInput}
          name="palette_name"
          value={name}
          onChange={value => onChange(value)}
          onBlur={() => setEditMode(false)}
          placeholder="Введите название палитры"
        />
      ) : (
        <div className={styles['palette-name__show-name']}>
          {name}
          <PenIcon onClick={() => setEditMode(true)} />
        </div>
      )}
    </div>
  );
};