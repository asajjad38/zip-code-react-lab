import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div class="card" Style="width: 18rem">
            <div class="card-header">
            {props.cityDetails.LocationText}
            </div>
            <ul>
              <li>State: {props.cityDetails.State}</li>
              <li>Location: {props.cityDetails.Long}</li>
              <li>Population (estimated): {props.cityDetails.EstimatedPopulation}</li>
              <li>Total Wages: {props.cityDetails.TotalWages}</li>
            </ul>
          </div>);
}

function ZipSearchField(props) {
  return (<div>Zip Code: <input onChange= {props.changeHandler} type="text"></input></div>);
}


class App extends Component {

  state = {
    zipCode: '',
    cities: []
  }

  zipChanged = (event) => {
    console.log(event.target.value);
    if (event.target.value.length === 5){
      console.log("Valid Zipcode Length")
      this.setState({zipCode : event.target.value})

      fetch('http://ctp-zip-api.herokuapp.com/zip/'+event.target.value)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.setState({
            cities : data
          })
        })
    }

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipcode={this.state.zipCode} changeHandler={this.zipChanged}/>
        <div>
          {this.state.cities.map(x => <City cityDetails={x}/>)}
        </div>
      </div>
    );
  }
}

export default App;
