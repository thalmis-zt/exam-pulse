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
    primary:         `${commonStyles} text-canvas-base-fixed bg-primary hover:bg-primary-hover`,
    primaryLight:       `${commonStyles} bg-primary-light  text-primary font-semibold hover:bg-primary-light-hover disabled:text-fg-muted`,
    secondary:         `${commonStyles} text-white bg-secondary hover:opacity-90`,
    secondaryLight:`${commonStyles} bg-secondary-light  text-success font-semibold hover:bg-seoondary-light-hover disabled:text-fg-muted`,
    // tertiary:        `${commonStyles} text-fg-muted bg-canvas border border-stroke hover:bg-stroke`,
    danger:          `${commonStyles} text-canvas-base-fixed bg-danger hover:opacity-90`,
    dangerLight: `${commonStyles} text-danger bg-danger-surface `,
    black:           `${commonStyles} text-white bg-fg`,
    flagged:        `${commonStyles} text-canvas-base-fixed bg-flagged hover:opacity-90 rounded-md font-semibold`,
    flaggedLight:   `${commonStyles} bg-canvas-base-fixed text-flagged border-2 border-flagged rounded-md font-semibold hover:bg-flagged-surface`,
    neutral: `${commonStyles} text-fg bg-canvas border border-stroke hover:opacity-90`,
    custom:          ``,
    ghost:           `${commonStyles} text-fg bg-canvas border border-stroke hover:bg-stroke`,
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
