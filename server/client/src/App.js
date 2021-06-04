import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './index.css';
import 'antd/dist/antd.css';

import { Line } from 'react-chartjs-2';

import { Row, Col, Button, Input, Space} from 'antd';
import DataBox from './DataBox';





function App() {

    const [temp, setTemp] = useState(-1)
    const [humidity, setHumidity] = useState(-1)
    const [light, setLight] = useState(-1)
    const [sound, setSound] = useState(-1)

    const [setLightVal, setSetLightVal] = useState(4000)
    const [setTempVal, setSetTempVal] = useState(72)

    const [tempControl, setTempControl] = useState('?')
    const [soundStatus, setSoundStatus] = useState('?')
    const [lightStatus, setLightStatus] = useState('?')

    const [tempTimeData, setTempTimeData] = useState([])

    const [timeInterval, setTimeInterval] = useState(0)

    const [x, setX] = useState([])
    const [y, setY] = useState([])

    const sendSetTemp = () => {
        console.log(setTempVal)
        console.log('sending setTemp')
        const data = {
            "setTempVal": setTempVal
        }
        axios.post('https://zothome.herokuapp.com/setTemp', data).catch(err => console.log(err))
    }

    const sendSetLight = () => {
        console.log(setLightVal)
        console.log('sending setLight')
        const data = {
            "setLightVal": setLightVal
        }
        axios.post('https://zothome.herokuapp.com/setLight', data).catch(err => console.log(err))
    }

    setTimeout(() => {
        setTimeInterval(timeInterval + 1);
    }, 5000);

    const chartData = {
        labels: y,
        datasets: [
            {
                label: 'Temperature',
                data: x,
                fill: false,
                backgroundColor: 'rgb(25, 99, 132)',
                borderColor: 'rgba(25, 99, 132, 0.2)',
            },
        ],
    };


    useEffect(() => {
        console.log("----------- " + 'API Call ' + timeInterval + " ------------")
        axios.get('https://zothome.herokuapp.com/vitals')
            .then(res => {
                console.log('Get request status: ' + res.status)

                setTemp(res.data.temp)
                setHumidity(res.data.humidity)
                setSound(res.data.sound)
                setLight(res.data.light)

                setTempControl(res.data.tempControl)
                setSoundStatus(res.data.noise)
                setLightStatus(res.data.lightbulb)

                setTempTimeData(res.data?.tempTimeData)
                let xTemp = []
                let yTemp = []

                tempTimeData.forEach((res) => {
                    xTemp.push(res.temp);
                    let d = new Date(res.time)
                    yTemp.push(d.toLocaleString('en-US', { timeZone: 'PST' }));
                })

                setX(xTemp)
                setY(yTemp)


            })
            .catch(err => {
                console.log('Error: ' + err)
            })

    }, [timeInterval])

    const chartOptions = {
        responsive: true,
        title: {
            display: true,
            text: 'Creating Real-Time Charts with Flask'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }

  return (
    <div className="App">
        <Row>
            <p className={"pageTitle"}>ZotHome</p>
        </Row>
        <Row>
            <h1>Current Data: (Temp Setting: {setTempVal} Light Setting: {setLightVal})</h1>
        </Row>

        <Row>
            <Col>
                <DataBox title={"Temperature"} data={temp}/>
            </Col>
            <Col>
                <DataBox title={"Humidity"} data={humidity}/>
            </Col>

            <Col>
                <DataBox title={"Light"} data={light}/>
            </Col>
            <Col>
                <DataBox title={"Sound"} data={sound}/>
            </Col>
        </Row>

        <Row>
            <h1>Status:</h1>
        </Row>
        <Row>
            <Col>
                <DataBox title={"AC/Heater"} data={tempControl}/>
            </Col>
            <Col>
                <DataBox title={"Lightbulb"} data={lightStatus}/>
            </Col>
            <Col>
                <DataBox title={"Noise"} data={soundStatus}/>
            </Col>
        </Row>

        <Row>
            <h2>Set Temperature [Any] and Set Preferred Light Level [0 - 4095]:</h2>
        </Row>

        <Row>
            <Space size={'large'}>
                <Col>
                    <Input placeholder="Set Temperature" onChange={(e) => {setSetTempVal(e.target.value)}}/>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => sendSetTemp()}>Set</Button>
                </Col>
                <Col>
                    <Input placeholder="Set Light Level" onChange={(e) => {setSetLightVal(e.target.value)}}/>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => sendSetLight()}>Set</Button>
                </Col>
            </Space>
        </Row>


        <Row>
            <h2>Temperature History:</h2>
        </Row>

        <Row>
            <div className={'tempChart'}>
                <Line data={chartData} options={chartOptions}/>
            </div>
        </Row>

    </div>

  );
}

export default App;
