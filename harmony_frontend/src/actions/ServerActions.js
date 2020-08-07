import {baseUrl} from '../config'

export const ADD_SERVER='ADD_SERVER'
export const ADD_CHANNEL='ADD_CHANNEL'

export const addServer = (server) => ({
    type: ADD_SERVER,
    server
  });

export const addChannel = (channel) => ({
    type: ADD_SERVER,
    channel
  });

export const createServer = (name, ownerId) => async dispatch => {
    const response = await fetch(`${baseUrl}/servers/create`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, ownerId}),
    })

    if (response.ok) {
        const {server} = await response.json()
        dispatch(addServer(server))
    } else {
        const errors = await response.json();
        console.error(errors)
    }
}

// export const createChannel = (name, serverId) => async dispatch => {
//     const response = await fetch(`${baseUrl}/servers/createChannel`, {
//         method: 'post',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({name, serverId}),
//     })

//     if (response.ok) {
//         const {channel} = await response.json()
//         const {id, name} = server;
//         dispatch(addServer(id, name))
//     } else {
//         const errors = await response.json();
//         console.error(errors)
//     }
// }

export const getServers = (userId) => async dispatch => {
    const response = await fetch(`${baseUrl}/servers/${userId}`, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })

    if(response.ok) {
        const servers = await response.json()
        dispatch(addServer(servers))
        // servers.forEach((server, i) => {
        //     dispatch(addServer(server))
        // })

    } else {
        const errors = await response.json();
        console.error(errors)
    }
}
