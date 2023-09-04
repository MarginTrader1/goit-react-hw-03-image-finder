import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery.js/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMoreButton } from './Button/Button';

// импорт запроса
import API from 'API';

// импорт спиннера как компонента
import { Hourglass } from 'react-loader-spinner';

export class App extends Component {
  state = {
    data: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
  };

  // получаем велью инпута, которое записываем в state
  getQuery = newQuery => {
    // проверка на пустой запрос
    if (newQuery === '') {
      return alert(`Пустая строка! Введите слово для поиска!`);
    }
    // делаем запрос уникальным по методу ниже и записываем его в state
    this.setState({
      searchQuery: `${Date.now()}/${newQuery}`.trim(),
      data: [],
      page: 1,
    });
  };

  // основной запрос на сервер
  async componentDidUpdate(prevProps, prevState) {
    // проверка на новые данные
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      // уникальный запрос (строку) обрезаем до стандартного слова
      const searchQuery = this.state.searchQuery.slice(14);

      // реализация отображения загрузки
      this.setState({ isLoading: true });

      // запрос на сервер
      const images = await API.fetchImages(searchQuery, this.state.page);

      // меняем state
      this.setState(prevState => {
        // если page равен 1 -> полностью меняем старый массив на новый массив (для новых запросов)
        if (prevState.page === 1) {
          return { data: images, isLoading: false };
        }
        // если page больше 1 -> создаем массив, в который распыляем старый массив и распыляем новый массив (для кнопки LoadMore)
        return {
          data: [...prevState.data, ...images],
          isLoading: false,
        };
      });
    }
  }

  // запрос за следующей страничкой
  newPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { data, isLoading } = this.state;

    return (
      <>
        <Searchbar getQuery={this.getQuery} />
        {/* продолжение реализации для отображения загрузки isLoading */}
        {isLoading ? (
          // если isLoading: true --> показываем спинер
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        ) : (
          // если isLoading: false --> рендерим галерею
          <ImageGallery>
            <ImageGalleryItem images={data} />
          </ImageGallery>
        )}
        {/* рендер кнопки если массив не пустой */}
        {data.length !== 0 ? <LoadMoreButton loadMore={this.newPage} /> : null}
      </>
    );
  }
}
