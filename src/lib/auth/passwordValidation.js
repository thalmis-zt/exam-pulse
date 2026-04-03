export const MIN_PASSWORD_LENGTH = 8;

export const PASSWORD_POLICY_MESSAGE =
	'Password must be at least 8 characters and include uppercase, lowercase, and a special character.';
export function getNewPasswordError(password) {
	if (password == null || password === '') {
		return 'Password is required';
	}
	if (password.length < MIN_PASSWORD_LENGTH) {
		return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
	}
	if (!/[A-Z]/.test(password)) {
		return 'Include at least one uppercase letter';
	}
	if (!/[a-z]/.test(password)) {
		return 'Include at least one lowercase letter';
	}
	if (!/[^A-Za-z0-9]/.test(password)) {
		return 'Include at least one special character';
	}
	return '';
}
