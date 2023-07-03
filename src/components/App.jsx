import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

import css from './App.module.css';
import Notiflix from 'notiflix';

export const Context = React.createContext();

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (searchText === '') {
      return;
    }

    const BASE_URl = 'https://pixabay.com/api/';
    const API_KEY = '16104754-fccb05fa4a4190bcc2750c19f';

    setIsLoading(true);

    fetch(
      `${BASE_URl}?key=${API_KEY}&q=${searchText}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        return Promise.reject(new Error());
      })
      .then(({ total, hits }) => {
        if (hits.length === 0) {
          Notiflix.Notify.failure(
            'Opps, no images for search! Try again please'
          );
          return;
        }
        setImages(prev => {
          return [...prev, ...hits];
        });
        setTotalImages(total);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, searchText]);

  const onSubmit = value => {
    setSearchText(value);
    setImages([]);
    setPage(1);
  };

  const onButtonClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Context.Provider value={images}>
      <div className={css.app}>
        <Searchbar onFormSubmitApp={onSubmit} />
        <ImageGallery />
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalImages && (
          <Button onClick={onButtonClick} />
        )}
      </div>
    </Context.Provider>
  );
};

App.propTypes = {
  searchText: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
  isLoading: PropTypes.bool,
  page: PropTypes.number,
  totalImages: PropTypes.number,
};

export default App;
