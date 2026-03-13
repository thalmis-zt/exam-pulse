<!-- Data: user greeting, daily XP summary, streak count, recommended tests, recent activity feed, and quick-access shortcuts -->

<script>
	import { Zap, FileText, Target } from '@lucide/svelte';
	import SectionHeader      from '$lib/components/SectionHeader.svelte';
	import UserGreetingCard   from '$lib/components/UserGreetingCard.svelte';
	import ActionCard         from '$lib/components/ActionCard.svelte';
	import QuickActionCard    from '$lib/home/QuickActionCard.svelte';
	import SubjectFocusCard   from '$lib/home/SubjectFocusCard.svelte';
	import MockTestCard        from '$lib/components/MockTestCard.svelte';
	import BottomNav          from '$lib/components/BottomNav.svelte';

	/* ── Mock data (replace with server load data) ───────────── */
	const user = { name: 'Rahul Rajan', rank: 1240 };

	const recommendedMocks = [
		{ title: 'JEE Main – Full Test 08',         description: 'Based on the latest exam pattern for 2026.', duration: '180 mins', questions: '90 Qs', users: '12.4k users', xp: '+150 XP' },
		{ title: 'Physics: Mechanics Master',        description: 'Based on the latest exam pattern for 2026.', duration: '45 mins',  questions: '30 Qs', users: '3.1k users',  xp: '+50 XP' },
		{ title: 'Speed Mathematics Drill',          description: 'Based on the latest exam pattern for 2026.', duration: '45 mins',  questions: '30 Qs', users: '3.1k users',  xp: '+25 XP' },
		{ title: 'Verbal Reasoning 101',             description: 'Based on the latest exam pattern for 2026.', duration: '45 mins',  questions: '30 Qs', users: '3.1k users',  xp: '+25 XP' },
	];
</script>

<!-- Page shell: scroll with bottom-nav clearance -->
<div class="flex flex-col gap-6   min-h-screen">

	<!-- Greeting -->
	<UserGreetingCard name={user.name} rank={user.rank} />

	<!-- Action cards -->
	<div class="grid grid-cols-2 gap-3">
		<ActionCard title="Practice" subtitle="Customized Questions" label="Start" variant="primary">
			{#snippet icon()}<Zap size={28} />{/snippet}
		</ActionCard>
		<ActionCard title="Mock Tests" subtitle="Full Length Exams" label="Start" variant="success">
			{#snippet icon()}<FileText size={28} />{/snippet}
		</ActionCard>
	</div>

	<!-- Quick Actions -->
	<section class="mb-3">
		<SectionHeader title="Quick Actions" />
		<div class="flex gap-3">
			<QuickActionCard title="Quick Quiz" description="5-min challenge">
				{#snippet icon()}<Zap size={20} />{/snippet}
			</QuickActionCard>
			<QuickActionCard title="PYQ Papers" description="PYQ Practice">
				{#snippet icon()}<Zap size={20} />{/snippet}
			</QuickActionCard>
			<QuickActionCard title="Daily Dare" description="Streak Challenge">
				{#snippet icon()}<Target size={20} />{/snippet}
			</QuickActionCard>
		</div>
	</section>

	<!-- Subject Focus -->
	<section class="mb-3">
		<SectionHeader title="Subject Focus" showAll onViewAll={() => {}} />
		<div class="flex gap-3">
			<SubjectFocusCard subject="Mathematics" testCount={24}>
				{#snippet icon()}<FileText size={20} />{/snippet}
			</SubjectFocusCard>
			<SubjectFocusCard
				subject="Chemistry"
				testCount={18}
				iconBg="bg-purple-100 dark:bg-purple-900/30"
				iconColor="text-purple-500"
			>
				{#snippet icon()}<Target size={20} />{/snippet}
			</SubjectFocusCard>
			<SubjectFocusCard
				subject="Physics"
				testCount={12}
				iconBg="bg-orange-100 dark:bg-orange-900/30"
				iconColor="text-orange-500"
			>
				{#snippet icon()}<Zap size={20} />{/snippet}
			</SubjectFocusCard>
		</div>
	</section>

	<!-- Recommended Mocks -->
	<section>
		<SectionHeader title="Recommended Mocks" showAll/>
		<div class="flex flex-col gap-3">
			{#each recommendedMocks as mock}
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
	</section>
</div>

<!-- Fixed bottom navigation -->
<BottomNav />