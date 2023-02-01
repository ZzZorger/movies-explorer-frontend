import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import MenuPopup from './MenuPopup/MenuPopup.js';
import Header from '../Header/Header.js';
import { moviesApi } from '../../utils/MoviesApi.js';
import { useEffect } from 'react';

export default function Moovies({ onBurgerMenu, isBurgerMenuOpen, onClose, getAllMovies }) {
  useEffect(() => {
    moviesApi.getAllMovies()
      .then((cards) => {
        filterCards(cards, )
        // setFilteredFilms(films)
      })
  }, [])

  function filterCards(cards, text) {
    const films = cards.filter(e => e.nameRU.match(text));
    return films;
  }
  // function getMoviesCardList() {
  //   getAllMovies()
  // }
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
        <MoviesCardList
        // cards={}
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