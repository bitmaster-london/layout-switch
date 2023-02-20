import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render the Home component', () => {
    render(<App />);
    const memoryGameText = screen.getByText('Loading...');
    expect(memoryGameText).toBeDefined();
  });
});
