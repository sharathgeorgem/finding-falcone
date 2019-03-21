import React, { Component } from 'react'
import axios from 'axios'
import './Status.css'
import Selection from '../Selection/Selection'

class Status extends Component {
  constructor (props) {
    super(props)
    this.state = {
      final: this.props.location.state[0],
      totalTime: this.props.location.state[1],
      loading: true,
      status: false,
      planetFound: ''
    }
  }
  componentDidMount () {
    const finalObj = {}
    axios.defaults.headers = {
      'Accept': 'application/json'
    }
    let config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    axios.post('https://findfalcone.herokuapp.com/token')
      .then((response) => {
        finalObj.token = response.data.token
        finalObj.planet_names = Object.keys(this.state.final)
        finalObj.vehicle_names = Object.values(this.state.final)
        console.log('Final Object for the win is ', JSON.stringify(finalObj))
      })
      .then(() => axios.post('https://findfalcone.herokuapp.com/find', JSON.stringify(finalObj), config))
      .then(response => {
        setTimeout(() => {
          this.setState({ loading: false })
        }, 3000)
        if (response.data.status === 'success') {
          this.setState({planetFound: response.data.planet_name})
        }
        this.setState({status: response.data.status})
        console.log(response)
      })
      .catch(e => console.log(e))
  }
  render () {
    return (
      <div className='status'>
        <h1>Status</h1>
        {this.state.loading === true
          ? (<div className='loader'>
            <img src='https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552800489/loading_1.gif'
              alt='Spinner' id='spinner' />
            <Selection className='selection' final={this.state.final} />
          </div>)
          : this.state.status === 'false'
            ? <p>Queen not found.</p>
            : <div id='status-report'>
              <p>Queen Falcone was hiding in {this.state.planetFound}. Your troops were able to find her in  {this.state.totalTime} hours
              </p>
            </div>}
      </div>
    )
  }
}

export default Status
