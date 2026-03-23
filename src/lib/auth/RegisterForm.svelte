<script>
	import { goto } from '$app/navigation';
	import { Zap } from '@lucide/svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import Button from '$lib/components/Button.svelte';

	let email = $state('');
	let name = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	let emailError = $state('');
	let nameError = $state('');
	let passwordError = $state('');
	let confirmPasswordError = $state('');

	const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const MIN_PASSWORD_LENGTH = 6;

	function validateEmail() {
		if (!email.trim()) {
			emailError = 'Email is required';
			return false;
		}
		if (!EMAIL_REGEX.test(email.trim())) {
			emailError = 'Please enter a valid email address';
			return false;
		}
		emailError = '';
		return true;
	}

	function validatePassword() {
		if (!password) {
			passwordError = 'Password is required';
			return false;
		}
		if (password.length < MIN_PASSWORD_LENGTH) {
			passwordError = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
			return false;
		}
		passwordError = '';
		return true;
	}

	function validateConfirmPassword() {
		if (!confirmPassword) {
			confirmPasswordError = 'Please confirm your password';
			return false;
		}
		if (password !== confirmPassword) {
			confirmPasswordError = 'Passwords do not match';
			return false;
		}
		confirmPasswordError = '';
		return true;
	}

	function handleSubmit(e) {
		e.preventDefault();
		emailError = '';
		nameError = '';
		passwordError = '';
		confirmPasswordError = '';

		const emailValid = validateEmail();
		const passwordValid = validatePassword();
		const confirmValid = validateConfirmPassword();

		if (!emailValid || !passwordValid || !confirmValid) return;

		// Store email for OTP flow (no backend yet)
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('pendingVerificationEmail', email.trim());
		}
		goto('/verify-otp');
	}
</script>

<div class="bg-canvas flex min-h-screen items-center justify-center px-4 py-12">
	<div class="w-full max-w-md">
		<!-- Header -->
		<div class="mb-8 flex flex-col items-center text-center">
			<a href="/" class="mb-4 flex items-center gap-2 no-underline">
				<div class="bg-primary flex size-10 items-center justify-center rounded-xl">
					<Zap size={22} color="white" fill="white" />
				</div>
				<span class="text-fg text-xl font-bold tracking-tight">Exam Buddy</span>
			</a>
			<p class="text-fg-muted text-sm">Create your account</p>
		</div>

		<!-- Form Card -->
		<div class="bg-surface-card border-stroke rounded-xl border p-6 shadow-sm">
			<form class="flex flex-col gap-5" onsubmit={handleSubmit}>
				<TextInput
					label="Email"
					type="email"
					placeholder="Enter your email"
					bind:value={email}
					error={emailError}
					required
					onblur={validateEmail}
				/>
				<TextInput
					label="Name"
					type="text"
					placeholder="Enter your full name"
					bind:value={name}
					error={nameError}
				/>
				<PasswordInput
					label="Password"
					placeholder="Create a password"
					bind:value={password}
					error={passwordError}
					required
					onblur={validatePassword}
				/>
				<PasswordInput
					label="Confirm Password"
					placeholder="Confirm your password"
					bind:value={confirmPassword}
					error={confirmPasswordError}
					required
					onblur={validateConfirmPassword}
				/>

				<Button type="submit" btnType="primary" customClass="w-full py-3 font-semibold rounded-xl">
					Verify with OTP
				</Button>
			</form>

			<div class="border-stroke mt-6 flex items-center gap-3 border-t pt-6">
				<span class="bg-stroke h-px flex-1"></span>
				<span class="text-fg-muted text-xs">OR</span>
				<span class="bg-stroke h-px flex-1"></span>
			</div>

			<p class="mt-6 text-center text-sm text-fg-muted">
				Already have an account?
				<a href="/login" class="text-primary font-medium hover:underline">Sign in</a>
			</p>
		</div>

		<p class="text-fg-muted mt-6 text-center text-xs">
			By signing up, you agree to our
			<a href="/terms" class="text-primary hover:underline">Terms of Service</a>
			and
			<a href="/privacy" class="text-primary hover:underline">Privacy Policy</a>.
		</p>
	</div>
</div>
