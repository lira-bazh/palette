import type { FC } from "react";
import { ColorRow } from './components';
import { EColorModel, type IColor } from '@/types';
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
            {Object.values(EColorModel).map(model => (
              <th key={model}>{model.toLocaleUpperCase()}</th>
            ))}
            <th>Комментарий</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, index) => (
            <ColorRow {...props} key={color.uuid} showRemoveButton={!!index} color={color} />
          ))}
        </tbody>
      </table>
    </div>
  );
};