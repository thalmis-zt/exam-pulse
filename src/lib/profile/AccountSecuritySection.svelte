<script>
	import { Mail, Phone, Lock, CreditCard, LogOut, Trash2, CheckCircle2, ChevronRight } from '@lucide/svelte';

	/** @type {{ account: import('./mock/profile.schema.js').AccountInfo }} */
	let { account } = $props();
</script>

<div class="bg-surface-card rounded-xl border border-stroke p-4 flex flex-col gap-1">
	<h3 class="text-sm font-bold text-fg mb-2">Account &amp; Security</h3>

	<!-- Email -->
	<div class="flex items-center gap-3 py-2.5 border-b border-stroke">
		<Mail size={16} class="text-fg-muted shrink-0" />
		<div class="flex flex-col gap-0 flex-1 min-w-0">
			<span class="text-sm text-fg truncate">{account.email}</span>
			{#if account.emailVerified}
				<span class="flex items-center gap-1 text-xs text-secondary">
					<CheckCircle2 size={11} />
					Verified
				</span>
			{/if}
		</div>
	</div>

	<!-- Phone -->
	<div class="flex items-center gap-3 py-2.5 border-b border-stroke">
		<Phone size={16} class="text-fg-muted shrink-0" />
		<div class="flex flex-col gap-0 flex-1 min-w-0">
			<span class="text-sm text-fg">{account.phone}</span>
			{#if account.smsVerified}
				<span class="text-xs text-fg-muted">SMS verification enabled</span>
			{/if}
		</div>
	</div>

	<!-- Change Password -->
	<button
		class="flex items-center gap-3 py-2.5 border-b border-stroke w-full bg-transparent border-x-0 border-t-0 cursor-pointer text-left hover:bg-canvas rounded-sm transition-colors"
		onclick={() => {}}
	>
		<Lock size={16} class="text-fg-muted shrink-0" />
		<span class="flex-1 text-sm text-fg">Change Password</span>
		<ChevronRight size={15} class="text-fg-muted shrink-0" />
	</button>

	<!-- Subscription -->
	<button
		class="flex items-center gap-3 py-2.5 border-b border-stroke w-full bg-transparent border-x-0 border-t-0 cursor-pointer text-left hover:bg-canvas rounded-sm transition-colors"
		onclick={() => {}}
	>
		<CreditCard size={16} class="text-fg-muted shrink-0" />
		<span class="flex-1 text-sm text-fg">
			Subscription: <span class="text-primary font-semibold">{account.subscription}</span>
		</span>
		<ChevronRight size={15} class="text-fg-muted shrink-0" />
	</button>

	<!-- Sign Out All Sessions -->
	<button
		class="flex items-center gap-3 py-2.5 border-b border-stroke w-full bg-transparent border-x-0 border-t-0 cursor-pointer text-left hover:bg-warning-surface rounded-sm transition-colors"
		onclick={() => {}}
	>
		<LogOut size={16} class="text-warning shrink-0" />
		<span class="flex-1 text-sm text-warning font-medium">
			Sign Out from All Sessions ({account.activeSessions})
		</span>
	</button>

	<!-- Delete Account -->
	<button
		class="flex items-center gap-3 py-2.5 w-full bg-transparent border-none cursor-pointer text-left hover:bg-danger-surface rounded-sm transition-colors"
		onclick={() => {}}
	>
		<Trash2 size={16} class="text-danger shrink-0" />
		<span class="flex-1 text-sm text-danger font-medium">Delete Account</span>
	</button>
</div>
