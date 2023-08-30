import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery.js/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

import API from 'API';

export class App extends Component {
  state = {
    data: [],
    searchQuery: 'cat',
    page: 1,
  };

  getImages = async () => {
    const { searchQuery, page } = this.state;
    const images = await API.fetchImages(searchQuery, page);
    this.setState({ data: images });
  };

  render() {
    return (
      <>
        <Searchbar getImages={this.getImages} />
        <ImageGallery>
          <ImageGalleryItem images={this.state.data} />
        </ImageGallery>
      </>
    );
  }
}
