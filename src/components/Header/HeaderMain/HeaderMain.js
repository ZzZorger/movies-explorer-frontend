import headerLogo from '../../../images/headerLogo.svg';

export default function HeaderMain() {
  return (
    <header className="header">
      <img className="header__logo" alt="логотип сайта" src={headerLogo}/>
      <div className="header__links">
        <a className="header__registration transition" href="/signup">Регистрация</a>
        <a className="header__signin transition" href="/signin">Войти</a>
      </div>
    </header>
  );
}