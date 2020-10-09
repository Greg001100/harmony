import { baseUrl } from "../config";

export const ADD_SERVER = "ADD_SERVER";
export const ADD_CHANNEL = "ADD_CHANNEL";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const CLEAR_CHANNELS = "CLEAR_CHANNELS";
export const ADD_MEMBERS = "ADD_MEMBERS";

export const addServer = (server) => ({
  type: ADD_SERVER,
  server,
});

export const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  channel,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message,
});

export const addMembers = (members) => ({
  type: ADD_MEMBERS,
  members,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});

export const clearChannels = () => ({
  type: CLEAR_CHANNELS,
});

export const createServer = (name, ownerId) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/servers/create`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, ownerId }),
  });

  if (response.ok) {
    const { server } = await response.json();
    dispatch(addServer(server));
  } else {
    const errors = await response.json();
    console.error(errors);
  }
};

export const createChannel = (name, serverId) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/servers/createChannel`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, serverId }),
  });

  if (response.ok) {
    const { channel } = await response.json();
    dispatch(addChannel(channel));
  } else {
    const errors = await response.json();
    console.error(errors);
  }
};

export const getServers = (userId) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/servers/${userId}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const servers = await response.json();
    dispatch(addServer(servers));
  } else {
    const errors = await response.json();
    console.error(errors);
  }
};
export const getMembers = (serverId) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/servers/members/${serverId}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const members = await response.json();
    dispatch(addMembers(members))
  } else {
    const errors = await response.json();
    console.error(errors);
  }
};

export const getChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/servers/channel/${serverId}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const channels = await response.json();
    dispatch(addChannel(channels));
  } else {
    const errors = await response.json();
    console.error(errors);
  }
};

export const getMessages = (channelId) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/servers/messages/${channelId}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const messages = await response.json();
    dispatch(addMessage(messages));
  } else {
    const errors = await response.json();
    console.error(errors);
  }
};

export const getName = (channelId) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/servers/name/${channelId}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const channel = await response.json();
    console.log(channel)
    return channel
  } else {
    const errors = await response.json();
    console.error(errors);
  }
};
