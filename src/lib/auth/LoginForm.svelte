<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Zap } from '@lucide/svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import InlineAlert from '$lib/components/InlineAlert.svelte';

	let email = $state('');
	let password = $state('');

	let emailError = $state('');
	let passwordError = $state('');
	let formError = $state('');
	let loading = $state(false);
	let showResetPasswordSuccess = $state(false);

	$effect(() => {
		if ($page.url.searchParams.get('reset') === 'success') {
			showResetPasswordSuccess = true;
			if (browser) {
				goto('/login', { replaceState: true, noScroll: true, keepFocus: true });
			}
		}
	});

	function dismissResetPasswordSuccess() {
		showResetPasswordSuccess = false;
	}

	const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
		passwordError = '';
		return true;
	}

	function messageFromErrorBody(data) {
		if (!data || typeof data !== 'object') return 'Login failed';
		if ('detail' in data && typeof data.detail === 'string') return data.detail;
		if ('error' in data && typeof data.error === 'string') return data.error;
		if ('message' in data && typeof data.message === 'string') return data.message;
		return 'Login failed';
	}

	async function handleSubmit(e) {
		e.preventDefault();
		emailError = '';
		passwordError = '';
		formError = '';

		// const emailValid = validateEmail();
		const passwordValid = validatePassword();

		if (!passwordValid) return;

		loading = true;
		try {
			const res = await fetch('/apis/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					username: email.trim(),
					password
				})
			});

			const errData = await res.json().catch(() => ({}));

			if (res.ok) {
				const redirectTo = $page.url.searchParams.get('redirectTo') || '/home';
				goto(redirectTo);
				return;
			}

			formError = messageFromErrorBody(errData);
		} catch (err) {
			formError = messageFromErrorBody(err);
		} finally {
			loading = false;
		}
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
			<p class="text-fg-muted text-sm">Sign in to your account</p>
		</div>

		<!-- Form Card -->
		<div class="bg-surface-card border-stroke rounded-xl border p-6 shadow-sm">
			<form class="flex flex-col gap-5" onsubmit={handleSubmit}>
				{#if showResetPasswordSuccess}
					<InlineAlert
						variant="success"
						title="Password updated"
						message="Sign in with your new password."
						showClose={true}
						onclose={dismissResetPasswordSuccess}
					/>
				{/if}
				{#if formError}
					<InlineAlert variant="error" title={formError} showClose={false} />
				{/if}
				<TextInput
					label="Email"
					placeholder="Enter your email"
					autocomplete="email"
					bind:value={email}
					error={emailError}
					required
					onblur={validateEmail}
				/>
				<div>
					<div class="mb-2 flex items-center justify-between">
						<label for="login-password" class="text-sm font-medium text-fg">
							Password
							<span class="text-danger" aria-hidden="true">*</span>
						</label>
						<Button
							type="button"
							btnType="custom"
							customClass="text-primary h-auto min-h-0 cursor-pointer bg-transparent p-0 text-sm font-medium hover:underline border-0 shadow-none"
						>
							Forgot password?
						</Button>
					</div>
					<PasswordInput
						id="login-password"
						placeholder="Enter your password"
						bind:value={password}
						error={passwordError}
						required
						onblur={validatePassword}
					/>
				</div>

				<Button
					type="submit"
					btnType="primary"
					customClass="w-full py-3 font-semibold rounded-xl"
					disabled={loading}
				>
					{loading ? 'Signing in…' : 'Sign In'}
				</Button>
			</form>

			<div class="border-stroke mt-6 flex items-center gap-3 border-t pt-6">
				<span class="bg-stroke h-px flex-1"></span>
				<span class="text-fg-muted text-xs">OR</span>
				<span class="bg-stroke h-px flex-1"></span>
			</div>

			<p class="mt-6 text-center text-sm text-fg-muted">
				Don't have an account?
				<a href="/register" class="text-primary font-medium hover:underline">Sign up</a>
			</p>
		</div>

		<p class="text-fg-muted mt-6 text-center text-xs">
			By signing in, you agree to our
			<a href="/terms" class="text-primary hover:underline">Terms of Service</a>
			and
			<a href="/privacy" class="text-primary hover:underline">Privacy Policy</a>.
		</p>
	</div>
</div>
