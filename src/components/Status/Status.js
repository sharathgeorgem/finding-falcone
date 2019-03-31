import React, { Component } from 'react'
import axios from 'axios'
import './Status.css'
import Selection from '../Selection/Selection'
import { Link } from 'react-router-dom'

const SPINNER_PATH = 'https://res.cloudinary.com/dmmb5w7sm/image/upload/v1552800489/loading_1.gif'
const TOKEN_PATH = 'https://findfalcone.herokuapp.com/token'

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
    axios.post(TOKEN_PATH)
      .then((response) => {
        finalObj.token = response.data.token
        finalObj.planet_names = Object.keys(this.state.final)
        finalObj.vehicle_names = Object.values(this.state.final)
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
      })
      .catch(e => console.log(e))
  }
  render () {
    return (
      <div className='status'>
        <h1>Status</h1>
        {this.state.loading === true
          ? (<div className='loader'>
            <img src={SPINNER_PATH}
              alt='Spinner' id='spinner' />
            <Selection className='selection' final={this.state.final} />
          </div>)
          : this.state.status === 'false'
            ? <div id='status-report'>
              <h3 id='failure'>Mission Failed.</h3>
              <p>Queen not found.</p>
              <Link id='nav4'
                to={{
                  pathname: '/'
                }}>Play Again</Link>
            </div>
            : <div id='status-report'>
              <h3 id='success'>Mission accomplished!</h3>
              <p>Queen Falcone was hiding in <span className='highlight'>{this.state.planetFound}</span>. Your troops were able to find her in <span className='highlight'>{this.state.totalTime}</span> hours.
              </p>
              <Link id='nav4'
                to={{
                  pathname: '/'
                }}>Play Again</Link>
            </div>}
      </div>
    )
  }
}

export default Status
