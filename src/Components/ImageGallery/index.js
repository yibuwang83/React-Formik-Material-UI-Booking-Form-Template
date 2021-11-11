import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import Photo from './Photo';
import arrayMove from 'array-move';
import { Button, IconButton, Card, FormControlLabel } from '@material-ui/core';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photos } from '../../data/photos';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

const SortablePhoto = SortableElement((item) => {
  return <Photo {...item} />;
});

const SortableGallery = SortableContainer(({ items }) => {
  return (
    <Gallery
      photos={items}
      renderImage={(props) => <SortablePhoto {...props} />}
    />
  );
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ImageGallery() {
  const [items, setItems] = useState(photos);
  const classes = useStyles();
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleClickOpen = (value, index) => {
    // console.log(index, photo);
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const deleteImage = () => {};

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <SortableGallery items={items} onSortEnd={onSortEnd} axis={'xy'} />
        </Grid>
        <Grid item xs={5}>
          <List dense>
            {items.map((item, index) => {
              return (
                <ListItem key={index}>
                  <ListItemText id={index} primary={`${item.name}`} />
                  <IconButton
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleClickOpen(item, index)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => deleteImage(item, index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>

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
