const userRouter = require("express").Router();
const userService = require("../services/UserService");

userRouter.post('/data', async (req, res) => {
    console.log('POST /data')

    let status = await userService.importData(req.body)

    res.json(status)

})

userRouter.post('/setLight', async (req, res) => {
    console.log('POST /setLight')

    let status = await userService.setLightThreshold(req.body)

    res.json(status)

})

userRouter.post('/setTemp', async (req, res) => {
    console.log('POST /setTemp')

    let status = await userService.setTempThreshold(req.body)

    res.json(status)

})

userRouter.get('/vitals', async (req, res) => {
    console.log('GET /vitals')

    res.json(userService.getVitals())

})

module.exports = userRouter