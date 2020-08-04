import {baseUrl} from '../config'

const HARMONY_KEY = 'HARMONY_KEY';
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';


export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const registerUser = (email, userName, password) => async dispatch => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, userName, password}),
  })

  if (res.ok) {
    const {token, user} = await res.json()
    window.localStorage.setItem(HARMONY_KEY, token)
    dispatch(setToken(token))
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
    const { token } = await response.json();
    window.localStorage.setItem(HARMONY_KEY, token);
    dispatch(setToken(token));
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
    dispatch(removeToken());
  }
};
