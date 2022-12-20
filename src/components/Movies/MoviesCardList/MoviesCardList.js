import MoviesCard from '../MoviesCard/MoviesCard.js'

export default function MoviesCardList() {
  return (
    <section className="card-list">
      <div className="card-list__cards">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </div>
      <div className="card-list__next">
        <button className="card-list__button">Ещё</button>
      </div>
    </section>
  )
}