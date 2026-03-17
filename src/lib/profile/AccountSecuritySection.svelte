<script>
	import { Mail, Phone, Lock, CreditCard, LogOut, Trash2, CheckCircle2 } from '@lucide/svelte';
	import SettingsRow from '$lib/profile/SettingsRow.svelte';

	/** @type {{ account: import('./mock/profile.schema.js').AccountInfo }} */
	let { account } = $props();
</script>

<div class="bg-surface-card rounded-md p-4 flex flex-col ">
	<h3 class="text-sm font-bold text-fg mb-2">Account &amp; Security</h3>

	<!-- Email -->
	<SettingsRow>
		{#snippet icon()}<Mail size={16} class="text-fg-muted" />{/snippet}
		{#snippet children()}
			<span class="text-sm text-fg truncate">{account.email}</span>
			{#if account.emailVerified}
				<span class="flex items-center gap-1 text-xs text-secondary">
					<CheckCircle2 size={11} />
					Verified
				</span>
			{/if}
		{/snippet}
	</SettingsRow>

	<!-- Phone -->
	<SettingsRow>
		{#snippet icon()}<Phone size={16} class="text-fg-muted" />{/snippet}
		{#snippet children()}
			<span class="text-sm text-fg">{account.phone}</span>
			{#if account.smsVerified}
				<span class="text-xs text-fg-muted">SMS verification enabled</span>
			{/if}
		{/snippet}
	</SettingsRow>

	<!-- Change Password -->
	<SettingsRow interactive onclick={() => {}}>
		{#snippet icon()}<Lock size={16} class="text-fg-muted" />{/snippet}
		{#snippet children()}
			<span class="text-sm text-fg">Change Password</span>
		{/snippet}
	</SettingsRow>

	<!-- Subscription -->
	<SettingsRow interactive onclick={() => {}}>
		{#snippet icon()}<CreditCard size={16} class="text-fg-muted" />{/snippet}
		{#snippet children()}
			<span class="text-sm text-fg">
				Subscription: <span class="text-primary font-semibold">{account.subscription}</span>
			</span>
		{/snippet}
	</SettingsRow>

	<!-- Sign Out All Sessions -->
	<SettingsRow interactive onclick={() => {}} variant="warning" showTrailing={false}>
		{#snippet icon()}<LogOut size={16} class="text-warning" />{/snippet}
		{#snippet children()}
			<span class="text-sm text-warning font-medium">
				Sign Out from All Sessions ({account.activeSessions})
			</span>
		{/snippet}
	</SettingsRow>

	<!-- Delete Account -->
	<SettingsRow interactive onclick={() => {}} variant="danger" showTrailing={false} noDivider>
		{#snippet icon()}<Trash2 size={16} class="text-danger" />{/snippet}
		{#snippet children()}
			<span class="text-sm text-danger font-medium">Delete Account</span>
		{/snippet}
	</SettingsRow>
</div>
