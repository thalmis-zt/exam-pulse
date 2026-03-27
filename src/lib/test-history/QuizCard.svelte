<script>
	import { RotateCcw, Eye, Clock } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';

	let {
		test = {},
		onReview = () => {},
		onRetry = () => {},
		isLoading = false
	} = $props();

	// Normalize test object with safe defaults
	const normalizedTest = $derived({
		id: test.id ?? '',
		name: test.name ?? 'Untitled Test',
		subject: test.subject ?? 'Unknown',
		topic: test.topic ?? 'Unknown',
		date: test.date ?? null,
		time: test.time ?? '--',
		status: test.status ?? 'N/A',
		difficulty: (test.difficulty ?? 'Unknown').toLowerCase(),
		questionsAttempted: test.questionsAttempted ?? 0,
		totalQuestions: test.totalQuestions ?? 0,
		correct: test.correct ?? 0,
		incorrect: test.incorrect ?? 0,
		skipped: test.skipped ?? 0,
		score: test.score ?? 0,
		maxScore: test.maxScore ?? 0
	});

	// Reactively format date with error handling
	const formattedDate = $derived.by(() => {
		if (!normalizedTest.date) return '';
		try {
			const date = new Date(normalizedTest.date);
			if (isNaN(date.getTime())) return '';
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		} catch {
			return '';
		}
	});

	const accuracy = $derived(normalizedTest.questionsAttempted
		? Math.round((normalizedTest.correct / normalizedTest.questionsAttempted) * 100)
		: 0);

	const statusBadges = {
		completed: { label: 'Completed' },
		'in-progress': { label: 'In Progress' },
		abandoned: { label: 'Abandoned' },
		unknown: { label: 'N/A' }
	};

	const statusBadge = $derived(statusBadges[normalizedTest.status] || statusBadges.unknown);

	const statusVariantMap = {
		completed: 'success',
		'in-progress': 'warning',
		abandoned: 'danger',
		unknown: 'default'
	};

	const difficultyVariantMap = {
		easy: 'success',
		medium: 'warning',
		hard: 'danger',
		unknown: 'default'
	};

	const statsData = $derived([
		{
			label: 'Questions',
			value: `${normalizedTest.questionsAttempted}/${normalizedTest.totalQuestions}`
		},
		{
			label: 'Score',
			value: `${normalizedTest.score}/${normalizedTest.maxScore} (${accuracy}%)`
		},
		{
			label: 'Time Taken',
			value: normalizedTest.time
		}
	]);

	const breakdownData = $derived([
		{
			label: 'Correct',
			value: normalizedTest.correct,
			colorClass: 'text-fg'
		},
		{
			label: 'Incorrect',
			value: normalizedTest.incorrect,
			colorClass: 'text-fg'
		},
		{
			label: 'Skipped',
			value: normalizedTest.skipped,
			colorClass: 'text-fg'
		}
	]);
</script>

<!-- Quiz Card -->
<div
	class="bg-surface-card border border-stroke rounded-lg p-4 md:p-5 shadow-sm duration-motion-normal ease-ease-standard transition"
>
	<!-- Header Row: Test Info (Left) | Status & Difficulty Pills (Right) -->
	<div class="flex flex-col 450px:flex-row items-start justify-between gap-3 mb-4">
		<!-- Left: Heading, Subject, Date/Time -->
		<div class=" flex flex-col gap-1">
			<!-- Heading -->
			<h3 class="text-fg font-inter text-base font-bold">
				{normalizedTest.name}
			</h3>

			<!-- Subject and Topic -->
			<p class="text-fg-muted font-poppins text-xs mb-2">
				{normalizedTest.subject} &nbsp;• &nbsp;{normalizedTest.topic}
			</p>

			<!-- Date and Time Info -->
			<div class="text-fg-muted font-poppins flex items-center gap-3 text-xs">
				<span>{formattedDate}</span>
				<!-- <span class="text-stroke">•</span> -->
				<div class="flex items-center gap-1">
					<Clock class="h-3.5 w-3.5" />
					<span>{normalizedTest.time}</span>
				</div>
			</div>
		</div>

		<!-- Right: Status and Difficulty Badges -->
		<div class="flex flex-1 justify-between gap-2 shrink-0">
			<Badge 
				label={statusBadge.label} 
				variant={statusVariantMap[normalizedTest.status] || 'default'}
				size="sm"
				hasBorder={false}
			/>
			{#if normalizedTest.difficulty && normalizedTest.difficulty !== 'unknown'}
				<Badge 
					label={normalizedTest.difficulty.charAt(0).toUpperCase() + normalizedTest.difficulty.slice(1)} 
					variant={difficultyVariantMap[normalizedTest.difficulty] || 'default'}
					size="sm"
					hasBorder={false}
				/>
			{/if}
		</div>
	</div>

	<!-- Stats Section with Light Background -->
	<div class="bg-info-surface rounded-lg mb-4 w-full">
		<div class="grid grid-cols-2 450px:grid-cols-3 sm:divide-x sm:divide-border sm:divide-stroke">
			{#each statsData as stat (stat.label)}
				<div class="flex flex-col items-center gap-1 px-3 py-3 text-xs md:text-sm">
					<span class="text-fg-muted font-poppins text-2xs font-semibold uppercase tracking-wide">{stat.label}</span>
					<span class="text-fg font-inter text-xs sm:text-sm font-semibold">{stat.value}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Breakdown Row: Correct, Incorrect, Skipped -->
	<div class="mb-4 flex items-center justify-center flex-wrap sm:flex-nowrap gap-4 sm:gap-6 text-center">
	{#each breakdownData as item, index (item.label)}
			<div class="flex gap-2">
				<p class="text-fg-muted font-poppins text-xs">{item.label}</p>
				<p class="font-inter text-xs font-semibold {item.colorClass}">{item.value}</p>
			</div>
			{#if index < breakdownData.length - 1}
				<div class="border-r border-stroke h-8"></div>
			{/if}
		{/each}
	</div>

    <hr class="border-stroke mb-4" />
	<!-- Action Buttons -->
	<div class="flex gap-2 justify-end">
		<Button
			btnType="custom"
            customClass="px-6 py-2 rounded-sm font-medium capitalize sm:text-sm text-xs text-nowrap text-center flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition bg-transparent  text-fg font-medium disabled:text-fg-muted "
			onclick={() => onReview(normalizedTest.id)}
			disabled={isLoading}
		>
			<Eye class="h-3.5 w-3.5" />
			<span>Review</span>
		</Button>
		<Button
			btnType="primaryLight"
			onclick={() => onRetry(normalizedTest.id)}
			disabled={isLoading}
		>
			<RotateCcw class="h-3.5 w-3.5" />
			<span>Retry</span>
		</Button>
	</div>
</div>
