<script>
	import { Pencil } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import Avatar from '$lib/components/Avatar.svelte';

	/** @type {{ user: import('./mock/profile.schema.js').UserProfile }} */
	let { user } = $props();
</script>

<div class="bg-surface-card rounded-md border border-stroke p-4 relative flex flex-col gap-4">
	<!-- Edit button -->
	<button
		class="absolute top-3 right-3 flex items-center gap-1 text-sm text-primary font-medium hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
		aria-label="Edit profile"
	>
		<Pencil size={14} />
		Edit
	</button>

	<!-- Avatar + identity -->
	<div class="flex items-start gap-3">
		<!-- Avatar -->
		<div class="relative shrink-0">
			<Avatar src={user.avatar ?? ''} name={user.name} size="lg" />
			<!-- Online indicator -->
			<!-- <span
				class="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-success border-2 border-surface-card"
				aria-hidden="true"
			></span> -->
		</div>

		<!-- Name, badges, handle, bio -->
		<div class="flex flex-col gap-1 min-w-0 pr-16">
			<div class="flex items-center gap-2 flex-wrap">
				<span class="text-base font-bold text-fg">{user.name}</span>
				<Badge label={user.grade} variant="default" size="sm" />
				<Badge label={user.examTag} variant="primary" size="sm" />
			</div>
			<p class="text-sm text-fg-muted">{user.handle}</p>
			{#if user.bio}
				<p class="text-xs text-fg-muted italic mt-0.5">{user.bio}</p>
			{/if}
		</div>
	</div>

	<!-- Profile completion -->
	<ProgressBar
		value={user.profileCompletion}
		size="sm"
		ariaLabel="Profile completion"
	>
		{#snippet labelLeft()}<span>Profile Completion</span>{/snippet}
		{#snippet labelRight()}<span>{user.profileCompletion}%</span>{/snippet}
	</ProgressBar>
</div>
