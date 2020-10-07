# Harmony
Harmony is a Discord clone. Designed using React/Redux on the frontend and express and sequelize on the back end.

[Harmony Live](https://harmony-fullstack.herokuapp.com/)

For initial design documents, please visit the [wiki](https://github.com/Greg001100/harmony/wiki).

Harmony allows users to:
- Create an account and log in and out securely.
- Create their own servers, and add chat channels within each of their created servers.
- Chat in real time with other users logged into the same server (webSocket)
- invite/share servers with friends
- private message friends

## Technology Used:
- React.js
- Redux
- WebSocket
- React-Bootstrap
- PostgreSQL
- Express
- JSON web tokens
- Sequelize
- BCrypt

## Primary Components:
**User Authentication**
Users can create an account and log in securely thanks to BCrypt for password hashing and storage. Harmony also uses json web tokens when communicating between the back end and front end to make sure requests are coming from the right place and are only doing what they are allowed to do.

**Servers and Channels**
A key part of Harmony's structure are its servers. Users can create their own server that houses as many separate chat channels as they want. Each server and channel can be customized by name, and users can create private servers and invite their friends.

**Live chat**
The core feature of harmony is live chat. The app uses websockets to keep a constant connection between the user and the server, allowing the server to push new updates to the client without waiting for a refresh or request.


