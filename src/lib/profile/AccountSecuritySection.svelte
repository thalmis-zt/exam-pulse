<script>
	import { Mail, Phone, Lock, CreditCard, LogOut, Trash2, CheckCircle2 } from '@lucide/svelte';
	import SettingsRow from '$lib/profile/SettingsRow.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	let { account } = $props();

	const settings = [
		{
			id: 'email',
			icon: Mail,
			label: account.email,
			secondary: account.emailVerified
				? { icon: CheckCircle2, text: 'Verified', class: 'text-secondary' }
				: null,
			interactive: false
		},
		{
			id: 'phone',
			icon: Phone,
			label: account.phone,
			secondary: account.smsVerified ? { text: 'SMS verification enabled' } : null,
			interactive: false
		},
		{
			id: 'password',
			icon: Lock,
			label: 'Change Password',
			interactive: true,
			onclick: () => {}
		},
		{
			id: 'subscription',
			icon: CreditCard,
			label: 'Subscription:',
			value: account.subscription,
			interactive: true,
			onclick: () => {}
		},
		{
			id: 'signout',
			icon: LogOut,
			label: `Sign Out from All Sessions (${account.activeSessions})`,
			interactive: true,
			variant: 'warning',
			showTrailing: false,
			onclick: () => {}
		},
		{
			id: 'delete',
			icon: Trash2,
			label: 'Delete Account',
			interactive: true,
			variant: 'danger',
			showTrailing: false,
			noDivider: true,
			onclick: () => {}
		}
	];
</script>

<div class="bg-surface-card flex flex-col rounded-md p-4">
	<div class="mb-1">
		<SectionHeader title="Account & Security" variant="sm" />
	</div>

	{#each settings as setting (setting.id)}
		<SettingsRow
			interactive={setting.interactive}
			onclick={setting.onclick}
			variant={setting.variant}
			showTrailing={setting.showTrailing}
			noDivider={setting.noDivider}
		>
			{#snippet icon()}
				<svelte:component
					this={setting.icon}
					size={16}
					class={setting.variant === 'danger'
						? 'text-danger'
						: setting.variant === 'warning'
							? 'text-warning'
							: 'text-fg-muted'}
				/>
			{/snippet}
			{#snippet children()}
				<div class="flex flex-col gap-0.5">
					<span
						class={`text-sm ${
							setting.variant === 'danger'
								? 'text-danger font-medium'
								: setting.variant === 'warning'
									? 'text-warning font-medium'
									: 'text-fg'
						}`}
					>
						{setting.label}
						{#if setting.value}
							<span class="text-primary font-semibold">{setting.value}</span>
						{/if}
					</span>
					{#if setting.secondary}
						<span
							class={`text-xs ${setting.secondary.class || 'text-fg-muted'} flex items-center gap-1`}
						>
							{#if setting.secondary.icon}
								<svelte:component this={setting.secondary.icon} size={11} />
							{/if}
							{setting.secondary.text}
						</span>
					{/if}
				</div>
			{/snippet}
		</SettingsRow>
	{/each}
</div>
