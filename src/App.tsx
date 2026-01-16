import { BrowserRouter, Routes, Route } from 'react-router';
import { CssBaseline, darkScrollbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Header } from '@/components';
import { MainPage, PalettePage, NewPalettePage } from '@/pages';
import { ROUTES } from '@/constants';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    dark: true,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: themeParam => ({
        body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
      }),
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={ROUTES.main()} element={<MainPage />} />
          <Route path={ROUTES.newPalette()} element={<NewPalettePage />} />
          <Route path={ROUTES.palette(`:uuid`)} element={<PalettePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
