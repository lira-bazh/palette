import { type FC } from "react";
import { ColorSelector } from '@/ui';
import { PenIcon, TrashIcon } from '@/ui/Icons';
import { PalettesServices } from '@/services/palettes';
import type { IColor } from "@/types";
import styles from "./ColorItem.module.scss";


interface IColorItemProps {
  color: IColor;
  onChange: (uuid: string, newColor: string) => void;
}

export const ColorItem: FC<IColorItemProps> = ({ color, onChange }) => {
  const popoverId = `color-picker-${color.uuid}`;
  const editBtnId = `edit-btn-${color.uuid}`;

  return (
    <tr className={styles['color-item']}>
      <td className={styles['color-item__color']} style={{ backgroundColor: color.hex }}></td>
      <td className={styles['color-item__hex']}>{color.hex}</td>
      <td className={styles['color-item__rgb']}>{PalettesServices.hexToRgb(color.hex)}</td>
      <td className={styles['color-item__comment']}>{color.comment}</td>
      <td className={styles['color-item__actions']}>
        <button id={editBtnId} popoverTarget={popoverId}>
          <PenIcon />
        </button>
        <TrashIcon />
        <ColorSelector
          id={popoverId}
          anchor={editBtnId}
          value={color.hex}
          onChange={newColor =>
            onChange(color.uuid, newColor)
          }
        />
      </td>
    </tr>
  );
};