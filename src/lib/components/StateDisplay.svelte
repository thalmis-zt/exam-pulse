<script>
	import Button from '$lib/components/Button.svelte';
	import { AlertCircle } from '@lucide/svelte';

	let {
		title = 'Failed to Load Data',
		message = 'Please Try Again',
		icon = null,
		buttonLabel = null,
		onButtonClick = null,
		isLoading = false,
		variant = 'error',
		children,
		actions
	} = $props();

	const variantConfig = {
		error: {
			iconBg: 'bg-danger/10',
			iconClass: 'text-danger',
			buttonType: 'danger'
		},
		warning: {
			iconBg: 'bg-warning/10',
			iconClass: 'text-warning',
			buttonType: 'warning'
		},
		info: {
			iconBg: 'bg-primary/10',
			iconClass: 'text-primary',
			buttonType: 'primary'
		},
		neutral: {
			iconBg: 'bg-fg-muted/10',
			iconClass: 'text-fg',
			buttonType: 'neutral'
		}
	};

	const config = $derived(variantConfig[variant] || variantConfig.error);
</script>

<div class="bg-surface-card flex flex-col items-center justify-center gap-4 rounded-md p-4 py-12">
	<!-- Icon Container -->
	<div class="rounded-md p-3 {config.iconBg}">
		{#if icon}
			{@const IconComponent = icon}
			<IconComponent size="40" class={config.iconClass} />
		{:else}
			<AlertCircle size="40" class={config.iconClass} />
		{/if}
	</div>

	<!-- Title & Message -->
     <div>
	<p class="text-fg text-center text-base font-semibold">{title}</p>
	<p class="text-fg-muted text-center text-sm">{message}</p>
    </div>

	<!-- Custom Content Slot -->
	{#if children}
			{@render children()}
	{/if}

	{#if buttonLabel && onButtonClick}
		<Button
			btnType={config.buttonType}
			onclick={onButtonClick}
			disabled={isLoading}
		>
			{#if isLoading}
				<span>Loading...</span>
			{:else}
				{buttonLabel}
			{/if}
		</Button>
	{/if}

	<!-- Actions Slot (for multiple actions) -->
	{#if actions}
			{@render actions()}
	{/if}
</div>
