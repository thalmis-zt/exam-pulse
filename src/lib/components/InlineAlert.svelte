<script>
	import { CheckCircle, AlertTriangle, XCircle, Info } from '@lucide/svelte';

	let {
		variant = 'info',
		title = '',
		message = '',
		action = null,
		showClose = true,
		onclose,
		class: className = ''
	} = $props();

	const config = {
		success: {
			icon: CheckCircle,
			iconBg: 'bg-success/10',
			iconColor: 'text-success',
			containerBg: 'bg-success-surface',
			border: 'border-success/25'
		},
		warning: {
			icon: AlertTriangle,
			iconBg: 'bg-warning/10',
			iconColor: 'text-warning',
			containerBg: 'bg-warning-surface',
			border: 'border-warning/25'
		},
		error: {
			icon: XCircle,
			iconBg: 'bg-danger/10',
			iconColor: 'text-danger',
			containerBg: 'bg-danger-surface',
			border: 'border-danger/30'
		},
		info: {
			icon: Info,
			iconBg: 'bg-info/10',
			iconColor: 'text-info',
			containerBg: 'bg-info-surface',
			border: 'border-info/25'
		}
	};

	const actionButtonClasses = {
		success:
			'bg-secondary text-canvas-base-fixed hover:opacity-90',
		warning:
			'bg-warning text-canvas-base-fixed hover:opacity-90',
		error: 'bg-danger text-canvas-base-fixed hover:opacity-90',
		info: 'bg-primary text-canvas-base-fixed hover:bg-primary-hover'
	};

	const cfg = $derived(config[variant] ?? config.info);
	const Icon = $derived(cfg.icon);
	const actionBtn = $derived(actionButtonClasses[variant] ?? actionButtonClasses.info);

	function handleClose(e) {
		e?.stopPropagation?.();
		onclose?.();
	}

	function handleAction(e) {
		e?.stopPropagation?.();
		action?.handler?.();
	}
</script>

{#if title || message}
	<div
		class="
			w-full rounded-xl border p-3 shadow-sm {cfg.containerBg} {cfg.border}
			{className}
		"
		role="alert"
		aria-live="polite"
		aria-atomic="true"
	>
		<div class="flex items-start gap-3">
			<div class="flex shrink-0">
				<div
					class="flex size-10 items-center justify-center rounded-full {cfg.iconBg} {cfg.iconColor}"
				>
					<Icon size={20} />
				</div>
			</div>

			<div class="min-w-0 flex-1">
				<div class="flex items-start justify-between gap-2">
					<div class="min-w-0 flex-1">
						{#if title}
							<p class="font-semibold text-fg">{title}</p>
						{:else if message}
							<p class="text-sm text-fg">{message}</p>
						{/if}
					</div>

					<div class="flex shrink-0 items-center gap-2">
						{#if action?.text}
							<button
								type="button"
								class="
									rounded-md px-2.5 py-1 text-xs font-medium
									transition duration-(--motion-fast)
									{actionBtn}
								"
								onclick={handleAction}
							>
								{action.text}
							</button>
						{/if}
						{#if showClose}
							<button
								type="button"
								class="
									rounded-md px-2.5 py-1 text-xs font-medium
									transition duration-(--motion-fast)
									{actionBtn}
								"
								onclick={handleClose}
							>
								Close
							</button>
						{/if}
					</div>
				</div>

				{#if title && message}
					<p class="text-fg-muted mt-1 text-sm">{message}</p>
				{/if}
			</div>
		</div>
	</div>
{/if}
