<script>
	import { onMount } from 'svelte';
	import { getProfileData } from '$lib/profile/mock/profile.service.js';
	import { TrendingUp } from '@lucide/svelte';
	import ProfileHeroCard from '$lib/profile/ProfileHeroCard.svelte';
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

<div class="bg-canvas duration-motion-normal ease-ease-standard min-h-screen transition">
	<div class="flex flex-col gap-6">
		{#if isLoading}
			<div class="flex flex-col items-center justify-center gap-3 py-12">
				<div
					class="border-stroke border-t-primary h-8 w-8 animate-spin rounded-full border-4"
				></div>
				<p class="text-fg-muted text-sm">Loading profile...</p>
			</div>
		{:else if hasError}
			<div
				class="bg-surface-card border-stroke flex flex-col items-center justify-center gap-3 rounded-lg border p-4 py-12"
			>
				<p class="text-fg font-semibold">Something went wrong</p>
				<p class="text-fg-muted text-center text-sm">{errorMessage}</p>
			</div>
		{:else if data}
			<!-- ── TOP ROW: Hero only (stats moved into PerformanceMetricsCard) ── -->
			<ProfileHeroCard user={data.user} />

			<!-- ── MAIN CONTENT: Left column + Right column ──────────── -->
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				<!-- Left column (1/3): Goals, Performance, Account -->
				<div class="flex flex-col gap-6">
					<div class="flex flex-col gap-3">
						<div class="flex items-center gap-2">
							<!-- <TrendingUp size={16} class="text-primary shrink-0" /> -->
							<!-- <SectionHeader title="Performance Metrics" /> -->
						</div>
						<PerformanceMetricsCard stats={data.stats} metrics={data.performance} />
					</div>
					<GoalCard goals={data.goals} />
					<!-- Account & Security — left col on desktop, bottom on mobile (reordered via order) -->
					<div class="order-last md:order-0">
						<AccountSecuritySection account={data.account} />
					</div>
				</div>

				<!-- Right column (2/3): Subjects, Exams, Achievements, Leaderboard -->
				<div class="flex flex-col gap-12 md:col-span-2">
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
						<div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
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
