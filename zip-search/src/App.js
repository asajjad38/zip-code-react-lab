import React, { Component } from 'react';
import './App.css';


function City({cityDetails}) {
  return (<div className="card" Style="width: 18rem">
            <div className="card-header">
            {cityDetails.LocationText}
            </div>
            <ul>
              <li>State: {cityDetails.State}</li>
              <li>Location: {cityDetails.Long}</li>
              <li>Population (estimated): {cityDetails.EstimatedPopulation}</li>
              <li>Total Wages: {cityDetails.TotalWages}</li>
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
    this.setState({
      zipCode: '',
      cities : []
    })

    console.log(event.target.value);
    if (event.target.value.length === 5){
      console.log("Valid Zipcode Length")
      this.setState({zipCode : event.target.value})

      fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
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
        <h4>Current Zip: {this.state.zipCode}</h4>
        <div>
          {this.state.cities.map(x => <City cityDetails={x}/>)}
        </div>
      </div>
    );
  }
}

export default App;
