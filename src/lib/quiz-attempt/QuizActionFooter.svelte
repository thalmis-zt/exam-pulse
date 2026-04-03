<script>
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import Button from '$lib/components/Button.svelte';

	

	let {
		hasPrevious = false,
		hasNext = false,
		onPrevious,
		onNext,
		onMarkForReview,
		onSaveAndNext,
		isMarked = false
	} = $props();
</script>

<div class="border-t border-stroke pt-4">
	<div class="flex min-w-0 flex-col gap-2 sm:hidden">
		<div class="flex items-center justify-between gap-2">
			<IconButton
				icon={ChevronLeft}
				ariaLabel="Previous question"
				variant="outline"
				size="md"
				disabled={!hasPrevious}
				onclick={onPrevious}
			/>
			<IconButton
				icon={ChevronRight}
				ariaLabel="Next question"
				variant="outline"
				size="md"
				disabled={!hasNext}
				onclick={onNext}
			/>
		</div>
		<div class="flex min-w-0 items-stretch gap-2">
			<Button
				btnType={isMarked ? 'flagged' : 'flaggedLight'}
				onclick={onMarkForReview}
				customClass="min-h-[42px] min-w-0 flex-1 normal-case text-center whitespace-normal"
			>
				Mark for Review
			</Button>
			<Button
				btnType="primary"
				onclick={onSaveAndNext}
				customClass="min-h-[42px] min-w-0 flex-1 text-center whitespace-normal"
			>
				Save & Next
			</Button>
		</div>
	</div>

	<!-- Desktop: [<] [>] on left, [Mark for Review] [Save & Next] on right -->
	<div class="hidden items-center justify-between gap-4 sm:flex">
		<div class="flex items-center gap-2">
			<IconButton
				icon={ChevronLeft}
				ariaLabel="Previous question"
				variant="outline"
				size="md"
				disabled={!hasPrevious}
				onclick={onPrevious}
			/>
			<IconButton
				icon={ChevronRight}
				ariaLabel="Next question"
				variant="outline"
				size="md"
				disabled={!hasNext}
				onclick={onNext}
			/>
		</div>
		<div class="flex items-stretch gap-3">
			<Button
				btnType={isMarked ? 'flagged' : 'flaggedLight'}
				onclick={onMarkForReview}
				customClass="min-h-[42px] min-w-[140px] flex-1 sm:flex-initial normal-case"
			>
				Mark for Review
			</Button>
			<Button
				btnType="primary"
				onclick={onSaveAndNext}
				customClass="min-h-[42px] min-w-[140px] flex-1 sm:flex-initial"
			>
				Save & Next
			</Button>
		</div>
	</div>
</div>
