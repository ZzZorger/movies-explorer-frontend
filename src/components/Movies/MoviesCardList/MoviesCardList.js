import MoviesCard from '../MoviesCard/MoviesCard.js';
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList({ 
  isPreloader, 
  filteredMovies, 
  showCard,
  addMoviesEnbale,
  handleAddMovies,
  nothingFound,
  onLikeButton
}) 
{
  return (
    <section className="card-list">
      <Preloader
        isPreloader={isPreloader}
      />
      <p className={!isPreloader && nothingFound ? "card-list__sign" : "card-list__sign card-list__sign_hidden"}>Ничего не найдено</p>
      <div className="card-list__cards">
        {filteredMovies.slice(0, showCard).map((movie) =>
          <MoviesCard
            key={movie.id}
            movie={movie}
            onLikeButton={onLikeButton}
          />
        )}
      </div>
      <div className="card-list__next">
        {!addMoviesEnbale && <button className="card-list__button transition" onClick={handleAddMovies}>Ещё</button>}
      </div>
    </section>
  )
}