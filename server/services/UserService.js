
let currentTemp = 2000
let temp = []
let humidity = 2000
let sound = 2000
let light = 2000

let soundStatus = '?'
let tempControl = '?'
let lightStatus = '?'

let lightOn = false

let setTemp = 72
let setLight = 4000
let setSound = 4000

const setLightThreshold = (data) => {
    console.log(data)
    setLight = data.setLightVal
}

const setTempThreshold = (data) => {
    console.log(data)
    setTemp = data.setTempVal
}

const importData = (data) => {
    if(data == null){
        return
    }

    currentTemp = data.temp

    temp.push({
        temp: data.temp,
        time: Date.now(),
    })

    if(temp.length > 20){
        temp.shift()
    }

    humidity = data.humidity
    sound = data.sound
    light = data.light

    processData()

    let status = {
        lightbulb: lightOn,
        setLight: setLight,
        setTemp: setTemp
    }
    console.log(data)
    return status
}

const processData = () => {

    if(light < setLight){
        lightStatus = 'ON'
        lightOn = true;
    }
    else{
        lightStatus = 'OFF'
        lightOn = false;
    }

    if(currentTemp < setTemp){
        tempControl = "A/C"
    }
    else if(currentTemp > setTemp){
        tempControl = 'Heater'
    }
    else{
        tempControl = 'OFF'
    }

    if(sound > setSound){
        soundStatus = 'LOUD'
    }
    else{
        soundStatus = 'OK'
    }
}

const getVitals = () => {
    processData()
    let vitals = {
        lightbulb: lightStatus,
        tempControl: tempControl,
        noise: soundStatus,
        tempTimeData: temp,
        temp: currentTemp,
        humidity: humidity,
        sound: sound,
        light: light,
    }

    return vitals
}


module.exports = {
    setLightThreshold,
    setTempThreshold,
    importData,
    processData,
    getVitals,
}