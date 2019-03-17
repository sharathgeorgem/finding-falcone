import React, { Component } from 'react'
import axios from 'axios'
import './Vehicles.css'

class Vehicles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedPlanets: this.props.location.state,
      vehicles: []
    }
  }
  componentDidMount () {
    axios.get('https://findfalcone.herokuapp.com/vehicles')
      .then(response => {
        console.log(response)
        this.setState({
          vehicles: response.data
        })
      })
      .catch(error => console.log(error))
  }
  render () {
    console.log(this.state.selectedPlanets)
    console.log(this.state.vehicles)
    return (
      <h1>Vehicles Component</h1>
    )
  }
}

export default Vehicles
