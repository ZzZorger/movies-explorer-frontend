import { useEffect, useState } from "react";

export default function MoviesCard({ movie, onLikeButton, onDislikeButton, savedMovies, savedMoviesList }) {
  const { nameRU, duration, trailerLink, image } = movie;
  const durationCalc = `${Math.trunc(duration / 60)}ч ${duration % 60}м`;
  const currentMovie = savedMovies.filter((item) => item.movieId === movie.id)[0]
  useEffect(() => {
    const isSaved = savedMovies.some((item) => item.movieId === movie.id);
    setSaveMovie(isSaved)
  }, [savedMovies, movie.id])
  const [saveMovie, setSaveMovie] = useState(false)

  function handleLikeButton() {
    if (saveMovie) {
      setSaveMovie(false)
      onDislikeButton(currentMovie._id)
    } else {
      setSaveMovie(true)
      onLikeButton(movie)
    }
  }
  
  return (
    <article className="card">
      <a className="card__link" href={trailerLink} alt="ссылка на трейлер фильма" target="_blank" rel="noreferrer">
        <img className="card__img" alt="фрагмент фильма" src={`https://api.nomoreparties.co${image.url}`} />
      </a>
      <h2 className="card__name">{nameRU}</h2>
      <button className="card__delete-button transition" type="button" aria-label="удалить карточку" />
      <label className="flag">
        <input className="flag__checkbox" type="checkbox" onChange={handleLikeButton} checked={saveMovie}/>
        <span className="flag__span"></span>
      </label>
      <p className="card__sign">{durationCalc}</p>
    </article>
  )
}