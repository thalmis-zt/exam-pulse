<script>
	import { BookOpen, ChevronRight } from '@lucide/svelte';

	/** @type {{ subject: import('./mock/profile.schema.js').SubjectItem }} */
	let { subject } = $props();
</script>

<button
	class="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-canvas hover:bg-stroke/40 transition-colors cursor-pointer border-none text-left"
	aria-label="Open {subject.name}"
>
	<!-- Icon -->
	<div class="shrink-0 w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center text-primary">
		<BookOpen size={18} />
	</div>

	<!-- Text -->
	<div class="flex flex-col gap-0.5 flex-1 min-w-0">
		<span class="text-sm font-semibold text-fg truncate">{subject.name}</span>
		<span class="text-xs text-fg-muted">{subject.grade} • {subject.lessons} Lessons</span>
	</div>

	<!-- Chevron -->
	<ChevronRight size={16} class="text-fg-muted shrink-0" />
</button>
