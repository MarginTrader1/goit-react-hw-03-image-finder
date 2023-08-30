import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery.js/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

import API from 'API';

export class App extends Component {
  state = {
    data: [],
    searchQuery: '',
    page: 1,
  };

  // получаем велью инпута, которое записываем в state
  getQuery = newQuery => {
    this.setState({ searchQuery: newQuery });
  };

  // запрос за следующей страничкой 
  newPage = () => {
    this.setState({ page: this.state.page + 1});
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      const { searchQuery, page } = this.state;
      const images = await API.fetchImages(searchQuery, page);
      this.setState({ data: images });
    }
  }

  render() {
    return (
      <>
        <Searchbar getQuery={this.getQuery} />
        <ImageGallery>
          <ImageGalleryItem images={this.state.data} />
        </ImageGallery>
      </>
    );
  }
}
