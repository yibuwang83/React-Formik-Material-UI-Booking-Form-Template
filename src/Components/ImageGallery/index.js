import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Photo from './Photo';
import arrayMove from 'array-move';
import { Card } from '@material-ui/core';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Carousel, { Modal, ModalGateway } from 'react-images';
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
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  console.log('🚀 ~ file: index.js ~ line 21 ~ ImageGallery ~ items', items);
  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleClickOpen = (value, index) => {
    // console.log(index, photo);
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  return (
    <Card>
      <SortableGallery items={items} onSortEnd={onSortEnd} axis={'xy'} />
      <ul style={{ display: 'flex' }}>
        {items.map((item, index) => {
          return (
            <li key={index}>
              <button
                style={{ width: 100, height: 35 }}
                onClick={() => handleClickOpen(item, index)}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={items.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </Card>
  );
}
