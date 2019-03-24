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
      savedVehicles: [],
      uniqueVehicleList: [],
      savedUniqueVehicleList: [],
      final: {},
      totalTime: 0,
      showMileage: false,
      mileage: '',
      warning: false,
      allPlanetsReachable: true,
      empty: false
    }
    this.vehicleToFileName = this.vehicleToFileName.bind(this)
    this.handleVehicleClick = this.handleVehicleClick.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handlePlanetUnreachable = this.handlePlanetUnreachable.bind(this)
    this.resetState = this.resetState.bind(this)
  }
  componentDidMount () {
    console.log('I am being run. CHECK ME OUT!')
    axios.get('https://findfalcone.herokuapp.com/vehicles')
      .then(response => {
        // console.log(response)
        let vehicleName = []
        response.data.forEach(vehicle => {
          vehicleName.push(vehicle.name)
        })
        this.setState({
          vehicles: response.data,
          uniqueVehicleList: [...vehicleName]
        }, () => {
          let savedVehicles = this.state.vehicles.map(a => {
            let newObject = {}
            Object.keys(a).forEach(propertyKey => {
                 newObject[propertyKey] = a[propertyKey]
            })
            return newObject
          })
          let savedUniqueVehicleList = [...this.state.uniqueVehicleList]
          this.setState({
            savedVehicles,
            savedUniqueVehicleList
          })
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
  handlePlanetUnreachable () {
    console.log('Handling planet unreachable in parent component')
    this.setState({
      allPlanetsReachable: false
    })
  }
  resetState () {
    console.log('I have been clicked')
    let vehicles = this.state.savedVehicles.map(a => {
      let newObject = {}
      Object.keys(a).forEach(propertyKey => {
           newObject[propertyKey] = a[propertyKey]
      })
      return newObject
    })
    this.setState({
      vehicles,
      final: {},
      uniqueVehicleList: [...this.state.savedUniqueVehicleList],
      totalTime: 0,
      allPlanetsReachable: true,
    })
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
          let uniqueVehicleList = this.state.uniqueVehicleList
          uniqueVehicleList.splice(uniqueVehicleList.indexOf(vehicles[index].name), 1)
          this.setState({
            uniqueVehicleList
          })
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
        return <div key={index} className='selected-planets'>
          <Display planet={planet}
            index={index}
            vehicles={this.state.vehicles}
            final={this.state.final}
            uniqueVehicleList={this.state.uniqueVehicleList}
            handleVehicleClick={this.handleVehicleClick}
            handleMouseEnter={this.handleMouseEnter}
            handleMouseLeave={this.handleMouseLeave}
            handlePlanetUnreachable={this.handlePlanetUnreachable}
            resetState={this.resetState} />
        </div>
      })
    }
    return (
      <div className='vehicles'>
        <h1 className='head'>Select vehicle to be deployed for each planet.</h1>
        <h2 className='time'>Time Taken : {this.state.totalTime} hours</h2>
        {!this.state.allPlanetsReachable ? <p className='reset' onClick={(e) => this.resetState(e)}>Reset</p> : <>{planets}</>}
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
