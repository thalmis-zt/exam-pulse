<script>


	import { X } from '@lucide/svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	let {
		open = false,
		onclose,
		title = '',
		titleIcon,
		showClose = true,
		closeOnBackdropClick = true,
		closeOnEscape = true,
		children,
		footer,
		size = 'md',
		class: className = ''
	} = $props();

	const sizeClasses = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl'
	};

	let dialogRef = $state(null);

	$effect(() => {
		const dialog = dialogRef;
		if (!dialog) return;
		if (open) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	});

	function handleClose() {
		onclose?.();
	}

	function handleCancel(e) {
		if (!closeOnEscape) {
			e.preventDefault();
		} else {
			onclose?.();
		}
	}

	function handleClick(e) {
		if (closeOnBackdropClick && e.target === dialogRef) {
			onclose?.();
		}
	}
</script>

<dialog
	bind:this={dialogRef}
	class="
		m-auto overflow-visible bg-transparent p-4 outline-none
		backdrop:bg-fg/40 backdrop:transition-opacity
	"
	aria-labelledby={title ? 'modal-title' : undefined}
	oncancel={handleCancel}
	onclick={handleClick}
>
	<div
		class="
			bg-surface-modal border-stroke relative flex max-h-[90vh] w-full
			flex-col overflow-visible rounded-md border p-6 shadow-lg
			{sizeClasses[size]}
			{className}
		"
	>
		<!-- Header -->
		<div class="mb-4 flex items-start justify-between gap-2">
			<div class="flex min-w-0 flex-1 items-start gap-2">
				{#if titleIcon}
					<span class="text-danger mt-0.5 shrink-0 [&_svg]:size-5" aria-hidden="true">
						{@render titleIcon()}
					</span>
				{/if}
				{#if title}
					<h2 id="modal-title" class="text-fg text-base font-semibold">{title}</h2>
				{:else}
					<span id="modal-title" class="sr-only">Modal</span>
				{/if}
			</div>
			{#if showClose}
				<div class="shrink-0">
					<IconButton
						icon={X}
						ariaLabel="Close"
						variant="ghost-subtle"
						size="md"
						shape="square"
						onclick={handleClose}
					/>
				</div>
			{/if}
		</div>

		<div class="text-fg min-h-0 flex-1 overflow-visible">
			{#if children}
				{@render children()}
			{/if}
		</div>

		<!-- Footer -->
		{#if footer}
			<div class="mt-4 flex shrink-0 items-center justify-end gap-2 border-t border-stroke pt-4">
				{@render footer()}
			</div>
		{/if}
	</div>
</dialog>
