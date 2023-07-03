import { useContext, useEffect, useState } from 'react';
import { Context } from 'components/App';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState('');
  const context = useContext(Context);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  const handleKeyDown = ({ code }) => {
    if (code === 'Escape') {
      setIsVisible(false);
    }
  };

  const handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
      setIsVisible(false);
    }
  };

  const onSaveImgModal = url => {
    setIsVisible(true);
    setImage(url);
  };

  return (
    <>
      {context.map(({ id, largeImageURL, webformatURL }) => (
        <li
          key={id}
          className={css.imageGalleryItem}
          onClick={() => {
            onSaveImgModal(largeImageURL);
          }}
        >
          <img
            className={css.imageGalleryItemImage}
            src={webformatURL}
            alt=""
          />
        </li>
      ))}
      {isVisible && (
        <Modal
          image={image}
          handleOverlayClick={handleOverlayClick}
          handleKeyDown={handleKeyDown}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  isVisible: PropTypes.bool,
  image: PropTypes.string,
};

export default ImageGalleryItem;
