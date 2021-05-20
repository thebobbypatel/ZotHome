const userRouter = require("express").Router();

userRouter.get('/', (req, res) => {

    console.log('GET /')

    res.json( {
        text: 'hello',
        number: 5
    })

})


module.exports = userRouter