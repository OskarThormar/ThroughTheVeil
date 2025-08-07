    import { defineConfig } from 'vite'
    import { svelte } from '@sveltejs/vite-plugin-svelte'
    import tailwindcss from '@tailwindcss/vite'
    import history from 'connect-history-api-fallback' // Import this middleware

    // https://vite.dev/config/
    export default defineConfig({
      plugins: [
        svelte(),
        tailwindcss()
      ],
      server: {
        // This is crucial for SPA history mode routing (clean URLs like /weapons)
        // It ensures requests for non-existent paths fall back to your index.html.
        configureServer: (app) => {
          app.use(history({
            index: '/index.html', // Path to your main HTML file
            // verbose: true // Uncomment for detailed logs in your console during debugging
          }));
        },
        proxy: {
          // Your existing backend API proxy
          '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            secure: false,
          },
        },
      },
    })
    