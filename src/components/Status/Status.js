import React, { Component } from 'react'
import axios from 'axios'
import './Status.css'

class Status extends Component {
  constructor (props) {
    super(props)
    this.state = {
      final: this.props.location.state,
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
        this.setState({loading: false})
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
        <h1>Status Component</h1>
        {this.state.loading === true
          ? <p>Loading</p>
          : this.state.status === 'false'
            ? <p>Queen not found</p>
            : <p>Queen has been found</p>}
      </div>
    )
  }
}

export default Status
