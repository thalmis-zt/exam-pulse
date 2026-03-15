<script>
	import SearchBar from './SearchBar.svelte';
	let value = $state('');
</script>

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/SearchBar',
		component: SearchBar,
		tags: ['autodocs'],
		argTypes: {
			placeholder: { control: 'text' },
		},
		args: {
			placeholder: 'Search by topic or text...',
		},
	});
</script>

<Story name="Default" args={{ placeholder: 'Search by topic or text...' }}>
	{#snippet template(args)}
		<SearchBar
			placeholder={args.placeholder}
			height={args.height}
			width={args.width}
			bind:value
		/>
	{/snippet}
</Story>
