import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/tests/counters.html')
  await expect(page.getByRole('status', { name: 'ready', exact: true })).toHaveText('ready')
})

test('text-only Chinese and English metrics never acquire a zero prefix', async ({ page }) => {
  for (const value of ['OSS', '开源', 'Flexible', '不定时', 'Direct']) {
    await expect(page.getByRole('status', { name: value, exact: true })).toHaveText(value)
  }
})

test('completed counters retain numeric suffixes and decimal values', async ({ page }) => {
  for (const value of ['500+', '98%', '98.5%', '200h+']) {
    await expect(page.getByRole('status', { name: value, exact: true })).toHaveText(value)
  }
})

test('changing a numeric metric to text updates its displayed value', async ({ page }) => {
  await expect(page.getByRole('status', { name: 'changing' })).toHaveText('10+')
  await page.getByRole('button', { name: 'Change to text' }).click()
  await expect(page.getByRole('status', { name: 'changing' })).toHaveText('完成')
})
