import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import MenuPopup from '../Movies/MenuPopup/MenuPopup.js';
import Header from '../Header/Header.js';

export default function SavedMovies({
  onBurgerMenu,
  isBurgerMenuOpen,
  onClose,
  handleSubmit,
  handleShortFilm,
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
  savedMovies
}) {
  return (
    <div className='movies-page'>
      <Header
        onPath={'movies'}
        onBurgerMenu={onBurgerMenu}
      />
      <main className='movies-page__main'>
        <SearchForm
          onSubmit={handleSubmit}
          onCheck={handleShortFilm}
          shortFilm={shortFilm}
          searchError={searchError}
        />
        <MoviesCardList
          isPreloader={preloader}
          filteredMovies={savedMovies}
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
// import SearchForm from '../Movies/SearchForm/SearchForm.js';
// import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
// import Footer from '../Footer/Footer.js';
// import MenuPopup from '../Movies/MenuPopup/MenuPopup.js';
// import Header from '../Header/Header.js';

// export default function SavedMovies({ onBurgerMenu, isBurgerMenuOpen, onClose }) {
//   return (
//     <div className='movies-page'>
//       <Header 
//         onPath={'movies'}
//         onBurgerMenu={onBurgerMenu}
//       />
//       <main className='movies-page__main'>
//         <SearchForm />
//         <MoviesCardList />
//       </main>
//       <Footer />
//       <MenuPopup 
//         isOpen={isBurgerMenuOpen}
//         onClose={onClose}
//       />
//     </div>
//   );
// }