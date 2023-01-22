import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import HeaderMovies from '../Header/HeaderMovies/HeaderMovies.js';
import Footer from '../Footer/Footer.js';
import MenuPopup from './MenuPopup/MenuPopup.js';

export default function Moovies({ onBurgerMenu, isBurgerMenuOpen, onClose }) {
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