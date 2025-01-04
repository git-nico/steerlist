import { expect, test } from '@playwright/test';

test('navigation smoke test', async ({ page }) => {
	await page.goto('/');

	await expect(async () => {
		// Wait for hydration
		await expect(page.getByTestId('hydrated')).toBeVisible({ timeout: 500 });
	}).toPass({
		timeout: 20_000,
	});

	await expect(page.getByRole('heading', { level: 1, name: 'Steerlist' })).toBeVisible();

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Steerlist/);

	// use the header for navigation
	const headerElement = page.getByRole('banner');
	// navigate to the Contact page
	await headerElement.getByRole('link', { name: 'Contact' }).click();
	await expect(page.getByRole('heading', { level: 1, name: 'Contact' })).toBeVisible();
	// await expect(page).toHaveTitle(/Contact/);

	// Can toggle theme
	await headerElement.getByRole('button', { name: /light|dark/ }).click();
});
