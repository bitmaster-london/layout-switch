import { FC, useEffect, useRef, useState } from 'react';
import useContent from '../context/useContent';
import { motion } from 'framer-motion';
import styles from '../styles/Slider.module.scss';
import { Photo } from '../types';

export const Slider: FC = () => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderRef = useRef<any>();
  // const controls = useAnimation();
  const {
    state: { photos },
  } = useContent();

  useEffect(() => {
    setSliderWidth(
      sliderRef.current.scrollWidth + 40 - sliderRef.current.offsetWidth,
    );
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    console.log('info', info);
  };

  return (
    <motion.div className={styles.slider} ref={sliderRef} whileTap={'grabbing'}>
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
            {/* <img src={photo.url} alt={photo.title} className={styles.img} /> */}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Slider;
