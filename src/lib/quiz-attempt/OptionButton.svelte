<script>
	import { Check } from '@lucide/svelte';
	import QuestionImage from './QuestionImage.svelte';

	let {
		label,
		text,
		/** @type {string[]} */
		mediaUrls = [],
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

	const hasMedia = $derived(mediaUrls.length > 0);
	const rowClass = $derived.by(() => {
		if (readonly) return reviewRowClass;
		return selected
			? 'border-primary bg-primary-light text-primary'
			: 'border-stroke bg-surface-card text-fg hover:border-primary/50';
	});
	const letterClass = $derived.by(() => {
		if (readonly) return reviewLetterClass;
		return selected
			? 'bg-primary text-canvas-base-fixed'
			: 'bg-stroke/50 text-fg-muted';
	});
</script>

{#if readonly}
	<div
		class="flex w-full flex-col gap-3 rounded-xl border-2 px-4 py-4 text-left transition duration-motion-fast ease-ease-standard {rowClass}"
		role="listitem"
	>
		{#if hasMedia}
			<div class="flex w-full min-w-0 flex-col items-center gap-2">
				{#each mediaUrls as url, i (url + i)}
					<QuestionImage
						src={url}
						alt={`Option ${label} figure ${i + 1}`}
						variant="option"
						loading="lazy"
					/>
				{/each}
			</div>
		{/if}
		<div class="flex w-full items-center gap-4">
			<span
				class="flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold {letterClass}"
			>
				{label}
			</span>
			{#if text}
				<span class="min-w-0 flex-1 font-medium">{text}</span>
			{:else}
				<span class="min-w-0 flex-1 text-sm font-medium italic text-fg-muted">Image only</span>
			{/if}
			{#if endLabel}
				<span class="text-xs font-semibold {endToneClass[endLabelTone] ?? endToneClass.muted}">
					{endLabel}
				</span>
			{/if}
		</div>
	</div>
{:else}
	<button
		type="button"
		class="flex w-full flex-col gap-3 rounded-xl border-2 px-4 py-4 text-left transition duration-motion-fast ease-ease-standard {rowClass}"
		onclick={onclick}
	>
		{#if hasMedia}
			<div class="flex w-full min-w-0 flex-col items-center gap-2 pointer-events-none">
				{#each mediaUrls as url, i (url + i)}
					<QuestionImage
						src={url}
						alt={`Option ${label} figure ${i + 1}`}
						variant="option"
						loading="lazy"
					/>
				{/each}
			</div>
		{/if}
		<div class="flex w-full items-center gap-4">
			<span
				class="flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold {letterClass}"
			>
				{label}
			</span>
			{#if text}
				<span class="min-w-0 flex-1 font-medium">{text}</span>
			{:else}
				<span class="min-w-0 flex-1 text-sm font-medium italic text-fg-muted">Image only</span>
			{/if}
			{#if selected}
				<Check size={20} class="shrink-0" aria-hidden="true" />
			{/if}
		</div>
	</button>
{/if}
