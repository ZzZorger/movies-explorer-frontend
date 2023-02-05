import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import MenuPopup from './MenuPopup/MenuPopup.js';
import Header from '../Header/Header.js';

export default function Moovies({
  onBurgerMenu,
  isBurgerMenuOpen,
  onClose,
  shortFilm,
  preloader,
  filteredMovies,
  showCard,
  addMoviesEnbale,
  handleAddMovies,
  nothingFound,
  searchError,
  onLikeButton,
  onDislikeButton,
  savedMovies,
  handleCheckboxChange,
  handleSearchChange,
  handleSubmitSearchForm,
  search
}) {
  return (
    <div className='movies-page'>
      <Header
        onPath={'movies'}
        onBurgerMenu={onBurgerMenu}
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
          addMoviesEnbale={addMoviesEnbale}
          handleAddMovies={handleAddMovies}
          nothingFound={nothingFound}
          onLikeButton={onLikeButton}
          onDislikeButton={onDislikeButton}
          savedMovies={savedMovies}
        />
      </main>
      <Footer />
      <MenuPopup
        isOpen={isBurgerMenuOpen}
        onClose={onClose}
      />
    </div>
  );
}