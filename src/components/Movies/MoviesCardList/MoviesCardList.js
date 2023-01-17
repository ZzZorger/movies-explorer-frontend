import MoviesCard from '../MoviesCard/MoviesCard.js'
// import Preloader from '../Preloader/Preloader'

export default function MoviesCardList() {
  return (
    <section className="card-list">
      {/* <Preloader /> */}
      <div className="card-list__cards">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </div>
      <div className="card-list__next">
        <button className="card-list__button transition">Ещё</button>
      </div>
    </section>
  )
}