<script>
    let { title, subtitle = '', showAll = false, onViewAll, variant = 'lg' } = $props();

    // use lg for page headers, md for section headers
    const variantClasses = {
        sm: {
            title: 'text-sm font-semibold text-fg',
            subtitle: 'text-xs text-fg-muted',
            button: 'text-xs font-medium'
        },
        md: {
            title: 'text-sm sm:text-base font-bold text-fg',
            subtitle: 'text-sm text-fg-muted',
            button: 'text-sm font-medium'
        },
        lg: {
            title: 'text-base sm:text-lg font-bold text-fg',
            subtitle: 'text-sm text-fg-muted',
            button: 'text-sm font-medium'
        }
    };

    const classes = $derived(variantClasses[variant] || variantClasses.lg);
</script>

<div class="flex flex-col">
    <div class="flex items-center justify-between">
        <h2 class={classes.title}>{title}</h2>
        {#if showAll}
            <button
                onclick={onViewAll}
                class="{classes.button} text-primary flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
            >
                All ›
            </button>
        {/if}
    </div>
    {#if subtitle}
        <p class={classes.subtitle}>{subtitle}</p>
    {/if}
</div>