export default function MoviesCard({
  movie,
  onLikeButton,
  onDislikeButton,
  savedMovies,
  onSavedPageFlag
}) {
  const { nameRU, duration, trailerLink, image } = movie;
  const durationCalc = `${Math.trunc(duration / 60)}ч ${duration % 60}м`;
  const currentMovie = savedMovies.filter((item) => item.movieId === movie.id)[0]
  const isSaved = savedMovies.some((item) => item.movieId === movie.id);
  function handleLikeButton() {
    if (isSaved) {
      onDislikeButton(currentMovie._id)
    } else {
      onLikeButton(movie)
    }
  }
  function handleDeleteButton() {
    onDislikeButton(movie._id)
  }
  return (
    <article className="card">
      <a className="card__link" href={trailerLink} alt="ссылка на трейлер фильма" target="_blank" rel="noreferrer">
        <img className="card__img" alt="фрагмент фильма" src={!onSavedPageFlag ? `https://api.nomoreparties.co${image.url}` : `${movie.image}`} />
      </a>
      <h2 className="card__name">{nameRU}</h2>
      {!onSavedPageFlag ?
        <label className="flag">
          <input className="flag__checkbox" type="checkbox" onChange={handleLikeButton} checked={isSaved} />
          <span className="flag__span"></span>
        </label>
        :
        <button className="card__delete-button transition" type="button" aria-label="удалить карточку" onClick={handleDeleteButton} />
      }
      <p className="card__sign">{durationCalc}</p>
    </article>
  )
}