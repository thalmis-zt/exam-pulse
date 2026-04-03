<script>
	import { Calculator, Beaker, Leaf, BookOpen, Zap } from '@lucide/svelte';

	let {
		subjects = [],
		selectedSubjects = [],
		onToggleSubject = () => {}
	} = $props();

	function getSubjectIcon(iconName) {
		const iconMap = { Calculator, Zap, Beaker, Leaf, BookOpen };
		return iconMap[iconName] || null;
	}

	function getColorScheme(index) {
		const colorSchemes = [
			{ bg: 'bg-info-surface', text: 'text-info' },
			{ bg: 'bg-danger-surface/40', text: 'text-danger' },
			{ bg: 'bg-success-surface', text: 'text-success' },
			{ bg: 'bg-warning-surface', text: 'text-warning' },
			{ bg: 'bg-warning-surface/60', text: 'text-warning' }
		];
		return colorSchemes[index % colorSchemes.length];
	}
</script>

<div>
	<div class="mb-2 flex items-center justify-between">
		<span class="text-fg text-xs font-medium leading-5">
			Subjects <span class="text-danger ml-0.5">*</span>
		</span>
		{#if selectedSubjects.length > 0}
			<span class="text-fg-muted text-xs">{selectedSubjects.length} selected</span>
		{/if}
	</div>
	<div class="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0">
		{#each subjects as subject, index (subject.id)}
			{@const isSelected = selectedSubjects.includes(subject.id)}
			{@const Icon = getSubjectIcon(subject.icon)}
			{@const color = getColorScheme(index)}
			<button
				type="button"
				onclick={() => onToggleSubject(subject.id)}
				aria-pressed={isSelected}
				aria-label={`${isSelected ? 'Deselect' : 'Select'} ${subject.name}`}
				class={`duration-motion-normal ease-ease-standard snap-center flex min-w-32 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 px-3 py-4 transition
					${isSelected ? 'border-primary bg-primary-light' : 'border-stroke hover:border-primary'}`}
			>
				{#if Icon}
					<div class={`${color.bg} rounded-md border border-stroke p-3`}>
						<Icon class={`${color.text} h-5 w-5`} aria-hidden="true" />
					</div>
				{/if}
				<span class="text-fg text-center text-xs font-medium">{subject.name}</span>
			</button>
		{/each}
	</div>
</div>

