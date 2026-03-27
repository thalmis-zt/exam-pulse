<script>
	import { Eye, EyeOff } from '@lucide/svelte';

	let {
		label = '',
		placeholder = '',
		value = $bindable(''),
		disabled = false,
		error = '',
		hint = '',
		id: idProp,
		name = '',
		required = false,
		class: className = '',
		onblur,
		...restProps
	} = $props();

	let showPassword = $state(false);

	const fallbackId = `password-${crypto.randomUUID()}`;
	const inputId = $derived(idProp ?? fallbackId);
	const hasError = $derived(!!error);
	const describedBy = $derived(
		[error && `${inputId}-error`, hint && `${inputId}-hint`].filter(Boolean).join(' ') || undefined
	);
	const inputType = $derived(showPassword ? 'text' : 'password');

	const containerStyles = $derived.by(() => {
		const base =
			'flex items-center gap-2 rounded-lg border bg-transparent px-3 py-1 pr-10 transition duration-(--motion-fast) ease-(--ease-standard)';
		const state = hasError
			? 'border-danger focus-within:ring-2 focus-within:ring-danger/20 focus-within:border-danger'
			: 'border-stroke focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary';
		const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';
		return `${base} ${state} ${disabledStyle}`.trim();
	});
</script>

<div class="flex flex-col gap-2 {className}">
	{#if label}
		<label for={inputId} class="text-xs font-medium text-fg">
			{label}
			{#if required}<span class="text-danger" aria-hidden="true">*</span>{/if}
		</label>
	{/if}

	<div class="relative {containerStyles}">
		<input
			id={inputId}
			type={inputType}
			{name}
			{required}
			{disabled}
			{placeholder}
			bind:value
			{onblur}
			aria-invalid={hasError || undefined}
			aria-required={required || undefined}
			aria-describedby={describedBy}
			class="min-w-0 flex-1 bg-transparent text-sm text-fg font-poppins outline-none border-none ring-0 focus:ring-0 focus:border-none placeholder:text-fg-muted disabled:cursor-not-allowed"
			{...restProps}
		/>
		<button
			type="button"
			class="text-fg-muted hover:text-fg absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 transition duration-(--motion-fast) ease-(--ease-standard)"
			tabindex="-1"
			aria-label={showPassword ? 'Hide password' : 'Show password'}
			onclick={() => (showPassword = !showPassword)}
		>
			{#if showPassword}
				<EyeOff size={16} />
			{:else}
				<Eye size={16} />
			{/if}
		</button>
	</div>

	{#if error}
		<p id="{inputId}-error" class="text-xs text-danger font-poppins" role="alert">
			{error}
		</p>
	{:else if hint}
		<p id="{inputId}-hint" class="text-xs text-fg-muted font-poppins">
			{hint}
		</p>
	{/if}
</div>
