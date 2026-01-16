import type { FC } from "react";
import { Link } from 'react-router';
import { Card, CardActionArea } from '@mui/material';
import { ROUTES } from "@/constants";
import type { IPalette } from "@/types";
import styles from './PaletteItem.module.scss'

interface IPaletteItemProps {
  palette: IPalette;
}

export const PaletteItem: FC<IPaletteItemProps> = ({ palette }) => {
  return (
    <Card className={styles['palette-item']}>
      <CardActionArea>
        <Link to={ROUTES.palette(palette.uuid)} className={styles['palette-item__link']}>
          <div
            className={styles['palette-item__colors']}
            style={{ gridTemplateColumns: `repeat(${palette.colors.length}, 1fr)` }}>
            {palette.colors.map(color => (
              <div key={color.value} style={{ backgroundColor: color.value }}></div>
            ))}
          </div>
          <div className={styles['palette-item__name']}>{palette.name}</div>
        </Link>
      </CardActionArea>
    </Card>
  );
};