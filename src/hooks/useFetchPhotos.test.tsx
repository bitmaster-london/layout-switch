import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ContentContext } from '../context/ContentProvider';
import useFetchPhotos from './useFetchPhotos';
import fetch from 'jest-fetch-mock';

describe('useFetchPhotos', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should fetch photos and update state', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ id: 1, title: 'Photo 1' }]));

    const dispatch = jest.fn();
    const state = { loading: true, error: null, photos: [] };
    const wrapper = ({ children }: any) => (
      <ContentContext.Provider value={{ dispatch, state }}>
        {children}
      </ContentContext.Provider>
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

    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_LOADING' });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'FETCH_PHOTOS',
      payload: [{ id: 1, title: 'Photo 1' }],
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/photos?_limit=10',
    );
  });
});

// it('should handle error when fetching photos', async () => {
//   fetch.mockRejectOnce(new Error('Fetch error'));

//   const dispatch = jest.fn();
//   const state = { loading: true, error: null, photos: [] };
//   const wrapper = ({ children }) => (
//     <ContentContext.Provider value={{ dispatch, state }}>
//       {children}
//     </ContentContext.Provider>
//   );

//   const { result, waitForNextUpdate } = renderHook(() => useFetchPhotos(), {
//     wrapper,
//   });

//   expect(result.current.loading).toBe(true);
//   expect(result.current.error).toBe(null);
//   expect(result.current.photos).toEqual([]);

//   await waitForNextUpdate();

//   expect(result.current.loading).toBe(false);
//   expect(result.current.error).toBe(
//     'An error occurred while fetching photos.',
//   );
//   expect(result.current.photos).toEqual([]);

//   expect(dispatch).toHaveBeenCalledWith({ type: 'SET_LOADING' });
//   expect(dispatch).toHaveBeenCalledWith({
//     type: 'SET_ERROR',
//     payload: 'An error occurred while fetching photos.',
//   });
// });
// });
