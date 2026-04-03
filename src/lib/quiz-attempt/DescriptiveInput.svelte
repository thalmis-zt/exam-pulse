<script>
	import TextInput from '$lib/components/TextInput.svelte';

	/**
	 * Single-line descriptive answer (short_answer) using TextInput — text or number per API.
	 * @type {{
	 *   label?: string,
	 *   placeholder?: string,
	 *   value?: string,
	 *   onValueChange?: (v: string) => void,
	 *   answerInputType?: 'text' | 'number',
	 *   id?: string
	 * }}
	 */
	let {
		label = 'Your answer',
		placeholder = '',
		value = '',
		onValueChange = /** @param {string} _v */ (_v) => {},
		answerInputType = 'text',
		id = 'descriptive-answer-input'
	} = $props();

	let local = $state(value);

	$effect(() => {
		local = value;
	});

	const inputType = $derived(answerInputType === 'number' ? 'number' : 'text');

	const error = $derived.by(() => {
		const v = String(local).trim();
		if (v === '' || answerInputType !== 'number') return '';
		const n = Number(v);
		if (!Number.isFinite(n)) return 'Enter a valid number';
		return '';
	});

	function emit() {
		onValueChange(local);
	}

	function handleInput() {
		emit();
	}
</script>

<TextInput
	{label}
	{placeholder}
	bind:value={local}
	type={inputType}
	{id}
	error={error}
	hint={answerInputType === 'number' ? 'Enter a numeric value' : ''}
	step={answerInputType === 'number' ? 'any' : undefined}
	oninput={handleInput}
/>
