import { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList({
  isPreloader,
  filteredMovies,
  showCard,
  addMoviesEnable,
  handleAddMovies,
  nothingFound,
  onLikeButton,
  onDislikeButton,
  savedMovies,
  onSavedPageFlag
}) {
  console.log(filteredMovies, savedMovies)
  return (
    <section className="card-list">
      <Preloader
        isPreloader={isPreloader}
      />
      <p className={!isPreloader && nothingFound ? "card-list__sign" : "card-list__sign card-list__sign_hidden"}>Ничего не найдено</p>
      <div className="card-list__cards">
        {filteredMovies.slice(0, showCard).map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              onLikeButton={onLikeButton}
              onDislikeButton={onDislikeButton}
              savedMovies={savedMovies}
              filteredMovies={filteredMovies}
              onSavedPageFlag={onSavedPageFlag}
            />)
        }
        )}
      </div>
      {/* {!onSavedPageFlag ?
        <div className="card-list__cards">
          {filteredMovies.slice(0, showCard).map((movie) => {
            return (
              <MoviesCard
                key={movie.id || movie._id}
                movie={movie}
                onLikeButton={onLikeButton}
                onDislikeButton={onDislikeButton}
                savedMovies={savedMovies}
                filteredMovies={filteredMovies}
                onSavedPageFlag={onSavedPageFlag}
              />)
          }
          )}
        </div>
        :
        <div className="card-list__cards">
          {savedMovies.slice(0, showCard).map((movie) => {
            return (
              <MoviesCard
                key={movie.id || movie._id}
                movie={movie}
                onLikeButton={onLikeButton}
                onDislikeButton={onDislikeButton}
                savedMovies={savedMovies}
                filteredMovies={filteredMovies}
                onSavedPageFlag={onSavedPageFlag}
              />)
          }
          )}
        </div>
      } */}
      <div className="card-list__next">
        {!addMoviesEnable && <button className="card-list__button transition" onClick={handleAddMovies}>Ещё</button>}
      </div>
    </section>
  )
}