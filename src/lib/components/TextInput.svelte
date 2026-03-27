<script>
	/**
	 * @typedef {import('svelte').Snippet<[]>} IconSnippet
	 *
	 * @typedef {Object} TextInputProps
	 * @property {string} [label] - Label above the input
	 * @property {string} [placeholder] - Placeholder text
	 * @property {string} [value=''] - Input value (bindable)
	 * @property {IconSnippet} [icon] - Optional left icon (e.g. User, Phone from Lucide)
	 * @property {'text'|'email'|'tel'|'password'} [type='text'] - Input type
	 * @property {boolean} [disabled=false] - Disabled state
	 * @property {string} [error] - Error message below input
	 * @property {string} [hint] - Helper text below input
	 * @property {string} [id] - Input id (for label association); auto-generated if omitted
	 * @property {string} [name] - Form field name
	 * @property {boolean} [required=false] - Required field
	 * @property {string} [class] - Extra classes for the wrapper
	 */

	let {
		label = '',
		placeholder = '',
		value = $bindable(''),
		icon,
		type = 'text',
		disabled = false,
		error = '',
		hint = '',
		id: idProp,
		name = '',
		required = false,
		class: className = '',
		...restProps
	} = $props();

	const fallbackId = `input-${crypto.randomUUID()}`;
	const inputId = $derived(idProp ?? fallbackId);
	const hasError = $derived(!!error);
	const describedBy = $derived([error && `${inputId}-error`, hint && `${inputId}-hint`].filter(Boolean).join(' ') || undefined);

	const styles = $derived.by(() => {
		const base = 'flex items-center gap-2 rounded-lg border bg-transparent px-3 py-1 transition duration-(--motion-fast) ease-(--ease-standard)';
		const state = hasError
			? 'border-danger focus-within:ring-2 focus-within:ring-danger/20 focus-within:border-danger'
			: 'border-stroke focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary';
		const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';
		return {
			container: `${base} ${state} ${disabledStyle}`.trim(),
			label: 'text-xs font-medium text-fg',
			iconWrapper: 'shrink-0 text-fg-muted [&_svg]:size-4',
			input: 'min-w-0 flex-1 bg-transparent text-sm text-fg font-poppins outline-none border-none ring-0 focus:ring-0 focus:border-none placeholder:text-fg-muted disabled:cursor-not-allowed',
			error: 'text-xs text-danger font-poppins',
			hint: 'text-xs text-fg-muted font-poppins',
		};
	});
</script>

<div class="flex flex-col gap-2 {className}">
	{#if label}
		<label for={inputId} class={styles.label}>
			{label}
			{#if required}<span class="text-danger" aria-hidden="true">*</span>{/if}
		</label>
	{/if}

	<div class={styles.container}>
		{#if icon}
			<span class={styles.iconWrapper}>{@render icon()}</span>
		{/if}
		<input
			id={inputId}
			{type}
			{name}
			{required}
			{disabled}
			{placeholder}
			bind:value
			aria-invalid={hasError || undefined}
			aria-required={required || undefined}
			aria-describedby={describedBy}
			class={styles.input}
			{...restProps}
		/>
	</div>

	{#if error}
		<p id="{inputId}-error" class={styles.error} role="alert">
			{error}
		</p>
	{:else if hint}
		<p id="{inputId}-hint" class={styles.hint}>
			{hint}
		</p>
	{/if}
</div>

<style>
	input::placeholder {
		opacity: 1;
	}
</style>
