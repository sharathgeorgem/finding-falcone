import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Planets.css'

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
    axios.get('https://findfalcone.herokuapp.com/planets')
      .then(response => {
        console.log(response)
        this.setState({
          planets: response.data
        })
      })
      .catch(error => console.log(error))
  }
  addOrRemovePlanets (index, e) {
    console.log('Shine a light', e.target.style['opacity'])
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
    console.log('On click, the current list inside render is ', this.state.selectedPlanets)
    let planets
    let planetPath = 'https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552746276/'
    if (this.state.planets.length) {
      planets = this.state.planets.map((planet, index) => {
        return <img src={planetPath + planet.name.toLowerCase() + '.png'}
          alt={planet.name}
          key={index}
          onClick={(e) => this.addOrRemovePlanets(index, e)} />
      })
    }
    return (
      <div className='planets'>
        <h1>She could be anywhere. Choose 4.</h1>
        {!this.state.planets.length
          ? <img src='https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552800489/loading_1.gif'
            alt='Spinner' id='spinner' />
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
