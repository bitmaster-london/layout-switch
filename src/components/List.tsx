import React, { useContext, FC } from 'react';
import { ContentContext } from '../context/ContentProvider';
import { Photo } from '../types';
import styles from '../styles/List.module.scss';

export const List: FC = () => {
  const {
    state: { photos },
  } = useContext(ContentContext);

  const renderPhotos = () => {
    if (!photos.length) {
      return <div>Loading...</div>;
    }

    return (
      <div className={styles.photos}>
        {photos.map((photo: Photo) => (
          <div key={photo.id} className={styles.photo}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderPhotos()}</div>;
};
