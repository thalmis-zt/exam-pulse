<script>
	import { onMount } from 'svelte';
	import { getProfileData } from '$lib/profile/mock/profile.service.js';

	import ProfileHeroCard from '$lib/profile/ProfileHeroCard.svelte';
	import ProfileStatsGrid from '$lib/profile/ProfileStatsGrid.svelte';
	import GoalCard from '$lib/profile/GoalCard.svelte';
	import PerformanceMetricsCard from '$lib/profile/PerformanceMetricsCard.svelte';
	import SubjectListItem from '$lib/profile/SubjectListItem.svelte';
	import RecentExamRow from '$lib/profile/RecentExamRow.svelte';
	import AchievementBadge from '$lib/profile/AchievementBadge.svelte';
	import LeaderboardSection from '$lib/profile/LeaderboardSection.svelte';
	import AccountSecuritySection from '$lib/profile/AccountSecuritySection.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	/** @type {import('./mock/profile.schema.js').ProfilePageData | null} */
	let data = $state(null);
	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	onMount(async () => {
		try {
			data = await getProfileData();
		} catch (error) {
			console.error('Failed to load profile:', error);
			hasError = true;
			errorMessage = error?.message || 'Failed to load profile. Please try again.';
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="bg-canvas min-h-screen transition duration-motion-normal ease-ease-standard">
	<div class="flex flex-col gap-6">

		{#if isLoading}
			<div class="flex flex-col items-center justify-center gap-3 py-12">
				<div class="w-8 h-8 border-4 border-stroke border-t-primary rounded-full animate-spin"></div>
				<p class="text-fg-muted text-sm">Loading profile...</p>
			</div>

		{:else if hasError}
			<div class="flex flex-col items-center justify-center gap-3 py-12 p-4 rounded-lg bg-surface-card border border-stroke">
				<p class="text-fg font-semibold">Something went wrong</p>
				<p class="text-fg-muted text-sm text-center">{errorMessage}</p>
			</div>

		{:else if data}

			<!-- ── TOP ROW: Hero + Stats ──────────────────────────────── -->
			<div class="grid grid-cols-1 md:grid-cols-5 gap-4">
				<div class="md:col-span-3">
					<ProfileHeroCard user={data.user} />
				</div>
				<div class="md:col-span-2">
					<ProfileStatsGrid stats={data.stats} />
				</div>
			</div>

			<!-- ── MAIN CONTENT: Left column + Right column ──────────── -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">

				<!-- Left column (1/3): Goals, Performance, Account -->
				<div class="flex flex-col gap-6">
					<PerformanceMetricsCard metrics={data.performance} />
					<GoalCard goals={data.goals} />
					<!-- Account & Security — left col on desktop, bottom on mobile (reordered via order) -->
					<div class="order-last md:order-0">
						<AccountSecuritySection account={data.account} />
					</div>
				</div>

				<!-- Right column (2/3): Subjects, Exams, Achievements, Leaderboard -->
				<div class="md:col-span-2 flex flex-col gap-6">

					<!-- My Subjects -->
					<section class="flex flex-col gap-3">
						<SectionHeader title="My Subjects" showAll onViewAll={() => {}} />
						<div class="flex flex-col gap-2">
							{#each data.subjects as subject (subject.id)}
								<SubjectListItem {subject} />
							{/each}
						</div>
					</section>

					<!-- Recent Exams -->
					<section class="flex flex-col gap-3">
						<SectionHeader title="Recent Exams" showAll onViewAll={() => {}} />
						<div class="flex flex-col gap-2">
							{#each data.recentExams as exam (exam.id)}
								<RecentExamRow {exam} />
							{/each}
						</div>
					</section>

					<!-- Achievements -->
					<section class="flex flex-col gap-3">
						<SectionHeader title="Achievements" />
						<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{#each data.achievements as achievement (achievement.id)}
								<AchievementBadge {achievement} />
							{/each}
						</div>
					</section>

					<!-- Leaderboard -->
					<LeaderboardSection leaderboard={data.leaderboard} />

				</div>
			</div>

		{:else}
			<div class="flex flex-col items-center justify-center gap-3 py-12">
				<p class="text-fg-muted">No profile data available.</p>
			</div>
		{/if}

	</div>
</div>
