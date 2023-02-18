
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "./context/ContentProvider";
import { Grid } from "./components/Grid";
import Cards from "./components/Cards";
import { Carousel } from "./components/Carousel";
import Home from "./pages/Home";
import { LayoutType } from "./types";
import "./index.scss";

const App = () => {
  return (
    <BrowserRouter>
      <ContentProvider>
      <Routes>
          <Route path="/" element={<Home layout={LayoutType.Cards} />} />
          <Route path="/grid" element={<Grid layoutType={LayoutType.Grid} />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/carousel" element={<Carousel layout={LayoutType.Carousel} />} />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  );
}

export default App;

