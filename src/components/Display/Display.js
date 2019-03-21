import React, { Component } from 'react'

class Display extends Component {
  constructor (props) {
    super(props)
    this.state = {
      planet: this.props.planet,
      vehicles: this.props.vehicles,
      index: this.props.index
    }
  }
  componentDidMount () {
    console.log('Component mounted')
  }
  render () {
    console.log(`The updated count for ${this.state.planet.name}`, this.state.vehicles)
    console.log('The props are ', this.props)
    console.log('The final obj for the bj is ', this.props.final)

    let vehicles
    let planetPath = 'https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552746276/'
    vehicles = this.state.vehicles.map((vehicle, index) => {
      console.log('The vehicles are ', vehicle)
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
        <img src={planetPath + this.state.planet.name.toLowerCase() + '.png'}
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
