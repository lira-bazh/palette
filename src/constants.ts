export const ROUTES = {
  main: () => '/',
  newPalette: () => '/new',
  palette: (uuid: string) => `/palette/${uuid}`,
};