<script>
	import { page } from '$app/stores';
	import ExamReviewPage from '$lib/exam-review/ExamReviewPage.svelte';
</script>

<ExamReviewPage examAttemptId={$page.params.id} />
