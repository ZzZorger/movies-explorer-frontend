import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import HeaderMovies from '../Header/HeaderMovies/HeaderMovies.js'
import Footer from '../Footer/Footer.js'

export default function SavedMovies() {
  return (
    <main className='movies-page'>
      <HeaderMovies />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </main>
  );
}