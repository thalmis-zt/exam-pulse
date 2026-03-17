<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ProgressBar from './ProgressBar.svelte';
	import { Trophy } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'Components/ProgressBar',
		component: ProgressBar,
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'range', min: 0, max: 100, step: 1 },
				description: 'Progress 0–100 (ignored if current+total provided)',
			},
			current: {
				control: 'number',
				description: 'Current value (for current/total mode)',
			},
			total: {
				control: 'number',
				description: 'Total value (for current/total mode)',
			},
			target: {
				control: { type: 'number', min: 0, max: 100 },
				description: 'Target 0–100; below = red, at/above = blue',
			},
			variant: {
				control: 'select',
				options: ['primary', 'danger', 'success'],
				description: 'Override auto color',
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg'],
				description: 'Bar height',
				table: { defaultValue: { summary: 'md' } },
			},
		},
		args: {
			value: 65,
			size: 'md',
		},
	});
</script>

<Story name="Basic" args={{ value: 65 }}>
	<ProgressBar value={65} ariaLabel="Progress 65%" />
</Story>

<Story name="With labels (target below)" args={{ value: 65, target: 80 }}>
	<ProgressBar value={65} target={80} ariaLabel="Current level 65%, target 80%">
		{#snippet labelLeft()}
			<span>Current level</span>
		{/snippet}
		{#snippet labelRight()}
			<span class="text-danger font-semibold">Target: 80%</span>
		{/snippet}
	</ProgressBar>
</Story>

<Story name="With labels (target met)" args={{ value: 85, target: 80 }}>
	<ProgressBar value={85} target={80} ariaLabel="Current level 85%, target 80%">
		{#snippet labelLeft()}
			<span>Current level</span>
		{/snippet}
		{#snippet labelRight()}
			<span class="text-primary font-semibold">Target: 80%</span>
		{/snippet}
	</ProgressBar>
</Story>

<Story name="XP progress (current/total)" args={{ current: 2450, total: 3000 }}>
	<ProgressBar current={2450} total={3000} ariaLabel="2,450 of 3,000 XP">
		{#snippet labelLeft()}
			<span class="inline-flex items-center gap-2 font-semibold text-fg normal-case">
				<Trophy size={14} class="text-warning" />
				Silver II
			</span>
		{/snippet}
		{#snippet labelRight()}
			<span class="normal-case">
				<span class="text-primary font-semibold">2,450</span>
				<span class="text-fg-muted"> / 3,000 XP</span>
			</span>
		{/snippet}
	</ProgressBar>
</Story>

<Story name="Sizes">
	<div class="flex flex-col gap-6 w-full max-w-md">
		<ProgressBar value={40} size="sm" ariaLabel="Small progress 40%" />
		<ProgressBar value={60} size="md" ariaLabel="Medium progress 60%" />
		<ProgressBar value={80} size="lg" ariaLabel="Large progress 80%" />
	</div>
</Story>

<Story name="Variants (override)">
	<div class="flex flex-col gap-6 w-full max-w-md">
		<ProgressBar value={70} variant="primary" ariaLabel="Primary 70%" />
		<ProgressBar value={70} variant="danger" ariaLabel="Danger 70%" />
		<ProgressBar value={70} variant="success" ariaLabel="Success 70%" />
	</div>
</Story>
