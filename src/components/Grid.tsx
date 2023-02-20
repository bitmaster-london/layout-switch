import { useContext, FC } from 'react';
import { ContentContext } from '../context/ContentProvider';
import styles from '../styles/Grid.module.scss';

const Grid: FC = () => {
  const {
    state: { photos },
  } = useContext(ContentContext);

  return (
    <div className={styles.grid}>
      {photos.map((photo) => (
        <div key={photo.id} className={styles.card}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
        </div>
      ))}
    </div>
  );
};

export default Grid;
