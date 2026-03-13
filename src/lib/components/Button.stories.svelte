<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';
  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      btnType: {
        control: 'select',
        options: ['primary', 'primaryLight', 'danger', 'dangerLight', 'secondary', 'secondaryLight', 'custom'],
        description: 'Visual variant of the button',
        table: { defaultValue: { summary: 'primary' } },
      },
      type: {
        control: 'select',
        options: ['button', 'submit', 'reset'],
        description: 'Native button type attribute',
        table: { defaultValue: { summary: 'button' } },
      },
      disabled: {
        control: 'boolean',
        description: 'Disabled state',
        table: { defaultValue: { summary: false } },
      },
      customClass: {
        control: 'text',
        description: 'Extra Tailwind classes (used with btnType="custom" or as additions)',
      },
    },
    args: {
      disabled: false,
    },
  });
</script>

<Story name="Primary" args={{ btnType: 'primary' }}>Click me</Story>

<Story name="Primary Light" args={{ btnType: 'primaryLight' }}>Click me</Story>

<Story name="Secondary" args={{ btnType: 'secondary' }}>Click me</Story>

<Story name="Secondary Light" args={{ btnType: 'secondaryLight' }}>Click me</Story>

<Story name="Danger" args={{ btnType: 'danger' }}>Click me</Story>

<Story name="Danger Light" args={{ btnType: 'dangerLight' }}>Click me</Story>

<Story name="Disabled" args={{ btnType: 'primary', disabled: true }}>Disabled</Story>

