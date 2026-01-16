import Color from 'color';
import type { IColor, IPalette } from '@/types';

interface IColorRgb {
  r: number;
  g: number;
  b: number;
  a?: number;
}

const DEFAULT_COLORS: string[] = [
  'rgb(50,50,50)',
  'rgb(80,80,80)',
  'rgb(110,110,110)',
  'rgb(150,150,150)',
  'rgb(200,200,200)',
];

export const PalettesServices = {
  getDefaultColors(): IColor[] {
    return DEFAULT_COLORS.map(item => ({ value: item, uuid: crypto.randomUUID() }));
  },

  normalizeRGB(num: number): number {
    return Number((num / 255).toFixed(3));
  },

  getGRBFromHex(hex: string): IColorRgb {
    const regHex = new RegExp(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i);
    const result = regHex.exec(hex);

    return {
      r: parseInt(result?.[1] ?? '0', 16),
      g: parseInt(result?.[2] ?? '0', 16),
      b: parseInt(result?.[3] ?? '0', 16),
      a: this.normalizeRGB(parseInt(result?.[4] ?? '0', 16)),
    };
  },

  hexToRgb(hex: string): string {
    const rgb = this.getGRBFromHex(hex);

    return rgb.a ? `(${rgb.r} ${rgb.g} ${rgb.b} / ${rgb.a})` : `(${rgb.r} ${rgb.g} ${rgb.b})`;
  },

  hexToHsl(hex: string): string {
    const rgb = this.getGRBFromHex(hex);

    const rgbNorm = {
      r: this.normalizeRGB(rgb.r),
      g: this.normalizeRGB(rgb.g),
      b: this.normalizeRGB(rgb.b),
    };

    const cmin = Math.min(rgbNorm.r, rgbNorm.g, rgbNorm.b);
    const cmax = Math.max(rgbNorm.r, rgbNorm.g, rgbNorm.b);
    const delta = cmax - cmin;

    let h = 0,
      s = 0,
      l = 0;

    if (delta === 0) h = 0;
    else if (cmax === rgbNorm.r) h = ((rgbNorm.g - rgbNorm.b) / delta) % 6;
    else if (cmax === rgbNorm.g) h = (rgbNorm.b - rgbNorm.r) / delta + 2;
    else h = (rgbNorm.r - rgbNorm.g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return rgb.a ? `(${h} ${s}% ${l}% / ${rgb.a})` : `(${h} ${s}% ${l}%)`;
  },

  moveColors(colors: IColor[], upperUuid: string, movedUuid: string): void {
    const upperIndex = colors.findIndex(item => item.uuid === upperUuid);
    const movedIndex = colors.findIndex(item => item.uuid === movedUuid);

    colors.splice(
      upperIndex,
      0,
      // удаляет и возвращает удаленный элемент
      colors.splice(movedIndex, 1)[0],
    );
  },

  savePalettes(paletes: Record<string, IPalette>) {
    localStorage.setItem('palettes', JSON.stringify(paletes));
  },

  hexTorgb(palettes: Record<string, IPalette>): void {
    for (const key in palettes) {
      // @ts-ignore
      palettes[key].colors = palettes[key].colors.map(({ uuid, hex, value }) => {
        return {
          uuid,
          // @ts-ignore
          value: value || Color(hex).hex(),
        };
      });
    }
  },

  getPalettes(): Record<string, IPalette> {
    const palettes = JSON.parse(localStorage.getItem('palettes') || '{}');

    this.hexTorgb(palettes);

    return palettes;
  },
};
