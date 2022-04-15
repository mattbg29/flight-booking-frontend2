import React from 'react';
import './App.css';
import GetFlights from "./api/getFlights";
import GetWeather from "./api/getWeather";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataNow: [],
      onOff: 0,
    };
  this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
      this.setState({dataNow: event})
      this.setState({onOff: 1})
    }

  render(){
    return (
      <div className="App" style={{position: 'relative'}}>
          <GetFlights handleCallback = {(dataNow) => {this.handleClick(dataNow)}} />
          {this.state.onOff === 1 && <div style={{position: 'relative', marginTop: 150}}><GetWeather data={this.state.dataNow} /></div>}
      </div>
    );
  }
}

export default App;

