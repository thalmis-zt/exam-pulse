<script>
	import { AlertTriangle, X } from '@lucide/svelte';

	let {
		open = false,
		title = '',
		/** 'danger' shows a warning icon and destructive-colored title */
		titleTone = 'default',
		size = 'md',
		showClose = true,
		closeOnBackdropClick = true,
		closeOnEscape = true,
		onclose,
		children,
		footer
	} = $props();

	const isDangerTitle = $derived(titleTone === 'danger');

	const sizeClasses = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg'
	};

	const sizeClass = $derived(sizeClasses[size] ?? sizeClasses.md);

	function handleBackdropClick(e) {
		if (e.target === e.currentTarget && closeOnBackdropClick) {
			onclose?.();
		}
	}

	function handleKeydown(e) {
		if (e.key === 'Escape' && closeOnEscape) {
			e.preventDefault();
			onclose?.();
		}
	}

	$effect(() => {
		if (typeof window === 'undefined') return;
		if (!open) return;
		const handler = handleKeydown;
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	});
</script>

{#if open}
	<div
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
	>
		<!-- Backdrop -->
		<button
			type="button"
			aria-label="Close modal"
			class="fixed inset-0 bg-fg/50 backdrop-blur-sm"
			onclick={handleBackdropClick}
		></button>

		<!-- Modal panel -->
		<div
			class="
				relative z-10 w-full overflow-hidden rounded-xl
				bg-surface-modal shadow-lg
				{sizeClass}
			"
		>
			<!-- Header -->
			<div class="flex items-start justify-between gap-4 border-b border-stroke px-6 py-4">
				<div class="flex min-w-0 flex-1 items-center gap-3">
					{#if isDangerTitle}
						<span
							class="bg-danger-surface text-danger flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
							aria-hidden="true"
						>
							<AlertTriangle size={20} strokeWidth={2} />
						</span>
					{/if}
					<h2
						id="modal-title"
						class="text-lg font-semibold {isDangerTitle ? 'text-danger' : 'text-fg'}"
					>
						{title}
					</h2>
				</div>
				{#if showClose}
					<button
						type="button"
						aria-label="Close"
						class="text-fg-muted hover:text-fg -mr-2 rounded p-2 transition-colors"
						onclick={() => onclose?.()}
					>
						<X size={20} />
					</button>
				{/if}
			</div>

			<!-- Body -->
			<div class="px-6 py-4">
				{@render children?.()}
			</div>

			{#if footer}
				<div class="border-t border-stroke px-6 py-4">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}
