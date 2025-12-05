import type { FC } from "react";
import { ColorItem } from './components';
import type { IColor } from '@/types';
import styles from "./PaletteViewer.module.scss";

interface IPaletteViewerProps {
  colors: IColor[];
  changeColor: (uuid: string, newColor: string) => void;
  removeColor: (uuid: string) => void;
  changeComment: (uuid: string, comment: string) => void;
  moveColor: (upperUuid: string, movedUuid: string) => void;
}

export const PaletteViewer: FC<IPaletteViewerProps> = ({
  colors,
  ...props
}) => {
  return (
    <div className={styles['palette-viewer']} onDragOver={e => e.stopPropagation()}>
      <table className={styles['palette-viewer__table']}>
        <thead className={styles['palette-viewer__header']}>
          <tr>
            <th>Цвет</th>
            <th>HEX</th>
            <th>RGB</th>
            <th>HSL</th>
            <th>Комментарий</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, index) => (
            <ColorItem
              {...props}
              key={color.uuid}
              showRemoveButton={!!index}
              color={color}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};