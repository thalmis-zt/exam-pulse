<script>
	import { BookOpen, Check, X, ChevronDown, Trash2, RotateCcw, Info, Eye } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';

	let { question, onDelete, onAttempt } = $props();

	let showSolution = $state(false);
	let selectedOption = $state(null);
	let isDeleting = $state(false);

	// Determine difficulty color
	const difficultyColor = {
		Easy: 'text-success bg-success/20',
		Medium: 'text-warning bg-warning/20',
		Hard: 'text-danger bg-danger/20'
	};

	// Metadata pills config
	const metadata = $derived([
		{ label: question.subject, class: 'bg-primary/10 text-primary text-2xs' },
		{ label: question.topic, class: 'bg-fg-muted/10 text-fg-muted text-xs' },
		{ label: question.difficulty, class: `${difficultyColor[question.difficulty]} text-xs` }
	]);

	function toggleSolution() {
		showSolution = !showSolution;
	}

	function selectOption(label) {
		selectedOption = label;
		if (onAttempt) {
			onAttempt({ questionId: question.id, selectedOption: label });
		}
	}

	function handleDelete() {
		if (confirm('Are you sure you want to delete this question?')) {
			isDeleting = true;
			if (onDelete) {
				onDelete(question.id);
			}
		}
	}

	// Determine option button classes
	function getOptionButtonClass(option) {
		if (selectedOption === option.label) {
			if (option.label === question.correctOptionLabel) {
				return 'border-success bg-success-surface';
			} else {
				return 'border-danger bg-danger-surface';
			}
		}
		return 'border-info';
	}
</script>

<div
	class="bg-surface-card duration-fast ease-standard flex flex-col gap-3 rounded-lg shadow-sm transition-shadow hover:shadow-md p-4 md:p-5"
>
	<!-- Metadata Header with Pills -->
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<!-- Pills: Subject, Topic, Difficulty Replace with pills reusable component -->
		<div class="flex flex-wrap items-center gap-2">
		{#each metadata as item (item.label)}
			<span class="text-2xs rounded-full px-3 py-1 font-semibold {item.class}">
				{item.label}
			</span>
		{/each}
	</div>
	</div>

	<!-- Delete Button -->
	<Button
		btnType="custom"
		customClass="text-danger hover:bg-danger/10 flex items-center gap-1.5 self-end rounded px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
		onclick={handleDelete}
		disabled={isDeleting}
		title="Delete question"
	>
		<Trash2 size={14} />
		<span class="text-xs font-semibold">Delete</span>
	</Button>

	<!-- Question Text -->
	<div class="flex items-center gap-3">
		<BookOpen size={16} class="text-info mt-0.5 flex-shrink-0" />
		<p class="text-fg font-poppins text-sm leading-relaxed">
			{question.text}
		</p>
	</div>

	<!-- Answer Options (A, B, C, D) -->
	<div class="flex flex-col gap-2 pl-6">
		{#each question.options as option (option.label)}
			<button
				class="border-info-surface duration-fast ease-standard flex items-center gap-3 rounded-lg border px-3 py-2 transition-all {getOptionButtonClass(
					option
				)}"
				onclick={() => selectOption(option.label)}
			>
				<!-- Option Label Circle -->
				<span
					class="bg-info-surface text-2xs flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-semibold"
					>{option.label}</span
				>

				<!-- Option Text -->
				<span class="text-fg font-poppins flex-1 text-left text-sm">{option.text}</span>

				<!-- Correct/Incorrect Icon -->
				{#if selectedOption === option.label}
					<div class="flex-shrink-0">
						{#if option.label === question.correctOptionLabel}
							<Check size={16} class="text-success" />
						{:else}
							<X size={16} class="text-danger" />
						{/if}
					</div>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Solution Section (Collapsible) -->
	<div>
		<!-- Toggle Button -->
		<button
			class="text-primary text-2xs font-inter duration-fast ease-standard flex items-center gap-2 py-2 font-semibold transition-opacity hover:opacity-80"
			onclick={toggleSolution}
		>
			<div class:rotate-180={showSolution} class="duration-fast ease-standard transition-transform">
				<ChevronDown size={16} />
			</div>
			SOLUTION & EXPLANATION
		</button>

		<!-- Solution Content -->
		{#if showSolution}
			<div class="bg-info/10 border-info mt-3 rounded-lg border-l-4 p-4">
				<p class="text-fg font-poppins text-sm leading-relaxed">
					{question.explanation}
				</p>

				<!-- Tags -->
				{#if question.tags && question.tags.length > 0}
					<div class="border-info/20 mt-3 flex flex-wrap gap-2 border-t pt-3">
						{#each question.tags as tag (tag)}
							<span
								class="bg-primary/15 text-primary rounded-full px-2.5 py-1.5 text-2xs font-semibold"
							>
								{tag}
							</span>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Action Buttons -->
	<div class="flex flex-wrap gap-2">
		<Button btnType="primaryLight" customClass="flex-1" onclick={() => console.log('Attempt')}>
			<RotateCcw size={16} />
			Attempt
		</Button>

		<Button btnType="primaryLight" customClass="flex-1" onclick={() => console.log('Explain')}>
			<Info size={16} />
			Explain
		</Button>

		<Button btnType="primary" customClass="flex-1" onclick={toggleSolution}>
			<Eye size={16} />
			Reveal
		</Button>
	</div>

	<!-- Source Attribution -->
	{#if question.source}
		<p class="text-fg-muted font-poppins text-xs">
			Source: {question.source}
		</p>
	{/if}
</div>
