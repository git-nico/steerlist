import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	/* only allow *.spec.* files */
	testMatch: ['**/*.@(spec).?(c|m)[jt]s?(x)'],
	/* ignore example files */
	testIgnore: ['**/e2e/demo.test.ts', '**/e2e/example.spec.ts'],

	timeout: process.env.CI ? 120_000 : 60_000,
	reportSlowTests: process.env.CI ? { max: 5, threshold: 40_000 } : null,

	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 3 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	//   reporter: 'html',

	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: process.env.CI ? 'http://localhost:4173' : 'http://localhost:5173',
		// only run tests on dev server
		baseURL: 'http://localhost:5173',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',

		launchOptions: {
			slowMo: parseInt(process.env.SLOWMO || '0'),
		},

		/* Capture video on failures */
		video: process.env.VIDEO ? 'on' : 'retain-on-failure',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		// {
		// 	name: 'webkit',
		// 	use: { ...devices['Desktop Safari'] }
		// }

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		{
			// Keeks failing in Github Actions
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
		},
		// {
		// 	// Don't run Mobile Safari on Github Actions
		// 	name: process.env.CI ? 'Mobile Chrome' : 'Mobile Safari',
		// 	use: process.env.CI ? { ...devices['Pixel 5'] } : { ...devices['iPhone 12'] },
		// },
		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	webServer: {
		// command: process.env.CI ? 'pnpm build && pnpm preview' : 'pnpm dev',
		command: 'pnpm run dev',
		// port: process.env.CI ? 4173 : 5173,
		port: 5173,
		reuseExistingServer: !process.env.CI,
	},

	testDir: 'e2e',
});
