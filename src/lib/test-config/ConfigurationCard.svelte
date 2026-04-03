<script>
	import { getTopicsBySubject } from '$lib/test-config/mock/testConfig.service.js';
	import { Loader2 } from '@lucide/svelte';
	import SubjectsTopicsSection from '$lib/test-config/SubjectsTopicsSection.svelte';
	import TestParametersSection from '$lib/test-config/TestParametersSection.svelte';
	import DifficultySection from '$lib/test-config/DifficultySection.svelte';
	import NegativeMarkingSection from '$lib/test-config/NegativeMarkingSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import InlineAlert from '$lib/components/InlineAlert.svelte';

	let { subjects = [], onStartTest = () => {}, isLoading = false } = $props();

	let selectedSubjects = $state([]);
	// Topics per subject: subjectId → { topics, selected, loading, allTopicsSelected }
	let subjectTopicsMap = $state({});

	let questionCount = $state('25');
	let duration = $state('60');

	let easyPct = $state('30');
	let moderatePct = $state('40');
	let hardPct = $state('30');

	let enableNegativeMarking = $state(false);
	let negativeMarkingDeduction = $state(0.00);

	let formError = $state('');

	// ----------------------- Subject/ Topic Selection -------------------------------------------------

	async function toggleSubject(subjectId) {
		formError = '';
		if (selectedSubjects.includes(subjectId)) {
			selectedSubjects = selectedSubjects.filter((id) => id !== subjectId);
		} else {
			selectedSubjects = [...selectedSubjects, subjectId];
			if (!subjectTopicsMap[subjectId]) {
				subjectTopicsMap = {
					...subjectTopicsMap,
					[subjectId]: { topics: [], selected: [], allTopicsSelected: false, loading: true }
				};
				try {
					const data = await getTopicsBySubject(subjectId);
					subjectTopicsMap = {
						...subjectTopicsMap,
						[subjectId]: { topics: data, selected: [], allTopicsSelected: false, loading: false }
					};
				} catch {
					subjectTopicsMap = {
						...subjectTopicsMap,
						[subjectId]: { topics: [], selected: [], allTopicsSelected: false, loading: false }
					};
				}
			}
		}
	}

	// Toggle a topic chip within a subject
	function toggleTopic(subjectId, topicId) {
		const cur = subjectTopicsMap[subjectId];
		if (!cur) return;
		const next = cur.selected.includes(topicId)
			? cur.selected.filter((id) => id !== topicId)
			: [...cur.selected, topicId];
		// Clear allTopicsSelected when selecting individual topics
		subjectTopicsMap = {
			...subjectTopicsMap,
			[subjectId]: { ...cur, selected: next, allTopicsSelected: false }
		};
	}

	// Toggle all topics for a subject
	function toggleAllTopics(subjectId) {
		const cur = subjectTopicsMap[subjectId];
		if (!cur) return;
		// Toggle the explicit flag
		const next = !cur.allTopicsSelected;
		subjectTopicsMap = {
			...subjectTopicsMap,
			[subjectId]: { 
				...cur, 
				allTopicsSelected: next, 
				selected: next ? cur.topics.map((t) => t.id) : [] 
			}
		};
	}

	// ---------------------- Start Test Handler ----------------------------
	function handleStartTest() {
		if (selectedSubjects.length === 0) {
			formError = 'Please select at least one subject to continue';
			return;
		}

		// Check if at least one topic is selected per subject
		for (const subjectId of selectedSubjects) {
			const td = subjectTopicsMap[subjectId];
			if (!td || (!td.allTopicsSelected && (!td.selected || td.selected.length === 0))) {
				formError = 'Please select at least one topic for each subject';
				return;
			}
		}

		// Check if difficulty adds up to 100%
		const difficultyTotal = toPct(easyPct) + toPct(moderatePct) + toPct(hardPct);
		if (difficultyTotal !== 100) {
			formError = 'Difficulty allocation must add up to 100%';
			return;
		}


		if (toCount(questionCount) < 1) {
			formError = 'Please enter at least 1 question';
			return;
		}

		if (toCount(duration) < 1) {
			formError = 'Duration cannot be 0 minutes';
			return;
		}

		formError = '';
		onStartTest({
			subjects: selectedSubjects.map((id) => {
				const td = subjectTopicsMap[id];
				const topicIds = td?.allTopicsSelected
					? td.topics.map((t) => t.id)
					: td?.selected ?? [];
				return { subjectId: id, topicIds };
			}),
			questionCount: toCount(questionCount),
			duration: toCount(duration),
			difficulty: {
				easyPct: toPct(easyPct),
				moderatePct: toPct(moderatePct),
				hardPct: toPct(hardPct)
			},
			enableNegativeMarking,
			negativeMarkingDeduction: enableNegativeMarking ? negativeMarkingDeduction : null
		});
	}

	// --------------------------- General ------------------------------

	function toPct(val) {
		const n = parseInt(val);
		return isNaN(n) || n < 0 ? 0 : n > 100 ? 100 : n;
	}

	function toCount(val) {
		const n = parseInt(val);
		return isNaN(n) || n < 0 ? 0 : n;
	}
</script>

<div class="bg-surface-card rounded-md shadow-sm">
	<form onsubmit={(e) => e.preventDefault()} class="divide-stroke divide-y">
		<!-- Subjects & Topics Section -->
		<SubjectsTopicsSection
			{subjects}
			{selectedSubjects}
			{subjectTopicsMap}
			onToggleSubject={toggleSubject}
			onToggleTopic={toggleTopic}
			onToggleAllTopics={toggleAllTopics}
		/>

		<TestParametersSection bind:questionCount bind:duration />

		<DifficultySection bind:easyPct bind:moderatePct bind:hardPct />

		<NegativeMarkingSection bind:enableNegativeMarking bind:negativeMarkingDeduction />

		<section class="px-6 py-6 md:px-8">
			{#if formError}
				<div class="mb-4">
					<InlineAlert variant="error" message={formError} showClose={false} />
				</div>
			{/if}
			<div class="flex items-center justify-end">
				<Button btnType="primary" type="button" onclick={handleStartTest} disabled={isLoading}>
					{#if isLoading}
						<Loader2 size={16} class="mr-1.5 animate-spin" />
					{/if}
					Start Mock Test
				</Button>
			</div>
		</section>
	</form>
</div>
