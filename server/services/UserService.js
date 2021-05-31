const Home = require('../models/home')
const mongoose = require('mongoose');


let currentTemp = 0
let temp = []
let humidity = 0
let sound = 0
let light = 0

let setTemp = 75

const importData = (data) => {
    if(data == null){
        return
    }
    console.log('data')
    console.log(data)
    currentTemp = data.temp
    temp.push({
        temp: data.temp,
        time: data.time,
    })
    humidity = data.humidity
    sound = data.sound
    light = data.light
    console.log(temp)
}

const processData = () => {

    let lightOnBool = false
    if(light >= 2000){
        lightOnBool = true
    }

    let tempControl = "none"
    if(temp < setTemp - 0.5){
        tempControl = "ac"
    }
    else if(temp > setTemp + 0.5){
        tempControl = "heater"
    }

    let homeStatus = {
        lightOn: lightOnBool,
        tempControl: tempControl
    }

    return homeStatus
}


module.exports = {
    importData,
    processData
}