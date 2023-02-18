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
    <div className={styles.home}>
      <h1>Photos</h1>

      <div className={styles.layoutSwitch}>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <img src={`${iconsPath}/reorder.svg`} alt="List view" />
          </div>
          <div className={styles.button}>
            <img src={`${iconsPath}/view_column.svg`} alt="Cards view" />
          </div>
          <div className={styles.button}>
            <img src={`${iconsPath}/swipe.svg`} alt="Slider view" />
          </div>
          <div className={styles.button}>
            <img src={`${iconsPath}/grid_view.svg`} alt="Grid view" />
          </div>
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
