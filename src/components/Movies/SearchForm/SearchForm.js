import searchFormSlider from '../../../images/searchFormSlider.svg';

export default function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <fieldset className="search__fieldset">
          <div classsName="search__film">
            <input
              className="search__input"
              type="search"
              placeholder="Фильм"
            />
            <button className="search__submit transition" type="submit">Найти</button>
          </div>
        </fieldset>
      </form>
      <p className="search__slider-sign">Короткометражки</p>
      <img className="search__slider" alt="флажок" src={searchFormSlider}/>
      {/* <input class="search__slider" type="checkbox" src={searchFormSlider}></input> */}
    </section>
  )
}