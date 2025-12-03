export interface IColor {
  hex: string;
  comment?: string;
}

export interface IPalette {
  uuid: string;
  name: string;
  colors: IColor[];
}

export interface IIconProps {
  onClick?: () => void;
  className?: string;
  title?: string;
}