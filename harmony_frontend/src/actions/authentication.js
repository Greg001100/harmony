import {baseUrl} from '../config'

const HARMONY_KEY = 'HARMONY_KEY';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';
export const REMOVE_AUTH = 'REMOVE_AUTH';
export const BAD_CREDENTIALS = 'BAD_CREDENTIALS';
export const VAL_ERRORS = 'VAL_ERRORS';


export const removeAuth = () => ({
  type: REMOVE_AUTH,
});

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const badCredentials =() => ({
  type: BAD_CREDENTIALS,
  badCredentials: true,
})

export const setValErrors = (valErrors) => ({
  type: VAL_ERRORS,
  valErrors

})

export const registerUser = (email, userName, password) => async dispatch => {
  const response = await fetch(`${baseUrl}/signup`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, userName, password}),
  })

  if (response.ok) {
    const { token, user } = await response.json();
    console.log(token, user)
    window.localStorage.setItem(HARMONY_KEY, token);
    dispatch(setToken(token));
    dispatch(setUser(user))
  } else {
    const valErrors = await response.json()
    dispatch(setValErrors(valErrors.errors))
    console.log(valErrors);
  }
}

export const loadToken = () => async dispatch => {
  const token = window.localStorage.getItem(HARMONY_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const login = (email, password) => async dispatch => {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token, user } = await response.json();
    window.localStorage.setItem(HARMONY_KEY, token);
    dispatch(setToken(token));
    dispatch(setUser(user))
  } else {
    dispatch(badCredentials())
  }
};

export const logout = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/logout`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    window.localStorage.removeItem(HARMONY_KEY);
    dispatch(removeAuth());
  }
};
