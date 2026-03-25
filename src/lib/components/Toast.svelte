<script>
	import { CheckCircle, AlertTriangle, XCircle, Info, X } from '@lucide/svelte';

	let {
		variant = 'info',
		title = '',
		message = '',
		duration = 0,
		onclose,
		class: className = ''
	} = $props();

	const config = {
		success: {
			icon: CheckCircle,
			iconBg: 'bg-success-surface',
			iconColor: 'text-success'
		},
		warning: {
			icon: AlertTriangle,
			iconBg: 'bg-warning-surface',
			iconColor: 'text-warning'
		},
		error: {
			icon: XCircle,
			iconBg: 'bg-danger-surface',
			iconColor: 'text-danger'
		},
		info: {
			icon: Info,
			iconBg: 'bg-info-surface',
			iconColor: 'text-info'
		}
	};

	const cfg = $derived(config[variant] ?? config.info);
	const Icon = $derived(cfg.icon);

	let timeoutId = $state(null);

	$effect(() => {
		if (duration > 0) {
			const id = setTimeout(() => onclose?.(), duration);
			timeoutId = id;
			return () => clearTimeout(id);
		}
	});

	function handleClose() {
		if (timeoutId) clearTimeout(timeoutId);
		onclose?.();
	}
</script>

<div
	class="
		relative flex items-start gap-3 rounded-xl border border-stroke
		bg-surface-card p-4 shadow-lg
		{className}
	"
	role="alert"
>
	<!-- Left icon -->
	<div class="flex shrink-0">
		<div class="flex size-10 items-center justify-center rounded-full {cfg.iconBg} {cfg.iconColor}">
			<Icon size={20} />
		</div>
	</div>

	<!-- Content -->
	<div class="text-fg min-w-0 flex-1">
		{#if title}
			<p class="font-semibold">{title}</p>
			{#if message}
				<p class="text-fg-muted mt-0.5 text-sm">{message}</p>
			{/if}
		{:else if message}
			<p class="text-sm">{message}</p>
		{/if}
	</div>

	<!-- Close - in flow, right end -->
	<button
		type="button"
		class="text-fg-muted hover:bg-canvas hover:text-fg -mr-2 -mt-1 shrink-0 rounded p-1 transition"
		aria-label="Close"
		onclick={handleClose}
	>
		<X size={18} />
	</button>
</div>
