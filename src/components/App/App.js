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
  const [shortFilm, shortFilmSetter] = useState(Boolean(localStorage.getItem("shortFilmSetter")));
  ////
  // UseEffect
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
  // Movies
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
  function handleSubmitMovie(filter) {
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
  // 
  // Open and Close handlers
  function handleBurgerMenuClick() {
    isBurgerMenuOpenSetter(true);
  }
  function closeAllPopups() {
    isBurgerMenuOpenSetter(false);
  }
  // API
  // Получение списка фильмов
  function getAllMovies() {
    moviesApi.getAllMovies()
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
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
    console.log(data)
    mainApi.patchProfileData(data)
      .then((newData) => {
        setUserData(newData.data);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      });
  }
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
              getAllMovies={getAllMovies}
              handleSubmit={handleSubmitMovie}
              handleShortFilm={handleShortFilm}
              shortFilm={shortFilm}
              preloader={preloader}
              filteredMovies={filteredMovies}
              path={'/movies'}
            />
            <ProtectedRoute
              component={SavedMovies}
              onBurgerMenu={handleBurgerMenuClick}
              isBurgerMenuOpen={isBurgerMenuOpen}
              onClose={closeAllPopups}
              loggedIn={loggedIn}
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
