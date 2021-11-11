import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';

// -import GridList from '@material-ui/core/GridList';
// -import GridListTile from '@material-ui/core/GridListTile';
// -import GridListTileBar from '@material-ui/core/GridListTileBar';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import data from './data';
import { useTheme } from '@material-ui/core/styles';
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

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
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
  };
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PictureList() {
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

  const [imgItems, setImgItems] = useState(data);
  console.log('🚀 ~ file: index.js ~ line 87 ~ ImageList ~ imgItems', imgItems);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setImgItems(arrayMove(imgItems, oldIndex, newIndex));
  };

  const SortableItem = sortableElement(({ value, index }) => {
    return (
      <ImageListItem key={value.id}>
        <img src={value.src} alt={value.title} />
        <ImageListItemBar
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
      </ImageListItem>
    );
  });

  const SortableContainer = sortableContainer(({ children }) => {
    return <ImageList cols={3}>{children}</ImageList>;
  });

  return (
    <div>
      {/* <SortableContainer onSortEnd={onSortEnd}>
        {imgItems.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </SortableContainer> */}

      <ImageList cols={3}>
        {data.map((tile, index) => (
          <ImageListItem key={tile.id}>
            <img src={tile.src} alt={tile.title} />
            <ImageListItemBar
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
          </ImageListItem>
        ))}
      </ImageList>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={data.map((x) => ({
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
