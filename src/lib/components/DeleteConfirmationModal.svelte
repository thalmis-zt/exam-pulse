<script>
	import { Trash2 } from '@lucide/svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import InlineAlert from '$lib/components/InlineAlert.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	let {
		open = false,
		onclose,
		entity = null,
		entityName = 'item',
		entityType = 'item',
		fields = [],
		titleOverride = '',
		details,
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

	const modalTitle = $derived.by(() => {
		const custom = (titleOverride ?? '').trim();
		if (custom) return custom;
		const displayName = entity?.[fields[0]?.key] ?? entityName;
		return `About to delete the ${entityType} '${displayName}'`;
	});

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
	title={modalTitle}
	size="lg"
	showClose={!loading}
	closeOnBackdropClick={!loading}
	closeOnEscape={!loading}
	onclose={handleCancel}
>
	{#snippet titleIcon()}
		<Trash2 />
	{/snippet}
	{#snippet children()}
		{#if entity}
			<div class="space-y-6">
				{#if showModalError}
					<InlineAlert
						variant="error"
						title="Error"
						message={modalError}
						action={{ text: 'Retry', handler: handleRetry }}
						showClose={true}
						onclose={handleErrorClose}
					/>
				{/if}


				<!-- Entity details: custom snippet or default dl -->
				{#if details}
					{@render details()}
				{:else if fields.length}
					<div class="rounded-md border border-stroke bg-fg-muted/10 p-4">
						<h4 class="text-fg mb-3 text-sm font-semibold">{entityName} details</h4>
						<dl class="grid gap-y-2">
							{#each fields as field}
								<div class="flex items-start gap-x-2">
									<dt class="text-fg-muted shrink-0 text-sm font-medium">{field.label}:</dt>
									<dd class="text-fg min-w-0 flex-1 wrap-break-word text-sm font-medium">
										{entity[field.key] ?? '—'}
									</dd>
								</div>
							{/each}
						</dl>
					</div>
				{/if}

				<!-- Confirmation input -->
				<TextInput
					id="delete-confirm-input"
					label={displayConfirmationLabel}
					placeholder={confirmationValue}
					bind:value={confirmationText}
				/>
			</div>
		{/if}
	{/snippet}

	{#snippet footer()}
		<div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
			<Button btnType="neutral" disabled={loading} onclick={handleCancel}>
				Cancel
			</Button>
			<Button btnType="danger" disabled={!canDelete || loading} onclick={handleDelete}>
				{loading ? 'Deleting...' : 'Delete'}
			</Button>
		</div>
	{/snippet}
</Modal>
