import { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContentProvider } from '../context/ContentProvider';
import Home from './Home';

let mockFetch: any;

describe('Home component', () => {
  beforeEach(() => {
    mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, title: 'test1', url: '/23423', thumbnailUrl: '34534' },
            { id: 2, title: 'test2', url: '/23424', thumbnailUrl: '34535' },
          ]),
      }),
    );

    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the List view by default', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ContentProvider>{children}</ContentProvider>
    );

    render(<Home />, { wrapper });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const testScreen = await screen.findByTestId('list');
    expect(testScreen).toBeInTheDocument();

    jest.clearAllMocks();
  });

  it('should render the Cards view when Cards switch is clicked', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ContentProvider>{children}</ContentProvider>
    );

    render(<Home />, { wrapper });

    const button = await screen.findByAltText(/Cards view/i);
    fireEvent.click(button);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });

  it('should render the Slider view when Slider switch is clicked', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ContentProvider>{children}</ContentProvider>
    );

    render(<Home />, { wrapper });

    const button = await screen.findByAltText(/Slider view/i);
    fireEvent.click(button);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });

  it('should render the Grid view when Grid switch is clicked', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ContentProvider>{children}</ContentProvider>
    );

    render(<Home />, { wrapper });

    const button = await screen.findByAltText(/Grid view/i);
    fireEvent.click(button);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });
});
