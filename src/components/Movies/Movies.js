import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import MenuPopup from './MenuPopup/MenuPopup.js';
import Header from '../Header/Header.js';
import { moviesApi } from '../../utils/MoviesApi.js';
import { useEffect, useState } from 'react';

export default function Moovies({ onBurgerMenu, isBurgerMenuOpen, onClose }) {
  const [preloader, setPreloader] = useState(false);
  // useEffect(() => {
  //   moviesApi.getAllMovies()
  //     .then((cards) => {
  //       filterCards(cards, )
  //       // setFilteredFilms(films)
  //     })
  // }, [])
  
  // function filterCards(cards, text) {
  //   const films = cards.filter(e => e.nameRU.match(text));
  //   return films;
  // }
  function getAllMovies() {
    setPreloader(true);
    moviesApi.getAllMovies()
    .then((movies) => {
      localStorage.setItem("movies", JSON.stringify(movies));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      setPreloader(false);
    })
  }

  return (
    <div className='movies-page'>
      <Header
        onPath={'movies'}
        onBurgerMenu={onBurgerMenu}
      />
      <main className='movies-page__main'>
        <SearchForm
          getAllMovies={getAllMovies}
        />
        <MoviesCardList
          isPreloader={preloader}
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