import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import MenuPopup from './MenuPopup/MenuPopup.js';
import Header from '../Header/Header.js';
import { moviesApi } from '../../utils/MoviesApi.js';
import { useEffect, useState } from 'react';

export default function Moovies({ onBurgerMenu, isBurgerMenuOpen, onClose }) {
  const [preloader, setPreloader] = useState(false);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem("movies")));
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem("filteredMovies")) || []);

  function filterMovies(filter, movies) {
    const filtered = movies.filter((movie) => movie.nameRU.toLowerCase().match(filter));
    setFilteredMovies(filtered)
    localStorage.setItem("filteredMovies", JSON.stringify(filtered));
  }
  function handleSubmit(filter) {
    getMovies(filter);
  }
  function getMovies(filter) {
    setPreloader(true);
    if (!movies) {
      moviesApi.getAllMovies()
        .then((movies) => {
          setMovies(movies)
          localStorage.setItem("movies", JSON.stringify(movies));
          return movies
        })
        .then((movies) => {
          filterMovies(filter, movies)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
          setPreloader(false);
        })
    } else {
      filterMovies(filter, movies)
      setPreloader(false);
    }
  }

  return (
    <div className='movies-page'>
      <Header
        onPath={'movies'}
        onBurgerMenu={onBurgerMenu}
      />
      <main className='movies-page__main'>
        <SearchForm
          onSubmit={handleSubmit}
        />
        <MoviesCardList
          isPreloader={preloader}
          filteredMovies={filteredMovies}
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