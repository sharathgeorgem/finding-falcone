import React, { Component } from 'react'
import './Story.css'
import falconImg from '../../assets/falcon.png'

class Story extends Component {
  render () {
    return (
      <div className='Story'>
        <h1>Finding Falcone</h1>
        <div className='container'>
          <img src={falconImg} alt='Falcon' />
          <div id='container-text'>In the planet of Lengaburu...in the distant
            distant galaxy of Tara B. After the recent war with neighbouring
            planet Falicornia, King Shan has exiled the Queen of Falicornia
            for 15 years.<br /><hr />
            Queen Al Falcone is now in hiding. But if King Shan can find
            her before the years are up, she will be exiled for another 15
            years....
          </div>
        </div>
        
      </div>
    )
  }
}

export default Story
