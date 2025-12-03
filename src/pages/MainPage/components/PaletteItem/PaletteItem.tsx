import type { FC } from "react";
import { Link } from 'react-router';
import type { IPalette } from "@/types";
import styles from './PaletteItem.module.scss'

interface IPaletteItemProps {
  palette: IPalette;
}

export const PaletteItem: FC<IPaletteItemProps> = ({ palette }) => {
  return (
    <Link to={`/palette/${palette.uuid}`} className={styles['palette-item']}>
      <div
        className={styles['palette-item__colors']}
        style={{ gridTemplateColumns: `repeat(${palette.colors.length}, 1fr)` }}>
        {palette.colors.map(color => (
          <div key={color.hex} style={{ backgroundColor: color.hex }}></div>
        ))}
      </div>
      <div className={styles['palette-item__name']}>{palette.name}</div>
    </Link>
  );
};