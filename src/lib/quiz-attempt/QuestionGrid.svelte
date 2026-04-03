<script>
	import QuestionGridItem from './QuestionGridItem.svelte';


	let {
		questions = [],
		currentIndex = 1,
		onSelect,
		columns = 5
	} = $props();
</script>

<div
	class="grid gap-2"
	style="grid-template-columns: repeat({columns}, minmax(0, 1fr));"
	role="list"
	aria-label="Question navigation"
>
	{#each questions as q (q.id)}
		<div role="listitem">
			<QuestionGridItem
				number={q.index}
				status={q.status}
				isCurrent={q.index === currentIndex}
				showBookmark={q.showBookmark === true}
				onclick={onSelect ? () => onSelect(q.id) : undefined}
			/>
		</div>
	{/each}
</div>
