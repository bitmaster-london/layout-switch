import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ContentProvider } from '../context/ContentProvider';
import useFetchPhotos from './useFetchPhotos';

describe('useFetchPhotos', () => {
  it('should fetch photos and update state', async () => {
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, title: 'Photo 1' }]),
      }),
    );

    global.fetch = mockFetch;

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ContentProvider>{children}</ContentProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useFetchPhotos(), {
      wrapper,
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.photos).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.photos).toEqual([{ id: 1, title: 'Photo 1' }]);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/photos?_limit=10',
    );

    jest.clearAllMocks();
  });

  it('should handle error when fetching photos', async () => {
    const mockFetch = jest.fn().mockRejectedValueOnce(new Error('Fetch error'));

    global.fetch = mockFetch;

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ContentProvider>{children}</ContentProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useFetchPhotos(), {
      wrapper,
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.photos).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(
      'An error occurred while fetching photos.',
    );
    expect(result.current.photos).toEqual([]);
  });
});
