// import cardImage from '../../../images/initialCards/card1.jpg';

export default function MoviesCard({ movie }) {

  const { nameRU, duration, trailerLink, image, saved } = movie;
  const durationCalc = `${Math.trunc(duration / 60)}ч ${duration % 60}м`;
  return (
    <article className="card">
      <img className="card__img" alt="фрагмент фильма" src={`https://api.nomoreparties.co${image.url}`} />
      <h2 className="card__name">{nameRU}</h2>
      <button className="card__delete-button transition" type="button" aria-label="удалить карточку"/>
      <label className="flag">
        <input className="flag__checkbox" type="checkbox"/>
        <span className="flag__span"></span>
      </label>
      <p className="card__sign">{durationCalc}</p>
    </article>
  )
}