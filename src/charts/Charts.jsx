import React, { Component } from 'react'
import axios from 'axios'
import { Bar, Line } from 'react-chartjs-2';
import '../style.css'

class Charts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            line: {},
            isloading: true
        }
    }
    componentDidMount() {
        this.getdata()
    }
    getdata = () => {
         axios('./db.json')
            .then((res) => {
                this.computedata(res)
            })
            .catch((err) => console.log("some error occurs"))
    }

    
    // Grouping the date and get total sum and count of particular day
    
    computedata = (res) => {
        let data = res.data.orders
        let obj = {}
        let obj2 = {}
        let temparr = []
        let labelarra = []
        let dayarr = []
        let pricearr = []

        for (let i = 0; i < data.length; i++) {
            data[i]['created'] = data[i]['created'].split("T")
            if (obj[data[i]['created'][0]] !== undefined) {
                obj[data[i]['created'][0]] = obj[data[i]['created'][0]] + 1
                obj2[data[i]['created'][0]] = obj2[data[i]['created'][0]] + Number(data[i]['price'])
            }
            else {
                obj[data[i]['created'][0]] = 1
                obj2[data[i]['created'][0]] = Number(data[i]['price'])
            }
        }
        let datearr = Object.keys(obj)
        for (let i = 0; i < datearr.length; i++) {
            temparr.push([datearr[i], obj[datearr[i]], obj2[datearr[i]]])
        }
        for (let i = 0; i < temparr.length; i++) {
            labelarra.push("day " + (i + 1))
            dayarr.push(Number(temparr[i][1]))
            pricearr.push(Number(temparr[i][2]))
        }
        console.log(pricearr)
        this.setState({
            data:
            {
                labels: labelarra,
                datasets: [
                    {
                        label: 'No.of Orders',
                        backgroundColor: 'blue',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 1,
                        data: dayarr,
                        barThickness: 15,

                    }
                ]
            },
            line: {
                labels: labelarra,
                datasets: [
                    {
                        label: 'Price',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'green',
                        borderColor: 'red',
                        borderWidth: 2,
                        data: pricearr
                    }
                ]
            },
            isloading: false
        })
    }
    render() {
        if (!this.state.isloading) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 p-4">
                            <div className="chartDiv">
                                <Bar data={this.state.data}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Orders per Day',
                                            fontSize: 20,
                                        },
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        },
                                        legend: {
                                            display: true,
                                            position: 'bottom'
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className='col-6 p-4'>
                            <div className="chartDiv">
                                <Line
                                    data={this.state.line}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Price per Day',
                                            fontSize: 20
                                        },
                                        legend: {
                                            display: true,
                                            position: 'bottom'
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="text-center">
                    <h1>Loading....</h1>
                </div>
            )
        }
    }
}
export default Charts