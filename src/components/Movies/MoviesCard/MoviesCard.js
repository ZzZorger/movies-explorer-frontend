import cardImage from '../../../images/initialCards/card1.jpg'
import cardCheckbox from '../../../images/cardCheckbox.svg'

export default function MoviesCard() {
  return (
    <article className="card">
      <img className="card__img" alt="фрагмент фильма" src={cardImage} />
      <h2 className="card__name">33 слова о дизайне</h2>
      <label className="card__toggle">
        {/* <input className="card__checkbox" type="checkbox" />
        <span className="card__span"></span> */}
        <input className="slider" type="checkbox"/>
        <span className="slider__span"></span>
      </label>
      <p className="card__sign">1ч42м</p>
    </article>
  )
}