import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import imagesList from './imagesList';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageList() {
  const classes = useStyles();
  const [selectedTile, setSelectedTile] = React.useState(null);
  const [value, setValue] = React.useState([]);

  const handleClickOpen = (photo, index) => {
    // setSelectedTile(tile);
    // console.log('clicked');
    // console.log(tile);
    console.log(index, photo);
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const handleClose = () => {
    setSelectedTile(null);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const [imgItems, setImgItems] = useState(imagesList);
  console.log('🚀 ~ file: index.js ~ line 87 ~ ImageList ~ imgItems', imgItems);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setImgItems(arrayMove(imgItems, oldIndex, newIndex));
  };

  const SortableItem = sortableElement(({ value, index }) => {
    return (
      <GridListTile key={value.id}>
        <img src={value.src} alt={value.title} />
        <GridListTileBar
          title={value.title}
          subtitle={<span>by: {value.author}</span>}
          actionIcon={
            <IconButton
              aria-label={`info about ${value.title}`}
              className={classes.icon}
              value={value.id}
              onClick={() => handleClickOpen(value, index)}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </GridListTile>
    );
  });

  const SortableContainer = sortableContainer(({ children }) => {
    return <GridList cols={3}>{children}</GridList>;
  });

  return (
    <div>
      <SortableContainer onSortEnd={onSortEnd}>
        {imgItems.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </SortableContainer>
      <br />
      <br />
      <br />
      <br />

      <GridList cols={3}>
        {imagesList.map((tile, index) => (
          <GridListTile key={tile.id}>
            <img src={tile.src} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                  value={tile.id}
                  onClick={() => handleClickOpen(tile, index)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={imagesList.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
