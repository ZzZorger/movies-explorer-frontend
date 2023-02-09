import { useEffect, useState } from 'react';
import { userData } from '../../context/CurrentUserContext.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import { auth } from '../../utils/Auth.js';
import { mainApi } from '../../utils/MainApi.js';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFound from '../NotFound/NotFound.js';
import ProtectedRoute from '../ProtectedRoute.js';
import { moviesApi } from '../../utils/MoviesApi.js';



function App() {
  const history = useHistory();
  //// Hooks
  // General
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") || '');
  const [currentUser, setUserData] = useState({});
  const [isSubmitError, isSubmitErrorSetter] = useState(false);
  // Search form
  const [search, setSearch] = useState('');
  // Search form saved
  const [searchSaved, setSearchSaved] = useState('');
  // Movies
  const [preloader, setPreloader] = useState(false);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem("movies") || '[]'));
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem("filteredMovies") || '[]'));
  const [shortFilm, setShortFilm] = useState(localStorage.getItem("setShortFilm") === 'true');
  const [shortFilmSaved, setShortFilmSaved] = useState(localStorage.getItem("setShortFilmSaved") === 'true');
  const [searchError, setSearchError] = useState(false);
  // Saved movies
  const [filteredMoviesSaved, setFilteredMoviesSaved] = useState(JSON.parse(localStorage.getItem("filteredMoviesSaved") || '[]'));
  const [searchErrorSaved, setSearchErrorSaved] = useState(false);
  const [nothingFoundSaved, setNothingFoundSaved] = useState(false);
  const [addMoviesSavedEnable, setAddMoviesSavedEnable] = useState(false);
  // Movies Card list
  const [showCard, setShowCard] = useState(12);
  const [addCard, setAddCard] = useState(0);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [addMoviesEnable, setAddMoviesEnable] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem("savedMovies") || '[]'));
  const [onSavedPageFlag, setOnSavedPageFlag] = useState(false);
  // console.log(movies, savedMovies)
  ////
  //// UseEffect
  // Проверка авторизации при загрузке страницы
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    if (localStorage.getItem("savedMovies")) {
      setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")))
    }
    if (localStorage.getItem("filteredMoviesSaved")) {
      setFilteredMoviesSaved(JSON.parse(localStorage.getItem("filteredMoviesSaved")))
    }
    if (localStorage.getItem("setShortFilm")) {
      setShortFilm(Boolean(localStorage.getItem("setShortFilm")))
    }
    if (localStorage.getItem("filteredMovies")) {
      setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")))
    }
    if (localStorage.getItem("movies")) {
      setMovies(JSON.parse(localStorage.getItem("movies")))
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      auth.userValid()
        .then((data) => {
          setUserData(data)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
      mainApi.getMovies()
        .then((res) => {
          setSavedMovies(res);
          if (res) {
            setNothingFoundSaved(false)
          } else {
            setNothingFoundSaved(true)
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }, []);
  useEffect(() => {
      setSearch(localStorage.getItem("filter") || '')
      setShortFilm(localStorage.getItem("setShortFilm") === 'true')
      setSearchSaved(localStorage.getItem("filterSaved") || '')
  }, [])

  useEffect(() => {
    window.addEventListener('resize', changeWindow);
    return () => {
      window.removeEventListener('resize', changeWindow);
    };
  }, []);
  useEffect(() => {
    if (winWidth >= 1280) {
      setShowCard(12)
      setAddCard(4)
    } if (winWidth > 990 && winWidth < 1280) {
      setShowCard(9)
      setAddCard(3)
    } if (winWidth >= 768 && winWidth <= 990) {
      setShowCard(8)
      setAddCard(2)
    } if (winWidth < 767) {
      setShowCard(5)
      setAddCard(2)
    }
  }, [winWidth, filteredMovies.length])
  useEffect(() => {
    if (showCard >= filteredMovies.length) {
      setAddMoviesEnable(true)
    } else {
      setAddMoviesEnable(false)
    }
    if (filteredMovies.length === 0) {
      setNothingFound(true)
    } else if (filteredMovies.length > 0) {
      setNothingFound(false)
    }
  }, [showCard, filteredMovies])
  useEffect(() => {
    if (showCard >= savedMovies.length) {
      setAddMoviesSavedEnable(true)
    } else {
      setAddMoviesSavedEnable(false)
    }
    if (savedMovies.length === 0) {
      setNothingFoundSaved(true)
    } else if (savedMovies.length > 0) {
      setNothingFoundSaved(false)
    }
    if (showCard >= filteredMoviesSaved.length) {
      setAddMoviesSavedEnable(true)
    } else {
      setAddMoviesSavedEnable(false)
    }
  }, [showCard, savedMovies, filteredMoviesSaved])

  //// Functions
  // Movies
  // Search form
  function handleCheckboxChange(e) {
    setShortFilm(e.target.checked);
    localStorage.setItem("setShortFilm", e.target.checked);
    filterMovies(search, e.target.checked, movies);
  }
  function handleSearchChange(e) {
    setSearch(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (search) {
      setSearchError(false);
      handleGetMovies(search);
      localStorage.setItem("filter", search);
    } else {
      setSearchError(true);
    }
  }
  // Search form saved
  function handleCheckboxChangeSaved(e) {
    setShortFilmSaved(e.target.checked);
    localStorage.setItem("setShortFilmSaved", e.target.checked);
    filterMoviesSaved(search, e.target.checked);
  }
  function handleSearchChangeSaved(e) {
    setSearchSaved(e.target.value);
  }
  function handleSubmitSaved(e) {
    e.preventDefault();
    if (searchSaved) {
      setSearchErrorSaved(false);
      handleGetMoviesSaved(searchSaved);
      localStorage.setItem("filterSaved", searchSaved);
    } else {
      setSearchErrorSaved(true);
    }
  }
  // }
  // Фильтрация массива фильмов
  function filterMovies(name, isShorts, movies) {
    const filtered = movies.filter((movie) => {
      const isFiltered = movie.nameRU.includes(name);
      if (isShorts) {
        return movie.duration <= 40 && isFiltered;
      }
      return isFiltered;
    }
    );
    setFilteredMovies(filtered)
    localStorage.setItem("filteredMovies", JSON.stringify(filtered));
  }
  function filterMoviesSaved(name, isShorts) {
    const filtered = savedMovies.filter((movie) => {
      const isFiltered = movie.nameRU.includes(name);
      if (isShorts) {
        return movie.duration <= 40 && isFiltered;
      }
      return isFiltered;
    }
    );
    setFilteredMoviesSaved(filtered)
    localStorage.setItem("filteredMoviesSaved", JSON.stringify(filtered));
  }

  // Movies Card list
  // Установка таймера на изменение размера окна
  function changeWindow() {
    setTimeout(() => {
      setWinWidth(window.innerWidth);
    }, 1000);
  }
  // Установка параметров кнопки добавления карточек
  function handleAddMovies() {
    setShowCard(showCard + addCard);
  }

  // Saved movies
  function onLikeButton(movie) {
    mainApi.saveMovie(movie)
      .then((savedMovie) => {
        const newState = [savedMovie.data, ...savedMovies]
        setSavedMovies(newState)
        localStorage.setItem("savedMovies", JSON.stringify(newState))
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }
  // Delete movies
  function onDislikeButton(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => {
        const newState = savedMovies.filter((item) => item._id !== movieId)
        setSavedMovies(newState)
        localStorage.setItem("savedMovies", JSON.stringify(newState))
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }
  ////
  //// API
  // Получение списка фильмов и их фильтрация
  function handleGetMovies(filter) {
    setPreloader(true);
    if (movies.length === 0) {
      Promise.all([moviesApi.getAllMovies(), mainApi.getMovies()])
        .then(([films, savedFilms]) => {
          setMovies(films)
          setSavedMovies(savedFilms)
          localStorage.setItem("movies", JSON.stringify(films));
          localStorage.setItem("savedMovies", JSON.stringify(savedFilms));
          return films
        })
        .then((films) => {
          filterMovies(filter, shortFilm, films)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
          setPreloader(false);
        })
    } else {
      filterMovies(filter, shortFilm, movies)
      setPreloader(false);
    }
  }
  function handleGetMoviesSaved(filter) {
    filterMoviesSaved(filter, shortFilmSaved)
  }

  // Регистрация нового пользователя
  function handleRegister(data) {
    auth.signUp(data)
      .then((res) => {
        if (res) {
          handleLogin(data)
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
  // Логин пользователя
  function handleLogin(data) {
    auth.signIn(data)
      .then((jwt) => {
        if (jwt.token) {
          localStorage.setItem("token", jwt.token)
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        isSubmitErrorSetter(true)
        console.log(`Ошибка: ${err}`);
      })
  }
  // Выход из аккаунта
  function handleLogout() {
    auth.signOut()
      .then(() => {
        setSearch('')
        setSearchSaved('')
        setMovies([])
        setFilteredMovies([])
        setFilteredMoviesSaved([])
        setShortFilm(false)
        setShortFilmSaved(false)
        localStorage.removeItem('movies');
        localStorage.removeItem('filteredMovies');
        localStorage.removeItem('filteredMoviesSaved');
        localStorage.removeItem('setShortFilm');
        localStorage.removeItem('setShortFilmSaved');
        localStorage.removeItem('token');
        localStorage.removeItem('filter');
        localStorage.removeItem('filterSaved');
        localStorage.removeItem("savedMovies");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
  // Редактирование данных профиля
  function handleUpdateUser(data) {
    mainApi.patchProfileData(data)
      .then((newData) => {
        setUserData(newData.data);
        data.setChangeIsOk(true)
        data.setServerError(false)
        data.setFormChanged(false)
      })
      .catch(err => {
        if (err === 'Ошибка: 500') {
          data.setServerError(true)
        }
        console.log(`${err}`)
        data.setChangeIsOk(false)
      });
  }
  ////
  return (
    <userData.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute
              component={Movies}
              loggedIn={loggedIn}
              // Переменные SearchForm          
              shortFilm={shortFilm}
              searchError={searchError}
              handleCheckboxChange={handleCheckboxChange}
              handleSearchChange={handleSearchChange}
              handleSubmitSearchForm={handleSubmit}
              search={search}
              // Переменные MoviesCardList
              preloader={preloader}
              filteredMovies={filteredMovies.map((film) => {
                const currentMovie = (savedMovies.find((savedMovie) => savedMovie.movieId === film.id))
                if (currentMovie) {
                  film.isSaved = true
                  film._id = currentMovie._id
                } 
                else {
                  film.isSaved = false
                  film._id = ''
                }
                return film
              })}
              showCard={showCard}
              addMoviesEnable={addMoviesEnable}
              handleAddMovies={handleAddMovies}
              nothingFound={nothingFound}
              onLikeButton={onLikeButton}
              onDislikeButton={onDislikeButton}
              savedMovies={savedMovies}
              onSavedPageFlag={onSavedPageFlag}
              currentUser={currentUser}
              path={'/movies'}
            />
            <ProtectedRoute
              component={SavedMovies}
              loggedIn={loggedIn}
              // Переменные SearchForm             
              shortFilm={shortFilmSaved}
              searchError={searchErrorSaved}
              handleCheckboxChange={handleCheckboxChangeSaved}
              handleSearchChange={handleSearchChangeSaved}
              handleSubmitSearchForm={handleSubmitSaved}
              search={searchSaved}
              // Переменные MoviesCardList
              preloader={preloader}
              filteredMovies={filteredMoviesSaved}
              showCard={showCard}
              addMoviesEnable={addMoviesSavedEnable}
              handleAddMovies={handleAddMovies}
              nothingFound={nothingFoundSaved}
              onLikeButton={onLikeButton}
              onDislikeButton={onDislikeButton}
              savedMovies={savedMovies}
              currentUser={currentUser}
              onSavedPageFlag={onSavedPageFlag}
              setOnSavedPageFlag={setOnSavedPageFlag}
              path={'/saved-movies'}
            />
            <ProtectedRoute
              component={Profile}
              onEdit={handleUpdateUser}
              onLogout={handleLogout}
              loggedIn={loggedIn}
              path={'/profile'}
            />
            <Route path="/signup">
              <Register
                onRegister={handleRegister}
              />
            </Route>
            <Route path="/signin">
              <Login
                onLogin={handleLogin}
                isSubmitError={isSubmitError}
              />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </userData.Provider>
  );
}

export default App;
