<script>
	import { page } from '$app/stores';
	import QuizAttemptPage from '$lib/quiz-attempt/QuizAttemptPage.svelte';
</script>

<QuizAttemptPage testId={$page.params.id} />
