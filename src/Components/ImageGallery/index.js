import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Photo from './Photo';
import arrayMove from 'array-move';
import { Card } from '@material-ui/core';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { photos } from '../../data/photos';

const SortablePhoto = SortableElement((item) => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => {
  return (
    <Gallery
      photos={items}
      renderImage={(props) => <SortablePhoto {...props} />}
    />
  );
});

export default function ImageGallery() {
  const [items, setItems] = useState(photos);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <Card>
      <SortableGallery items={items} onSortEnd={onSortEnd} axis={'xy'} />
    </Card>
  );
}
