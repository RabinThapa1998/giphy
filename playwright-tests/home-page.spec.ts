import { test, expect } from '@playwright/test';

const DEMO_SEARCH_TEXT="Rock"
const DEFAULT_PAGINATION_OFFSET= 0
const DEFAULT_PAGINATION_LIMIT= 50
test.describe('HomePage', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the starting url before each test.
        await page.goto('http://localhost:5173');
    });

    test('should have input empty', async ({ page }) => {
        await expect(page.getByRole('textbox')).toHaveValue('');
    });

    test('should have search text', async ({ page }) => {
        // await page.getByRole('textbox').click();
        await page.getByRole('textbox').fill(DEMO_SEARCH_TEXT);

        await expect(page.getByRole('textbox')).toHaveValue(DEMO_SEARCH_TEXT);
    });
    test('should have search test and loading',async({page})=>{
        await page.getByRole('textbox').fill(DEMO_SEARCH_TEXT);
        await expect(page.getByRole('textbox')).toHaveValue(DEMO_SEARCH_TEXT);

        await expect(page.getByText('Loading...')).toBeVisible();
    })

    test('should have search text and search results with valid number of gifs', async ({ page }) => {
        await page.getByRole('textbox').fill(DEMO_SEARCH_TEXT);

        await expect(page.getByRole('textbox')).toHaveValue(DEMO_SEARCH_TEXT);

        await page.waitForSelector('.gif');
        const gifElements = page.locator('.gif');

        const count = await gifElements.count();
        expect(count).toBeLessThanOrEqual(50); 
    });

    test('should display trending when no queries', async ({ page }) => {
        await page.getByRole('textbox').fill('');
        
        await expect(page.getByText('Trending')).toBeVisible();
    })
    test('should display query name when query', async ({ page }) => {
        await page.getByRole('textbox').fill(DEMO_SEARCH_TEXT);
        
        await expect(page.getByText(/DEMO_SEARCH_TEXT/i)).toBeVisible();
        
    })
    test('url should have search params synced with search field', async ({ page }) => {
        await page.getByRole('textbox').fill(DEMO_SEARCH_TEXT);

        const currentUrl = page.url();

        expect(currentUrl).toContain('search='+DEMO_SEARCH_TEXT);

    })
    test('url should have valid offset and limit for first page when search', async ({ page }) => {
        await page.getByRole('textbox').fill(DEMO_SEARCH_TEXT);

        const currentUrl = page.url();

        expect(currentUrl).toContain('offset='+DEFAULT_PAGINATION_OFFSET);
        expect(currentUrl).toContain('limit='+DEFAULT_PAGINATION_LIMIT);
    })

  

  
});
