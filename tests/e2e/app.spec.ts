import { test, expect } from '@playwright/test'

test('shows title and increments counter', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Vite + React' })).toBeVisible()

  const button = page.getByRole('button', { name: /count is/i })
  await expect(button).toBeVisible()
  await button.click()
  await expect(button).toHaveText(/count is 1/i)
})
