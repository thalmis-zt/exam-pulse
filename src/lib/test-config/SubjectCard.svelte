<script>
	import { Calculator, Beaker, Leaf, BookOpen, Zap } from '@lucide/svelte';

	let {
		subjects = [],
		selectedSubject = null,
		onSelectSubject = () => {}
	} = $props();

	function getSubjectIcon(iconName) {
		const iconMap = {
			Calculator,
			Zap,
			Beaker,
			Leaf,
			BookOpen
		};
		return iconMap[iconName] || null;
	}

	function getColorScheme(index) {
		const colorSchemes = [
			{ bg: 'bg-info-surface', text: 'text-info' },
			{ bg: 'bg-danger-surface/40', text: 'text-danger' },
			{ bg: 'bg-success-surface', text: 'text-success' },
			{ bg: 'bg-warning-surface', text: 'text-warning' }
		];
		return colorSchemes[index % colorSchemes.length];
	}
</script>

<!-- Subject Selection -->

	<div>
		<span class="text-fg text-2xs block font-medium tracking-wider mb-3">Subject *</span>
		<div class="flex gap-2 overflow-x-auto snap-x snap-mandatory md:flex-wrap md:justify-start md:overflow-visible pb-2 md:pb-0">
			{#each subjects as subject, index (subject.id)}
				<button
					type="button"
					onclick={() => {
						onSelectSubject(subject.id);
					}}
					class={`duration-motion-normal ease-ease-standard flex min-w-38 max-w-48 flex-col items-center justify-center gap-2 rounded-md border-2 px-3 py-4 transition snap-center flex-shrink-0 ${selectedSubject === subject.id ? 'border-primary bg-primary-light' : 'border-stroke hover:border-primary'}`}
					aria-pressed={selectedSubject === subject.id}
					aria-label={`Select ${subject.name}`}
				>
					{#if getSubjectIcon(subject.icon)}
						<div class={`${getColorScheme(index).bg} rounded-md p-4 border border-stroke`}>
							<svelte:component
								this={getSubjectIcon(subject.icon)}
								class={`${getColorScheme(index).text} h-5 w-5`}
								aria-hidden="true"
							/>
						</div>
					{/if}
					<span class="text-fg text-center text-xs font-medium">
						{subject.name}
					</span>
				</button>
			{/each}
		</div>
	</div>

