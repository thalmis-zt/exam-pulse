<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SearchBar from './SearchBar.svelte';

	const { Story } = defineMeta({
		title: 'Components/SearchBar',
		component: SearchBar,
		tags: ['autodocs'],
		argTypes: {
			placeholder: {
				control: 'text',
				description: 'Placeholder text for the input',
				table: { defaultValue: { summary: 'Search...' } },
			},
			variant: {
				control: 'select',
				options: ['sm', 'md', 'lg'],
				description: 'Size variant of the search bar',
				table: { defaultValue: { summary: 'md' } },
			},
			debounceMs: {
				control: 'number',
				description: 'Debounce delay for onSearch callback (ms)',
				table: { defaultValue: { summary: '300' } },
			},
		},
		args: {
			placeholder: 'Search...',
			variant: 'md',
			debounceMs: 300,
		},
	});
</script>

<Story name="Small" args={{ variant: 'sm', placeholder: 'Search...' }}>
	{#snippet template(args)}
		<div class="w-full max-w-md">
			<SearchBar variant={args.variant} placeholder={args.placeholder} debounceMs={args.debounceMs} />
		</div>
	{/snippet}
</Story>

<Story name="Medium" args={{ variant: 'md', placeholder: 'Search tests, topics...' }}>
	{#snippet template(args)}
		<div class="w-full max-w-md">
			<SearchBar variant={args.variant} placeholder={args.placeholder} debounceMs={args.debounceMs} />
		</div>
	{/snippet}
</Story>

<Story name="Large" args={{ variant: 'lg', placeholder: 'Search chapters...' }}>
	{#snippet template(args)}
		<div class="w-full max-w-md">
			<SearchBar variant={args.variant} placeholder={args.placeholder} />
		</div>
	{/snippet}
</Story>

<Story name="All sizes" asChild>
	<div class="flex w-full max-w-md flex-col gap-4">
		<SearchBar variant="sm" placeholder="Small" />
		<SearchBar variant="md" placeholder="Medium" />
		<SearchBar variant="lg" placeholder="Large" />
	</div>
</Story>

<Story name="With onSearch" asChild>
	<div class="w-full max-w-md">
		<SearchBar
			placeholder="Type to search (debounced 300ms)"
			onSearch={(q) => console.log('Search:', q)}
		/>
	</div>
</Story>
