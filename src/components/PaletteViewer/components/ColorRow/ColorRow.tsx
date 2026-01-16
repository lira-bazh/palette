import { type FC, useMemo, useRef } from "react";
import Color from 'color';
import { ColorSelector, IconButtonWithTooltip } from '@/ui';
import { TrashIcon, ArrowUpDownIcon, PaletteIcon } from '@/ui/Icons';
import { ColorModel } from './components';
import { TextField } from "@mui/material";
import { useTextColor } from "@/hooks/useTextColor";
import { EColorModel, type IColor } from '@/types';
import styles from './ColorRow.module.scss';

interface IColorRowProps {
  color: IColor;
  showRemoveButton: boolean;
  changeColor: (uuid: string, newColor: string) => void;
  removeColor: (uuid: string) => void;
  changeComment: (uuid: string, comment: string) => void;
  moveColor: (upperUuid: string, movedUuid: string) => void;
}

export const ColorRow: FC<IColorRowProps> = ({
  color,
  showRemoveButton,
  changeColor,
  removeColor,
  moveColor,
  changeComment,
}) => {
  const refRow = useRef<HTMLTableRowElement>(null);

  const colorObj = useMemo(() => Color(color.value), [color.value]);
  const iconColor = useTextColor(colorObj);

  return (
    <>
      {colorObj && (
        <tr
          ref={refRow}
          className={styles['color-row']}
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
          <td className={styles['color-row__color']} style={{ backgroundColor: color.value }}>
            <ColorSelector
              id={`color-selector-${color.uuid}`}
              className={styles['color-row__color-selector']}
              target={<PaletteIcon style={{ color: iconColor }} />}
              defaultValue={color.value}
              onChange={value => {
                changeColor(color.uuid, value);
              }}
            />
          </td>
          <ColorModel model={EColorModel.HEX} color={colorObj} />
          <ColorModel model={EColorModel.RGB} color={colorObj} />
          <ColorModel model={EColorModel.HSL} color={colorObj} />
          <td className={styles['color-row__comment']}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              variant="standard"
              value={color.comment}
              onChange={e => changeComment(color.uuid, e.target.value)}
            />
          </td>
          <td className={styles['color-row__actions-wrapper']}>
            <div className={styles['color-row__actions']}>
              <IconButtonWithTooltip
                tooltip="Переместить"
                icon={
                  <ArrowUpDownIcon
                    className={styles['drag-n-drop-icon']}
                    onMouseDown={() => {
                      refRow.current?.setAttribute('draggable', 'true');
                    }}
                  />
                }
              />
              {showRemoveButton && (
                <IconButtonWithTooltip
                  tooltip="Удалить цвет"
                  icon={<TrashIcon onClick={() => removeColor(color.uuid)} />}
                />
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};