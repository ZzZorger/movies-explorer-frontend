import MoviesCard from '../MoviesCard/MoviesCard.js'
import Preloader from '../Preloader/Preloader'

export default function MoviesCardList({ isPreloader, filteredMovies, nothingFound, cards, onCardClick, onCardLike, onCardDelete }) {
  return (
    <section className="card-list">
      <Preloader 
        isPreloader={isPreloader}
      />
      <p className={!isPreloader && nothingFound ? "card-list__sign" : "card-list__sign card-list__sign_hidden"}>Ничего не найдено</p>
      <div className="card-list__cards">
        {/* <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard /> */}
        {/* {cards.map(item => {
          return (
            <MoviesCard

            />
          )
        })} */}
        {filteredMovies.map(movie => {
          return (
            // console.log(movie)
            <MoviesCard
              key={movie.id}
              movie={movie}
            />
          )
        })}
      </div>
      <div className="card-list__next">
        <button className="card-list__button transition">Ещё</button>
      </div>
    </section>
  )
}