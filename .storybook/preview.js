import '../src/app.css'; // pull in your design tokens

/** @param {import('@storybook/sveltekit').StoryContext} context */
const withTheme = (Story, context) => {
  const theme = context.globals.theme ?? 'light';
  document.documentElement.setAttribute('data-theme', theme);
  return Story();
};

/** @type { import('@storybook/sveltekit').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
};

export const decorators = [withTheme];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
    },
  },
};

export default preview;