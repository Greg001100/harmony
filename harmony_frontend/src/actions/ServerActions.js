import {baseUrl} from '../config'

export const ADD_SERVER='ADD_SERVER'

export const addServer = (id, name) => ({
    type: ADD_SERVER,
    id,
    name
  });

export const createServer = (serverName, owner) => async dispatch => {
    const response = await fetch(`${baseUrl}/createServer`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({serverName, owner}),
    })

    if (response.ok) {
        const {id, name} = await response.json()
        dispatch(addServer(id, name))
    } else {
        const errors = await response.json();
        console.error(errors)
    }
}
