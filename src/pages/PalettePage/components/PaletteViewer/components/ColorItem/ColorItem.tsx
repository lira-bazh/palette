import type { FC } from "react";
import { PalettesServices } from '@/services/palettes';
import type { IColor } from "@/types";
import styles from "./ColorItem.module.scss";

interface IColorItemProps {
  color: IColor;
}

export const ColorItem: FC<IColorItemProps> = ({ color }) => {
  return (
    <tr className={styles['color-item']}>
      <td className={styles['color-item__color']} style={{ backgroundColor: color.hex }}></td>
      <td className={styles['color-item__hex']}>{color.hex}</td>
      <td className={styles['color-item__rgb']}>{PalettesServices.hexToRgb(color.hex)}</td>
    </tr>
  );
};