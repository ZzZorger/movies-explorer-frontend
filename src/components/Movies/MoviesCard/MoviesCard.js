import { useEffect, useState } from "react";

export default function MoviesCard({
  movie,
  onLikeButton,
  onDislikeButton,
  savedMovies,
  onSavedPageFlag
}) {
  console.log(savedMovies)
  const { nameRU, duration, trailerLink, image } = movie;
  const durationCalc = `${Math.trunc(duration / 60)}ч ${duration % 60}м`;

  // const currentMovie = savedMovies.find((item) => item.movieId === movie.id) || 0
  // const isSavede = typeof currentMovie === 'object';
  // const [isSaved, setIsSaved] = useState(typeof currentMovie === 'object');
  // useEffect(() => {
  //   console.log(movie)
  //   const currentMovie = savedMovies.find((item) => item.movieId === movie.id)
  //   setIsSaved(typeof currentMovie === 'object')
  // }, [movie.id])
  // console.log(typeof currentMovie === 'object')
  // console.log(currentMovie)
  // console.log(savedMovies, movie)
  // console.log(currentMovie, isSaved)
  // console.log(movie)
  function handleLikeButton(e) {
    // console.log(e.target.checked)
    // console.log(isSaved)
    if (movie.isSaved) {
      onDislikeButton(movie._id)
      // setIsSaved(e.target.checked)
    } else {
      onLikeButton(movie)
      // setIsSaved(e.target.checked)
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
          <input className="flag__checkbox" type="checkbox" onChange={handleLikeButton} checked={movie.isSaved} />
          {/* <button className="flag__checkbox" type="checkbox" onClick={handleLikeButton} /> */}
          <span className="flag__span"></span>
        </label>
        :
        <button className="card__delete-button transition" type="button" aria-label="удалить карточку" onClick={handleDeleteButton} />
      }
      <p className="card__sign">{durationCalc}</p>
    </article>
  )
}