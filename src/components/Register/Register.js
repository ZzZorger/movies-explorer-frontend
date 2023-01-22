import headerLogo from '../../images/headerLogo.svg';

export default function Register() {
  return (
    <section className="register">
      <div className="register__content">
        <header className="register__header">
          <a className="register__logo-link transition" href="/"><img className="register__logo" alt="логотип сайта" src={headerLogo} /></a>
          <h1 className="register__title">Добро пожаловать!</h1>
        </header>
        <main className="register__main">
          <fieldset className="register__fieldset">
            <div className="register__input-field">
              <p className="register__input-title">Имя</p>
              <input
                className="register__input"
                type="text"
              />
            </div>
            <div className="register__input-field">
              <p className="register__input-title">E-mail</p>
              <input
                className="register__input"
                type="text"
              />
            </div>
            <div className="register__input-field">
              <p className="register__input-title">Пароль</p>
              <input
                className="register__input"
                type="text"
              />
              <span className="register__error">Что-то пошло не так...</span>
            </div>
          </fieldset>
          <button className="register__submit transition" type="submit">Зарегистрироваться</button>
          <p className="register__sign">Уже зарегистрированы?&ensp;<a className="register__link transition" href="/signin">Войти</a></p>
        </main>
      </div>
    </section>
  );
}