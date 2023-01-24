class MoviesApi {
  constructor(options) {
    this._server = options.baseUrl;
    this._headers = options.headers;
  }
  _getResponseData(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  getAllMovies() {
    return fetch(`${this._server}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res))
  }
}
const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  }
});

export { moviesApi };
