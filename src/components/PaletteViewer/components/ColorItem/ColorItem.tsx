import { type FC, useRef } from "react";
import { ColorSelector, Input, Tooltip } from '@/ui';
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
        const colorCell = refRow.current?.childNodes[0] as HTMLElement;
        e.dataTransfer?.setDragImage(colorCell, 100, 10);
        e.dataTransfer.dropEffect = 'move';
      }}
      onDragOver={e => {
        e.preventDefault();
        refRow.current?.classList.add('drag-over');
      }}
      onDragLeave={() => {
        refRow.current?.classList.remove('drag-over');
      }}
      onDrop={e => {
        e.preventDefault();
        moveColor(color.uuid, e.dataTransfer.getData('text'));
        refRow.current?.classList.remove('drag-over');
      }}
      onDragEnd={() => {
        refRow.current?.removeAttribute('draggable');
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
          <Tooltip id={`color-picker-tooltip-${color.uuid}`} text="Изменить цвет">
            <ColorSelector
              id={`color-picker-${color.uuid}`}
              value={color.hex}
              onChange={newColor => changeColor(color.uuid, newColor)}
              buttonText={<PaletteIcon />}
            />
          </Tooltip>
          <Tooltip id={`edit-comment-tooltip-${color.uuid}`} text="Изменить комментарий">
            <PenIcon onClick={() => setEditCommentMode(true)} />
          </Tooltip>
          <Tooltip id={`edit-location-tooltip-${color.uuid}`} text="Переместить">
            <ArrowUpDownIcon
              className={styles['color-item__arrow']}
              onMouseDown={() => {
                refRow.current?.setAttribute('draggable', 'true');
              }}
            />
          </Tooltip>

          {showRemoveButton && (
            <Tooltip id={`remove-color-tooltip-${color.uuid}`} text="Удалить цвет">
              <TrashIcon onClick={() => removeColor(color.uuid)} />
            </Tooltip>
          )}
        </div>
      </td>
    </tr>
  );
};