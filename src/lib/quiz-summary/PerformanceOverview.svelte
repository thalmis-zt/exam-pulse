<script>
	import { BarChart3, Check, X, CircleDot, Medal, TrendingUp, Users } from '@lucide/svelte';
	import PerformanceMetricCard from '$lib/quiz-summary/PerformanceMetricCard.svelte';

	/**
	 * @typedef {Object} PerformanceMetrics
	 * @property {number} correct
	 * @property {number} wrong
	 * @property {number} unattempted
	 * @property {number} bestScore
	 * @property {number} rank
	 * @property {number} percentile
	 * @property {number} total
	 */

	/** @type {{ metrics: PerformanceMetrics }} */
	let {
		metrics = {
			correct: 18,
			wrong: 2,
			unattempted: 2,
			bestScore: 18,
			rank: 18,
			percentile: 18,
			total: 20
		}
	} = $props();
</script>

<section class="flex flex-col gap-4">
	<!-- Header -->
	<div class="flex items-center gap-2">
		<div
			class="flex items-center justify-center size-8 rounded-lg bg-info-surface text-primary shrink-0"
			aria-hidden="true"
		>
			<BarChart3 size={20} />
		</div>
		<h2 class="text-base font-bold text-fg m-0">Performance Overview</h2>
	</div>

	<!-- Metrics grid: 2x3 on mobile, 3x2 on larger screens -->
	<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
		<PerformanceMetricCard
			label="CORRECT"
			score={metrics.correct}
			total={metrics.total}
			variant="secondary"
		>
			{#snippet icon()}<Check size={20} />{/snippet}
		</PerformanceMetricCard>

		<PerformanceMetricCard
			label="WRONG"
			score={metrics.wrong}
			total={metrics.total}
			variant="danger"
			shape="square"
			
		>
			{#snippet icon()}<X size={20} />{/snippet}
		</PerformanceMetricCard>

		<PerformanceMetricCard
			label="UNATTEMPTED"
			score={metrics.unattempted}
			total={metrics.total}
			variant="primary"
			badgeClass="bg-skipped-surface text-fg-muted"
		>
			{#snippet icon()}<CircleDot size={20} />{/snippet}
		</PerformanceMetricCard>

		<PerformanceMetricCard
			label="BEST SCORE"
			score={metrics.bestScore}
			total={metrics.total}
			variant="primary"
		>
			{#snippet icon()}<Medal size={20} />{/snippet}
		</PerformanceMetricCard>

		<PerformanceMetricCard
			label="RANK"
			score={metrics.rank}
			total={metrics.total}
			variant="primary"
		>
			{#snippet icon()}<TrendingUp size={20} />{/snippet}
		</PerformanceMetricCard>

		<PerformanceMetricCard
			label="PERCENTILE"
			score={metrics.percentile}
			total={metrics.total}
			variant="primary"
		>
			{#snippet icon()}<Users size={20} />{/snippet}
		</PerformanceMetricCard>
	</div>
</section>
