import SearchForm from './SearchForm/SearchForm.js';
import Preloader from './Preloader/Preloader.js';

export default function Main() {
  return (
    <main className='moviesPage'>
      <SearchForm />
      <Preloader />
      {/* <MoviesCardList /> */}
      {/* <MoviesCard /> */}
    </main>
  );
}