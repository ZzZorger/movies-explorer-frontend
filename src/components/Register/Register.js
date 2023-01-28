import headerLogo from '../../images/headerLogo.svg';
import { useEffect, useState } from 'react';

export default function Register({ onRegister }) {
  const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [nameFilled, setNameFilled] = useState(false);
  const [mailFilled, setMailFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [mailError, setMailError] = useState('Почта не может быть пустой');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [formValid, setFormValid] = useState(false);
  useEffect(() => {
    if (nameError || mailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, mailError, passwordError]);
  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      name,
      mail,
      password
    })
  }
  function focusHandler(e) {
    switch (e.target.name) {
      case 'mail':
        setMailFilled(true)
        break
      case 'name':
        setNameFilled(true)
        break
      case 'password':
        setPasswordFilled(true)
        break
      default:
    }
  }
  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.value.length < 5 || e.target.value.length > 30) {
      setNameError('Длинна имени должна быть от 5 до 30 символов');
    } else {
      setNameError('');
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
      setPasswordError('')
    } else {
      setPasswordError('Пароль не может быть пустым')
    }
  }
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
                name='name'
                value={name}
                onChange={handleNameChange}
                placeholder="Имя"
                autoComplete="off"
                onFocus={focusHandler}
              />
              {(nameFilled && nameError) && <span className="register__error">{nameError}</span>}
            </div>
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
          {(passwordFilled && passwordError) && <span className="register__error">{passwordError}</span>}
          <button className={!formValid ? "register__submit disabled-button" : "register__submit transition"} type="submit" onClick={handleSubmit} disabled={!formValid}>Зарегистрироваться</button>
          <p className="register__sign">Уже зарегистрированы?&ensp;<a className="register__link transition" href="/signin">Войти</a></p>
        </main>
      </div>
    </section>
  );
}