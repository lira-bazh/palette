import { useState, type FC, type ReactNode } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import { Button } from '@/ui';
import 'react-color-palette/dist/css/rcp.css';
import styles from './ColorSelector.module.scss';

interface IColorSelectorProps {
  id: string;
  value: string;
  onChange: (color: string) => void;
  buttonText?: ReactNode;
}

export const ColorSelector: FC<IColorSelectorProps> = ({ value, id, onChange, buttonText }) => {
  const [color, setColor] = useColor(value);
  const [wasChanges, setWasChanges] = useState(false);
  const editBtnId = `edit-btn-${id}`;

  return (
    <>
      <Button id={editBtnId} popoverTarget={id} text={buttonText} />
      <div
        className={styles['color-selector']}
        id={id}
        popover="auto"
        // @ts-ignore
        anchor={editBtnId}
        onToggle={e => {
          if (e.newState === 'closed') {
            if (wasChanges) {
              onChange(color.hex);
            }
            setWasChanges(false);
          }
        }}>
        <ColorPicker
          color={color}
          onChange={val => {
            setColor(val);
            setWasChanges(true);
          }}
        />
      </div>
    </>
  );
};
