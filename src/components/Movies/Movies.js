import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import MenuPopup from './MenuPopup/MenuPopup.js';
import Header from '../Header/Header.js';
import { useState } from 'react';

export default function Moovies({
  // Переменные SearchForm
  shortFilm,
  searchError,
  handleCheckboxChange,
  handleSearchChange,
  handleSubmitSearchForm,
  search,
  // Переменные MoviesCardList
  preloader,
  filteredMovies,
  showCard,
  addMoviesEnable,
  handleAddMovies,
  nothingFound,
  onLikeButton,
  onDislikeButton,
  savedMovies,
  onSavedPageFlag,
  currentUser
}) {
  const [isBurgerMenuOpen, isBurgerMenuOpenSetter] = useState(false);
  // const savedMoviesByOwner = savedMovies.filter(movie => movie.owner === currentUser._id);
  function handleBurgerMenuClick() {
    isBurgerMenuOpenSetter(true);
  }
  function closeAllPopups() {
    isBurgerMenuOpenSetter(false);
  }
  return (
    <div className='movies-page'>
      <Header
        onPath={'movies'}
        onBurgerMenu={handleBurgerMenuClick}
      />
      <main className='movies-page__main'>
        <SearchForm
          shortFilm={shortFilm}
          searchError={searchError}
          handleCheckboxChange={handleCheckboxChange}
          handleSearchChange={handleSearchChange}
          handleSubmitSearchForm={handleSubmitSearchForm}
          search={search}
        />
        <MoviesCardList
          isPreloader={preloader}
          filteredMovies={filteredMovies}
          showCard={showCard}
          addMoviesEnable={addMoviesEnable}
          handleAddMovies={handleAddMovies}
          nothingFound={nothingFound}
          onLikeButton={onLikeButton}
          onDislikeButton={onDislikeButton}
          savedMovies={savedMovies}
          onSavedPageFlag={onSavedPageFlag}
        />
      </main>
      <Footer />
      <MenuPopup
        isOpen={isBurgerMenuOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}