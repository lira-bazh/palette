import type { FC } from "react";
import { ColorItem } from './components';
import type { IColor } from '@/types';
import styles from "./PaletteViewer.module.scss";

interface IPaletteViewerProps {
  colors: IColor[];
}

export const PaletteViewer: FC<IPaletteViewerProps> = ({ colors }) => {
  return (
    <table className={styles['palette-viewer']}>
      <thead className={styles['palette-viewer__header']}>
        <tr>
          <th>Цвет</th>
          <th>HEX</th>
          <th>RGB</th>
        </tr>
      </thead>
      <tbody>
        {colors.map(color => (
          <ColorItem key={color.hex} color={color} />
        ))}
      </tbody>
    </table>
  );
};