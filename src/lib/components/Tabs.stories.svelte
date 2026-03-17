<script>
	import Tabs from './Tabs.svelte';

	let selected = $state('all');
	let selectedSm = $state('all');
	let selectedMd = $state('all');
	let selectedLg = $state('all');
</script>

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const DIFFICULTY_OPTIONS = [
		{ value: 'all', label: 'All' },
		{ value: 'easy', label: 'Easy' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'hard', label: 'Hard' }
	];

	const { Story } = defineMeta({
		title: 'Components/Tabs',
		component: Tabs,
		tags: ['autodocs'],
		argTypes: {
			selected: {
				control: 'select',
				options: ['all', 'easy', 'medium', 'hard'],
				description: 'Currently selected tab value',
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg'],
				description: 'Tab padding and text size',
				table: { defaultValue: { summary: 'md' } },
			},
		},
		args: {
			options: DIFFICULTY_OPTIONS,
			selected: 'all',
			size: 'md',
		},
	});
</script>

<Story name="Difficulty filter" args={{ options: DIFFICULTY_OPTIONS, selected: 'all' }}>
	<Tabs
		options={DIFFICULTY_OPTIONS}
		selected={selected}
		onSelect={(v) => (selected = v)}
	/>
</Story>

<Story name="Sizes">
	<div class="flex flex-col gap-6">
		<div>
			<p class="mb-2 text-xs text-fg-muted">Small</p>
			<Tabs
				options={DIFFICULTY_OPTIONS}
				selected={selectedSm}
				onSelect={(v) => (selectedSm = v)}
				size="sm"
			/>
		</div>
		<div>
			<p class="mb-2 text-xs text-fg-muted">Medium</p>
			<Tabs
				options={DIFFICULTY_OPTIONS}
				selected={selectedMd}
				onSelect={(v) => (selectedMd = v)}
				size="md"
			/>
		</div>
		<div>
			<p class="mb-2 text-xs text-fg-muted">Large</p>
			<Tabs
				options={DIFFICULTY_OPTIONS}
				selected={selectedLg}
				onSelect={(v) => (selectedLg = v)}
				size="lg"
			/>
		</div>
	</div>
</Story>
