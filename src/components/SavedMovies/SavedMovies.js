import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import HeaderMovies from '../Header/HeaderMovies/HeaderMovies.js';
import Footer from '../Footer/Footer.js';
import MenuPopup from '../Movies/MenuPopup/MenuPopup.js';

export default function SavedMovies({ onBurgerMenu, isBurgerMenuOpen, onClose }) {
  return (
    <div className='movies-page'>
      <HeaderMovies
        onBurgerMenu={onBurgerMenu}
      />
      <main className='movies-page__main'>
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
      <MenuPopup 
        isOpen={isBurgerMenuOpen}
        onClose={onClose}
      />
    </div>
  );
}