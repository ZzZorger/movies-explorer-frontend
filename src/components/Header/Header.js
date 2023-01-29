import { useEffect, useState } from 'react';
import headerLogo from '../../images/headerLogo.svg';

export default function Header({ onPath }) {
  const [headerStyle, setHeaderStyle] = useState('')
  useEffect(() => {
    switch (onPath) {
      case 'main':
        setHeaderStyle('main');
        break
      case 'movies':
        setHeaderStyle('movies');
        break
      case 'saved':
        setHeaderStyle('saved');
        break
      default:
    }
  }, [onPath]);
  // function styleHandler(path) {
  //   switch (path) {
  //     case 'main':
  //       setHeaderStyle('main');
  //       break
  //     case 'movies':
  //       setHeaderStyle('movies');
  //       break
  //     case 'saved':
  //       setHeaderStyle('saved');
  //       break
  //     default:
  //   }
  // }
  return (
    // <header className="header">
    <header className={`header header-${headerStyle}`}>
      <img className="header__logo" alt="логотип сайта" src={headerLogo} />
      <div className="header__links">
        <a className="header__registration transition" href="/signup">Регистрация</a>
        <a className="header__signin transition" href="/signin">Войти</a>
      </div>
    </header>
  );
}