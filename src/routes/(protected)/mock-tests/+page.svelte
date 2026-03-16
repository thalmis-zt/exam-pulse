<script>
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RecommendedMock from '$lib/components/RecommendedMock.svelte';
	import MockTestCard from '$lib/components/MockTestCard.svelte';

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

	let activeSubject = $state('All');
	let activeLevel = $state('All');
</script>

<div class="flex min-h-screen flex-col gap-8">
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
				/>
			{/each}
		</div>
	</section>

	<!-- ── All Mock Exams ──────────────────────────────────── -->
	<section>
		<!-- Header row: count + level filter -->
		<div class="flex flex-wrap items-center justify-between gap-3">
			<h2 class="text-fg-muted text-sm font-bold tracking-widest uppercase">
				All Mock Exams ({allMocks.length})
			</h2>
			<div class="text-fg-muted flex items-center gap-2 text-xs font-medium">
				<span>LEVEL:</span>
				{#each levels as lvl}
					<button
						onclick={() => (activeLevel = lvl)}
						class="
							cursor-pointer rounded-full border-none px-2.5 py-1
							transition duration-(--motion-fast)
							{activeLevel === lvl ? 'bg-primary text-canvas-base-fixed' : 'text-fg-muted hover:text-fg bg-transparent'}
						"
					>
						{lvl}
					</button>
				{/each}
			</div>
		</div>

		<!-- Subject tabs -->
		<div class="mt-4 flex flex-wrap gap-2">
			{#each subjects as subj}
				<button
					onclick={() => (activeSubject = subj)}
					class="
						cursor-pointer rounded-full border px-4 py-1.5 text-sm
						font-medium transition duration-(--motion-fast)
						{activeSubject === subj
						? 'bg-primary border-primary text-canvas-base-fixed'
						: 'text-fg border-stroke hover:border-primary hover:text-primary bg-transparent'}
					"
				>
					{subj}
				</button>
			{/each}
		</div>

		<!-- Cards grid -->
		<div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
			{#each allMocks as mock}
				<MockTestCard
					title={mock.title}
					description={mock.description}
					duration={mock.duration}
					questions={mock.questions}
					users={mock.users}
					xp={mock.xp}
				/>
			{/each}
		</div>

		<!-- View All button -->
		<div class="mt-6 flex justify-center">
			<button
				class="
				border-primary text-primary hover:bg-primary
				cursor-pointer rounded-xl
				border bg-transparent px-10
				py-3 text-sm
				font-semibold transition duration-(--motion-fast)
				ease-(--ease-standard) hover:text-white
			"
			>
				View All Mock Tests
			</button>
		</div>
	</section>
</div>
