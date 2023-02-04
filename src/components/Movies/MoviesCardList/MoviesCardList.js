import MoviesCard from '../MoviesCard/MoviesCard.js';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';

export default function MoviesCardList({ isPreloader, filteredMovies, nothingFound, cards, onCardClick, onCardLike, onCardDelete }) {
  const [showCard, setShowCard] = useState(0);
  const [addCard, setAddCard] = useState(0);
  const [addMoviesEnbale, setAddMoviesEnable] = useState('false');
  useEffect(() => {
    function addMoviesStatus() {
      console.log(filteredMovies.length, showCard)
      if (filteredMovies.length - showCard > 0) {
        setAddMoviesEnable(true)
      } else {
        setAddMoviesEnable(false)
      }
    }
    const winWidth = window.innerWidth;
    if (winWidth >= 1280) {
      setShowCard(12)
      setAddCard(4)
    } if (winWidth > 990 && winWidth < 1280) {
      setShowCard(9)
      setAddCard(3)
    } if (winWidth >= 768 && winWidth <= 990) {
      setShowCard(8)
      setAddCard(2)
    } if (winWidth < 767) {
      setShowCard(5)
      setAddCard(2)
    }
    addMoviesStatus()
    // console.log(showCard, addCard, winWidth)
  },[showCard, addCard, filteredMovies.length])
  function handleAddMovies() {
    setShowCard(showCard + addCard);
  }
  return (
    <section className="card-list">
      <Preloader
        isPreloader={isPreloader}
      />
      <p className={!isPreloader && nothingFound ? "card-list__sign" : "card-list__sign card-list__sign_hidden"}>Ничего не найдено</p>
      <div className="card-list__cards">
        {filteredMovies.slice(0, showCard).map((movie) => 
        // {filteredMovies.map((movie) => 
        // cardCounter < cardsInWindow.show
            <MoviesCard
              key={movie.id}
              movie={movie}
            />
        )}
      </div>
      <div className="card-list__next">
        {addMoviesEnbale && <button className="card-list__button transition" onClick={handleAddMovies}>Ещё</button>}
      </div>
    </section>
  )
}