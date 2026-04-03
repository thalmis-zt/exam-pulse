<script>
	import { goto } from '$app/navigation';
	import { ArrowLeft, Key, Mail } from '@lucide/svelte';
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
		if ('message' in data && typeof data.message === 'string') return data.message;
		if ('error' in data && typeof data.error === 'string') return data.error;
		if (Array.isArray(data.detail) && data.detail[0] && typeof data.detail[0] === 'object') {
			const msgs = data.detail
				.map((x) => (x && typeof x === 'object' && 'msg' in x ? String(x.msg) : ''))
				.filter(Boolean);
			if (msgs.length) return msgs.join(' ');
		}
		return 'Request failed';
	}

	function errorMessageForForgotPasswordResponse(res, data) {
		if (res.status === 422) return 'Please enter a valid email address.';
		if (res.status === 429) return 'Too many attempts. Please try again in an hour.';
		return messageFromErrorBody(data);
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
				goto('/reset-password');
				return;
			}

			formError = errorMessageForForgotPasswordResponse(res, data);
		} catch (err) {
			formError = err instanceof Error ? err.message : 'Request failed';
		} finally {
			loading = false;
		}
	}
</script>

{#snippet emailFieldIcon()}
	<Mail />
{/snippet}

<div class="bg-canvas flex min-h-screen items-center justify-center px-4 py-12">
	<div class="w-full max-w-md">
		<div class="mb-8 flex flex-col items-center text-center">
			<div
				class="bg-primary mb-5 flex size-14 items-center justify-center rounded-xl shadow-sm"
			>
				<Key class="size-8 text-canvas-base-fixed" strokeWidth={2} aria-hidden="true" />
			</div>
			<h1 class="text-fg mb-2 text-2xl font-bold tracking-tight">Forgot password?</h1>
			<p class="text-fg-muted max-w-sm text-sm leading-relaxed">
				Enter your email and we'll send you a reset code.
			</p>
		</div>

		<div class="bg-surface-card border-stroke rounded-xl border p-6 shadow-sm">
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
					icon={emailFieldIcon}
					required
					onblur={validateEmail}
				/>

				<Button
					type="submit"
					btnType="primary"
					customClass="w-full py-3 font-semibold rounded-xl"
					disabled={loading}
				>
					{loading ? 'Sending…' : 'Send OTP'}
				</Button>
			</form>

			<p class="mt-6 text-center">
				<a
					href="/login"
					class="text-primary inline-flex items-center justify-center gap-1.5 text-sm font-medium hover:underline"
				>
					<ArrowLeft class="size-4 shrink-0" aria-hidden="true" />
					Back
				</a>
			</p>
		</div>
	</div>
</div>
