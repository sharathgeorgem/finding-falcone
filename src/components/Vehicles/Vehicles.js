import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Vehicles.css'

import Display from '../Display/Display'

class Vehicles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedPlanets: this.props.location.state,
      vehicles: [],
      final: {},
      totalTime: 0,
      showMileage: false,
      mileage: '',
      warning: false,
      empty: false
    }
    this.vehicleToFileName = this.vehicleToFileName.bind(this)
    this.handleVehicleClick = this.handleVehicleClick.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
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
  handleMouseEnter (index) {
    this.setState({
      showMileage: true,
      mileage: this.state.vehicles[index].max_distance
    })
  }
  handleMouseLeave (index) {
    this.setState({showMileage: false})
  }
  handleVehicleClick (index, e) {
    if (Object.keys(this.state.final).length === 4) {
      return
    }
    let listId = e.target.parentElement.id // Anti-pattern? Refs?
    let vehicles = this.state.vehicles
    let selectedPlanets = this.state.selectedPlanets
    if (selectedPlanets[listId].distance > vehicles[index].max_distance) {
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
      if (!(Object.keys(final).includes(selectedPlanets[listId].name.toString()))) {
        e.target.style['box-shadow'] = '3px 3px #afa'
        e.target.style['color'] = '#00c367'
        --vehicles[index].total_no
        final[`${selectedPlanets[listId].name}`] = vehicles[index].name

        if (vehicles[index].total_no === 0) {
          console.log('The number is zero')
        }

        let totalTime = this.state.totalTime
        totalTime += selectedPlanets[listId].distance / vehicles[index].speed
        this.setState({totalTime})
      }
      this.setState({final, vehicles})
    } else {
      if (e.target.style['box-shadow'] !== '3px 3px #afa') {
        e.target.style['box-shadow'] = '3px 3px #d21'
      }
      this.setState({
        empty: true
      }, () => setTimeout(() => this.setState({ empty: false }), 2000))
    }
  }
  render () {
    let planets
    if (this.state.vehicles.length) {
      planets = this.state.selectedPlanets.map((planet, index) => {
        console.log('The planets are ', planet)
        return <div key={index} className='selected-planets'>
          <Display planet={planet}
            index={index}
            vehicles={this.state.vehicles}
            final={this.state.final}
            handleVehicleClick={this.handleVehicleClick}
            handleMouseEnter={this.handleMouseEnter}
            handleMouseLeave={this.handleMouseLeave} />
        </div>
      })
    }
    return (
      <div className='vehicles'>
        <h1 className='head'>Select vehicle to be deployed for each planet.</h1>
        <h2 className='time'>Time Taken : {this.state.totalTime} hours</h2>
        {planets}
        {this.state.showMileage ? <p className='mileage'>Can go {this.state.mileage} Megamiles</p> : null}
        {this.state.warning ? <p className='warning'>Nope. Too far.</p> : null}
        {Object.keys(this.state.final).length === 4 ? (<Link id='nav3'
          to={{
            pathname: '/status',
            state: [this.state.final, this.state.totalTime]
          }}>Find Falcone!</Link>) : null}
      </div>
    )
  }
}

export default Vehicles
