import cardImage from '../../../images/initialCards/card1.jpg';

export default function MoviesCard() {
  return (
    <article className="card">
      <img className="card__img" alt="фрагмент фильма" src={cardImage} />
      <h2 className="card__name">33 слова о дизайне</h2>
      <button className="card__delete-button transition" type="button" aria-label="удалить карточку"/>
      <label className="card__toggle">
        <input className="flag" type="checkbox"/>
        <span className="flag__span"></span>
      </label>
      <p className="card__sign">1ч42м</p>
    </article>
  )
}