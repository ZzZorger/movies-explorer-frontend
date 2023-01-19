import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import HeaderMovies from '../Header/HeaderMovies/HeaderMovies.js';
import Footer from '../Footer/Footer.js';
import MenuPopup from './MenuPopup/MenuPopup.js';

export default function Moovies() {
  return (
    <main className='movies-page'>
      <HeaderMovies />
      <SearchForm />
      <MoviesCardList />
      <Footer />
      <MenuPopup />
    </main>
  );
}