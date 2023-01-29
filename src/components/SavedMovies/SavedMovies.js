import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer.js';
import MenuPopup from '../Movies/MenuPopup/MenuPopup.js';
import Header from '../Header/Header.js';

export default function SavedMovies({ onBurgerMenu, isBurgerMenuOpen, onClose }) {
  return (
    <div className='movies-page'>
      <Header 
        onPath={'movies'}
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