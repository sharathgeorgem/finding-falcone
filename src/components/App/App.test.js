import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import App from './App'

afterEach(cleanup)

it('renders without crashing', () => {
  const { asFragment } = render(<App text='App component rendered' />)
  expect(asFragment()).toMatchSnapshot()
})

it('inserts text into Header and Footer', () => {
  const { getByTestId, getByText } = render(<App />)
  expect(getByTestId('marquee-text')).toHaveTextContent('Long Live The King of Lengaburu!')
  expect(getByText('Back')).toHaveClass('back')
})
