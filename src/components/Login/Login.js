import headerLogo from '../../images/headerLogo.svg';
import { useEffect, useState } from 'react';

export default function Login({ onLogin, isSubmitError }) {
  const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [mailFilled, setMailFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);
  const [mailError, setMailError] = useState('Почта не может быть пустой');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [submitError, setSubmitError] = useState('');
  const [formValid, setFormValid] = useState(false);
  useEffect(() => {
    if (mailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [mailError, passwordError]);
  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      mail,
      password
    });
    if (isSubmitError) {
      console.log(isSubmitError)
      setSubmitError('Неверно введены логин или пароль');
    }
  }
  function focusHandler(e) {
    switch (e.target.name) {
      case 'mail':
        setMailFilled(true);
        break
      case 'password':
        setPasswordFilled(true);
        break
      default:
    }
  }
  function handleMailChange(e) {
    setMail(e.target.value);
    if (e.target.value.match(emailRegexp)) {
      setMailError('');
    } else {
      setMailError('Некорректный email');
    }
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError('');
    } else {
      setPasswordError('Пароль не может быть пустым');
    }
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
                name='mail'
                value={mail}
                onChange={handleMailChange}
                placeholder="E-mail"
                autoComplete="off"
                onFocus={focusHandler}
              />
              {(mailFilled && mailError) && <span className="register__error">{mailError}</span>}
            </div>
            <div className="register__input-field">
              <p className="register__input-title">Пароль</p>
              <input
                className="register__input"
                type="password"
                name='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder="Пароль"
                autoComplete="off"
                onFocus={focusHandler}
              />
              {(passwordFilled && passwordError) && <span className="register__error">{passwordError}</span>}
            </div>
          </fieldset>
          {isSubmitError && <span className="register__submit-error">{submitError}</span>}
          <button className={!formValid ? "register__submit disabled-button" : "register__submit transition"} type="submit" onClick={handleSubmit} disabled={!formValid}>Войти</button>
          <p className="register__sign">Ещё не зарегистрированы? <a className="register__link transition" href="/signup">Регистрация</a></p>
        </main>
      </div>
    </section>
  );
}