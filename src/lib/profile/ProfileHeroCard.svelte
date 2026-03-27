<script>
	import { Pencil } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';

	/** @type {{ user: import('./mock/profile.schema.js').UserProfile }} */
	let { user } = $props();
</script>

<div class="bg-surface-card-subtle relative flex flex-col gap-4 rounded-md p-4">
	<!-- Edit button -->
	<div class="absolute top-3 right-3">
		<Button
			btnType="custom"
			type="button"
			customClass="text-primary flex items-center gap-1 text-sm font-medium hover:opacity-80"
			ariaLabel="Edit profile"
		>
			<Pencil size={14} />
			Edit
		</Button>
	</div>

	<!-- Avatar + identity -->
	<div class="sm:flex-row flex flex-col flex-wrap items-start gap-3 sm:flex-nowrap">
		<!-- Avatar -->
		<div class="relative shrink-0">
			<Avatar src={user.avatar ?? ''} name={user.name} size="lg" />
		</div>

		<!-- Name, badges, handle, bio -->
		<div class="flex min-w-0 flex-col gap-1">
			<div class="flex flex-wrap items-center gap-2">
				<span class="text-fg text-base font-bold">{user.name}</span>
				<Badge label={user.grade} variant="warning" size="xs" />
				<Badge label={user.examTag} variant="success" size="xs" />
			</div>
			<p class="text-fg-muted text-sm">{user.handle}</p>
			{#if user.bio}
				<p class="text-fg-muted mt-0.5 text-xs italic">{user.bio}</p>
			{/if}
		</div>
	</div>

	<!-- Profile completion -->
	<ProgressBar value={user.profileCompletion} size="sm" ariaLabel="Profile completion">
		{#snippet labelLeft()}<span>Profile Completion</span>{/snippet}
		{#snippet labelRight()}<span>{user.profileCompletion}%</span>{/snippet}
	</ProgressBar>
</div>
