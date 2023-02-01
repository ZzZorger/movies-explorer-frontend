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
  // Hooks
  const [isBurgerMenuOpen, isBurgerMenuOpenSetter] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setUserData] = useState({});
  const [isSubmitError, isSubmitErrorSetter] = useState(false);
  const [filteredFilms, setFilteredFilms] = useState([]);
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
    // e.preventDefault();
    moviesApi.getAllMovies()
      .then((res) => {
        // console.log(res)
        // const films = (e) => {
        //   res.filter(e.nameRU.match(text))
        // }
        // return films;
        
        // return res.filter(e => e.nameRU.match(text))
        // console.log(res.filter(e => e.nameRU.match(text)))
        // console.log(films)
        // return exa

        // res.filter(function(e) {
        //   // console.log(e.nameRU.match(text))
        //   return e.nameRU.match(text)
        // })

        // console.log(res.filter(function(e) {
        //   // return e
        //   return e.nameRU.match(text)
        // }))

        return res
        // const films = res.filter(e => e.nameRU.match(text))
        // setFilteredFilms(films)
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
        console.log(jwt)
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
