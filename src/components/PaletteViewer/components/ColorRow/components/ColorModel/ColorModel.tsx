import type { FC } from 'react';
import { type ColorInstance } from 'color';
import { EColorModel } from '@/types';
import styles from './ColorModel.module.scss';

interface IColorModelProps {
  model: EColorModel;
  color: ColorInstance;
}

const REGEXP_BRACKETS = /\(.*\)$/;

export const ColorModel: FC<IColorModelProps> = ({ model, color }) => {
  let colorValue = ''

  switch (model) {
    case EColorModel.HEX:
      colorValue = color.alpha() === 1 ? color.hex() : color.hexa();
      break;
    case EColorModel.RGB:
      colorValue = color.rgb().string(0).match(REGEXP_BRACKETS)?.[0] ?? '';
      break;
    case EColorModel.HSL:
      colorValue = color.hsl().string(0).match(REGEXP_BRACKETS)?.[0] ?? '';
      break;
  }

  return <td className={styles['color-model']}>{colorValue}</td>;
};
