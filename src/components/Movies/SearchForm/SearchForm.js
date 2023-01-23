export default function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <fieldset className="search__fieldset">
          <div className="search__film">
            <input
              className="search__input"
              type="search"
              placeholder="Фильм"
            />
            <button className="search__submit transition" type="submit">Найти</button>
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