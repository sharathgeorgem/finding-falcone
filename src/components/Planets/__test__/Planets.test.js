import React from 'react'
import { render, cleanup, waitForElement, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import axiosMock from 'axios'
import Planets from '../Planets'

afterEach(cleanup)

it('fetches and displays data', async () => {
  axiosMock.get.mockResolvedValueOnce({
    data: [{ name: 'Enchai', distance: 200 }]
  })

  const PLANETS_API = 'https://findfalcone.herokuapp.com/planets'
  const { getByTestId } = render(<Planets PLANETS_API={PLANETS_API} />)

  expect(getByTestId('spinner').hasAttribute('Spinner'))

  const resolvedImage = await waitForElement(() =>
    getByTestId('resolved'))

  expect(resolvedImage)
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(PLANETS_API)
})

it('adds or removes a planet on click', async () => {
  axiosMock.get.mockResolvedValueOnce({
    data: [{ name: 'Enchai', distance: 200 }]
  })

  const PLANETS_API = 'https://findfalcone.herokuapp.com/planets'
  const { getByTestId } = render(<Planets PLANETS_API={PLANETS_API} />)

  const resolvedImage = await waitForElement(() =>
    getByTestId('resolved'))

  fireEvent.click(getByTestId('resolved'))
  expect(resolvedImage)
})