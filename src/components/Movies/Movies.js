import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import MenuPopup from './MenuPopup/MenuPopup.js';
import Header from '../Header/Header.js';

export default function Moovies({ onBurgerMenu, isBurgerMenuOpen, onClose, getAllMovies }) {
  return (
    <div className='movies-page'>
      <Header 
        onPath={'movies'}
        onBurgerMenu={onBurgerMenu}
      />
      <main className='movies-page__main'>
        <SearchForm 
          onSubmit={getAllMovies}
        />
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