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
  // const [nothingFound, setNothingFound] = useState(false);
  // const windowWidth = 
  // console.log(document.documentElement.clientWidth)
  // console.log(filteredMovies.length)
  // useEffect(() => {
  //   moviesApi.getAllMovies()
  //     .then((cards) => {
  //       filterCards(cards, )
  //       // setFilteredFilms(films)
  //     })
  // }, [])

  // useEffect(() => {
  //   if (size.width >= cardsInWindow.large.width) {
  //     setNumberMoviesShow(cardsInWindow.large.moviesShow);
  //     setNumberMoviesAdd(cardsInWindow.large.moviesAdd);
  //   } else if (size.width >= cardsInWindow.medium.width) {
  //     setNumberMoviesShow(cardsInWindow.medium.moviesShow);
  //     setNumberMoviesAdd(cardsInWindow.medium.moviesAdd);
  //   } else if (size.width >= cardsInWindow.small.width) {
  //     setNumberMoviesShow(cardsInWindow.small.moviesShow);
  //     setNumberMoviesAdd(cardsInWindow.small.moviesAdd);
  //   } else {
  //     setNumberMoviesShow(cardsInWindow.smallest.moviesShow);
  //     setNumberMoviesAdd(cardsInWindow.smallest.moviesAdd);
  //   }
  // }, [size.width]);
  function filterMovies(filter, movies) {
    console.log(filter)
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
          // nothingFound={nothingFound}
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