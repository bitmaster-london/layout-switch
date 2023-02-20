import { FC, useContext, useEffect, useRef, useState } from 'react';
import { ContentContext } from '../context/ContentProvider';
import { motion } from 'framer-motion';
import { Photo } from '../types';
import styles from '../styles/Slider.module.scss';

export const Slider: FC = () => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderRef = useRef<any>();
  const {
    state: { photos },
  } = useContext(ContentContext);

  useEffect(() => {
    setSliderWidth(
      sliderRef.current.scrollWidth + 40 - sliderRef.current.offsetWidth,
    );
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    console.log('info', info);
  };

  return (
    <motion.div
      className={styles.slider}
      ref={sliderRef}
      whileTap={'grabbing'}
      data-testid="slider">
      <motion.div
        onDragEnd={handleDragEnd}
        className={styles.slides}
        drag="x"
        dragConstraints={{ right: 0, left: -sliderWidth }}>
        {photos.map((photo: Photo) => (
          <motion.div key={photo.id} className={styles.slide}>
            <div
              style={{ backgroundImage: `url(${photo.url})` }}
              className={styles.img}></div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Slider;
