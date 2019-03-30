import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import axiosMock from 'axios'
import Planets from '../Planets'

afterEach(cleanup)

it('fetches and displays data', async () => {
  const url = 'https://findfalcone.herokuapp.com/planets'
  const {} = render(<Planets />)
})
