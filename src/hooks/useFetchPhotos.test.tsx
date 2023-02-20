import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ContentProvider } from '../context/ContentProvider';
import useFetchPhotos from './useFetchPhotos';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useFetchPhotos', () => {
  it('should fetch photos and update state', async () => {
    const data = [{ id: 1, title: 'Photo 1' }];
    mockedAxios.get.mockResolvedValueOnce({ data });

    const wrapper = ({ children }: any) => (
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
    expect(result.current.photos).toEqual(data);

    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/photos?_limit=10',
    );
  });
  it('should handle error when fetching photos', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Fetch error'));

    const wrapper = ({ children }: any) => (
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

    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/photos?_limit=10',
    );
  });
});
