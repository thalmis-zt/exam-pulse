<script>
	import { goto } from '$app/navigation';
	import { Zap, FileText, Target } from '@lucide/svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import UserGreetingCard from '$lib/home/UserGreetingCard.svelte';
	import ActionCard from '$lib/home/ActionCard.svelte';
	import QuickActionCard from '$lib/home/QuickActionCard.svelte';
	import SubjectFocusCard from '$lib/home/SubjectFocusCard.svelte';
	import MockTestCard from '$lib/components/MockTestCard.svelte';

	/* ── Mock data (replace with server load data) ───────────── */
	const user = { name: 'Rahul Rajan', rank: 1240 };

	const recommendedMocks = [
		{
			title: 'JEE Main – Full Test 08',
			description: 'Based on the latest exam pattern for 2026.',
			duration: '180 mins',
			questions: '90 Qs',
			users: '12.4k users',
			xp: '+150 XP'
		},
		{
			title: 'Physics: Mechanics Master',
			description: 'Based on the latest exam pattern for 2026.',
			duration: '45 mins',
			questions: '30 Qs',
			users: '3.1k users',
			xp: '+50 XP'
		},
		{
			title: 'Speed Mathematics Drill',
			description: 'Based on the latest exam pattern for 2026.',
			duration: '45 mins',
			questions: '30 Qs',
			users: '3.1k users',
			xp: '+25 XP'
		},
		{
			title: 'Verbal Reasoning 101',
			description: 'Based on the latest exam pattern for 2026.',
			duration: '45 mins',
			questions: '30 Qs',
			users: '3.1k users',
			xp: '+25 XP'
		}
	];
</script>

<div class="flex flex-col gap-6">
	<!-- Greeting -->
	<UserGreetingCard name={user.name} rank={user.rank} />

	<!-- Action cards -->
	<div class="450px:grid-cols-2 grid grid-cols-1 gap-3">
		<ActionCard
			title="Practice"
			subtitle="Customized Questions"
			label="Start"
			variant="primary"
			onclick={() => goto('/test-config')}
		>
			{#snippet icon()}<Zap size={28} />{/snippet}
		</ActionCard>
		<ActionCard
			title="Mock Tests"
			subtitle="Full Length Exams"
			label="Start"
			variant="success"
			onclick={() => goto('/mock-tests')}
		>
			{#snippet icon()}<FileText size={28} />{/snippet}
		</ActionCard>
	</div>

	<!-- Quick Actions -->
	<div>
		<div class="mb-3">
			<SectionHeader
				title="Quick Actions"
				subtitle="Access your most-used learning tools"
				variant="md"
			/>
		</div>
		<div class="450px:grid-cols-3 grid grid-cols-1 gap-2">
			<QuickActionCard title="Quick Quiz" description="5-min challenge">
				{#snippet icon()}<Zap size={22} />{/snippet}
			</QuickActionCard>
			<QuickActionCard title="PYQ Papers" description="PYQ Practice" onclick={() => goto('/pyq')}>
				{#snippet icon()}<Zap size={22} />{/snippet}
			</QuickActionCard>
			<QuickActionCard title="Daily Dare" description="Streak Challenge">
				{#snippet icon()}<Target size={22} />{/snippet}
			</QuickActionCard>
		</div>
	</div>

	<!-- Subject Focus -->
	<div>
		<div class="mb-3">
			<SectionHeader
				title="Subject Focus"
				subtitle="Focus on subjects to improve weak areas"
				variant="md"
				showAll
				onViewAll={() => {}}
			/>
		</div>
		<div class="450px:grid-cols-3 grid grid-cols-1 gap-2">
			<SubjectFocusCard
				subject="Mathematics"
				testCount={24}
				iconBg="bg-subject-mathematics-surface"
				iconColor="text-subject-mathematics"
				onclick={()=>goto('/subjects/mathematics')} // Example onclick to navigate to focus areas page
			>
				{#snippet icon()}<FileText size={20} />{/snippet}
			</SubjectFocusCard>
			<SubjectFocusCard
				subject="Chemistry"
				testCount={18}
				iconBg="bg-subject-chemistry-surface"
				iconColor="text-subject-chemistry"
				onclick={()=>goto('/subjects/chemistry')} // Example onclick to navigate to focus areas page
			>
				{#snippet icon()}<Target size={20} />{/snippet}
			</SubjectFocusCard>
			<SubjectFocusCard
				subject="Physics"
				testCount={12}
				iconBg="bg-subject-physics-surface"
				iconColor="text-subject-physics"
				onclick={()=>goto('/subjects/physics')} // Example onclick to navigate to focus areas page
			>
				{#snippet icon()}<Zap size={20} />{/snippet}
			</SubjectFocusCard>
		</div>
	</div>

	<!-- Recommended Mocks -->
	<div>
		<div class="mb-3">
			<SectionHeader
				title="Recommended Mocks"
				subtitle="Tests matched to your learning level"
				variant="md"
				showAll
			/>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each recommendedMocks as mock}
				<MockTestCard
					title={mock.title}
					description={mock.description}
					duration={mock.duration}
					questions={mock.questions}
					users={mock.users}
					xp={mock.xp}
					onclick={() => goto(`/tests/${mock.id}/attempt`)} // Example onclick to navigate to mock tests page
				/>
			{/each}
		</div>
	</div>
</div>
