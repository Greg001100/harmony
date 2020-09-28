const jwt = require("jsonwebtoken");
const { User } = require("./models");
const bearerToken = require("express-bearer-token");
const uuid = require('uuid').v4;

const { jwtConfig: { secret, expiresIn } } = require('./config/index');

const getUserToken = (user) => {
  const data = {
    id: user.id,
    email: user.email,
  };
  const jwtid = uuid();

  return {
    jti: jwtid,
    token: jwt.sign({ data }, secret, { expiresIn: Number.parseInt(expiresIn), jwtid })
  };
};

const restoreUser = (req, res, next) => {

  const { token } = req;

  if (!token) {
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      return next(e);
    }

    if (!req.user) {
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }

    return next();
  });
};

const requireAuth = [bearerToken(), restoreUser];

module.exports = { getUserToken, requireAuth };
