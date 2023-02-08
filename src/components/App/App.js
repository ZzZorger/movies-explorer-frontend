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
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem("movies")));
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem("filteredMovies")) || []);
  const [shortFilm, setShortFilm] = useState(Boolean(localStorage.getItem("setShortFilm")));
  const [searchError, setSearchError] = useState(false);
  // Saved movies
  const [filteredMoviesSaved, setFilteredMoviesSaved] = useState(JSON.parse(localStorage.getItem("filteredMoviesSaved")) || []);
  const [searchErrorSaved, setSearchErrorSaved] = useState(false);
  const [nothingFoundSaved, setNothingFoundSaved] = useState(false);
  const [addMoviesSavedEnable, setAddMoviesSavedEnable] = useState(false);
  // Movies Card list
  const [showCard, setShowCard] = useState(0);
  const [addCard, setAddCard] = useState(0);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [addMoviesEnable, setAddMoviesEnable] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [onSavedPageFlag, setOnSavedPageFlag] = useState(false)
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
    if (localStorage.getItem("filter")) {
      setSearch(localStorage.getItem("filter").replace(/['"]+/g, ''))
      setShortFilm(Boolean(localStorage.getItem("setShortFilm")))
    }
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
    if (showCard >= filteredMoviesSaved.length) {
      setAddMoviesSavedEnable(true)
    } else {
      setAddMoviesSavedEnable(false)
    }
    if (filteredMoviesSaved.length === 0) {
      setNothingFoundSaved(true)
    } else if (filteredMoviesSaved.length > 0) {
      setNothingFoundSaved(false)
    }
  }, [showCard, filteredMoviesSaved])

  //// Functions
  // Movies
  // Search form

  function handleCheckboxChange(e) {
    e.preventDefault();
    if (!shortFilm) {
      setShortFilm(true)
      localStorage.setItem("setShortFilm", true);
    } else {
      setShortFilm(false);
      localStorage.removeItem("setShortFilm");
    }
    filterMovies(search, movies);
  }
  function handleSearchChange(e) {
    setSearch(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (search) {
      setSearchError(false);
      handleGetMovies(search);
      localStorage.setItem("filter", JSON.stringify(search));
    } else {
      setSearchError(true);
    }
  }
  // Search form saved
  function handleCheckboxChangeSaved(e) {
    if (!shortFilm) {
      setShortFilm(true);
      localStorage.setItem("setShortFilm", true);
    } else {
      setShortFilm(false);
      localStorage.removeItem("setShortFilm");
    }
  }
  function handleSearchChangeSaved(e) {
    setSearchSaved(e.target.value);
  }
  function handleSubmitSaved(e) {
    e.preventDefault();
    if (searchSaved) {
      setSearchError(false);
      handleGetMovies(searchSaved);
      localStorage.setItem("filterSaved", JSON.stringify(searchSaved));
    } else {
      setSearchError(true);
    }
  }
  // }
  // Фильтрация массива фильмов
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
  // Фильтрация массива сохраненных фильмов
  // filteredMoviesSaved
  function filterMoviesSaved(filter, movies) {
    const filtered = movies.filter((movie) => {
      const isFiltered = movie.nameRU.toLowerCase().includes(filter);
      if (shortFilm) {
        return movie.duration <= 40 && isFiltered;
      }
      return isFiltered;
    }
    );
    setFilteredMoviesSaved(filtered)
    localStorage.setItem("filteredMoviesSaved", JSON.stringify(filtered));
  }
  // Обработчик нажатия на кнопку поиска сохраненных фильмов
  function handleSubmitMovieSaved(filter) {
    if (filter) {
      setSearchErrorSaved(false);
      filterMoviesSaved(filter, movies)
    } else {
      setSearchErrorSaved(true);
    }
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
        setSavedMovies([savedMovie.data, ...savedMovies])
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies))
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }
  // Delete movies
  function onDislikeButton(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMovies(savedMovies.filter((item) => item._id !== movieId))
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies))
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
        setShortFilm(false)
        setFilteredMoviesSaved([])
        localStorage.removeItem('movies');
        localStorage.removeItem('filteredMovies');
        localStorage.removeItem('setShortFilm');
        localStorage.removeItem('filteredMoviesSaved');
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
              filteredMovies={filteredMovies}
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
              shortFilm={shortFilm}
              searchError={searchErrorSaved}
              handleCheckboxChange={handleCheckboxChangeSaved}
              handleSearchChange={handleSearchChangeSaved}
              handleSubmitSearchForm={handleSubmitSaved}
              search={searchSaved}
              // Переменные MoviesCardList
              preloader={preloader}
              filteredMovies={savedMovies}
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
