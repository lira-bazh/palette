import { type FC, useRef } from "react";
import { ColorSelector, Input } from '@/ui';
import { PaletteIcon, PenIcon, TrashIcon, ArrowUpDownIcon } from '@/ui/Icons';
import { useEditText } from '@/hooks/useEditText';
import { PalettesServices } from '@/services/palettes';
import type { IColor } from "@/types";
import styles from "./ColorItem.module.scss";

interface IColorItemProps {
  color: IColor;
  showRemoveButton: boolean;
  changeColor: (uuid: string, newColor: string) => void;
  removeColor: (uuid: string) => void;
  changeComment: (uuid: string, comment: string) => void;
  moveColor: (upperUuid: string, movedUuid: string) => void;
}

const findParentTrTag = (node: HTMLElement | null): HTMLElement | null => {
  if (!node) return null;
  if (node.tagName.toLocaleLowerCase() === 'tr') return node;
  return findParentTrTag(node.parentElement);
};

export const ColorItem: FC<IColorItemProps> = ({
  color,
  showRemoveButton,
  changeColor,
  removeColor,
  changeComment,
  moveColor,
}) => {
  const [editCommentMode, setEditCommentMode, refCommentInput] = useEditText();
  const refRow = useRef<HTMLTableRowElement>(null);

  return (
    <tr
      ref={refRow}
      className={styles['color-item']}
      onDragStart={e => {
        e.dataTransfer?.setData('text', color.uuid);
      }}
      onDragOver={e => {
        e.preventDefault();
        const row = findParentTrTag(e.target as HTMLElement);

        if (row) {
          row.classList.add('drag-over');
        }
      }}
      onDragLeave={e => {
        const row = findParentTrTag(e.target as HTMLElement);

        if (row) {
          row.classList.remove('drag-over');
        }
      }}
      onDrop={e => {
        moveColor(color.uuid, e.dataTransfer.getData('text'));
        refRow.current?.classList.remove('drag-over');
      }}>
      <td className={styles['color-item__color']} style={{ backgroundColor: color.hex }}></td>
      <td className={styles['color-item__hex']}>{color.hex}</td>
      <td className={styles['color-item__rgb']}>{PalettesServices.hexToRgb(color.hex)}</td>
      <td className={styles['color-item__hsl']}>{PalettesServices.hexToHsl(color.hex)}</td>
      <td className={styles['color-item__comment']}>
        {editCommentMode ? (
          <Input
            ref={refCommentInput}
            name={`comment-${color.uuid}`}
            onChange={value => changeComment(color.uuid, value)}
            onBlur={() => {
              setEditCommentMode(false);
            }}
            value={color.comment ?? ''}
          />
        ) : (
          color.comment
        )}
      </td>
      <td className={styles['color-item__actions-wrapper']}>
        <div className={styles['color-item__actions']}>
          <ColorSelector
            id={`color-picker-${color.uuid}`}
            value={color.hex}
            onChange={newColor => changeColor(color.uuid, newColor)}
            buttonText={<PaletteIcon />}
          />
          <PenIcon onClick={() => setEditCommentMode(true)} />
          <ArrowUpDownIcon
            className={styles['color-item__arrow']}
            onMouseDown={() => {
              refRow.current?.setAttribute('draggable', 'true');
            }}
          />
          {showRemoveButton && <TrashIcon onClick={() => removeColor(color.uuid)} />}
        </div>
      </td>
    </tr>
  );
};