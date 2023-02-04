import { useState } from 'react';

export default function SearchForm({ onSubmit, onCheck, shortFilm }) {
  const [search, setSearch] = useState(localStorage.getItem("filter").replace(/['"]+/g, ''));

  function handleCheckboxChange(e) {
    onCheck();
  }
  function handleSearchChange(e) {
    setSearch(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("filter", JSON.stringify(search));
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
          <input className="slider__checkbox" type="checkbox" onChange={handleCheckboxChange} checked={shortFilm} />
          <span className="slider__span"></span>
        </label>
      </div>
    </section>
  )
}