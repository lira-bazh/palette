export interface IColor {
  uuid: string;
  hex: string;
  comment?: string;
}

export interface IPalette {
  uuid: string;
  name: string;
  colors: IColor[];
}
