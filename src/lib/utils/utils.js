import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get } from 'svelte/store';
/**
 * API Client for making authenticated requests
 * Handles 401 responses by triggering refresh token flow
 * @param {string} url - The API endpoint URL
 * @param {Object} headers - Custom headers to include in the request
 * @param {Object} options - Request options (method, body, etc.)
 * @returns {Promise<Response>} - The API response
 */
export async function apiClient(url, headers = {}, options = {}) {

	const method = options.method || 'GET';

	const defaultHeaders = {
		// 'Content-Type': 'application/json',
		...headers
	};

	const response = await fetch(url, {
		method,
		headers: defaultHeaders,
		credentials: 'include',
		...options
	});

	if (response.status == 401) {
		await handleTokenRefresh();

		// Retry original request after token refresh
		const retryResponse = await fetch(url, {
			method,
			headers: defaultHeaders,
			credentials: 'include',
			...options
		});

		// If retry also returns 401, redirect to login
		if (retryResponse.status === 401) {
			if (browser) {
				const pageStore = get(page);
				const currentUrl = pageStore?.url?.pathname + pageStore?.url?.search;
				await goto(`/login?redirectTo=${encodeURIComponent(currentUrl? currentUrl : '/')}`);
			}
		}

		return retryResponse;
	}

	// Handle 403 Forbidden response
	if (response.status === 403) {
		if (browser) {
			await goto('/unauthorized');
		}
	}

	return response;
}

/**
 * Handle token refresh when access token expires
 * Calls the refresh endpoint to get new tokens
 * Server will set new tokens in cookies
 * Redirects to login if refresh fails
 */
async function handleTokenRefresh() {
	try {
		const response = await fetch('/apis/auth/refresh', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});

		if (!response.ok) {
			throw new Error('Token refresh failed');
		}
	} catch (error) {
		// On refresh failure, redirect to login with current URL as redirect param
		if (browser) {
			const pageStore = get(page);
			const currentUrl = pageStore?.url?.pathname + pageStore?.url?.search;
			await goto(`/login?redirectTo=${encodeURIComponent(currentUrl? currentUrl : '/')}`);
		}
	}
}

export function handleRedirection(status, url, params) {
	if (browser) {
		const fromUrl = url + params;
		switch (status) {
			case 401:
				goto(`/login?redirectTo=${fromUrl}`);
				break;
			case 403:
				goto(`/unauthorized?redirectTo=${fromUrl}`);
				break;
			default:
				break;
		}
	}
}