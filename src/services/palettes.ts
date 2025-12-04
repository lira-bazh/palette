import type { IColor, IPalette } from "@/types";

const DEFAULT_COLORS: string[] = ['#eeeeee', '#dddddd', '#cccccc', '#bbbbbb', '#aaaaaa']

export const PalettesServices = {
  getDefaultColors(): IColor[] {
    return DEFAULT_COLORS.map(item => ({ hex: item, uuid: crypto.randomUUID() }));
  },

  hexToRgb(hex: string): string {
    const regHex = new RegExp(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    const result = regHex.exec(hex);

    return result
      ? `(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : '';
  },

  savePalettes(paletes: Record<string, IPalette>) {
    localStorage.setItem('palettes', JSON.stringify(paletes));
  },

  getPalettes(): Record<string, IPalette> {
    return JSON.parse(localStorage.getItem('palettes') || '{}');
  },
};
