import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Story from '../Story/Story'
import Planets from '../Planets/Planets'
import Vehicles from '../Vehicles/Vehicles'
import Status from '../Status/Status'

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
          <Route path='/planets' component={Planets} />
          <Route path='/vehicles' component={Vehicles} />
          <Route path='/status' component={Status} />
        </div>
        <footer>
          <span className='marquee'>
            Long live the King of the Lengaburu!
          </span>
        </footer>
      </BrowserRouter>
    )
  }
}

export default App
