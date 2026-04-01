<script>
	import { goto } from '$app/navigation';
	import { Zap } from '@lucide/svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import InlineAlert from '$lib/components/InlineAlert.svelte';

	let email = $state('');
	let emailError = $state('');
	let formError = $state('');
	let loading = $state(false);

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

	function messageFromErrorBody(data) {
		if (!data || typeof data !== 'object') return 'Request failed';
		if ('detail' in data && typeof data.detail === 'string') return data.detail;
		if ('error' in data && typeof data.error === 'string') return data.error;
		if (Array.isArray(data.detail) && data.detail[0] && typeof data.detail[0] === 'object') {
			const msgs = data.detail
				.map((x) => (x && typeof x === 'object' && 'msg' in x ? String(x.msg) : ''))
				.filter(Boolean);
			if (msgs.length) return msgs.join(' ');
		}
		return 'Request failed';
	}

	async function handleSubmit(e) {
		e.preventDefault();
		emailError = '';
		formError = '';
		if (!validateEmail()) return;

		loading = true;
		try {
			const res = await fetch('/apis/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: email.trim() })
			});

			const data = await res.json().catch(() => ({}));

			if (res.ok) {
				sessionStorage.setItem('forgotPasswordEmail', email.trim());
				// temp_token is now set as an HTTP-only cookie by the backend
				goto('/reset-password');
				return;
			}

			formError = messageFromErrorBody(data);
		} catch (err) {
			formError = messageFromErrorBody(err);
		} finally {
			loading = false;
		}
	}
</script>

<div class="bg-canvas flex min-h-screen items-center justify-center px-4 py-12">
	<div class="w-full max-w-md">
		<div class="mb-8 flex flex-col items-center text-center">
			<a href="/" class="mb-4 flex items-center gap-2 no-underline">
				<div class="bg-primary flex size-10 items-center justify-center rounded-xl">
					<Zap size={22} color="white" fill="white" />
				</div>
				<span class="text-fg text-xl font-bold tracking-tight">Exam Buddy</span>
			</a>
			<p class="text-fg-muted text-sm">Reset your password</p>
		</div>

		<div class="bg-surface-card border-stroke rounded-xl border p-6 shadow-sm">
			<p class="text-fg-muted mb-6 text-sm">
				Enter the email for your account. We'll send a code you can use to choose a new password.
			</p>

			<form class="flex flex-col gap-5" onsubmit={handleSubmit}>
				{#if formError}
					<InlineAlert variant="error" title={formError} showClose={false} />
				{/if}
				<TextInput
					label="Email"
					type="email"
					placeholder="Enter your email"
					autocomplete="email"
					bind:value={email}
					error={emailError}
					required
					onblur={validateEmail}
				/>

				<Button
					type="submit"
					btnType="primary"
					customClass="w-full py-3 font-semibold rounded-xl"
					disabled={loading}
				>
					{loading ? 'Sending code…' : 'Send reset code'}
				</Button>
			</form>

			<p class="text-fg-muted mt-6 text-center text-sm">
				<a href="/login" class="text-primary font-medium hover:underline">Back to sign in</a>
			</p>
		</div>
	</div>
</div>
