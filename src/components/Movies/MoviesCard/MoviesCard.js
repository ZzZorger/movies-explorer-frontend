export default function MoviesCard({ movie, onLikeButton }) {
  const { nameRU, duration, trailerLink, image } = movie;
  const durationCalc = `${Math.trunc(duration / 60)}ч ${duration % 60}м`;
  function handleLikeButton() {
    onLikeButton(movie)
  }
  return (
    <article className="card">
      <a className="card__link" href={trailerLink} alt="ссылка на трейлер фильма" target="_blank" rel="noreferrer">
        <img className="card__img" alt="фрагмент фильма" src={`https://api.nomoreparties.co${image.url}`} />
      </a>
      <h2 className="card__name">{nameRU}</h2>
      <button className="card__delete-button transition" type="button" aria-label="удалить карточку" />
      <label className="flag">
        <input className="flag__checkbox" type="checkbox" onClick={handleLikeButton}/>
        <span className="flag__span"></span>
      </label>
      <p className="card__sign">{durationCalc}</p>
    </article>
  )
}