import headerLogo from '../../images/headerLogo.svg';
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  function handleMailChange(e) {
    setMail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      mail,
      password
    })
  }
  return (
    <section className="register">
      <div className="register__content">
        <header className="register__header">
          <a className="register__logo-link transition" href="/"><img className="register__logo" alt="логотип сайта" src={headerLogo} /></a>
          <h1 className="register__title">Рады видеть!</h1>
        </header>
        <main className="register__main">
          <fieldset className="login-fieldset">
            <div className="register__input-field">
              <p className="register__input-title">E-mail</p>
              <input
                className="register__input"
                type="text"
                value={mail}
                onChange={handleMailChange}
                placeholder="Почта"
                autoComplete="off"
              />
            </div>
            <div className="register__input-field">
              <p className="register__input-title">Пароль</p>
              <input
                className="register__input"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Пароль"
                autoComplete="off"
              />
              <span className="register__error">Что-то пошло не так...</span>
            </div>
          </fieldset>
          <button className="register__submit transition" type="submit" onClick={handleSubmit}>Войти</button>
          <p className="register__sign">Ещё не зарегистрированы? <a className="register__link transition" href="/signup">Регистрация</a></p>
        </main>
      </div>
    </section>
  );
}