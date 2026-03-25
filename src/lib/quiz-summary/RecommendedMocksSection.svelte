<script>
	import { Shield } from '@lucide/svelte';
	import IconHeading from '$lib/components/IconHeading.svelte';
	import MockTestCard from '$lib/components/MockTestCard.svelte';
	import Button from '$lib/components/Button.svelte';

	let {
		mocks = [],
		onViewWeakAreas = () => {},
		onViewAll = () => {}
	} = $props();
</script>

<section class="flex flex-col gap-4">
	<!-- Header: IconHeading + View Weak Areas link -->
	<div class="flex items-center gap-2 flex-wrap">
		<IconHeading title="Recommended Mocks" size="md">
			{#snippet icon()}<Shield size={20} />{/snippet}
		</IconHeading>
		<button
			onclick={onViewWeakAreas}
			class="text-sm font-medium text-primary cursor-pointer bg-transparent border-none p-0 hover:underline shrink-0"
		>
			View Weak Areas
		</button>
	</div>

	<!-- Mock test cards: horizontal scroll on mobile, grid on larger screens -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each mocks as mock, i (mock.title + mock.duration + i)}
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

	<!-- View All button - full width on mobile, right-aligned on desktop -->
	<div class="flex justify-end">
		<Button btnType="primaryLight" onclick={onViewAll} customClass="w-full sm:w-auto">
			View All Mock Tests
		</Button>
	</div>
</section>
