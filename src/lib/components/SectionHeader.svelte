<script>
    let { title, subtitle = '', showAll = false, onViewAll } = $props();
</script>

<div class="flex flex-col">
    <div class="flex items-center justify-between">
        <h2 class="text-base font-bold text-fg">{title}</h2>
        {#if showAll}
            <button
                onclick={onViewAll}
                class="text-sm font-medium text-primary flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
            >
                All ›
            </button>
        {/if}
    </div>
    {#if subtitle}
        <p class="text-sm text-fg-muted">{subtitle}</p>
    {/if}
</div>