import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders title and logos with alt text', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /Vite \+ React/i })).toBeInTheDocument()
  expect(screen.getByAltText(/Vite logo/i)).toBeInTheDocument()
  expect(screen.getByAltText(/React logo/i)).toBeInTheDocument()
})

test('increments count when button is clicked', async () => {
  const user = userEvent.setup()
  render(<App />)
  const button = screen.getByRole('button', { name: /count is/i })
  await user.click(button)
  expect(button).toHaveTextContent(/count is 1/i)
})
