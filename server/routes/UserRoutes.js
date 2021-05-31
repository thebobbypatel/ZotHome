const userRouter = require("express").Router();
const userService = require("../services/UserService");

userRouter.get('/', async (req, res) => {
    console.log('GET /')

    res.sendStatus(200)

})

userRouter.post('/data', async (req, res) => {
    console.log('PUT /data')

    await userService.importData(req.body)

    res.sendStatus(200)

})

userRouter.get('/status', async (req, res) => {
    console.log('GET /status')

    res.json(userService.processData())

})

module.exports = userRouter