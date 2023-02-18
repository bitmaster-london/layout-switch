import React from 'react';
import { LayoutType, HomeProps, Photo } from '../types';
import useFetchPhotos from '../hooks/useFetchPhotos';
import styles from '../styles/Home.module.scss';

const iconsPath = process.env.PUBLIC_URL + '/icons';

const Home = ({ layout }: HomeProps) => {
  const { loading, error, photos } = useFetchPhotos();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home">
      <h1>Photos</h1>
      <div className={styles.layoutButtons}>
        <div className="button">
          <img src={`${iconsPath}/reorder.svg`} alt="List icon" />
        </div>
        <div className="button">
          <img src={`${iconsPath}/grid_view.svg`} alt="Grid icon" />
        </div>
      </div>
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
