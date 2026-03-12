<script>
 
 
 let {
        btnType = 'primary',
        customClass = '',
        type = 'button',
        btnRef = $bindable(),
        children,
        ...restProps
    } = $props();


  // Define common styles and type-specific styles
  const commonStyles =
    "px-6 py-2 rounded-sm font-medium capitalize sm:text-sm text-xs text-nowrap text-center flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition duration-(--motion-fast) ease-(--ease-standard)";

  const typeStyles = {
    primary:         `${commonStyles} text-fg bg-primary hover:bg-primary-hover`,
    secondary:       `${commonStyles} bg-surface-card border border-stroke text-primary font-semibold hover:bg-canvas disabled:text-fg-muted`,
    tertiary:        `${commonStyles} text-fg-muted bg-canvas border border-stroke hover:bg-stroke`,
    danger:          `${commonStyles} text-fg bg-danger hover:opacity-90`,
    dangerSecondary: `${commonStyles} text-danger bg-danger-surface border border-danger`,
    success:         `${commonStyles} text-fg bg-success hover:opacity-90`,
    successSecondary:`${commonStyles} bg-surface-card border border-stroke text-success font-semibold hover:bg-canvas disabled:text-fg-muted`,
    custom:          ``,
  };
</script>

<button
  bind:this={btnRef}
  class={`${btnType === "custom" ? `${customClass}` : typeStyles[btnType] || typeStyles["primary"]} ${customClass}`}
  {type}
  {...restProps}
>
 {@render children?.()}
</button>
