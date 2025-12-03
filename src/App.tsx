import { BrowserRouter, Routes, Route } from 'react-router';
import { Header } from '@/components'
import { MainPage, PalettePage } from '@/pages';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="palette/:uuid" element={<PalettePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
