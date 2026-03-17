<script>
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import Error from '$lib/components/Error.svelte';
	import { AlertTriangle } from '@lucide/svelte';
	let {
		open = false,
		onclose,
		entity = null,
		entityName = 'item',
		fields = [],
		confirmationValue = 'delete',
		confirmationLabel = '',
		onconfirm,
		oncancel
	} = $props();

	let confirmationText = $state('');
	let modalError = $state('');
	let showModalError = $state(false);
	let loading = $state(false);

	const canDelete = $derived(
		confirmationText.trim().toLowerCase() === String(confirmationValue).trim().toLowerCase()
	);

	const displayConfirmationLabel = $derived(confirmationLabel || `Type "${confirmationValue}" to confirm`);

	$effect(() => {
		if (!open) {
			confirmationText = '';
			modalError = '';
			showModalError = false;
		}
	});

	function handleCancel() {
		if (loading) return;
		oncancel?.();
		onclose?.();
	}

	async function handleDelete() {
		if (!canDelete || loading || !entity || !onconfirm) return;

		modalError = '';
		showModalError = false;
		loading = true;

		try {
			await onconfirm(entity);
			onclose?.();
		} catch (err) {
			modalError = err?.message ?? 'Something went wrong. Please try again.';
			showModalError = true;
		} finally {
			loading = false;
		}
	}

	function handleRetry() {
		showModalError = false;
		modalError = '';
		handleDelete();
	}

	function handleErrorClose() {
		showModalError = false;
		modalError = '';
	}

	function handleKeydown(event) {
		if (event.key === 'Enter' && canDelete && !loading) {
			event.preventDefault();
			handleDelete();
		}
	}
</script>

<Modal
	open={open}
	title="Delete {entityName}?"
	size="md"
	showClose={!loading}
	closeOnBackdropClick={!loading}
	closeOnEscape={!loading}
	onclose={handleCancel}
>
	{#snippet children()}
		{#if entity}
			<div class="space-y-6">
				{#if showModalError}
					<Error
						title="Error"
						subtitle={modalError}
						action={{ text: 'Retry', handler: handleRetry }}
						showClose={true}
						onclose={handleErrorClose}
					/>
				{/if}

				<!-- Warning block -->
				<div
					class="flex items-start gap-4 rounded-xl border border-danger/30 bg-danger-surface p-4"
				>
					<AlertTriangle class="size-6 shrink-0 text-danger" />
					<div>
						<p class="text-fg font-semibold">
							Are you sure you want to delete
							<strong class="text-danger">
								{entity[fields[0]?.key] ?? 'this item'}
							</strong>?
						</p>
						<p class="text-fg-muted mt-1 text-sm">This action cannot be undone.</p>
					</div>
				</div>

				<!-- Entity details -->
				{#if fields.length}
				<div class="rounded-xl border border-stroke bg-surface-card p-4">
					<h4 class="text-fg mb-3 text-sm font-semibold">{entityName} details</h4>
					<dl class="grid gap-y-2">
						{#each fields as field}
							<div class="flex items-center gap-x-2">
								<dt class="text-fg-muted text-sm font-medium">{field.label}:</dt>
								<dd class="text-fg text-sm font-medium">{entity[field.key] ?? '—'}</dd>
							</div>
						{/each}
					</dl>
				</div>
				{/if}

				<!-- Confirmation input -->
				<div class="space-y-2">
					<label for="delete-confirm-input" class="text-fg block text-sm font-semibold">
						{displayConfirmationLabel}
					</label>
					<input
						id="delete-confirm-input"
						type="text"
						bind:value={confirmationText}
						onkeydown={handleKeydown}
						placeholder={confirmationValue}
						disabled={loading}
						autocomplete="off"
						class="
							border-stroke bg-surface-card text-fg
							block w-full rounded-xl border px-4 py-3 text-sm
							placeholder:text-fg-muted
							focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
							disabled:bg-canvas disabled:text-fg-muted disabled:cursor-not-allowed
						"
					/>
				</div>
			</div>
		{/if}
	{/snippet}

	{#snippet footer()}
		<div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
			<Button btnType="dangerLight" disabled={loading} onclick={handleCancel}>
				Cancel
			</Button>
			<Button btnType="danger" disabled={!canDelete || loading} onclick={handleDelete}>
				{loading ? 'Deleting...' : 'Delete'}
			</Button>
		</div>
	{/snippet}
</Modal>
