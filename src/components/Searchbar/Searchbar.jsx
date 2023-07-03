import { useState } from 'react';

import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

const Searchbar = ({ onFormSubmitApp }) => {
  const [searchText, setSearchText] = useState('');

  const hangleChange = evt => {
    const { value } = evt.target;
    setSearchText(value.toLowerCase());
  };

  const onFormSubmit = evt => {
    evt.preventDefault();

    if (searchText.trim() === '') {
      alert('Please enter text from search images and photos');
      return;
    }

    onFormSubmitApp(searchText);
    setSearchText('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={hangleChange}
          className={css.searchFormInput}
          value={searchText}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  searchText: PropTypes.string,
};

export default Searchbar;
