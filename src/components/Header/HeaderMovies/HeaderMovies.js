import headerLogo from '../../../images/headerLogo.svg';
import burger from '../../../images/burger.svg';

export default function HeaderMain({ onBurgerMenu }) {
  return (
    <header className="header-movies">
      <a className="header-movies__logo-link transition" href="/"><img className="header-movies__logo" alt="логотип сайта" src={headerLogo}/></a>
      <div className="header-movies__links">
        <div className="header-movies__films-links">
          <a className="header-movies__films transition" href="/movies">Фильмы</a>
          <a className="header-movies__saved transition" href="/saved-movies">Сохранённые фильмы</a>
        </div>
        <a className="header-movies__acc transition" href="/profile">Аккаунт</a>
      </div>
      <img className="header-movies__menu transition" alt="изображение списка" src={burger} onClick={onBurgerMenu}/>
    </header>
  );
}