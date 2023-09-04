import { Component } from 'react';

// импорт библиотеки для модального окна
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {

    const { images } = this.props;

    return images.map(image => (
      <li key={image.id}>
        <img
          width={400}
          height={300}
          src={image.webformatURL}
          alt={image.user}
          onClick={() => {
            // выводим изображение в момент клика 
            console.log(image.largeImageURL);
            this.openModal();
          }}
        />
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <img src={image.largeImageURL} alt={image.user} />
        </Modal>
      </li>
    ));
  }
}
