import headerLogo from '../../../images/headerLogo.svg';

export default function HeaderMain() {
  return (
    <header className="header-main">
      <img className="header__logo" alt="логотип сайта" src={headerLogo}/>
      <div className="header__links">
        <a className="header__registration transition" href="#about">Регистрация</a>
        <a className="header__signin transition" href="#about">Войти</a>
      </div>
    </header>
  );
}