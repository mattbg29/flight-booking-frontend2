const GetWeather = (props) => {

    let targetCity = props.data.map((d, i) => <div className= 'col1' style={{borderStyle: 'solid'}}>{d.destCity}</div>)
    let targetDate = props.data.map((d) => <div className= 'col1' style={{borderStyle: 'solid'}}>{d.date}</div>)
    let targetPrice = props.data.map((d) => <div className= 'col1' style={{borderStyle: 'solid'}}>{d.price}</div>)
    let targetTemp = props.data.map((d) => <div className= 'col1' style={{borderStyle: 'solid'}}>{d.temp}</div>)        

    return (
        <div style={{display:'flex', marginTop: 20}}>
            <div className = "row" style={{display: 'grid', justifyContent: 'center', marginLeft: 0, gridTemplateColumns: 'repeat(1, 24vmin)'}}>City{targetCity}</div>
            <div className = "row" style={{display: 'grid', justifyContent: 'center', marginLeft: 0, gridTemplateColumns: 'repeat(1, 24vmin)'}}>Return{targetDate}</div>
            <div className = "row" style={{display: 'grid', justifyContent: 'center', marginLeft: 0, gridTemplateColumns: 'repeat(1, 24vmin)'}}>Price{targetPrice}</div>
            <div className = "row" style={{display: 'grid', justifyContent: 'center', marginLeft: 0, gridTemplateColumns: 'repeat(1, 24vmin)'}}>Temp{targetTemp}</div>
        </div>             
        );
}

export default GetWeather;