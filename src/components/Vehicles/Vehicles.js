import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Vehicles.css'

import Display from '../Display/Display'

const VEHICLES = 'https://findfalcone.herokuapp.com/vehicles'

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
    axios.get(VEHICLES)
      .then(response => {
        let vehicleNames = response.data.map(vehicle => vehicle.name)
        this.setState({
          vehicles: response.data,
          uniqueVehicleList: [...vehicleNames]
        }, () => {
          let savedVehicles = this.state.vehicles.map(vehicleObj => {
            return {...vehicleObj}
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
    let vehicleFileName = vehicle.name.split('')
    vehicleFileName.splice(vehicleFileName.indexOf(' '), 1, '_')
    return vehicleFileName.join('')
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
    this.setState({
      allPlanetsReachable: false
    })
  }
  resetState () {
    let vehicles = this.state.savedVehicles.map(vehicle => {
      return {...vehicle}
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
    if (Object.keys(this.state.final).length !== 4) {
      let listId = e.target.parentElement.id
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
        let selectedPlanetName = selectedPlanets[listId].name.toString()
        if (!(Object.keys(final).includes(selectedPlanetName))) {
          // e.target.style['box-shadow'] = '3px 3px #afa'
          // e.target.style['color'] = '#00c367'
          --vehicles[index].total_no
          final[`${selectedPlanets[listId].name}`] = vehicles[index].name

          if (vehicles[index].total_no === 0) {
            let uniqueVehicleList = this.state.uniqueVehicleList
            uniqueVehicleList.splice(uniqueVehicleList.indexOf(vehicles[index].name), 1)
            this.setState({
              uniqueVehicleList
            })
          }

          this.setState({
            totalTime : this.state.totalTime + selectedPlanets[listId].distance / vehicles[index].speed
          })

        }
        this.setState({final, vehicles})
      } else {
        // if (e.target.style['box-shadow'] !== '3px 3px #afa') {
        //   e.target.style['box-shadow'] = '3px 3px #d21'
        // }
        this.setState({
          empty: true
        }, () => setTimeout(() => this.setState({ empty: false }), 2000))
      }
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
