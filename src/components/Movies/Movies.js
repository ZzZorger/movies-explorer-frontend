import SearchForm from './SearchForm/SearchForm.js';
// import Preloader from './Preloader/Preloader.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js'
import HeaderMovies from '../Header/HeaderMovies/HeaderMovies.js'
import Footer from '../Footer/Footer.js'

export default function Main() {
  return (
    <main className='movies-page'>
      <HeaderMovies />
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
      {/* <MoviesCard /> */}
      <Footer />
    </main>
  );
}