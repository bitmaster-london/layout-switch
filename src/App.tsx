import React from 'react';
import { ContentProvider } from './context/ContentProvider';
import Home from './pages/Home';
import './index.scss';

const App = () => {
  return (
    <ContentProvider>
      <Home />
    </ContentProvider>
  );
};

export default App;
