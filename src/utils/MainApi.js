class MainApi {
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
  patchProfileData(input) {
    return fetch(`${this._server}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: input.name,
        email: input.email
      }),
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res))
  }
  saveMovie(input) {
    return fetch(`${this._server}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: input.country,
        director: input.director,
        duration: input.duration,
        year: input.year,
        description: input.description,
        image: `https://api.nomoreparties.co${input.image.url}`,
        trailerLink: input.trailerLink,
        thumbnail: `https://api.nomoreparties.co${input.image.url}`,
        movieId: input.id,
        nameRU: input.nameRU,
        nameEN: input.nameEN
      }),
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res))
  }

  getMovies() {
    return fetch(`${this._server}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res))
  }

  deleteMovie(id) {
    return fetch(`${this._server}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => this._getResponseData(res))
  }
}

const mainApi = new MainApi({
  // baseUrl: 'https://api.myseconddomainand.nomoredomains.club',
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  }
});

export { mainApi };
