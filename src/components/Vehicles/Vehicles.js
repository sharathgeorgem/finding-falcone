import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Vehicles.css'

class Vehicles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedPlanets: this.props.location.state,
      vehicles: [],
      final: {},
      warning: false,
      empty: false
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
    if (Object.keys(this.state.final).length === 4) {
      return
    }
    let listId = e.target.parentElement.id
    let vehicles = this.state.vehicles
    let selectedPlanets = this.state.selectedPlanets
    if (selectedPlanets[listId].distance > vehicles[index].max_distance) {
      console.log('Unreachable AF')
      if (e.target.style['box-shadow'] !== '3px 3px #afa') {
        e.target.style['box-shadow'] = '3px 3px #d21'
      }
      this.setState({
        warning: true
      }, () => setTimeout(() => this.setState({ warning: false }), 2000))
      return
    }
    if (vehicles[index].total_no > 0) {
      let final = Object.assign({}, this.state.final)
      console.log('Just to check', Object.keys(final))
      if (!(Object.keys(final).includes(selectedPlanets[listId].name.toString()))) {
        e.target.style['box-shadow'] = '3px 3px #afa'
        --vehicles[index].total_no
        final[`${selectedPlanets[listId].name}`] = vehicles[index].name
      }
      this.setState({final, vehicles})
      console.log('The total number is given as ', this.state.vehicles[index].total_no)
    } else {
      if (e.target.style['box-shadow'] !== '3px 3px #afa') {
        e.target.style['box-shadow'] = '3px 3px #d21'
      }
      this.setState({
        empty: true
      }, () => setTimeout(() => this.setState({ empty: false }), 2000))
      console.log('You just exhausted your options. No more clicks.')
    }
  }
  render () {
    console.log(this.state.selectedPlanets)
    console.log(this.state.vehicles)
    console.log('The final state can be mini', this.state.final)
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
        <h1 className='head'>Select vehicle to deploy for each planet.</h1>
        {planets}
        <ul className='vehicle-list' id='0'>{vehicles}</ul>
        <ul className='vehicle-list' id='1'>{vehicles}</ul>
        <ul className='vehicle-list' id='2'>{vehicles}</ul>
        <ul className='vehicle-list' id='3'>{vehicles}</ul>
        {this.state.warning ? <p className='warning'>Nope. Too far.</p> : null}
        {Object.keys(this.state.final).length === 4 ? (<Link id='nav3'
          to={{
            pathname: '/status',
            state: this.state.final
          }}>Find Falcone!</Link>) : null}
      </div>
    )
  }
}

export default Vehicles
