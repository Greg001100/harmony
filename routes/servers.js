const express = require("express");
const router = express.Router();
const db = require("../models");
const { asyncHandler } = require("../utils");
const {requireAuth} = require("../auth");


const {Server, Server_User, User, Channel} = db;

router.post(
    '/create',
    asyncHandler(async (req, res) => {
        const {name, ownerId} = req.body;
        const server = await Server.create({name, ownerId})
        await Server_User.create({serverId: server.id, userId: ownerId})
        res.json({server})
    })
)
router.post(
    '/createChannel',
    asyncHandler(async (req, res) => {
        const {name, serverId} = req.body;
        const channel = await Channel.create({name, serverId})
        res.json({channel})
    })
)

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const user = await User.findByPk(parseInt(req.params.id, 10), {include: Server})
        const {Servers} = user
        res.json(Servers)
    })
)

router.get(
    '/channel/:id',
    asyncHandler(async (req, res) => {
        const server = await Server.findByPk(parseInt(req.params.id, 10), {include: Channel})
        const {Channels} = server
        console.log('server:', server, 'channels:', Channels)
        res.json(Channels)
    })
)

module.exports = router
