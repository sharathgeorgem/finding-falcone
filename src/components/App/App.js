import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Story from '../Story/Story'
import Planets from '../Planets/Planets'
import Vehicles from '../Vehicles/Vehicles'
import Status from '../Status/Status'

const PLANETS_API = 'https://findfalcone.herokuapp.com/planets'

class App extends Component {
  handleBack = () => {
    window.history.back()
  }
  render () {
    return (
      <BrowserRouter>
        <header>
          <span className='back' onClick={this.handleBack}>Back</span>
        </header>
        <div className='App'>
          <Route exact path='/' component={Story} />
          <Route path='/planets' render={(props) =>
            <Planets {...props} PLANETS_API={PLANETS_API} />} />
          <Route path='/vehicles' component={Vehicles} />
          <Route path='/status' component={Status} />
        </div>
        <footer data-testid='marquee-text'>
          <span className='marquee'>
          Long Live The King of Lengaburu!
          </span>
        </footer>
      </BrowserRouter>
    )
  }
}

export default App
