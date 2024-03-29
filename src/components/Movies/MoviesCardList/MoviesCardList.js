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
  onSavedPageFlag,
  afterFilterFlag
}) {
  return (
    <section className="card-list">
      <Preloader
        isPreloader={isPreloader}
      />
      {!onSavedPageFlag ?
      <p className={filteredMovies.length === 0 ? "card-list__sign" : "card-list__sign card-list__sign_hidden"}>Ничего не найдено</p> :
      <p className={filteredMovies.length === 0 && nothingFound ? "card-list__sign" : "card-list__sign card-list__sign_hidden"}>Ничего не найдено</p>
      }
      {!onSavedPageFlag ?
        <div className="card-list__cards">
          {filteredMovies.slice(0, showCard).map((movie) => {
            return (
              <MoviesCard
                key={movie.id || movie._id}
                movie={movie}
                onLikeButton={onLikeButton}
                onDislikeButton={onDislikeButton}
                onSavedPageFlag={onSavedPageFlag}
              />)
          }
          )}
        </div>
        :
        (afterFilterFlag ?
          <div className="card-list__cards">
            {filteredMovies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.id || movie._id}
                  movie={movie}
                  onLikeButton={onLikeButton}
                  onDislikeButton={onDislikeButton}
                  onSavedPageFlag={onSavedPageFlag}
                />)
            }
            )}
          </div> :
          <div className="card-list__cards">
            {savedMovies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.id || movie._id}
                  movie={movie}
                  onLikeButton={onLikeButton}
                  onDislikeButton={onDislikeButton}
                  onSavedPageFlag={onSavedPageFlag}
                />)
            }
            )}
          </div>
        )
      }
      <div className="card-list__next">
        {!addMoviesEnable && !onSavedPageFlag && <button className="card-list__button transition" onClick={handleAddMovies}>Ещё</button>}
      </div>
    </section>
  )
}