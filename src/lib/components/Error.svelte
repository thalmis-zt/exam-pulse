<script>
	import { XCircle } from '@lucide/svelte';

	let {
		title = '',
		subtitle = '',
		action = null,
		showClose = true,
		onclose,
		class: className = ''
	} = $props();

	function handleClose(e) {
		e?.stopPropagation?.();
		onclose?.();
	}

	function handleAction(e) {
		e?.stopPropagation?.();
		action?.handler?.();
	}
</script>

<div
	class="
		relative flex items-start gap-3 rounded-xl border border-danger/30
		bg-danger-surface p-4 text-danger
		{className}
	"
	role="alert"
	aria-live="polite"
>
	<!-- Icon -->
	<div class="flex shrink-0">
		<div class="flex size-10 items-center justify-center rounded-full bg-danger/10">
			<XCircle size={20} class="text-danger" />
		</div>
	</div>

	<!-- Content -->
	<div class="text-fg min-w-0 flex-1">
		<div class="flex items-start justify-between gap-2">
			<div class="min-w-0 mt-1 flex-1">
				{#if title}
					<p class="font-semibold text-danger">{title}</p>
				{/if}
				{#if subtitle}
					<p class="text-fg-muted mt-0.5 text-sm">{subtitle}</p>
				{/if}
			</div>

			<!-- Action + Close -->
			<div class="flex shrink-0 items-center gap-2">
				{#if action?.text}
					<button
						type="button"
						class="
							bg-danger text-canvas-base-fixed hover:opacity-90
							rounded-md px-2.5 py-1 text-xs font-medium
							transition duration-(--motion-fast)
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
							bg-surface-card text-danger hover:bg-canvas
							rounded-md border border-danger/30 px-2.5 py-1 text-xs font-medium
							transition duration-(--motion-fast)
						"
						onclick={handleClose}
					>
						Close
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
