<script>
	import { User, Phone, GraduationCap, BookOpen, Trophy, Clock, ArrowRight, Target, Calendar } from '@lucide/svelte';
	import { Camera } from '@lucide/svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Button from '$lib/components/Button.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import VerticalStepper from '$lib/components/VerticalStepper.svelte';
	import InfoCard from '$lib/registration/InfoCard.svelte';
	import ChipGroup from '$lib/components/ChipGroup.svelte';
	import ChoiceCard from '$lib/registration/ChoiceCard.svelte';
	import SegmentedControl from '$lib/registration/SegmentedControl.svelte';
	import Checkbox from '$lib/registration/Checkbox.svelte';
	import IconHeading from '$lib/components/IconHeading.svelte';
	import {
		STEPS,
		INFO_CARD,
		BOARD_OPTIONS,
		EXAM_OPTIONS,
		YEAR_OPTIONS,
		SUBJECT_OPTIONS,
		LEARNING_GOAL_OPTIONS,
		PRACTICE_QUESTIONS_OPTIONS,
		STUDY_DURATION_OPTIONS,
		submitProfile
	} from '$lib/registration/mock/registration.service.js';

	// Form state
	let fullName = $state('Arjun Mehta');
	let contactNumber = $state('+91 98765 43210');
	let educationBoard = $state(null);
	let targetExam = $state(null);
	let targetYear = $state(null);
	let primarySubjects = $state(['math', 'physics']);
	let learningGoal = $state('practice');
	let practiceQuestionsPerDay = $state(20);
	let studyDurationHours = $state(2);
	let agreeToTerms = $state(false);

	let isSubmitting = $state(false);
	let formError = $state('');
	let currentStep = $state(1); // 0-based: 0=Basic, 1=Academic, etc.

	// Derive steps with status from currentStep
	const stepsWithStatus = $derived(
		STEPS.map((s, i) => ({
			...s,
			status: i < currentStep ? 'completed' : i === currentStep ? 'active' : 'inactive'
		}))
	);

	async function handleSaveDraft() {
		formError = '';
		// Could persist to localStorage or API
		console.log('Save draft', { fullName, contactNumber, educationBoard, targetExam, targetYear, primarySubjects, learningGoal, practiceQuestionsPerDay, studyDurationHours });
	}

	async function handleSaveAndContinue() {
		formError = '';
		if (!agreeToTerms) {
			formError = 'Please agree to the Terms of Service to continue.';
			return;
		}
		isSubmitting = true;
		try {
			await submitProfile({
				fullName,
				contactNumber,
				educationBoard,
				targetExam,
				targetYear,
				primarySubjects,
				learningGoal,
				practiceQuestionsPerDay,
				studyDurationHours
			});
			// Navigate to next page (e.g. dashboard)
			// goto('/home');
		} catch (err) {
			formError = err?.message || 'Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="flex min-h-screen flex-col bg-canvas">
	<!-- Header - full width, top, centered -->
	<header class="shrink-0 border-b border-stroke px-6 py-8 lg:px-8">
		<div class="mx-auto flex max-w-4xl flex-col items-center text-center">
			<div class="mb-3">
				<Badge label="Personalize Your Journey" variant="primary" size="md" />
			</div>
			<h1 class="text-2xl font-bold text-fg lg:text-3xl">Complete Your Profile</h1>
			<p class="mt-2 max-w-xl text-base text-fg-muted">
				Tell us about your academic goals so we can tailor the perfect learning path for you.
			</p>
		</div>
	</header>

	<!-- Two columns below header - centered, no card background -->
	<div class="flex flex-1 justify-center px-4 py-8 lg:px-8">
		<div class="flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:gap-12">
			<!-- Left: Avatar & Progress -->
			<aside class="flex shrink-0 flex-col items-center lg:w-72 lg:items-start">
				<div class="flex flex-col items-center gap-7 lg:items-start">
					<!-- Profile Summary -->
					<div class="flex flex-col items-center gap-4 lg:items-start">
					<div class="relative">
						<Avatar src="" name={fullName || 'User'} size="xl">
							{#snippet overlay()}
								<Camera size={16} />
							{/snippet}
						</Avatar>
					</div>
						<div>
							<p class="font-semibold text-fg">{fullName || 'Your Name'}</p>
							<p class="text-sm text-fg-muted">High School Senior</p>
						</div>
					</div>

					<!-- Stepper - hidden on mobile -->
					<div class="hidden w-full lg:block">
						<VerticalStepper steps={stepsWithStatus} {currentStep} />
					</div>

					<!-- Info Card - hidden on mobile -->
					<div class="hidden lg:block">
						<InfoCard title={INFO_CARD.title} description={INFO_CARD.description} />
					</div>
				</div>
			</aside>

			<!-- Right: Form - subtle divider, no card background -->
			<main class="min-w-0 flex-1 border-t border-stroke/60 pt-8 lg:border-t-0 lg:border-l lg:border-stroke/60 lg:pl-12 lg:pt-0">
				<div class="max-w-2xl">
				<form class="flex flex-col gap-12" onsubmit={(e) => e.preventDefault()}>
				<!-- Section 1: Personal Details -->
				<section class="flex flex-col">
					<IconHeading title="Personal Details" size="md">
						{#snippet icon()}<User size={20} />{/snippet}
					</IconHeading>
					<div class="mt-3 border-t border-stroke pt-6">
						<div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
						<TextInput
							label="Full Name"
							placeholder="Enter your full name"
							bind:value={fullName}
							required
						>
							{#snippet icon()}<User size={16} />{/snippet}
						</TextInput>
						<TextInput
							label="Contact Number"
							type="tel"
							placeholder="+91 98765 43210"
							bind:value={contactNumber}
						>
							{#snippet icon()}<Phone size={16} />{/snippet}
						</TextInput>
						</div>
					</div>
				</section>

				<!-- Section 2: Academic Context -->
				<section class="flex flex-col">
					<IconHeading title="Academic Context" size="md">
						{#snippet icon()}<GraduationCap size={20} />{/snippet}
					</IconHeading>
					<div class="mt-3 border-t border-stroke pt-6">
						<div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
							<Dropdown
								title="Education Board"
								options={BOARD_OPTIONS}
								bind:value={educationBoard}
								placeholder="Select board"
							>
								{#snippet icon()}<BookOpen size={16} />{/snippet}
							</Dropdown>
							<Dropdown
								title="Target Exam"
								options={EXAM_OPTIONS}
								bind:value={targetExam}
								placeholder="Select exam"
							>
								{#snippet icon()}<Target size={16} />{/snippet}
							</Dropdown>
						</div>
						<div class="mt-5">
							<Dropdown
								title="Target Year"
								options={YEAR_OPTIONS}
								bind:value={targetYear}
								placeholder="Select year"
							>
								{#snippet icon()}<Calendar size={16} />{/snippet}
							</Dropdown>
						</div>
					</div>
				</section>

				<!-- Section 3: Primary Subjects -->
				<section class="flex flex-col">
					<IconHeading title="Primary Subjects" size="md">
						{#snippet icon()}<BookOpen size={20} />{/snippet}
					</IconHeading>
					<div class="mt-3 border-t border-stroke pt-6">
					<ChipGroup
						options={SUBJECT_OPTIONS}
						bind:selected={primarySubjects}
						hint="* You can change these selections later in your dashboard settings."
					/>
					</div>
				</section>

				<!-- Section 4: Learning Goals -->
				<section class="flex flex-col">
					<IconHeading title="Learning Goals" size="md">
						{#snippet icon()}<Trophy size={20} />{/snippet}
					</IconHeading>
					<div class="mt-3 border-t border-stroke pt-6">
					<ChoiceCard
						options={LEARNING_GOAL_OPTIONS}
						bind:selected={learningGoal}
					/>
					</div>
				</section>

				<!-- Section 5: Daily Preferences -->
				<section class="flex flex-col">
					<IconHeading title="Daily Preferences" size="md">
						{#snippet icon()}<Clock size={20} />{/snippet}
					</IconHeading>
					<div class="mt-3 border-t border-stroke pt-6">
					<div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
						<SegmentedControl
							label="Practice Questions per Day"
							options={PRACTICE_QUESTIONS_OPTIONS}
							bind:value={practiceQuestionsPerDay}
							suffix="Qs"
						/>
						<SegmentedControl
							label="Study Duration (Hours)"
							options={STUDY_DURATION_OPTIONS}
							bind:value={studyDurationHours}
							suffix="hrs"
						/>
					</div>
					</div>
				</section>

				<!-- Form Actions - horizontal: checkbox left, buttons right -->
				<div class="flex flex-col gap-4 border-t border-stroke pt-10">
					{#if formError}
						<p class="text-sm text-danger">{formError}</p>
					{/if}

					<div class="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
						<Checkbox
							bind:checked={agreeToTerms}
							label="I agree to the "
							linkText="Terms of Service"
							onLinkClick={() => {}}
						/>

						<div class="flex flex-wrap items-center gap-3">
							<Button btnType="ghost" type="button" onclick={handleSaveDraft} customClass="border border-stroke font-semibold">
								Save Draft
							</Button>
							<Button
								btnType="primary"
								type="button"
								onclick={handleSaveAndContinue}
								disabled={isSubmitting}
								customClass="font-semibold"
							>
								{#if isSubmitting}
									Saving...
								{:else}
									Save and Continue
									<ArrowRight size={16} class="ml-1" />
								{/if}
							</Button>
						</div>
					</div>

					<p class="text-sm text-fg-muted">
						Need help with your profile?
						<a href="/faq" class="text-primary font-medium underline hover:no-underline">Visit our FAQ section</a>
					</p>
				</div>
			</form>
				</div>
			</main>
		</div>
	</div>
</div>
