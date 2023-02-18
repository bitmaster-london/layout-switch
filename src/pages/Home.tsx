import React, { useState } from 'react';
import { LayoutType } from '../types';
import useFetchPhotos from '../hooks/useFetchPhotos';
import styles from '../styles/Home.module.scss';
import { List } from '../components/List';
import Cards from '../components/Cards';
import Slider from '../components/Slider';
import { Grid } from '../components/Grid';

const iconsPath = process.env.PUBLIC_URL + '/icons';

const Home = () => {
  const { loading, error, photos } = useFetchPhotos();
  const [layout, setLayout] = useState(LayoutType.List);

  const renderPhotos = () => {
    switch (layout) {
      case LayoutType.Cards:
        return <Cards />;
      case LayoutType.Slider:
        return <Slider />;
      case LayoutType.Grid:
        return <Grid />;
      default:
        return <List />;
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

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

      {renderPhotos()}

      {/* <div className={styles.layoutView}>
        {photos.map((photo: Photo) => (
          <div key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div> */}
    </div>
  );

  // return <div>{renderPhotos()}</div>;
};

export default Home;
