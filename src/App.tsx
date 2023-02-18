import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentProvider';
import { Grid } from './components/Grid';
import { Carousel } from './components/Slider';
import { LayoutType } from './types';
import Cards from './components/Cards';
import Home from './pages/Home';
import './index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <ContentProvider>
        <Routes>
          <Route path="/" element={<Home layout={LayoutType.Cards} />} />
          <Route path="/grid" element={<Grid layout={LayoutType.Grid} />} />
          <Route path="/cards" element={<Cards />} />
          <Route
            path="/carousel"
            element={<Carousel layout={LayoutType.Carousel} />}
          />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  );
};

export default App;
