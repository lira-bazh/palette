import { BrowserRouter, Routes, Route } from 'react-router';
import { Header } from '@/components'
import { MainPage, PalettePage, NewPalettePage } from '@/pages';
import { ROUTES } from '@/constants';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.main()} element={<MainPage />} />
        <Route path={ROUTES.newPalette()} element={<NewPalettePage />} />
        <Route path={ROUTES.palette(`:uuid`)} element={<PalettePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
