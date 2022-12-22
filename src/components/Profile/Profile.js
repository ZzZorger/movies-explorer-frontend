import HeaderMovies from '../Header/HeaderMovies/HeaderMovies'

export default function Profile() {
  return (
    <section className='profile'>
      <HeaderMovies />
      <div className="profile__content">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <fieldset className="profile__fieldset">
          <div className="profile__input-field">
            <p className="profile__input-title">Имя</p>
            <input 
              className="profile__input"
              type="text"
              placeholder="Виталий"
            />
          </div>
          <div className="profile__input-field">
            <p className="profile__input-title">E-mail</p>
            <input 
              className="profile__input"
              type="email"
              placeholder="pochta@yandex.ru"
            />
          </div>
        </fieldset>
        <button className="profile__change transition" type="submit">Редактировать</button>
        <button className="profile__exit transition" type="button">Выйти из аккаунта</button>
      </div>
    </section>
  );
}