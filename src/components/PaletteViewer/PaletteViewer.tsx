import type { FC } from "react";
import { ColorItem } from './components';
import type { IColor } from '@/types';
import styles from "./PaletteViewer.module.scss";

interface IPaletteViewerProps {
  colors: IColor[];
  onChange: (uuid: string, newColor: string) => void
}

export const PaletteViewer: FC<IPaletteViewerProps> = ({ colors, onChange }) => {
  return (
    <table className={styles['palette-viewer']}>
      <thead className={styles['palette-viewer__header']}>
        <tr>
          <th>Цвет</th>
          <th>HEX</th>
          <th>RGB</th>
          <th>Комментарий</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {colors.map(color => (
          <ColorItem key={color.uuid} color={color} onChange={onChange} />
        ))}
      </tbody>
    </table>
  );
};