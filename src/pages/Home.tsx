import React from 'react';
import { LayoutType, HomeProps, Photo } from '../types';
import useFetchPhotos from '../hooks/useFetchPhotos';


const Home = ({ layout }: HomeProps) => {
  const { loading, error, photos } = useFetchPhotos();
  // const { state: { loading, error, photos }, dispatch } = useContext(ContentContext);

  // useEffect(() => {
  //   const fetchPhotos = async () => {
  //     const response = await fetch(
  //       'https://jsonplaceholder.typicode.com/photos?_limit=10'
  //     );
  //     const data = await response.json();
  //     dispatch({ type: 'FETCH_PHOTOS', payload: data });
  //   };
  //   fetchPhotos();
  // }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home">
      <h1>Photos</h1>
        <ul className={layout === LayoutType.Grid ? 'grid' : 'list'}>
          {photos.map((photo: Photo) => (
            <li key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Home;
