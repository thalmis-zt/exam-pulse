<script>
	import Toggle from './Toggle.svelte';

	let checked = $state(false);
	let checkedOn = $state(true);
	let checkedSm = $state(false);
	let checkedMd = $state(true);
</script>

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/Toggle',
		component: Toggle,
		tags: ['autodocs'],
		argTypes: {
			checked: {
				control: 'boolean',
				description: 'Current state (on/off)',
				table: { defaultValue: { summary: false } },
			},
			disabled: {
				control: 'boolean',
				description: 'Disabled state',
				table: { defaultValue: { summary: false } },
			},
			size: {
				control: 'select',
				options: ['sm', 'md'],
				description: 'Track size',
				table: { defaultValue: { summary: 'md' } },
			},
			variant: {
				control: 'select',
				options: ['primary', 'secondary'],
				description: 'primary=blue, secondary=green when on',
				table: { defaultValue: { summary: 'primary' } },
			},
		},
		args: {
			checked: false,
			disabled: false,
			size: 'md',
		},
	});
</script>

<Story name="Default (off)">
	<Toggle bind:checked ariaLabel="Toggle setting" />
</Story>

<Story name="On">
	<Toggle bind:checked={checkedOn} ariaLabel="Toggle on" />
</Story>

<Story name="Sizes">
	<div class="flex items-center gap-6">
		<div>
			<p class="mb-2 text-xs text-fg-muted">Small</p>
			<Toggle bind:checked={checkedSm} size="sm" ariaLabel="Small toggle" />
		</div>
		<div>
			<p class="mb-2 text-xs text-fg-muted">Medium</p>
			<Toggle bind:checked={checkedMd} size="md" ariaLabel="Medium toggle" />
		</div>
	</div>
</Story>

<Story name="Variants">
	<div class="flex items-center gap-6">
		<div>
			<p class="mb-2 text-xs text-fg-muted">Primary (blue)</p>
			<Toggle checked={true} variant="primary" ariaLabel="Primary toggle" />
		</div>
		<div>
			<p class="mb-2 text-xs text-fg-muted">Secondary (green)</p>
			<Toggle checked={true} variant="secondary" ariaLabel="Secondary toggle" />
		</div>
	</div>
</Story>

<Story name="Disabled">
	<div class="flex items-center gap-6">
		<Toggle checked={false} disabled ariaLabel="Disabled off" />
		<Toggle checked={true} disabled ariaLabel="Disabled on" />
	</div>
</Story>
