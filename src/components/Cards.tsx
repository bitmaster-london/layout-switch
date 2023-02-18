import React, { useContext } from 'react';
import { ContentContext } from '../context/ContentProvider';
import styles from '../styles/Cards.module.scss';

const Cards: React.FC = () => {
  const {
    state: { photos },
  } = useContext(ContentContext);

  return (
    <div className={styles.cards}>
      {photos.map((photo) => (
        <div key={photo.id} className={styles.card}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <p>{photo.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
