import { useEffect, useState } from 'react';
import headerLogo from '../../images/headerLogo.svg';
import burger from '../../images/burger.svg';
import { Route } from 'react-router-dom';

export default function Header({ onPath, onBurgerMenu }) {
  const [headerStyle, setHeaderStyle] = useState('');
  const [mainHeader, setMainHeader] = useState(false);
  const [moviesHeader, setMoviesHeader] = useState(false);
  const [savedHeader, setSavedHeader] = useState(false);

  useEffect(() => {
    // console.log(mainHeader, moviesHeader, savedHeader)
    switch (onPath) {
      case 'main':
        setHeaderStyle('main');
        setMainHeader(true);
        setMoviesHeader(false);
        setSavedHeader(false);
        break
      case 'movies':
        setHeaderStyle('movies');
        setMainHeader(false);
        setMoviesHeader(true);
        setSavedHeader(false);
        break
      case 'saved':
        setHeaderStyle('saved');
        setMainHeader(false);
        setMoviesHeader(false);
        setSavedHeader(true);
        break
      default:
    }
  }, [onPath]);
  return (
    // <header className={`header header-${headerStyle}`}></header>
    // <header className="header">
    // <header className={`header-${headerStyle}`}>
    //   {mainHeader &&
    //     <div className={`header-${headerStyle}`}>
    //       <img className="header__logo" alt="логотип сайта" src={headerLogo} />
    //       <div className="header__links">
    //         <a className="header__registration transition" href="/signup">Регистрация</a>
    //         <a className="header__signin transition" href="/signin">Войти</a>
    //       </div>
    //     </div>}
    //   {moviesHeader &&
    //     <div className={`header-${headerStyle}`}>
    //       <a className="header-movies__logo-link transition" href="/"><img className="header-movies__logo" alt="логотип сайта" src={headerLogo} /></a>
    //       <div className="header-movies__links">
    //         <div className="header-movies__films-links">
    //           <a className="header-movies__films transition" href="/movies">Фильмы</a>
    //           <a className="header-movies__saved transition" href="/saved-movies">Сохранённые фильмы</a>
    //         </div>
    //         <a className="header-movies__acc transition" href="/profile">Аккаунт</a>
    //       </div>
    //       <img className="header-movies__menu transition" alt="изображение списка" src={burger} onClick={onBurgerMenu} />
    //     </div>}
    // </header>
    <header className={`header-${headerStyle}`}>
      {/* <img className="header__logo" alt="логотип сайта" src={headerLogo} /> */}
      <a className="header-movies__logo-link transition" href="/"><img className="header-movies__logo" alt="логотип сайта" src={headerLogo} /></a>
      {mainHeader && <div className="header__links">
        <a className="header__registration transition" href="/signup">Регистрация</a>
        <a className="header__signin transition" href="/signin">Войти</a>
      </div>}
      {moviesHeader && <div className="header-movies__links">
        <div className="header-movies__films-links">
          <a className="header-movies__films transition" href="/movies">Фильмы</a>
          <a className="header-movies__saved transition" href="/saved-movies">Сохранённые фильмы</a>
        </div>
        <a className="header-movies__acc transition" href="/profile">Аккаунт</a>
      </div>}
      {moviesHeader && <img className="header-movies__menu transition" alt="изображение списка" src={burger} onClick={onBurgerMenu} />}
    </header>
  );
}