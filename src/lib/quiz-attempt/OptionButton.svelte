<script>
	import { Check } from '@lucide/svelte';

	let {
		label,
		text,
		selected = false,
		onclick = () => {},
		/** When true, renders a non-interactive row (exam review). */
		readonly = false,
		/** Used when readonly — maps to border / surface styles. */
		reviewVariant = 'neutral',
		/** Optional trailing label (e.g. "Your answer", "Correct"). */
		endLabel = '',
		/** Tone for endLabel text. */
		endLabelTone = 'muted'
	} = $props();

	const endToneClass = {
		muted: 'text-fg-muted',
		primary: 'text-primary',
		success: 'text-success',
		danger: 'text-danger'
	};

	const reviewRowClass = $derived.by(() => {
		switch (reviewVariant) {
			case 'userPick':
				return 'border-primary bg-primary-light text-primary';
			case 'correct':
				return 'border-success bg-success-surface text-fg';
			case 'wrongPick':
				return 'border-danger bg-danger-surface/30 text-fg';
			default:
				return 'border-stroke bg-canvas text-fg';
		}
	});

	const reviewLetterClass = $derived.by(() => {
		switch (reviewVariant) {
			case 'userPick':
				return 'bg-primary text-canvas-base-fixed';
			case 'correct':
				return 'bg-success text-canvas-base-fixed';
			case 'wrongPick':
				return 'bg-danger text-canvas-base-fixed';
			default:
				return 'bg-stroke/50 text-fg-muted';
		}
	});
</script>

{#if readonly}
	<div
		class="flex w-full items-center gap-4 rounded-xl border-2 px-4 py-4 text-left transition duration-motion-fast ease-ease-standard {reviewRowClass}"
		role="listitem"
	>
		<span
			class="flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold {reviewLetterClass}"
		>
			{label}
		</span>
		<span class="min-w-0 flex-1 font-medium">{text}</span>
		{#if endLabel}
			<span class="text-xs font-semibold {endToneClass[endLabelTone] ?? endToneClass.muted}">
				{endLabel}
			</span>
		{/if}
	</div>
{:else}
	<button
		type="button"
		class="flex w-full items-center gap-4 rounded-xl border-2 px-4 py-4 text-left transition duration-motion-fast ease-ease-standard {selected
			? 'border-primary bg-primary-light text-primary'
			: 'border-stroke bg-surface-card text-fg hover:border-primary/50'}"
		onclick={onclick}
	>
		<span
			class="flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold {selected
				? 'bg-primary text-canvas-base-fixed'
				: 'bg-stroke/50 text-fg-muted'}"
		>
			{label}
		</span>
		<span class="min-w-0 flex-1 font-medium">{text}</span>
		{#if selected}
			<Check size={20} class="shrink-0" aria-hidden="true" />
		{/if}
	</button>
{/if}
