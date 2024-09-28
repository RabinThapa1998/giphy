import { test, expect } from '@playwright/test';

test('should have input empty', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await expect(page.getByRole('textbox')).toHaveValue('');
});


test('should have gif tending list', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    await page.waitForSelector('.gif');

    // Locate all elements with the class 'gif'
    const gifElements = page.locator('.gif');

    // Assert that there is at least one GIF element present
    const count = await gifElements.count();
    expect(count).toEqual(50); // Using standard assertion here
});


test('should have search text', async ({ page }) => {
    await page.goto('http://localhost:5173');
    // await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('hello');

    await expect(page.getByRole('textbox')).toHaveValue('hello');
});


test('should have search text and search results', async ({ page }) => {
    await page.goto('http://localhost:5173');
    // await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('hello')

    await expect(page.getByRole('textbox')).toHaveValue('hello');

    //*check if loading text is present
    // await expect(page.getByText('Searching...')).toBeVisible();

    await page.waitForSelector('.gif');
    const gifElements = page.locator('.gif');

    const count = await gifElements.count();
    expect(count).toEqual(50); // Using standard assertion here
    }
)
