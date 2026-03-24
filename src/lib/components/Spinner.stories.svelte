<script>
	import Spinner from './Spinner.svelte';
</script>

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/Spinner',
		component: Spinner,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg'],
				table: { defaultValue: { summary: 'md' } }
			},
			variant: {
				control: 'select',
				options: ['primary', 'custom'],
				table: { defaultValue: { summary: 'primary' } }
			}
		}
	});
</script>

<Story name="Primary">
	<Spinner />
</Story>

<Story name="With message (below spinner)">
	<Spinner message="Loading..." />
</Story>

<Story name="Sizes">
	<div class="flex flex-wrap items-center gap-6">
		<Spinner size="sm" message="Small" />
		<Spinner size="md" message="Medium" />
		<Spinner size="lg" message="Large" />
	</div>
</Story>

<Story name="Custom variant">
	<div class="flex flex-wrap items-center gap-6">
		<Spinner variant="custom" class="text-white" message="On dark" />
	</div>
	<div class="mt-4 rounded-lg bg-primary p-4">
		<Spinner variant="custom" class="text-canvas-base-fixed" message="On primary" />
	</div>
</Story>
