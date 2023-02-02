import { useEffect, useState } from 'react';

export default function SearchForm({ getAllMovies }) {
  const [movies, setMovies] = useState([]);
  // const [filteredMovies, setFilteredMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  function handleSearchChange(e) {
    setSearch(e.target.value);
    // if (e.target.value.length < 5 || e.target.value.length > 30) {
    //   setSearchError('Длинна имени должна быть от 5 до 30 символов');
    // } else {
    //   setSearchError('');
    // }
  }
  // function filterCards(cards, text) {
  //   const films = cards.filter(e => e.nameRU.match(text));
  //   return films;
  // }
  function filterMovies(text) {
    const allMovies = localStorage.getItem("movies")
    const filteredFilms = allMovies.filter(e => e.nameRU.match(text));
    console.log(filteredFilms)
  }
  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("filter", search);
    // console.log(search)
    getAllMovies();
    filterMovies();

    // console.log(onSubmit())
    // setMovies(onSubmit(search));
    // console.log(movies);
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