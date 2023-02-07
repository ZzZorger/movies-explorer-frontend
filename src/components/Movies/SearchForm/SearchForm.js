export default function SearchForm({ 
  shortFilm, 
  searchError, 
  handleCheckboxChange, 
  handleSearchChange, 
  handleSubmitSearchForm, 
  search 
}) {
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
            <button className="search__submit transition" type="submit" onClick={handleSubmitSearchForm}>Найти</button>
          </div>
        </fieldset>
        {searchError && <span className="search__form-error">Поле поиска не может быть пустым</span>}
      </form>

      <div className="search__option">
        <p className="search__slider-sign">Короткометражки</p>
        <label className="slider">
          <input className="slider__checkbox" type="checkbox" onChange={handleCheckboxChange} checked={shortFilm} />
          {/* <input className="slider__checkbox" type="checkbox" onChange={handleCheckboxChange} checked={shortFilm} /> */}
          <span className="slider__span"></span>
        </label>
      </div>
    </section>
  )
}