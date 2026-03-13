<script>
	import { BookOpen, Check, X, ChevronDown, Trash2, RotateCcw, Info, Eye } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';

	let { question, onDelete, onAttempt } = $props();

	let showSolution = $state(false);
	let selectedOption = $state(null);
	let isDeleting = $state(false);

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

	// Determine difficulty color
	const difficultyColor = {
		Easy: 'text-success bg-success/20',
		Medium: 'text-warning bg-warning/20',
		Hard: 'text-danger bg-danger/20'
	};

	// Determine option button classes
	function getOptionButtonClass(option) {
		if (selectedOption === option.label) {
			if (option.label === question.correctOptionLabel) {
				return 'border-success bg-emerald-50';
			} else {
				return 'border-danger bg-red-50';
			}
		}
		return 'border-border border-info';
	}
</script>

<div class="flex flex-col gap-3 p-4 md:p-5 rounded-lg bg-surface-card shadow-sm hover:shadow-md transition-shadow duration-fast ease-standard">
	<!-- Metadata Header with Pills -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
		<!-- Pills: Subject, Topic, Difficulty -->
		<div class="flex flex-wrap items-center gap-2">
			<span class="px-3 py-1 rounded-full text-2xs font-semibold bg-primary/10 text-primary">
				{question.subject}
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-semibold bg-fg-muted/10 text-fg-muted">
				{question.topic}
			</span>
			<span class="px-3 py-1 rounded-full text-xs font-semibold {difficultyColor[question.difficulty]}">
				{question.difficulty}
			</span>
		</div>

		<!-- Delete Button -->
		<button
			class="flex items-center self-end gap-1.5 px-3 py-1.5 rounded text-danger hover:bg-danger/10 transition-colors duration-fast ease-standard disabled:opacity-50 disabled:cursor-not-allowed"
			onclick={handleDelete}
			disabled={isDeleting}
			title="Delete question"
		>
			<Trash2 size={14} />
			<span class="text-xs font-semibold">Delete</span>
		</button>
	</div>

	<!-- Question Text -->
	<div class="flex gap-3 items-center">
		<BookOpen size={16} class="flex-shrink-0 text-info mt-0.5" />
		<p class="text-sm text-fg font-poppins leading-relaxed">
			{question.text}
		</p>
	</div>

	<!-- Answer Options (A, B, C, D) -->
	<div class="flex flex-col gap-2 pl-6">
		{#each question.options as option (option.label)}
			<button
				class="flex items-center gap-3 px-3 py-2 rounded-lg border border-info-surface transition-all duration-fast ease-standard {getOptionButtonClass(option)}"
				onclick={() => selectOption(option.label)}
			>
				<!-- Option Label Circle -->
				<span class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-info-surface text-2xs font-semibold"
					>{option.label}</span
				>

				<!-- Option Text -->
				<span class="flex-1 text-left text-sm text-fg font-poppins">{option.text}</span>

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
			class="flex items-center gap-2 py-2 text-primary font-semibold text-2xs font-inter hover:opacity-80 transition-opacity duration-fast ease-standard"
			onclick={toggleSolution}
		>
			<div class:rotate-180={showSolution} class="transition-transform duration-fast ease-standard">
				<ChevronDown size={16} />
			</div>
			SOLUTION & EXPLANATION
		</button>

		<!-- Solution Content -->
		{#if showSolution}
			<div class="mt-3 p-4 rounded-lg bg-info/10 border-l-4 border-info">
				<p class="text-sm text-fg font-poppins leading-relaxed">
					{question.explanation}
				</p>

				<!-- Tags -->
				{#if question.tags && question.tags.length > 0}
					<div class="flex flex-wrap gap-2 mt-3 pt-3 border-t border-info/20">
						{#each question.tags as tag (tag)}
							<span class="px-2.5 py-1.5 rounded-full text-xs font-semibold bg-primary/15 text-primary">
								{tag}
							</span>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Action Buttons -->
	<div class="flex gap-2 flex-wrap">
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
		<p class="text-xs text-fg-muted font-poppins">
			Source: {question.source}
		</p>
	{/if}
</div>

