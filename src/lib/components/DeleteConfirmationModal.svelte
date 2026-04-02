<script>
	import { Trash2, X } from '@lucide/svelte';
	import Portal from '$lib/components/Portal.svelte';
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
		oncancel,
		showClose = true,
		closeOnEscape = true
	} = $props();

	let confirmationText = $state('');
	let modalError = $state('');
	let showModalError = $state(false);
	let loading = $state(false);

	const canDelete = $derived(
		confirmationText.trim().toLowerCase() === String(confirmationValue).trim().toLowerCase()
	);

	const displayConfirmationLabel = $derived(
		confirmationLabel || `Type "${String(confirmationValue).toUpperCase()}" to confirm`
	);

	const modalTitle = $derived.by(() => {
		const custom = (titleOverride ?? '').trim();
		if (custom) return custom;
		const displayName = entity?.[fields[0]?.key] ?? entityName;
		return `About to delete the ${entityType} - "${displayName}"`;
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
		if (event.key === 'Escape' && closeOnEscape && !loading) {
			event.preventDefault();
			handleCancel();
		}
	}
</script>

{#if open}
	<Portal>
		<div
			class="bg-surface-card-subtle relative w-full max-w-lg rounded-lg px-4 sm:px-6 shadow-sm"
			role="dialog"
			aria-labelledby="dialog-title"
			tabindex="0"
			onkeydown={handleKeydown}
		>
			{#if showModalError}
			<div class="pt-4">
			<InlineAlert
				variant="error"
				message={ modalError ?? `Error deleting the ${entityType}. Please try again.`}
				showClose={false}
			/>
			</div>
			{/if}

			<!-- Header -->
			<div class="border-stroke flex items-center justify-between gap-3 pb-3 {showModalError ? 'pt-4' : 'pt-6'}">
				<div class="flex items-center gap-2">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
						<Trash2 size={18} class="text-red-600" />
					</div>
					<div>
						<h2 id="dialog-title" class="text-base font-bold text-red-500">
							{modalTitle}
						</h2>
					</div>
				</div>
			</div>
			<p class="text-fg-muted text-sm">
				Are you sure you want to delete this {entityType}? This action cannot be undone.
			</p>
			<!-- Body -->
			<div class="flex flex-col gap-4 py-3">
				{#if entity}
					<!-- Entity details: custom snippet or default dl -->
					{#if details}
						{@render details()}
					{:else if fields.length}
						<div class="border-stroke bg-surface-card rounded-md border p-4">
							<h4 class="text-fg mb-2 text-xs font-medium uppercase">{entityName} details</h4>
							<dl class="space-y-1">
								{#each fields as field (field.key)}
									<div class="flex items-start gap-x-2">
										<dt class="text-fg/80 shrink-0 text-sm font-medium">{field.label} :</dt>
										<dd class="text-fg min-w-0 flex-1 text-sm">
											{entity[field.key] ?? '—'}
										</dd>
									</div>
								{/each}
							</dl>
						</div>
					{/if}

					<!-- Confirmation input -->
					<div class="">
						<label for="delete-confirm-input" class="text-fg-muted mb-1 block text-sm"
							>{displayConfirmationLabel}</label
						>
						<TextInput
							id="delete-confirm-input"
							placeholder={String(confirmationValue).toUpperCase()}
							bind:value={confirmationText}
						/>
					</div>
				{/if}
			</div>

			<!-- Footer -->

			<div class="flex flex-col-reverse gap-3 pt-2 pb-6 sm:flex-row sm:justify-end">
				<Button btnType="neutral" disabled={loading} onclick={handleCancel}>Cancel</Button>
				<Button btnType="danger" disabled={!canDelete || loading} onclick={handleDelete}>
					{loading ? 'DELETING...' : 'DELETE'}
				</Button>
			</div>
		</div>
	</Portal>
{/if}
