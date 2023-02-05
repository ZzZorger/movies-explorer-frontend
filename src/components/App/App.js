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
  const [isBurgerMenuOpen, isBurgerMenuOpenSetter] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setUserData] = useState({});
  const [isSubmitError, isSubmitErrorSetter] = useState(false);
  // Movies
  const [preloader, setPreloader] = useState(false);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem("movies")));
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem("filteredMovies")) || []);
  const [shortFilm, setShortFilm] = useState(Boolean(localStorage.getItem("setShortFilm")));
  const [searchError, setSearchError] = useState(false);
  // Movies Card list
  const [showCard, setShowCard] = useState(0);
  const [addCard, setAddCard] = useState(0);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [addMoviesEnbale, setAddMoviesEnable] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  ////
  //// UseEffect
  // Проверка авторизации при загрузке страницы
  useEffect(() => {
    auth.userValid()
      .then((data) => {
        setUserData(data)
      })
      .catch((err) => {
        history.push("/signin");
        console.log(`Ошибка: ${err}`);
      })
  }, [history]);
  // Movies Card list
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
  // Загрузка фильмов при заходе
  useEffect(() => {
    if (loggedIn) {
      // mainApi
      //   .getUserInfo()
      //   .then((data) => {
      //     setCurrentUser(data);
      //   })
      //   .catch((err) => console.log(err));
      mainApi
        .getMovies()
        .then((res) => {
          // console.log(res)
          setSavedMovies(res);
          // setSavedMoviesList(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);
  ////
  //// Functions
  // Movies
  // Переключатель короткометражек
  function handleShortFilm() {
    if (!shortFilm) {
      setShortFilm(true);
      localStorage.setItem("setShortFilm", true);
    } else {
      setShortFilm(false);
      localStorage.removeItem("setShortFilm");
    }
  }
  // Фильтрация массива фильмов
  function filterMovies(filter, movies) {
    console.log(movies)
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
  // Обработчик нажатия на кнопку поиска
  function handleSubmitMovie(filter) {
    if (filter) {
      setSearchError(false);
      handleGetMovies(filter);
    } else {
      setSearchError(true);
    }
  }
  // Получить все фильмы и отфильтровать их по запросу

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
  //// Open and Close handlers
  //
  function handleBurgerMenuClick() {
    isBurgerMenuOpenSetter(true);
  }
  // Закрыть все попапы
  function closeAllPopups() {
    isBurgerMenuOpenSetter(false);
  }
  // Saved movies
  function onLikeButton(movie) {
    mainApi.saveMovie(movie)
    .then((savedMovie) => {
      setSavedMovies([savedMovie, ...savedMovies])
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }
  // Delete movies
  function onDislikeButton(movieId) {
    mainApi.deleteMovie(movieId)
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
          history.push("/movies");
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
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
  // Редактирование данных профиля
  function handleUpdateUser(data) {
    mainApi.patchProfileData(data)
      .then((newData) => {
        setUserData(newData.data);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      });
  }
  // Сохранение фильма
  // function handleSaveMovie(data) {
  //   mainApi.saveMovie(data)
  //     .then((movie) => {
  //       console.log(movie)
  //     })
  // }
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
              onBurgerMenu={handleBurgerMenuClick}
              isBurgerMenuOpen={isBurgerMenuOpen}
              onClose={closeAllPopups}
              loggedIn={loggedIn}
              handleSubmit={handleSubmitMovie}
              handleShortFilm={handleShortFilm}
              shortFilm={shortFilm}
              preloader={preloader}
              filteredMovies={filteredMovies}
              showCard={showCard}
              addMoviesEnbale={addMoviesEnbale}
              handleAddMovies={handleAddMovies}
              nothingFound={nothingFound}
              searchError={searchError}
              onLikeButton={onLikeButton}
              onDislikeButton={onDislikeButton}
              savedMovies={savedMovies}
              savedMoviesList={savedMoviesList}
              path={'/movies'}
            />
            <ProtectedRoute
              component={SavedMovies}
              onBurgerMenu={handleBurgerMenuClick}
              isBurgerMenuOpen={isBurgerMenuOpen}
              onClose={closeAllPopups}
              loggedIn={loggedIn}
              handleSubmit={handleSubmitMovie}
              handleShortFilm={handleShortFilm}
              shortFilm={shortFilm}
              preloader={preloader}
              filteredMovies={filteredMovies}
              showCard={showCard}
              addMoviesEnbale={addMoviesEnbale}
              handleAddMovies={handleAddMovies}
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
