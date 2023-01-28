import { useEffect, useState } from 'react';
import { userData } from '../../context/CurrentUserContext.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import { auth } from '../../utils/Auth.js';
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setUserData] = useState({});
  // UseEffect
  // useEffect(() => {
  //   auth.userValid()
  //     .then((res) => {
  //       console.log(res)
  //       setLoggedIn(true);
  //       // setUserData(res);
  //       history.push("/movies");
  //     })
  //     .catch((err) => {
  //       console.log(`Ошибка: ${err}`);
  //     })
  // }, [history]);
  useEffect(() => {
    console.log(document.cookie.token)
  })
  // Open and Close handlers
  function handleBurgerMenuClick() {
    isBurgerMenuOpenSetter(true);
  }
  function closeAllPopups() {
    isBurgerMenuOpenSetter(false);
  }
  // API
  // Получение списка фильмов
  function getAllMovies(e) {
    e.preventDefault();
    moviesApi.getAllMovies()
      .then((res) => {
        console.log(res)
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
    console.log(data)
    auth.signIn(data)
      .then((jwt) => {
        console.log(document.cookie)
        if (jwt.token) {
          setLoggedIn(true);
          history.push("/movies");
          auth.userValid()
            .then((res) => {
              console.log(res)
            })
        }
      })
      .catch((err) => {
        // isInfoTooltipErrorSetter(true);
        // isInfoTooltipOpenSetter(true);
        console.log(`Ошибка: ${err}`);
      })
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
            {/* <Route path="/movies">
            <Movies 
              getAllMovies={getAllMovies}
            />
          </Route> */}
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
