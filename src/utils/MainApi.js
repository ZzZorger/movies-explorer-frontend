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
  // getServerData() {
  //   return fetch(`${this._server}/users/me`, {
  //     method: 'GET',
  //     headers: this._headers,
  //     credentials: 'include',
  //   })
  //     .then((res) => this._getResponseData(res))
  // }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.myseconddomainand.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  }
});

export { mainApi };