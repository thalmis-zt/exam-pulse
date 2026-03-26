<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { Zap } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import Error from '$lib/components/Error.svelte';
	import { onMount } from 'svelte';

	const OTP_LENGTH = 6;

	let otpValues = $state(Array(OTP_LENGTH).fill(''));
	let otpContainerRef = $state(null);
	let formError = $state('');
	let loading = $state(false);
	let displayEmail = $state('');

	function messageFromErrorBody(data) {
		if (!data || typeof data !== 'object') return 'Verification failed';
		if ('detail' in data && typeof data.detail === 'string') return data.detail;
		if ('error' in data && typeof data.error === 'string') return data.error;
		if (Array.isArray(data.detail) && data.detail[0] && typeof data.detail[0] === 'object') {
			const msgs = data.detail
				.map((x) => (x && typeof x === 'object' && 'msg' in x ? String(x.msg) : ''))
				.filter(Boolean);
			if (msgs.length) return msgs.join(' ');
		}
		return 'Verification failed';
	}

	onMount(() => {
		if (!browser) return;
		const token = sessionStorage.getItem('registrationTempToken');
		if (!token) {
			goto('/register');
			return;
		}
		displayEmail = sessionStorage.getItem('pendingVerificationEmail') ?? '';
		otpContainerRef?.querySelector('input')?.focus();
	});

	function handleInput(index, e) {
		const v = e.target.value;
		if (v.length === 0) {
			otpValues = otpValues.map((x, i) => (i === index ? '' : x));
			if (index > 0) otpContainerRef?.querySelectorAll('input')[index - 1]?.focus();
			return;
		}
		const digit = v.replace(/\D/g, '').slice(-1);
		otpValues = otpValues.map((x, i) => (i === index ? digit : x));
		if (index < OTP_LENGTH - 1 && digit) {
			otpContainerRef?.querySelectorAll('input')[index + 1]?.focus();
		}
	}

	function handleKeydown(index, e) {
		if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
			otpContainerRef?.querySelectorAll('input')[index - 1]?.focus();
		}
	}

	function handlePaste(e) {
		e.preventDefault();
		const pasted = e.clipboardData?.getData('text')?.replace(/\D/g, '').slice(0, OTP_LENGTH) ?? '';
		const chars = pasted.split('');
		otpValues = otpValues.map((_, i) => chars[i] ?? '');
		const nextEmpty = otpValues.findIndex((x) => !x);
		const focusIndex = nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty;
		otpContainerRef?.querySelectorAll('input')[focusIndex]?.focus();
	}

	async function handleVerify() {
		const code = otpValues.join('');
		if (code.length !== OTP_LENGTH) return;

		const tempToken = browser ? sessionStorage.getItem('registrationTempToken') : null;
		if (!tempToken) {
			formError = 'Session expired. Please register again.';
			return;
		}

		formError = '';
		loading = true;
		try {
			const res = await fetch('/apis/register/verify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ temp_token: tempToken, otp: code })
			});

			const data = await res.json().catch(() => ({}));

			if (res.ok) {
				sessionStorage.removeItem('registrationTempToken');
				sessionStorage.removeItem('pendingVerificationEmail');
				sessionStorage.removeItem('registrationExpiresIn');
				goto('/login');
				return;
			}

			formError = messageFromErrorBody(data);
		} catch {
			formError = 'Network error. Please try again.';
		} finally {
			loading = false;
		}
	}

	const otpComplete = $derived(otpValues.every((v) => v));
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
			<p class="text-fg-muted text-sm">Verify your email</p>
		</div>

		<!-- OTP Card -->
		<div class="bg-surface-card border-stroke rounded-xl border p-6 shadow-sm">
			<p class="text-fg-muted mb-6 text-center text-sm">
				We've sent a 6-digit code to
				{#if displayEmail}
					<span class="text-fg font-medium">{displayEmail}</span>
				{:else}
					your email
				{/if}. Enter it below to verify your account.
			</p>

			{#if formError}
				<div class="mb-4">
					<Error title={formError} showClose={false} />
				</div>
			{/if}

			<p id="otp-label" class="text-fg mb-3 block text-sm font-semibold">Enter OTP</p>
			<div
				bind:this={otpContainerRef}
				class="mb-6 flex gap-2"
				role="group"
				aria-labelledby="otp-label"
			>
				{#each otpValues as _, i}
					<input
						type="text"
						inputmode="numeric"
						maxlength="1"
						autocomplete="one-time-code"
						class="border-stroke focus:border-primary bg-canvas text-fg size-12 rounded-lg border text-center text-lg font-semibold outline-none transition duration-(--motion-fast) focus:ring-2 focus:ring-primary/20"
						value={otpValues[i]}
						oninput={(e) => handleInput(i, e)}
						onkeydown={(e) => handleKeydown(i, e)}
						onpaste={i === 0 ? handlePaste : undefined}
					/>
				{/each}
			</div>

			<Button
				type="button"
				btnType="primary"
				customClass="w-full py-3 font-semibold rounded-xl"
				disabled={!otpComplete || loading}
				onclick={handleVerify}
			>
				{loading ? 'Verifying…' : 'Verify OTP'}
			</Button>

			<p class="text-fg-muted mt-6 text-center text-sm">
				<a href="/register" class="text-primary font-medium hover:underline">Back to registration</a>
			</p>
		</div>
	</div>
</div>
