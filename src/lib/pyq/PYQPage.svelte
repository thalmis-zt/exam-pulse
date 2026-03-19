<script>
	import { onMount } from 'svelte';
	import { Atom, Beaker, Calculator, Sparkles, HelpCircle, ArrowRight, Search } from '@lucide/svelte';
	import { getPYQData } from '$lib/pyq/mock/pyq.service.js';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import IconHeading from '$lib/components/IconHeading.svelte';
	import ChipGroup from '$lib/components/ChipGroup.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import PYQTopicCard from '$lib/pyq/PYQTopicCard.svelte';
	import PYQYearCard from '$lib/pyq/PYQYearCard.svelte';
	import Button from '$lib/components/Button.svelte';

	let data = $state(null);
	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');
	let searchQuery = $state('');
	let activeExamType = $state('All');
	let selectedYear = $state(null);
	let examTypeSelected = $state(['All']);
	let selectedYearValue = $state(null);

	// ChipGroup bind:selected; sync to activeExamType and loadData when changed
	$effect(() => {
		const v = examTypeSelected[0] ?? 'All';
		if (v !== activeExamType) {
			activeExamType = v;
			loadData();
		}
	});

	// Dropdown options for year (from data)
	const yearOptions = $derived(
		data?.availableYears
			? [{ id: '', name: 'Year: All' }, ...data.availableYears.map((y) => ({ id: String(y), name: `Year: ${y}` }))]
			: []
	);

	const subjectIcons = {
		Physics: Atom,
		Chemistry: Beaker,
		Mathematics: Calculator,
	};

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		isLoading = true;
		hasError = false;
		try {
			data = await getPYQData({
				examType: activeExamType === 'All' ? undefined : activeExamType,
				year: selectedYear ?? undefined,
			});
		} catch (error) {
			console.error('PYQ load error:', error);
			hasError = true;
			errorMessage = error?.message || 'Failed to load PYQ data.';
		} finally {
			isLoading = false;
		}
	}

	function handleYearSelect(ev) {
		const opt = ev?.selectedOption;
		selectedYear = opt?.id !== undefined && opt?.id !== '' ? Number(opt.id) : null;
		loadData();
	}

	function handleStartTopic(topic) {
		console.log('Start topic:', topic);
		// TODO: Navigate to practice
	}

	function handlePdfTopic(topic) {
		console.log('Download PDF:', topic);
		// TODO: Trigger PDF download
	}

	function handlePracticeYear(card) {
		console.log('Practice year:', card);
		// TODO: Navigate to year-wise practice
	}

	// Filter topics by search (client-side for mock)
	const filteredSections = $derived.by(() => {
		if (!data?.subjectSections) return [];
		const q = searchQuery?.toLowerCase().trim();
		if (!q) return data.subjectSections;
		return data.subjectSections.map((section) => ({
			...section,
			topics: section.topics.filter((t) => t.name.toLowerCase().includes(q)),
		})).filter((s) => s.topics.length > 0);
	});
</script>

<div class="flex flex-col gap-6 min-h-screen">
	<!-- Header -->
	<SectionHeader
		title="Previous Year Questions"
		subtitle="Practice with real exam questions by topic"
	/>

	<!-- Search -->
	<div
		class="flex items-center gap-2 border border-stroke rounded-full bg-surface-card px-3 py-2 shadow-sm"
	>
		<Search size={14} class="text-fg-muted shrink-0" />
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search topics, years, or exams..."
			class="flex-1 min-w-0 bg-transparent text-sm text-fg font-poppins outline-none border-none ring-0 focus:ring-0 placeholder:text-fg-muted"
		/>
	</div>

	{#if isLoading}
		<div class="flex flex-col items-center justify-center gap-3 py-12">
			<div
				class="w-8 h-8 border-4 border-stroke border-t-primary rounded-full animate-spin"
			></div>
			<p class="text-fg-muted text-sm">Loading PYQ...</p>
		</div>
	{:else if hasError}
		<div
			class="flex flex-col items-center justify-center gap-3 py-12 p-4 rounded-xl bg-surface-card border border-stroke"
		>
			<p class="text-fg font-semibold">Something went wrong</p>
			<p class="text-fg-muted text-sm text-center">{errorMessage}</p>
			<Button btnType="primary" onclick={loadData}>Retry</Button>
		</div>
	{:else if data}
		<!-- Year-Wise Mock Tests -->
		<section>
			<div class="flex flex-wrap items-center justify-between gap-3">
				<IconHeading
					title="Year-Wise Mock Tests"
					size="sm"
					class="[&_h2]:text-fg-muted [&_h2]:uppercase [&_h2]:tracking-widest"
				>
					{#snippet icon()}<Sparkles size={16} />{/snippet}
				</IconHeading>
				<div class="flex flex-wrap items-center gap-2">
					<ChipGroup
						options={(data.examTypes ?? []).map((t) => ({ id: t, label: t }))}
						bind:selected={examTypeSelected}
						singleSelect
						variant="filter"
						class="gap-2"
					/>
					<div class="w-auto min-w-28">
						<Dropdown
							options={yearOptions}
							bind:value={selectedYearValue}
							placeholder="Year: All"
							onSelect={handleYearSelect}
						/>
					</div>
				</div>
			</div>
			<div class="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				{#each data.yearCards ?? [] as card (card.id)}
					<PYQYearCard {card} onPractice={() => handlePracticeYear(card)} />
				{/each}
			</div>
		</section>

		<!-- Subject-Wise Topics (compact cards, no years) -->
		{#each filteredSections as section (section.subject)}
			{@const Icon = subjectIcons[section.subject]}
			<section class="border-t border-stroke pt-6">
				<div class="flex items-center justify-between mb-4">
					{#if Icon}
						<IconHeading title={section.subject} size="md">
							{#snippet icon()}<Icon size={20} />{/snippet}
						</IconHeading>
					{:else}
						<h3 class="text-base font-bold text-fg">{section.subject}</h3>
					{/if}
					<span class="text-xs text-fg-muted">{section.topics.length} Topics Available</span>
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
					{#each section.topics as topic (topic.id)}
						<PYQTopicCard
							{topic}
							onStart={() => handleStartTopic(topic)}
							onPdf={() => handlePdfTopic(topic)}
						/>
					{/each}
				</div>
			</section>
		{/each}

		<!-- Can't find what you're looking for? -->
		<section
			class="rounded-xl border border-stroke bg-surface-card p-6 flex flex-col sm:flex-row items-center gap-4"
		>
			<div class="flex items-center gap-3 flex-1">
				<div class="bg-info/10 p-3 rounded-full">
					<HelpCircle size={24} class="text-info" />
				</div>
				<div>
					<h4 class="text-fg font-semibold">Can't find what you're looking for?</h4>
					<p class="text-fg-muted text-sm">
						We're constantly updating our database. Request content and we'll add it soon.
					</p>
				</div>
			</div>
			<Button btnType="primaryLight">
				Request Content
				<ArrowRight size={14} />
			</Button>
		</section>
	{/if}
</div>
