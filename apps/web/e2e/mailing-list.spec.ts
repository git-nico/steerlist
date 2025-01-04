import { expect, test } from '@playwright/test';

test('can I sign up to the mailing list', async ({ page }) => {
	// test.beforeAll(async () => mswServer.listen());
	// test.afterAll(async () => mswServer.resetHandlers());
	// test.afterAll(async () => mswServer.close());

	await page.goto('/');

	await expect(async () => {
		// Wait for hydration
		await expect(page.getByTestId('hydrated')).toBeVisible({ timeout: 500 });
	}).toPass({
		timeout: 20_000,
	});

	await expect(page.getByRole('heading', { level: 2, name: 'Sign-up for updates!' })).toBeVisible();

	await page.getByLabel('email').fill('iQ2Tt@example.com');

	await page.getByRole('button', { name: 'Sign-up!' }).click();

	// await expect(page.getByText("You're signed up, thank you!")).toBeVisible();
	const toastElement = page.getByRole('status');
	await expect(toastElement.getByText("You're signed up, thank you!")).toBeVisible();
});
