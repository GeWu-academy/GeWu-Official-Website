import { expect, test } from '@playwright/test'

for (const width of [375, 768, 1023]) {
  test(`navigation can be opened and used at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const menu = page.getByRole('button', { name: '切换菜单' })
    await expect(menu).toBeVisible()
    await menu.click()
    const link = page.getByRole('button', { name: '书院宗要', exact: true })
    await expect(link).toBeVisible()
    await link.click()
    await expect(link).toBeHidden()
  })
}

test('desktop navigation remains available without a menu button', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/')
  await expect(page.getByRole('button', { name: '切换菜单' })).toBeHidden()
  await expect(page.locator('header nav button').filter({ hasText: '研习' }).first()).toBeVisible()
})
