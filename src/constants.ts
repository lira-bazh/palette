export const ROUTES = {
  main: () => '/',
  newPalette: () => '/new',
  palette: (uuid: string) => `/palette/${uuid}`,
};

export const TEXT_COLOR = {
  black: '#000',
  white: '#fff',
}