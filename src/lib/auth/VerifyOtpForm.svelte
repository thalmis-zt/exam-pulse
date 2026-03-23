<script>
	import { goto } from '$app/navigation';
	import { Zap } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';

	const OTP_LENGTH = 6;
	const RESEND_COOLDOWN_SECONDS = 5;

	let otpValues = $state(Array(OTP_LENGTH).fill(''));
	let otpContainerRef = $state(null);
	let resendCooldown = $state(0);
	let cooldownInterval = $state(null);

	onMount(() => {
		otpContainerRef?.querySelector('input')?.focus();
		return () => {
			if (cooldownInterval) clearInterval(cooldownInterval);
		};
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

	function handleVerify() {
		const code = otpValues.join('');
		if (code.length !== OTP_LENGTH) return;
		// No backend: any 6 digits is success
		goto('/login');
	}

	function handleResend() {
		if (resendCooldown > 0) return;
		resendCooldown = RESEND_COOLDOWN_SECONDS;
		cooldownInterval = setInterval(() => {
			resendCooldown -= 1;
			if (resendCooldown <= 0) {
				clearInterval(cooldownInterval);
				cooldownInterval = null;
			}
		}, 1000);
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
				We've sent a 6-digit code to your email. Enter it below to verify your account.
			</p>

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
				disabled={!otpComplete}
				onclick={handleVerify}
			>
				Verify OTP
			</Button>

			<div class="border-stroke mt-6 border-t pt-6">
				<p class="text-fg-muted text-center text-sm">Didn't receive the code?</p>
				<button
					type="button"
					class="text-primary hover:underline mt-1 w-full text-center text-sm font-medium disabled:cursor-not-allowed disabled:text-fg-muted disabled:no-underline"
					disabled={resendCooldown > 0}
					onclick={handleResend}
				>
					{#if resendCooldown > 0}
						Resend OTP in {resendCooldown}s
					{:else}
						Resend OTP
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>
