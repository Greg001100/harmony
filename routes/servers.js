const express = require("express");
const router = express.Router();
const db = require("../models");
const { asyncHandler } = require("../utils");
const {requireAuth} = require("../auth");


const {Server, Server_User, User} = db;

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
        const user = await User.findByPk(2, {include: Server})
        const {Servers} = user
        res.json(Servers)
    })
)

module.exports = router
