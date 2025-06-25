/** @type {import('tailwindcss').Config} */
export default {
  // The 'content' array tells Tailwind CSS where to look for your utility classes.
  // It scans these files to generate the necessary CSS and purge unused styles.
  //
  // - './index.html': Includes any Tailwind classes used directly in your main HTML file.
  // - './src/**/*.{js,ts,jsx,tsx,svelte}': This is the most important part for a Svelte project.
  //   It tells Tailwind to look inside the 'src' directory for any JavaScript, TypeScript,
  //   JSX, TSX, and crucially, Svelte files (.svelte extension) to find and include
  //   all the Tailwind classes you're using in your components.
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,svelte}', // This line is crucial for Svelte files
    // You might also need to include flowbite-svelte's node_modules if you're using
    // their components directly which might have their own classes
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  // Add the darkMode configuration
  darkMode: 'class', // As provided in your snippet

  theme: {
    extend: {
      // Extend Tailwind's default colors with your custom primary palette
      colors: {
        primary: { // As provided in your snippet
          "50":"#eff6ff",
          "100":"#dbeafe",
          "200":"#bfdbfe",
          "300":"#93c5fd",
          "400":"#60a5fa",
          "500":"#3b82f6",
          "600":"#2563eb",
          "700":"#1d4ed8",
          "800":"#1e40af",
          "900":"#1e3a8a",
          "950":"#172554"
        }
      },
    },
    // Define custom font families, overriding or extending defaults
    fontFamily: { // As provided in your snippet
      'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [
    // You can add Tailwind CSS plugins here.
    // For example, if you need form styles or typography.
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};
