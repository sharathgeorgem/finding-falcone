import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Story.css'

const FALCON_IMAGE_PATH = 'https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552746277/falcon.png'

class Story extends Component {
  render () {
    return (
      <div className='story'>
        <h1>Finding Falcone</h1>
        <div className='storyboard'>
          <img src={FALCON_IMAGE_PATH} alt='Falcon' />
          <div id='storyboard-text'>In the planet of Lengaburu...in the distant
            distant galaxy of Tara B. After the recent war with neighbouring
            planet Falicornia, King Shan has exiled the Queen of Falicornia
            for 15 years.<br /><hr />
            Queen Al Falcone is now in hiding. But if King Shan can find
            her before the years are up, she will be exiled for another 15
            years....
          </div>
          <Link id='nav'
            to={{
              pathname: '/planets'
            }}>Where she at?</Link>
        </div>
      </div>
    )
  }
}

export default Story
