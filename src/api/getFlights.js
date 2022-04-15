import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import { useState } from "react";

const {CITYCODE} = require('./cityCode')

const GetFlights = (props) => {
    const[originCode, setOriginCode] = useState("BOS")
    const[duration, setDuration] = useState("")
    const[departureDate, setDepartureDate] = useState("")
    const[maxPrice, setMaxPrice] = useState("")
    let elementNew = {}
    const[style, setStyle] = useState({display: 'none'});
    const[msgNow, setMsgNow] = useState("")
    const showIt = {display: 'block', position: 'absolute', width: 500, marginLeft: 680, marginTop: 5, textAlign: 'left'}

    const formSubmitHandler = (e) => {
            e.preventDefault();
            let durationTest = duration.split(',') 
            if(durationTest.length == 1) {
                durationTest.push(durationTest[0])
            }
            if(maxPrice === "") {
                setMaxPrice(5000)
            }
            if(departureDate === '' || duration === ''){
                setMsgNow('Please enter all inputs')
                setStyle(showIt)
            } else if (/^20[2-9][2-9]-[0-1][0-9]-[0-3][0-9]$/.test(departureDate) == false) {
                setMsgNow('Please input a valid date')
                setStyle(showIt)
            } else if (parseInt(durationTest[0]) < 2 || parseInt(durationTest[0]) > 12) {
                setMsgNow('Please input a valid duration')
                setStyle(showIt)
            } else if (parseInt(durationTest[1]) < parseInt(durationTest[0]) || parseInt(durationTest[1]) > 12) {
                setMsgNow('Please input a valid duration')
                setStyle(showIt)            
            } else {
                 
            let compiledData = []    
            const urlNow = 'flight-destination-search?originCode=' + originCode + '&dateOfDeparture=' + departureDate + '&duration=' + duration + '&maxPrice=' + maxPrice 

            fetch(process.env.REACT_APP_API_ENDPOINT + urlNow, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            })
                .then(async(response) => {
                    const data = await response.json();
                    for (let i = 0; i< data['data'].length; i++) {
                        console.log(data['data'])
                        elementNew = {}
                        elementNew.date=data['data'][i]['returnDate']
                        elementNew.destination=data['data'][i]['destination']
                        elementNew.price=data['data'][i]['price']['total']
                        if ([...CITYCODE].reduce((prev, cur) => cur['code'] === elementNew.destination ? 1 + prev : 0 + prev, 0) === 1) {
                            elementNew.destCity=[...CITYCODE].filter((d) => d['code'] === elementNew.destination)[0]['name']
                        }
                        else {
                            elementNew.destCity = elementNew.destination
                            elementNew.temp = 'n/a'
                        }
                        compiledData.push(elementNew)
                }

                    for(let i = 0; i<compiledData.length; i++) {
                        if (compiledData[i].destCity === compiledData[i].destination) continue
                        const url = 'weather-search?destCity=' + compiledData[i]['destCity'] 
                        fetch(process.env.REACT_APP_API_ENDPOINT + url, {
                            method: "GET",
                            headers: {"Content-Type": "application/json"},
                        })
                            .then(async(response) => {
                                const data = await response.json();
                                const url2 = 'weather-search-2?lat=' + data[0]['lat'] + '&lon=' + data[0]['lon']
                                fetch(process.env.REACT_APP_API_ENDPOINT + url2, {
                                    method: "GET",
                                    headers: {"Content-Type": "application/json"},
                                })
                                    .then(async(response) => {
                                    const data2 = await response.json();
                                    compiledData[i].temp = data2.main.temp
                                    let initial = 0
                                    if((compiledData.reduce((prev, curr) => Math.pow(curr.temp,0) + prev, initial)) === compiledData.length){
                                            return props.handleCallback(compiledData)
                                        }
                                    })
                                })
                        
                    }
                    setMsgNow('')
                    setStyle({display: 'none'})
                    return props.handleCallback(compiledData)
                })
                .catch((error) => {
                    console.log(error)
                    compiledData = []
                    msgNow = 'Something went wrong'
                    return props.handleCallback(compiledData)
                })
            }
            
            }
                
                                            
    return (
            <div style={{display: 'flex', position: 'static', justifyContent: 'center', marginTop: 100}}>
                <div style={{position: 'absolute'}}>
                <form onSubmit={formSubmitHandler}>
                    <FormGroup>
                        <div>
                            <select style={{minWidth: 170, minHeight: 22}} value={originCode} onChange={(e) => setOriginCode(e.target.value)}>
                                <option value="BOS">BOS</option>
                                <option value="CHI">CHI</option>
                                <option value="DFW">DFW</option>
                                <option value="LAS">LAS</option>
                                <option value="LAX">LAX</option>
                                <option value="MIA">MIA</option>
                                <option value="MSP">MSP</option>
                                <option value="SFO">SFO</option>
                                <option value="YTO">YTO</option>
                            </select>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup
                            placeholder="Duration"
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputGroup
                            placeholder="Departure Date"
                            onChange={(e) => setDepartureDate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputGroup
                            placeholder="Max Price"
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: 7}}>
                        <div style={{position: 'absolute', marginRight: 60}}>
                        <Button
                            intent="primary"
                            type="submit"
                            text="Submit"
                        />
                        </div>
                        <div style={{marginLeft: 60, marginTop: 5}} onMouseEnter={e => {setStyle(showIt)}} onMouseLeave={e => {setStyle({display: 'none'})}}>
                            <i class="fa fa-info-circle" aria-hidden="true"></i></div>
                    </div>
                </form>
                </div>
                <div style={style}>Origin<br/>2-12. For range: 2,12<br/>YYYY-MM-DD<br/>Price in USD<br/><span style={{color: 'red'}}>{msgNow}</span></div>
            </div>           
    );
}

export default GetFlights;

