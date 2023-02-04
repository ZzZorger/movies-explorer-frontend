import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import MenuPopup from '../Movies/MenuPopup/MenuPopup.js';
import Header from '../Header/Header.js';
import { moviesApi } from '../../utils/MoviesApi.js';
import { useState } from 'react';

export default function Moovies({ onBurgerMenu, isBurgerMenuOpen, onClose }) {
  const [preloader, setPreloader] = useState(false);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem("movies")));
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem("filteredMovies")) || []);
  const [shortFilm, shortFilmSetter] = useState(Boolean(localStorage.getItem("shortFilmSetter")));

  function handleShortFilm() {
    if (!shortFilm) {
      shortFilmSetter(true);
      localStorage.setItem("shortFilmSetter", true);
    } else {
      shortFilmSetter(false);
      localStorage.removeItem("shortFilmSetter");
    }
  }
  function filterMovies(filter, movies) {
    const filtered = movies.filter((movie) => {
      const isFiltered = movie.nameRU.toLowerCase().includes(filter);
      if (shortFilm) {
        return movie.duration <= 40 && isFiltered;
      }
      return isFiltered;
    }
    );
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
          onCheck={handleShortFilm}
          shortFilm={shortFilm}
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