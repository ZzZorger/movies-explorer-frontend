class Auth {
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
  signUp(input) {
    return fetch(`${this._server}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: input.name,
        email: input.mail,
        password: input.password
      })
    })
      .then((res) => this._getResponseData(res))
  }

  signIn(input) {
    return fetch(`${this._server}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: input.mail,
        password: input.password
      }),
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res))
  }

  signOut() {
    return fetch(`${this._server}/signout`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res))
  }

  userValid() {
    return fetch(`${this._server}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res))
  }
}
const auth = new Auth({
  baseUrl: 'https://api.myseconddomainand.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  }
});

export { auth };
