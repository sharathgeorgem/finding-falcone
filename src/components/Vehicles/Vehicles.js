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
    this.vehicleToFileName = this.vehicleToFileName.bind(this)
    this.handleVehicleClick = this.handleVehicleClick.bind(this)
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
  vehicleToFileName (vehicle) {
    let vehicleName = vehicle.name.split('')
    vehicleName.splice(vehicleName.indexOf(' '), 1, '_')
    return vehicleName.join('')
  }
  handleVehicleClick (index, e) {
    let vehicles = this.state.vehicles
    console.log('The click event contains ', e)
    if (vehicles[index].total_no > 0) {
      --vehicles[index].total_no
      this.setState({vehicles})
      console.log('The total number is given as ', this.state.vehicles[index].total_no)
    } else {
      console.log('You just exhausted your options. No more clicks.')
    }
  }
  render () {
    console.log(this.state.selectedPlanets)
    console.log(this.state.vehicles)
    // let vehicles
    // let vehiclesPath = 'https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552882273/'
    // if (this.state.vehicles.length) {
    //   vehicles = this.state.vehicles.map((vehicle, index) => {
    //     let vehicleName = this.vehicleToFileName(vehicle)
    //     console.log('The mod vehicle name is ', vehicleName)
    //     return <figure key={index}>
    //       <img src={vehiclesPath + vehicleName + '.png'}
    //         alt={vehicleName}
    //         className='vehicle-image'
    //         onClick={(e) => console.log('Vehicle click')} />
    //       <figcaption>{vehicle.max_distance} Mmiles({vehicle.total_no})</figcaption>
    //     </figure>
    //   })
    // }
    let planets, vehicles
    let planetPath = 'https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552746276/'
    if (this.state.vehicles.length) {
      planets = this.state.selectedPlanets.map((planet, index) => {
        return <img src={planetPath + planet.name.toLowerCase() + '.png'}
          alt={planet.name}
          className='selected-planets'
          key={index}
          onClick={(e) => console.log('Supta')} />
      })
      vehicles = this.state.vehicles.map((vehicle, index) => {
        return <li key={index} onClick={(e) => this.handleVehicleClick(index, e)}>{vehicle.name} - {vehicle.total_no}</li>
      })
    }
    return (
      <div className='vehicles'>
        <h1 className='head'>Vehicle to deploy for each planet.</h1>
        {planets}
        <ul className='vehicle-list'>{vehicles}</ul>
        <ul className='vehicle-list'>{vehicles}</ul>
        <ul className='vehicle-list'>{vehicles}</ul>
        <ul className='vehicle-list'>{vehicles}</ul>
      </div>
    )
  }
}

export default Vehicles
