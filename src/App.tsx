import { BrowserRouter, Routes, Route } from 'react-router';
import { Header } from '@/components'
import { MainPage, PalettePage, NewPalettePage } from '@/pages';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/new" element={<NewPalettePage />} />
        <Route path="palette/:uuid" element={<PalettePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
