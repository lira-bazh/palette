export interface IColor {
  uuid: string;
  value: string;
  comment?: string;
}

export interface IPalette {
  uuid: string;
  name: string;
  colors: IColor[];
  showModels?: EColorModel[];
}

export enum EColorModel {
  HEX = 'hex',
  RGB = 'rgb',
  HSL = 'hsl',
}
