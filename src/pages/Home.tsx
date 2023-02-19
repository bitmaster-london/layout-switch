import { useState, FC } from 'react';
import { LayoutType } from '../types';
import useFetchPhotos from '../hooks/useFetchPhotos';
import styles from '../styles/Home.module.scss';
import List from '../components/List';
import Cards from '../components/Cards';
import Slider from '../components/Slider';
import Grid from '../components/Grid';

const iconsPath = process.env.PUBLIC_URL + '/icons';

type Switch = {
  layout: LayoutType;
  icon: string;
  alt: string;
};

const Home: FC = () => {
  const { loading, error } = useFetchPhotos();
  const [layout, setLayout] = useState(LayoutType.List);

  const switches: Switch[] = [
    {
      layout: LayoutType.List,
      icon: 'reorder.svg',
      alt: 'List view',
    },
    {
      layout: LayoutType.Cards,
      icon: 'view_column.svg',
      alt: 'Cards view',
    },
    {
      layout: LayoutType.Slider,
      icon: 'swipe.svg',
      alt: 'Slider view',
    },
    {
      layout: LayoutType.Grid,
      icon: 'grid_view.svg',
      alt: 'Grid view',
    },
  ];

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
          {switches.map((s: Switch) => (
            <div
              className={`${styles.button} ${
                layout === s.layout ? styles.active : ''
              }`}
              onClick={() => setLayout(s.layout)}>
              <img src={`${iconsPath}/${s.icon}`} alt={s.alt} />
            </div>
          ))}
        </div>
      </div>

      {renderPhotos()}
    </div>
  );
};

export default Home;
