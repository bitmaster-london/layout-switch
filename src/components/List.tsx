import React, { useContext } from 'react';
import { ContentContext } from '../context/ContentProvider';
import { LayoutType } from '../types/LayoutType';

type Props = {
  layout: LayoutType;
};

export const List: React.FC<Props> = ({ layout }) => {
  const {
    state: { photos },
  } = useContext(ContentContext);

  const renderPhotos = () => {
    if (!photos.length) {
      return <div>Loading...</div>;
    }
  };

  return <div>{renderPhotos()}</div>;
};
