export default function MenuPopup({ isOpen, onClose }) {
  return (
    <div className={`menu-popup ${isOpen && 'menu-popup_is-opened'}`}>
      <div className="menu-popup__content">
        <button className="menu-popup__close-button transition" type="button" aria-label="закрыть меню" onClick={onClose} />
        <div className="menu-popup__elements">
          <nav className="menu-popup__nav">
            <a className="menu-popup__link transition" href="/">Главная</a>
            <a className="menu-popup__link transition" href="/movies">Фильмы</a>
            <a className="menu-popup__link transition" href="/saved-movies">Сохранённые фильмы</a>
          </nav>
          <button className="menu-popup__button transition" type="button" aria-label="перейти к аккаунту">Аккаунт</button>
        </div>
      </div>
    </div>
  )
}