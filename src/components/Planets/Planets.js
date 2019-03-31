import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Planets.css'

const PLANET_PATH = 'https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552746276/'
const LOADING_GIF = 'https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552800489/loading_1.gif'

class Planets extends Component {
  constructor (props) {
    super(props)
    this.state = {
      planets: [],
      selectedPlanets: []
    }
    this.addOrRemovePlanets = this.addOrRemovePlanets.bind(this)
  }
  componentDidMount () {
    axios.get(this.props.PLANETS_API)
      .then(response => {
        this.setState({
          planets: response.data
        })
      })
      .catch(error => console.log(error))
  }
  addOrRemovePlanets (index, e) {
    let selectedPlanets = this.state.selectedPlanets
    if (selectedPlanets.includes(this.state.planets[index])) {
      e.target.style['opacity'] = 1
      e.target.style['border'] = '5px solid black'
      selectedPlanets.splice(selectedPlanets.indexOf(this.state.planets[index]), 1)
      this.setState({
        selectedPlanets
      })
    } else {
      e.target.style['opacity'] = 0.5
      e.target.style['border'] = '5px solid white'
      this.setState({
        selectedPlanets: [...selectedPlanets, this.state.planets[index]]
      })
    }
  }
  render () {
    let planets
    if (this.state.planets.length) {
      planets = this.state.planets.map((planet, index) => {
        return <img src={PLANET_PATH + planet.name.toLowerCase() + '.png'}
          alt={planet.name}
          key={index}
          className='test'
          data-testid='resolved'
          onClick={(e) => this.addOrRemovePlanets(index, e)} />
      })
    }
    return (
      <div className='planets' data-testid='planetsContainer'>
        <h1>She could be anywhere. Choose 4.</h1>
        {!this.state.planets.length
          ? <img src={LOADING_GIF}
            alt='Spinner' id='spinner' data-testid='spinner' />
          : planets}
        {this.state.selectedPlanets.length === 4 ? (
          <Link id='nav2'
            to={{
              pathname: '/vehicles',
              state: this.state.selectedPlanets
            }}>Onward!</Link>) : this.state.selectedPlanets.length > 4 ? (<p>Only 4.</p>) : null}
      </div>
    )
  }
}

export default Planets
