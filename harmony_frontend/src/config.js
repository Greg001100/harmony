export const baseUrl =
                process.env.REACT_APP_BASEURL ||
                process.env.NODE_ENV === "production"
                    ? 'https://harmony-fullstack.herokuapp.com'
                    : 'http://localhost:8081'

export const wsUrl =
                process.env.REACT_APP_WS_URL ||
                process.env.NODE_ENV === "production"
                    ? 'https://harmony-fullstack.herokuapp.com'
                    : 'ws://localhost:8081'
