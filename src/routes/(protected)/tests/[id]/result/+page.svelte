<script>
	import { page } from '$app/stores';
	import QuizSummaryPage from '$lib/quiz-summary/QuizSummaryPage.svelte';
</script>

<QuizSummaryPage testId={$page.params.id} />