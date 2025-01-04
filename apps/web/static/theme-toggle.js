const STORAGE_KEY = 'theme';

// if true defaultTheme will be used otherwise prefers-color-scheme
const USE_DEFAULT_THEME = false;

// default dark mode because **I** like it more :-)
// you may want to look into the user's preference instead, with:
// window.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme = 'dark';

// get the user's requested light or dark preference
const getPrefersColorScheme = () => {
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getColorScheme = () => {
	return USE_DEFAULT_THEME ? defaultTheme : getPrefersColorScheme();
};

const getTheme = () => {
	if (typeof localStorage !== 'undefined') {
		return localStorage.getItem(STORAGE_KEY) || getColorScheme();
	} else {
		return 'not in browser';
	}
	// return getColorScheme();
};

const setTheme = theme => {
	document.documentElement.dataset.theme = theme;
};

// set early so no page flashes / CSS is made aware
setTheme(getTheme());

const themeObserver = new MutationObserver(() => {
	const nextTheme = document.documentElement.dataset.theme;
	if (nextTheme) {
		localStorage.setItem(STORAGE_KEY, nextTheme);
	}
});
themeObserver.observe(document.documentElement, {
	attributes: true,
	attributeFilter: ['data-theme'],
});

const toggleTheme = () => {
	const currentTheme = getTheme();
	const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
	setTheme(nextTheme);
	return nextTheme;
};

window.toggleTheme = toggleTheme;
window.getTheme = getTheme;
