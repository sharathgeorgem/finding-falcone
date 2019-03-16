import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Story from '../Story/Story'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Route exact path='/' component={Story} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
