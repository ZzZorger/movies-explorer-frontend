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
  // Search form
  const [search, setSearch] = useState('');
  // const [search, setSearch] = useState(localStorage.getItem("filter").replace(/['"]+/g, ''));
  // Search form saved
  const [searchSaved, setSearchSaved] = useState('');
  // const [searchSaved, setSearchSaved] = useState(localStorage.getItem("filterSaved").replace(/['"]+/g, ''));
  // Movies
  const [preloader, setPreloader] = useState(false);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem("movies")));
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem("filteredMovies")) || []);
  const [shortFilm, setShortFilm] = useState(Boolean(localStorage.getItem("setShortFilm")));
  const [searchError, setSearchError] = useState(false);
  // Saved movies
  const [filteredMoviesSaved, setFilteredMoviesSaved] = useState(JSON.parse(localStorage.getItem("filteredMoviesSaved")) || []);
  const [searchErrorSaved, setSearchErrorSaved] =useState(false);
  const [nothingFoundSaved, setNothingFoundSaved] = useState(false);
  // Movies Card list
  const [showCard, setShowCard] = useState(0);
  const [addCard, setAddCard] = useState(0);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [addMoviesEnbale, setAddMoviesEnable] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  ////
  //// UseEffect
  // Проверка авторизации при загрузке страницы
  // useEffect(() => {
    // console.log(loggedIn)
    // if(localStorage.getItem("movies")) {
      // setLoggedIn(true)
      // console.log('true')
    // } else {
      // console.log('false')
    // }
  // },[])
  useEffect(() => {
    if (loggedIn) {
      auth.userValid()
      .then((data) => {
        setUserData(data)
      })
      .catch((err) => {
        history.push("/signin");
        console.log(`Ошибка: ${err}`);
      })
      mainApi.getMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        history.push("/signin");
        console.log(`Ошибка: ${err}`);
      })
    }
  }, [loggedIn, history]);
  // Movies Card list
  // useEffect(() => {
  //   auth.userValid()
  //     .then((data) => {
  //       setUserData(data)
  //     })
  //     .catch((err) => {
  //       // history.push("/signin");
  //       console.log(`Ошибка: ${err}`);
  //     })
  // }, [])
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
  // useEffect(() => {
  //   if (loggedIn) {
  //     // auth.userValid()
  //     // .then((data) => {
  //     //   setUserData(data)
  //     // })
  //     // .catch((err) => {
  //     //   // history.push("/signin");
  //     //   console.log(`Ошибка: ${err}`);
  //     // })
  //     mainApi
  //       .getMovies()
  //       .then((res) => {
  //         setSavedMovies(res);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [loggedIn]);
  ////
  //// Functions
  // Movies
  // Search form
  function handleCheckboxChange(e) {
    handleShortFilm();
  }
  function handleSearchChange(e) {
    setSearch(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("filter", JSON.stringify(search));
    handleSubmitMovie(search);
  }
  // Search form saved
  function handleCheckboxChangeSaved(e) {
    handleShortFilm();
  }
  function handleSearchChangeSaved(e) {
    setSearchSaved(e.target.value);
  }
  function handleSubmitSaved(e) {
    e.preventDefault();
    localStorage.setItem("filterSaved", JSON.stringify(searchSaved));
    handleSubmitMovie(searchSaved);
  }
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
  // Обработчик нажатия на кнопку поиска
  function handleSubmitMovie(filter) {
    if (filter) {
      setSearchError(false);
      handleGetMovies(filter);
    } else {
      setSearchError(true);
    }
  }
  // Обработчик нажатия на кнопку поиска сохраненных фильмов
  function handleSubmitMovieSaved(filter) {
    if (filter) {
      setSearchErrorSaved(false);
      // handleGetMovies(filter);
      filterMoviesSaved(filter, movies)
    } else {
      setSearchErrorSaved(true);
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
    .then(() => {
      setSavedMovies(savedMovies.filter((item) => item._id !== movieId))
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
  // Получение списка сохраненных фильмов и их фильтрация
  // function handleGetMoviesSaved(filter) {
  //   // setPreloader(true);
  //   if (!savedMovies) {
  //     moviesApi.getAllMovies()
  //       .then((movies) => {
  //         setMovies(movies)
  //         localStorage.setItem("movies", JSON.stringify(movies));
  //         return movies
  //       })
  //       .then((movies) => {
  //         filterMovies(filter, movies)
  //       })
  //       .catch((err) => {
  //         console.log(`Ошибка: ${err}`)
  //       })
  //       .finally(() => {
  //         setPreloader(false);
  //       })
  //   } else {
  //     filterMovies(filter, movies)
  //     setPreloader(false);
  //   }
  // }
  //filterMoviesSaved
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
          // localStorage.setItem("token", jwt.token)
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
      // setSearch('')
      // setSearchSaved('')
      // setMovies([])
      // setFilteredMovies([])
      // setShortFilm(false)
      // setFilteredMoviesSaved([])
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
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
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
              handleCheckboxChange={handleCheckboxChange}
              handleSearchChange={handleSearchChange}
              handleSubmitSearchForm={handleSubmit}
              search={search}
              path={'/movies'}
            />
            <ProtectedRoute
              component={SavedMovies}
              onBurgerMenu={handleBurgerMenuClick}
              isBurgerMenuOpen={isBurgerMenuOpen}
              onClose={closeAllPopups}
              loggedIn={loggedIn}
              // filterMoviesSaved
              handleSubmit={handleSubmitMovieSaved}
              handleShortFilm={handleShortFilm}
              shortFilm={shortFilm}
              // preloader={preloader}
              filteredMovies={filteredMoviesSaved}
              // showCard={showCard}
              addMoviesEnbale={addMoviesEnbale}
              handleAddMovies={handleAddMovies}
              nothingFound={nothingFoundSaved}
              searchError={searchErrorSaved}
              // onLikeButton={onLikeButton}
              onDislikeButton={onDislikeButton}
              savedMovies={savedMovies}
              handleCheckboxChange={handleCheckboxChangeSaved}
              handleSearchChange={handleSearchChangeSaved}
              handleSubmitSearchForm={handleSubmitSaved}
              search={searchSaved}
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
