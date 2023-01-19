// import MoviesCard from '../MoviesCard/MoviesCard.js'
// import Preloader from '../Preloader/Preloader'

export default function MenuPopup() {
  return (
    <div className="menu-popup menu-popup_is-opened">
      <div className="menu-popup__content">
        <button className="menu-popup__close-button" type="button" aria-label="закрыть меню"></button>
        <nav className="menu-popup__nav">
          <a className="menu-popup__link transition" href="/">Главная</a>
          <a className="menu-popup__link transition" href="/movies">Фильмы</a>
          <a className="menu-popup__link transition" href="/saved-movies">Сохранённые фильмы</a>
        </nav>
        <button className="menu-popup__button" type="button" aria-label="перейти к аккаунту">Аккаунт</button>
      </div>
    </div>
  )
}