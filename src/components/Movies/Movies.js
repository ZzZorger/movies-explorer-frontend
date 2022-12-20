import SearchForm from './SearchForm/SearchForm.js';
// import Preloader from './Preloader/Preloader.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js'

export default function Main() {
  return (
    <main className='movies-page'>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
      {/* <MoviesCard /> */}
    </main>
  );
}