export const baseUrl =
                process.env.REACT_APP_BASEURL ||
                process.env.NODE_ENV === "production"
                    ? 'https://harmony-fullstack.herokuapp.com/'
                    : 'http://localhost:8081'
