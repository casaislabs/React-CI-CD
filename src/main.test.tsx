import { test, expect } from 'vitest'
import { screen } from '@testing-library/dom'

test('renders App through main entry', async () => {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)

  await import('./main')

  const heading = await screen.findByRole('heading', { name: /Vite \+ React/i })
  expect(heading).toBeInTheDocument()
})
