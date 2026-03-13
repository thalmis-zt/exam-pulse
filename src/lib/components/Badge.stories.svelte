<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './Badge.svelte';
	import { TrendingUp, Clock } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'Components/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Badge text',
			},
			variant: {
				control: 'select',
				options: ['default', 'primary', 'success', 'danger', 'warning'],
				description: 'Color variant',
				table: { defaultValue: { summary: 'default' } },
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg'],
				description: 'Padding and text size',
				table: { defaultValue: { summary: 'md' } },
			},
		},
		args: {
			label: 'Badge',
			variant: 'default',
			size: 'md',
		},
	});
</script>

<Story name="Default" args={{ label: 'Maths', variant: 'default' }}>
	{#snippet template(args)}
		<Badge label={args.label} variant={args.variant} size={args.size} />
	{/snippet}
</Story>

<Story name="Primary (XP)" args={{ label: '420 XP Earned', variant: 'primary' }}>
	{#snippet template(args)}
		<Badge label={args.label} variant={args.variant} size={args.size}>
			{#snippet icon()}
				<TrendingUp size={14} />
			{/snippet}
		</Badge>
	{/snippet}
</Story>

<Story name="Success" args={{ label: 'Completed', variant: 'success' }}>
	{#snippet template(args)}
		<Badge label={args.label} variant={args.variant} size={args.size} />
	{/snippet}
</Story>

<Story name="Danger (Timer)" args={{ label: '0:45', variant: 'danger' }}>
	{#snippet template(args)}
		<Badge label={args.label} variant={args.variant} size={args.size}>
			{#snippet icon()}
				<Clock size={14} />
			{/snippet}
		</Badge>
	{/snippet}
</Story>

<Story name="Warning" args={{ label: 'Medium', variant: 'warning' }}>
	{#snippet template(args)}
		<Badge label={args.label} variant={args.variant} size={args.size} />
	{/snippet}
</Story>

<Story name="All variants" asChild>
	<div class="flex flex-wrap gap-3">
		<Badge label="Maths" variant="default" />
		<Badge label="420 XP Earned" variant="primary">
			{#snippet icon()}<TrendingUp size={14} />{/snippet}
		</Badge>
		<Badge label="Completed" variant="success" />
		<Badge label="0:45" variant="danger">
			{#snippet icon()}<Clock size={14} />{/snippet}
		</Badge>
		<Badge label="Medium" variant="warning" />
	</div>
</Story>

<Story name="Sizes" asChild>
	<div class="flex flex-wrap items-center gap-4">
		<Badge label="Small" variant="primary" size="sm" />
		<Badge label="Medium" variant="primary" size="md" />
		<Badge label="Large" variant="primary" size="lg" />
	</div>
</Story>
