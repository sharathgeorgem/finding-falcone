import React, { Component } from 'react'

const PLANET_PATH = 'https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552746276/'

class Display extends Component {
  constructor (props) {
    super(props)
    this.state = {
      planet: this.props.planet,
      vehicles: this.props.vehicles,
      index: this.props.index,
      reachableVehicles: []
    }
  }
  componentDidMount () {
    this.state.vehicles.forEach(vehicle => {
      if (vehicle.max_distance >= this.state.planet.distance) {
        this.state.reachableVehicles.push(vehicle.name)
      }
    })
    console.log('The reachable vehicles are ', this.state.reachableVehicles)
  }
  componentDidUpdate () {
    if (this.state.reachableVehicles.length > 0) {
      const found = this.state.reachableVehicles.some(vehicle =>
        this.props.uniqueVehicleList.includes(vehicle))
      if (!found && !Object.keys(this.props.final).includes(this.props.planet.name)) {
        console.log('Calling the parent handler function ', this.props.planet.name)
        this.props.handlePlanetUnreachable()
      }
    }
  }
  render () {
    // console.log('For debug', this.state.planet)
    // console.log(`For debug ${this.state.planet.name}`, this.state.vehicles)
    // console.log('The props are ', this.props)
    // console.log('The final obj for the bj is ', this.props.final)

    let vehicles = this.state.vehicles.map((vehicle, index) => {
      // if (vehicle.max_distance < this.state.planet.distance) return null
      return <li key={index}
        onClick={(e) => this.props.handleVehicleClick(index, e)}
        onMouseEnter={(e) => this.props.handleMouseEnter(index, e)}
        onMouseLeave={(e) => this.props.handleMouseLeave(index, e)}>
        {vehicle.name} - {vehicle.total_no}
      </li>
    })
    return (
      <div>
        <img src={PLANET_PATH + this.state.planet.name.toLowerCase() + '.png'}
          alt={this.state.planet.name}
          className='selected-planet-image' />
        <ul className='vehicle-list' id={this.state.index}>
          {vehicles}
        </ul>
      </div>
    )
  }
}

export default Display
