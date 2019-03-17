import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Story from '../Story/Story'
import Planets from '../Planets/Planets'
import Vehicles from '../Vehicles/Vehicles'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Route exact path='/' component={Story} />
          <Route path='/planets' component={Planets} />
          <Route path='/vehicles' component={Vehicles} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
