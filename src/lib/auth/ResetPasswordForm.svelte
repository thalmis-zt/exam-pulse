<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { ArrowLeft, Key } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import InlineAlert from '$lib/components/InlineAlert.svelte';
	import { onMount } from 'svelte';
	import { getNewPasswordError, PASSWORD_POLICY_MESSAGE } from '$lib/auth/passwordValidation.js';

	const OTP_LENGTH = 6;

	let otpValues = $state(Array(OTP_LENGTH).fill(''));
	let otpContainerRef = $state(null);
	let newPassword = $state('');
	let confirmPassword = $state('');
	let passwordError = $state('');
	let confirmPasswordError = $state('');
	let formError = $state('');
	let loading = $state(false);
	let resendLoading = $state(false);
	let showResendSuccess = $state(false);
	let displayEmail = $state('');

	function dismissResendSuccess() {
		showResendSuccess = false;
	}

	function messageFromErrorBody(data) {
		if (!data || typeof data !== 'object') return 'Reset failed';
		if ('detail' in data && typeof data.detail === 'string') return data.detail;
		if ('message' in data && typeof data.message === 'string') return data.message;
		if ('error' in data && typeof data.error === 'string') return data.error;
		if (Array.isArray(data.detail) && data.detail[0] && typeof data.detail[0] === 'object') {
			const msgs = data.detail
				.map((x) => (x && typeof x === 'object' && 'msg' in x ? String(x.msg) : ''))
				.filter(Boolean);
			if (msgs.length) return msgs.join(' ');
		}
		return 'Reset failed';
	}

	/** Forgot-password API errors when resending OTP (same rules as ForgotPasswordForm). */
	function errorMessageForForgotPasswordResponse(res, data) {
		if (res.status === 422) return 'Please enter a valid email address.';
		if (res.status === 429) return 'Too many attempts. Please try again in an hour.';
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

	/** Maps HTTP status when reset-password response is not OK. */
	function errorMessageForResetPasswordResponse(res, data) {
		if (res.status === 400) return 'Invalid or expired OTP. Please request a new one.';
		if (res.status === 422) {
			return PASSWORD_POLICY_MESSAGE;
		}
		if (res.status === 429) return 'Too many attempts. Please try again in an hour.';
		return messageFromErrorBody(data);
	}

	function validatePasswordFields() {
		passwordError = '';
		confirmPasswordError = '';
		const pwdErr = getNewPasswordError(newPassword);
		if (pwdErr) {
			passwordError = pwdErr;
			return false;
		}
		if (!confirmPassword) {
			confirmPasswordError = 'Please confirm your password';
			return false;
		}
		if (newPassword !== confirmPassword) {
			confirmPasswordError = 'Passwords do not match';
			return false;
		}
		return true;
	}

	onMount(() => {
		if (!browser) return;
		const email = sessionStorage.getItem('forgotPasswordEmail');
		if (!email) {
			goto('/forgot-password');
			return;
		}
		displayEmail = email;
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

	async function handleResendOtp() {
		const email = displayEmail.trim();
		if (!email) return;

		resendLoading = true;
		formError = '';
		showResendSuccess = false;
		try {
			const res = await fetch('/apis/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			const data = await res.json().catch(() => ({}));

			if (res.ok) {
				otpValues = Array(OTP_LENGTH).fill('');
				showResendSuccess = true;
				otpContainerRef?.querySelector('input')?.focus();
				return;
			}

			formError = errorMessageForForgotPasswordResponse(res, data);
		} catch (err) {
			formError = err instanceof Error ? err.message : 'Request failed';
		} finally {
			resendLoading = false;
		}
	}

	async function handleSubmit() {
		const code = otpValues.join('');
		if (code.length !== OTP_LENGTH) return;

		passwordError = '';
		confirmPasswordError = '';
		if (!validatePasswordFields()) return;

		formError = '';
		showResendSuccess = false;
		loading = true;
		try {
			const res = await fetch('/apis/auth/reset-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					otp: code,
					new_password: newPassword
				})
			});

			const data = await res.json().catch(() => ({}));

			if (res.ok) {
				sessionStorage.removeItem('forgotPasswordEmail');
				goto('/login?reset=success');
				return;
			}

			formError = errorMessageForResetPasswordResponse(res, data);
		} catch (err) {
			formError = err instanceof Error ? err.message : 'Reset failed';
		} finally {
			loading = false;
		}
	}

	const otpComplete = $derived(otpValues.every((v) => v));
	const canSubmit = $derived(otpComplete && newPassword && confirmPassword);
</script>

<div class="bg-canvas flex min-h-screen items-center justify-center px-4 py-12">
	<div class="w-full max-w-md">
		<div class="mb-8 flex flex-col items-center text-center">
			<div class="bg-primary mb-5 flex size-14 items-center justify-center rounded-xl shadow-sm">
				<Key class="size-8 text-canvas-base-fixed" strokeWidth={2} aria-hidden="true" />
			</div>
			<h1 class="text-fg mb-2 text-2xl font-bold tracking-tight">Reset password</h1>
			<p class="text-fg-muted max-w-sm text-sm leading-relaxed">
				Enter the 6-digit code sent to
				{#if displayEmail}
					<span class="text-fg font-medium">{displayEmail}</span>
				{:else}
					<span class="text-fg font-medium">your email</span>
				{/if}
				, then choose your new password.
			</p>
		</div>

		<div class="bg-surface-card border-stroke rounded-xl border p-6 shadow-sm">
			<div class="flex flex-col gap-5">
				{#if formError}
					<InlineAlert variant="error" title={formError} showClose={false} />
				{/if}
				{#if showResendSuccess}
					<InlineAlert
						variant="success"
						title="New OTP sent"
						message="Check your email for the new OTP."
						onclose={dismissResendSuccess}
					/>
				{/if}

				<div>
					<div class="mb-3 flex items-center justify-between gap-2">
						<p id="otp-label" class="text-fg text-sm font-semibold">Enter OTP</p>
						<Button
							type="button"
							btnType="custom"
							customClass="text-primary h-auto min-h-0 shrink-0 cursor-pointer bg-transparent p-0 text-sm font-medium hover:underline border-0 shadow-none disabled:cursor-not-allowed disabled:opacity-50"
							disabled={loading || resendLoading}
							onclick={handleResendOtp}
						>
							{resendLoading ? 'Sending…' : 'Resend OTP'}
						</Button>
					</div>
					<div
						bind:this={otpContainerRef}
						class="flex flex-wrap gap-2"
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
				</div>

				<div class="flex flex-col gap-5">
					<PasswordInput
						label="New password"
						placeholder="Enter new password"
						bind:value={newPassword}
						error={passwordError}
						required
					/>
					<PasswordInput
						label="Confirm new password"
						placeholder="Confirm new password"
						bind:value={confirmPassword}
						error={confirmPasswordError}
						required
					/>
				</div>

				<Button
					type="button"
					btnType="primary"
					customClass="w-full py-3 font-semibold rounded-xl"
					disabled={!canSubmit || loading || resendLoading}
					onclick={handleSubmit}
				>
					{loading ? 'Updating password…' : 'Reset password'}
				</Button>
			</div>

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
