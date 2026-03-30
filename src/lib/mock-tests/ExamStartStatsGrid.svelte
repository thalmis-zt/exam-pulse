<script>
	import { Clock, ClipboardList, Users, Shield } from '@lucide/svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string} duration
	 * @property {string} questions
	 * @property {string} users
	 * @property {string} [difficulty]
	 */

	/** @type {Props} */
	let { duration, questions, users, difficulty } = $props();

	const stats = $derived([
		{ label: 'Duration', value: duration, icon: Clock },
		{ label: 'Questions', value: questions, icon: ClipboardList },
		{ label: 'Attempts', value: users, icon: Users },
		...(difficulty ? [{ label: 'Level', value: difficulty, icon: Shield }] : [])
	]);
</script>

<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
	{#each stats as stat (stat.label)}
		<div
			class="flex flex-col items-center gap-2 rounded-lg border border-stroke bg-surface-card px-3 py-4 text-center shadow-sm"
		>
			<div
				class="flex size-9 items-center justify-center rounded-lg bg-primary-light text-primary"
				aria-hidden="true"
			>
				<stat.icon size={18} />
			</div>
			<span class="text-sm font-bold text-fg">{stat.value}</span>
			<span class="text-xs text-fg-muted">{stat.label}</span>
		</div>
	{/each}
</div>
