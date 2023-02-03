import MoviesCard from '../MoviesCard/MoviesCard.js';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';

export default function MoviesCardList({ isPreloader, filteredMovies, nothingFound, cards, onCardClick, onCardLike, onCardDelete }) {
  const [showCard, setShowCard] = useState('');
  const [addCard, setAddCard] = useState('');
  const [cardCounter, setCardCounter] = useState(0)
  // const cardsInWindow = {
  //   large: {
  //     width: 1280,
  //     showMovies: 12,
  //     addMovies: 4,
  //   },
  //   medium: {
  //     width: 990,
  //     showMovies: 9,
  //     addMovies: 3,
  //   },
  //   small: {
  //     width: 768,
  //     showMovies: 8,
  //     addMovies: 2,
  //   },
  //   smallest: {
  //     width: 767,
  //     showMovies: 5,
  //     addMovies: 2,
  //   },
  // };
  const cardsInWindow = { show: 0, add: 0 };
  useEffect(() => {
    calcCardCounter();
  })
  function calcCardCounter() {
    const winWidth = document.documentElement.clientWidth;
    if (winWidth >= 1280) {
      cardsInWindow.show = 12;
      cardsInWindow.add = 4;
    } if (winWidth <= 990) {
      cardsInWindow.show = 9;
      cardsInWindow.add = 3;
    } if (winWidth <= 768) {
      cardsInWindow.show = 8;
      cardsInWindow.add = 2;
    } if (winWidth <= 767) {
      cardsInWindow.show = 5;
      cardsInWindow.add = 2;
    }
    return cardsInWindow
  }
  return (
    <section className="card-list">
      <Preloader
        isPreloader={isPreloader}
      />
      <p className={!isPreloader && nothingFound ? "card-list__sign" : "card-list__sign card-list__sign_hidden"}>Ничего не найдено</p>
      <div className="card-list__cards">
        {filteredMovies.map((movie) => 
        // cardCounter < cardsInWindow.show
            <MoviesCard
              key={movie.id}
              movie={movie}
            />
          // return (
          //   <MoviesCard
          //     key={movie.id}
          //     movie={movie}
          //   />
          // )
        )}
      </div>
      <div className="card-list__next">
        <button className="card-list__button transition">Ещё</button>
      </div>
    </section>
  )
}