/**
 * Theme store — manages light / dark / system preference.
 *
 * - Persists the user's choice in localStorage.
 * - Applies `data-theme="light|dark"` on <html> for explicit choices.
 * - Removes the attribute for "system" so the CSS media query takes over.
 */

import { browser } from '$app/environment';

const STORAGE_KEY = 'theme-preference';

/** @typedef {'light' | 'dark' | 'system'} Theme */

/** @type {Theme} */
let current = $state(
	browser ? /** @type {Theme} */ (localStorage.getItem(STORAGE_KEY) ?? 'system') : 'system'
);

/** @param {Theme} theme */
function apply(theme) {
	current = theme;
	if (!browser) return;

	localStorage.setItem(STORAGE_KEY, theme);

	if (theme === 'system') {
		document.documentElement.removeAttribute('data-theme');
	} else {
		document.documentElement.setAttribute('data-theme', theme);
	}
}

// Apply persisted preference immediately on load.
if (browser) apply(current);

export const theme = {
	get current() {
		return current;
	},
	/** @param {Theme} value */
	set: apply
};
