import HeaderMovies from '../Header/HeaderMovies/HeaderMovies';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userData } from '../../context/CurrentUserContext.js';

export default function Profile({ onLogout, onEdit }) {
  const history = useHistory();
  const currentUser = useContext(userData);
  const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [nameFilled, setNameFilled] = useState(false);
  const [emailFilled, setEmailFilled] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formChanged, setFormChanged] = useState(false);
  const [changeIsOk, setChangeIsOk] = useState(false);
  const [serverError, setServerError] = useState(false)
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);
  function handleLogout() {
    onLogout();
    history.push("/");
  }
  function handleEdit(e) {
    e.preventDefault();
    onEdit({
      name,
      email,
      setChangeIsOk,
      setServerError,
      setFormChanged,
    })
  }
  function focusHandler(e) {
    setServerError(false)
    setChangeIsOk(false)
    switch (e.target.name) {
      case 'email':
        setEmailFilled(true)
        break
      case 'name':
        setNameFilled(true)
        break
      default:
    }
  }
  function handleNameChange(e) {
    setFormChanged(true);
    setName(e.target.value);
    if (e.target.value.length < 5 || e.target.value.length > 30) {
      setFormChanged(false);
      setNameError('Длинна имени должна быть от 5 до 30 символов');
    } 
    else if (e.target.value === currentUser.name) {
      setFormChanged(false);
    }
    else {
      setNameError('');
    }
    
  }
  function handleEmailChange(e) {
    setFormChanged(true);
    setEmail(e.target.value);
    if (e.target.value.match(emailRegexp)) {
      setEmailError('');
    } 
    else {
      setEmailError('Некорректный email');
      setFormChanged(false);
    }
    if (e.target.value === currentUser.email) {
      setFormChanged(false);
    }
  }
  return (
    <section className='profile'>
      <HeaderMovies />
      <div className="profile__content">
        <h1 className="profile__title">Привет, {currentUser.name}</h1>
        <fieldset className="profile__fieldset">
          <div className="profile__input-field">
            <p className="profile__input-title">Имя</p>
            <input
              className="profile__input"
              type="text"
              name="name"
              value={name ?? ''}
              onChange={handleNameChange}
              autoComplete="off"
              onFocus={focusHandler}
            />
          </div>
          {(nameFilled && nameError) && <span className="profile__error">{nameError}</span>}
          <div className="profile__input-field">
            <p className="profile__input-title">E-mail</p>
            <input
              className="profile__input"
              type="email"
              name="email"
              value={email ?? ''}
              onChange={handleEmailChange}
              autoComplete="off"
              onFocus={focusHandler}
            />
          </div>
          {(emailFilled && emailError) && <span className="profile__error">{emailError}</span>}
        </fieldset>
        {changeIsOk && <span className="profile__span">Данные успешно сохранены</span>}
        {serverError && <span className="profile__span-error">Пользователь с данной почтой уже зарегестрирован</span>}
        <button className={(!formChanged || serverError) ? "profile__change disabled-sign" : "profile__change transition"} type="submit" onClick={handleEdit} disabled={!formChanged}>Редактировать</button>
        <button className="profile__exit transition" type="button" onClick={handleLogout}>Выйти из аккаунта</button>
      </div>
    </section>
  );
}