import { useContext, FC } from 'react';
import { ContentContext } from '../context/ContentProvider';
import { Photo } from '../types';
import styles from '../styles/List.module.scss';

const List: FC = () => {
  const {
    state: { photos },
  } = useContext(ContentContext);

  console.log('photos', photos);

  const renderPhotos = () => {
    return (
      <div className={styles.photos} data-testid="list">
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

export default List;
