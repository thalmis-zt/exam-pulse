<script>
	import { goto } from '$app/navigation';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RecommendedMock from '$lib/components/RecommendedMock.svelte';
	import MockTestCard from '$lib/components/MockTestCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';





	/* ── Mock data (replace with server load data) ─────────── */
	const recommended = [
		{ title: 'JEE Main – Full Test 08', duration: '45 mins', xp: 450, variant: 'primary' },
		{ title: 'JEE Main – Full Test 08', duration: '45 mins', xp: 450, variant: 'orange' },
		{ title: 'JEE Main – Full Test 08', duration: '45 mins', xp: 450, variant: 'secondary' },
		{ title: 'JEE Main – Full Test 08', duration: '45 mins', xp: 450, variant: 'primary' },
		{ title: 'JEE Main – Full Test 08', duration: '45 mins', xp: 450, variant: 'orange' },
	];

	const subjects = ['All', 'Computer Science', 'Mathematics', 'Chemistry', 'Physics', 'History'];
	const levels = ['All', 'Easy', 'Medium', 'Hard'];

	const allMocks = [
		{
			title: 'JEE Main – Full Test 08',
			description: 'Based on the latest exam pattern for 2026.',
			duration: '180 mins',
			questions: '90 Qs',
			users: '12.4k',
			xp: '+150 XP'
		},
		{
			title: 'JEE Main – Full Test 08',
			description: 'Based on the latest exam pattern for 2026.',
			duration: '180 mins',
			questions: '90 Qs',
			users: '12.4k',
			xp: '+150 XP'
		},
		{
			title: 'JEE Main – Full Test 08',
			description: 'Based on the latest exam pattern for 2026.',
			duration: '180 mins',
			questions: '90 Qs',
			users: '12.4k',
			xp: '+150 XP'
		},
		{
			title: 'JEE Main – Full Test 08',
			description: 'Based on the latest exam pattern for 2026.',
			duration: '180 mins',
			questions: '90 Qs',
			users: '12.4k',
			xp: '+150 XP'
		},
		{
			title: 'JEE Main – Full Test 08',
			description: 'Based on the latest exam pattern for 2026.',
			duration: '180 mins',
			questions: '90 Qs',
			users: '12.4k',
			xp: '+150 XP'
		},
		{
			title: 'JEE Main – Full Test 08',
			description: 'Based on the latest exam pattern for 2026.',
			duration: '180 mins',
			questions: '90 Qs',
			users: '12.4k',
			xp: '+150 XP'
		}
	];
	function goToStart() {
		goto(`/tests/${startTestId}/start`);
	}

	let activeSubject = $state('All');
	let activeLevel = $state('All');
</script>

<div class="flex flex-col gap-8">
	<!-- ── Recommended For You ─────────────────────────────── -->
	<section >
		<SectionHeader
			title="Recommended For You"
			subtitle="Personalized picks based on your goals"
			showAll
			onViewAll={() => {}}
		/>
		<!-- Mobile: horizontal scroll -->
		<div class="mt-4 lg:hidden w-full overflow-x-auto">
			<div class="flex gap-2 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				{#each recommended as mock}
					<div class="w-72 shrink-0 snap-start">
						<RecommendedMock
							title={mock.title}
							duration={mock.duration}
							xp={mock.xp}
							variant={mock.variant}
							onclick={goToStart}
						/>
					</div>
				{/each}
			</div>
		</div>

		<!-- Desktop: grid -->
		<div class="mt-4 hidden lg:grid grid-cols-3 gap-4">
			{#each recommended as mock}
				<RecommendedMock
					title={mock.title}
					duration={mock.duration}
					xp={mock.xp}
					variant={mock.variant}
					onclick={goToStart}
				/>
			{/each}
		</div>
	</section>

	<!-- ── All Mock Exams ──────────────────────────────────── -->
	<section>
		<!-- Header row: count + level filter -->
		<div class="flex flex-wrap items-center justify-between gap-3">
			<h2 class="text-fg-muted text-xs font-bold tracking-widest uppercase">
				All Mock Exams ({allMocks.length})
			</h2>
			<div class="text-fg-muted flex items-center gap-2 text-xs font-medium">
				<span>LEVEL:</span>
				{#each levels as lvl}
					<Badge
						label={lvl}
						size="sm"
						isActive={activeLevel === lvl}
						onclick={() => (activeLevel = lvl)}
					/>
				{/each}
			</div>
		</div>

		<!-- Subject tabs -->
		<div class="mt-4 flex flex-wrap gap-2">
			{#each subjects as subj}
				<Badge
					label={subj}
					hasBorder={true}
					size="sm"
					isActive={activeSubject === subj}
					onclick={() => (activeSubject = subj)}
				/>
			{/each}
		</div>

		<!-- Cards grid -->
		<div class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each allMocks as mock}
				<MockTestCard
					title={mock.title}
					description={mock.description}
					duration={mock.duration}
					questions={mock.questions}
					users={mock.users}
					xp={mock.xp}
					onclick={goToStart}
				/>
			{/each}
		</div>

		<!-- View All button -->
		<div class="mt-6 flex justify-center">
            <Button btnType="primaryLight">
                View All Mock Tests
            </Button>
		</div>
	</section>
</div>
