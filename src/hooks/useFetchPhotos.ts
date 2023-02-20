import { useEffect, useContext } from 'react';
import axios from 'axios';
import { ContentContext } from '../context/ContentProvider';

const useFetchPhotos = () => {
  const {
    state: { loading, error, photos },
    dispatch,
  } = useContext(ContentContext);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        dispatch({ type: 'SET_LOADING' });
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/photos?_limit=10',
        );
        const data = response.data;
        dispatch({ type: 'FETCH_PHOTOS', payload: data });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'An error occurred while fetching photos.',
        });
      }
    };

    fetchPhotos();
  }, [dispatch]);

  return { loading, error, photos };
};

export default useFetchPhotos;
