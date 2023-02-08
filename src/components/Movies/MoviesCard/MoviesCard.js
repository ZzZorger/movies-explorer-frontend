// import { useEffect, useState } from "react";
import { useContext } from "react";
import { userData } from '../../../context/CurrentUserContext';

export default function MoviesCard({ 
  movie, 
  onLikeButton, 
  onDislikeButton, 
  savedMovies,
  onSavedPageFlag 
}) {
  // console.log(savedMovies)
  const currentUser = useContext(userData);
  const { nameRU, duration, trailerLink, image } = movie;
  const durationCalc = `${Math.trunc(duration / 60)}ч ${duration % 60}м`;


  const currentMovie = savedMovies.filter((item) => item.movieId === movie.id)[0]
  const isSaved = savedMovies.some((item) => item.movieId === movie.id);
  // const isSaved = savedMovies.some((item) => {
  //   if (onSavedPageFlag) {return item.movieId === movie.id && currentUser._id === movie.owner}
  //   else {return item.movieId === movie.id}
  // });


  // console.log(isSaved)
  // if (currentUser._id === movie.owner) {
  //   const isSaved = savedMovies.some((item) => item.movieId === movie.id);
  // }

  function handleLikeButton() {
    if (isSaved) {
      onDislikeButton(currentMovie._id)
    } else {
      onLikeButton(movie)
    }
  }
  function handleDeleteButton() {
    onDislikeButton(movie._id)
    // console.log(movie._id)
    // console.log(currentUser._id, movie.owner)
    // if (movie.owner === )
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