import { useEffect, useState } from 'react';

export default function SearchForm({ onSubmit }) {
  const [search, setSearch] = useState('');
  function handleSearchChange(e) {
    setSearch(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(search);
  }
  return (
    <section className="search">
      <form className="search__form">
        <fieldset className="search__fieldset">
          <div className="search__film">
            <input
              className="search__input"
              type="text"
              name="search"
              value={search}
              placeholder="Фильм"
              onChange={handleSearchChange}
              autoComplete="off"
            />
            <button className="search__submit transition" type="submit" onClick={handleSubmit}>Найти</button>
          </div>
        </fieldset>
      </form>
      <div className="search__option">
        <p className="search__slider-sign">Короткометражки</p>
        <label className="slider">
          <input className="slider__checkbox" type="checkbox"/>
          <span className="slider__span"></span>
        </label>
      </div>
    </section>
  )
}