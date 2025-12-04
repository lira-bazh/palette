import { type FC } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/dist/css/rcp.css';
import styles from './ColorSelector.module.scss';

interface IColorSelectorProps {
  id: string;
  anchor?: string;
  value: string;
  onChange: (color: string) => void;
}

export const ColorSelector: FC<IColorSelectorProps> = ({ value, id, anchor, onChange }) => {
  const [color, setColor] = useColor(value);



  return (
    // @ts-ignore
    <div className={styles['color-selector']} id={id} popover="auto" anchor={anchor}>
      <ColorPicker color={color} onChange={val => {
        setColor(val);
        onChange(val.hex);
      }} />
    </div>
  );
};
