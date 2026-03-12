<script>
	import Button from '$lib/components/Button.svelte';
	import { Clock, AlertTriangle, Target, Brain, AlertCircle } from '@lucide/svelte';

	let {
		subject,
		masteryPercent,
		accuracy,
		avgSpeed,
		correctAttempts,
		totalQuestions,
		targetMastery,
		onclick
	} = $props();

	const fillPercent = $derived(Math.round(masteryPercent));
	const wrongAttempts = $derived(totalQuestions - correctAttempts);

	const stats = [
		{ label: 'Accuracy', mobileLabel: 'Accuracy', value: `${accuracy}%`, icon: Target },
		{ label: 'Avg. Speed', mobileLabel: 'Speed', value: `${avgSpeed}s/q`, icon: Clock },
		{
			label: 'Incorrect/Unattempted',
			mobileLabel: 'Wrong',
			value: `${wrongAttempts}/${totalQuestions}`,
			icon: AlertTriangle
		}
	];
</script>

<!-- Responsive Card: Vertical on mobile, structured on desktop -->
<div class="bg-surface-card flex flex-col gap-3 rounded-md p-4 md:p-6 shadow-md">
	<!-- Header: Stack on mobile, spread on desktop -->
	<div class="flex flex-col md:flex-row md:items-start md:justify-between md:gap-3">
		<div class="flex flex-1 items-start gap-2 md:gap-3">
			<div class="bg-info-surface rounded-md p-2">
				<Brain size={26} class="text-info flex-shrink-0" />
			</div>
			<div class="flex flex-col">
				<h3 class="text-fg font-Inter text-base font-bold">{subject}</h3>
				<div class="flex items-center gap-1">
					<AlertCircle size={10} />
					<p class="text-fg-muted font-Poppins text-xs">Needs improvement</p>
				</div>
			</div>
		</div>
		<!-- Mastery badge: Only visible on desktop -->
		<div class="hidden flex-col items-end md:flex">
			<span class="text-danger font-Inter text-xl font-bold">{fillPercent}%</span>
			<span class="text-fg-muted font-Inter text-xs font-semibold">MASTERY</span>
		</div>
	</div>

	<hr class="md:border-stroke hidden md:block md:border-t md:pt-2" />

	<!-- Stats -->
	<div class="grid grid-cols-3  md:divide-x md:divide-border md:divide-stroke">
		{#each stats as stat, index (index)}
			<div class="flex flex-col items-center gap-1 px-2 text-xs md:text-sm">
				<span class="text-fg-muted font-Poppins text-xs">{stat.label}</span>

				<div class="flex items-center gap-2">
					{#if stat.icon}
						<svelte:component this={stat.icon} size={12} />
					{/if}
					<span class="text-fg font-Inter font-semibold">{stat.value}</span>
				</div>
			</div>
		{/each}
	</div>

    <hr class="md:border-stroke hidden md:block md:border-t md:pt-2" />

	<!-- Progress Section -->
	<div class="flex flex-col gap-2 py-2 md:gap-3 md:py-0">
		<div class="flex items-center justify-between">
			<span class="text-fg-muted font-Inter text-xs font-semibold">CURRENT LEVEL</span>
			<span class="text-danger font-Inter text-xs font-semibold"
				>TARGET: {targetMastery}%</span
			>
		</div>

		<!-- Progress bar -->
		<div class="bg-border h-1.5 w-full overflow-hidden rounded-full">
			<div
				class="bg-danger ease-standard h-full transition-all duration-500"
				style="width: {fillPercent}%"
			></div>
		</div>
	</div>

	<!-- CTA Button -->
	<Button
		btnType="primaryLight"
		{onclick}
	>
		<Target size={16} />
		<span>Targeted Practice</span>
	</Button>
</div>
