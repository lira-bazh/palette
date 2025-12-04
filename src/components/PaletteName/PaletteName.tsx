import { type FC, useState, useRef, useEffect } from 'react';
import { Input } from '@/ui';
import { PenIcon } from '@/ui/Icons';
import styles from './PaletteName.module.scss'

interface IPaletteNameProps {
  name: string;
  onChange: (name: string) => void;
}

export const PaletteName: FC<IPaletteNameProps> = ({ name, onChange}) => {
  const [editMode, setEditMode] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && refInput.current) {
      refInput.current.focus();
    }
  }, [editMode]);

  return (
    <div className={styles['palette-name']}>
      {editMode ? (
        <Input
          ref={refInput}
          name="palette_name"
          value={name}
          onChange={value => onChange(value)}
          onBlur={() => setEditMode(false)}
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