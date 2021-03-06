const express = require("express");
const router = express.Router();
const db = require("../models");
const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");

const { Server, Server_User, User, Channel, Message } = db;

router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const { name, ownerId } = req.body;
    const server = await Server.create({ name, ownerId });
    await Server_User.create({ serverId: server.id, userId: ownerId });
    await Channel.create({ name: "General", serverId: server.id });
    res.json({ server });
  })
);
router.post(
  "/createChannel",
  asyncHandler(async (req, res) => {
    const { name, serverId } = req.body;
    const channel = await Channel.create({ name, serverId });
    res.json({ channel });
  })
);

router.post(
  "/:id/createMessage",
  asyncHandler(async (req, res) => {
    const { value, userId, channelId } = req.body;
    const message = await Message.create({ value, userId, channelId });
    res.json({ message });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findByPk(parseInt(req.params.id, 10), {
      include:
      [
        {
          model: Server,
          through: Server_User,
          include: [
            {
              model: Channel,
            },
          ],
        },
      ],
    });
    // Server, through: Server_User})
    // all, nested:true})
    // [{ all: true, nested: true}]})

    const { Servers } = user;
    res.json(Servers);
  })
);

router.get(
  "/members/:serverId",
  asyncHandler(async (req, res) => {
    const members = await Server.findByPk(parseInt(req.params.serverId, 10), {
      include: User,
      through: Server_User,
    });
    console.log(members);
    res.json(members);
  })
);

router.get(
  "/channel/:id",
  asyncHandler(async (req, res) => {
    const server = await Server.findByPk(parseInt(req.params.id, 10), {
      include: Channel,
    });
    const { Channels } = server;
    res.json(Channels);
  })
);

router.get(
  "/messages/:id",
  asyncHandler(async (req, res) => {
    const messages = await Message.findAll({
      where: {
        channelId: parseInt(req.params.id, 10),
      },
      include: [User],
    });

    res.json(messages);
  })
);

router.get(
  "/name/:id",
  asyncHandler(async (req, res) => {
    const channel = await Channel.findByPk(parseInt(req.params.id, 10))

    res.json(channel);
  })
);

module.exports = router;
