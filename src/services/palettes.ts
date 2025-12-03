import type { IColor, IPalette } from "@/types";

const DEFAULT_COLORS: IColor[] = ['#eeeeee', '#dddddd', '#cccccc', '#bbbbbb', '#aaaaaa'].map(
  item => ({ hex: item }),
);

export const PalettesServices = {
  DEFAULT_COLORS,

  hexToRgb(hex: string): string {
    const regHex = new RegExp(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    const result = regHex.exec(hex);

    return result
      ? `(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : '';
  },

  savePalettes(paletes: IPalette[]) {
    localStorage.setItem('palettes', JSON.stringify(paletes));
  },

  getPalettes(): IPalette[] {
    return JSON.parse(localStorage.getItem('palettes') || '[]');
  },
};
