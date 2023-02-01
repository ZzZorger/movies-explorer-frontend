import MoviesCard from '../MoviesCard/MoviesCard.js'
// import Preloader from '../Preloader/Preloader'

export default function MoviesCardList({ cards, onCardClick, onCardLike, onCardDelete }) {
  return (
    <section className="card-list">
      {/* <Preloader /> */}
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
        {/* {cards.map(item => {
          return (
            <MoviesCard
              // key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )
        })} */}
      </div>
      <div className="card-list__next">
        <button className="card-list__button transition">Ещё</button>
      </div>
    </section>
  )
}