import { Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies'
import './App.css';

function App() {
  return (
    <div className='body'>
      <div className="page">
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        {/* <Route path="/saved-movies">
          <SavedMovies />
        </Route> */}
      </div>
    </div>
  );
}

export default App;
