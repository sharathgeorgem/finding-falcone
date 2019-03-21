import React, { Component } from 'react'
import './Selection.css'

class Selection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: false
    }
  }
  render () {
    console.log('The final state is ', this.props.final)
    let selected = this.props.final
    let finalList = Object.keys(selected).map((key, index) => {
      return <li key={index}>{key} : {selected[key]}</li>
    })
    return (
      <div className='selection'>
        <ul>{finalList}</ul>
      </div>
    )
  }
}

export default Selection
