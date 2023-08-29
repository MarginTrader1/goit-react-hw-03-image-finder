import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery.js/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

import { Axios } 

export const App = () => {
  return (
    <>
      <Searchbar />
      <ImageGallery>
        <ImageGalleryItem />
      </ImageGallery>
    </>
  );
};
