import headerLogo from '../../../images/headerLogo.svg';

export default function HeaderMain() {
  return (
    <header className="header-movies">
      <img className="header-movies__logo" alt="логотип сайта" src={headerLogo}/>
      <div className="header-movies__links">
        <div className="header-movies__films-links">
          <a className="header-movies__films transition" href="#about">Фильмы</a>
          <a className="header-movies__saved transition" href="#about">Сохранённые фильмы</a>
        </div>
        <a className="header-movies__acc transition" href="#about">Аккаунт</a>
      </div>
    </header>
  );
}