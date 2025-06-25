<!-- src/routes/+layout.svelte -->
<script>
  // Import your global CSS (which should contain Tailwind and Flowbite base styles)
  import '../app.css';

  // Import Flowbite's JavaScript initialization for interactive components
  import { onMount } from 'svelte';
  import { initFlowbite } from 'flowbite';

  // Import your Navbar component
  import Navbar from '../components/pages/Navbar/Navbar.svelte';

  onMount(() => {
    initFlowbite(); // Initialize Flowbite components when the page mounts
  });
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
  <Navbar />
  <main class="flex-grow p-4 md:p-8">
    <!-- This is where the content of your specific pages (+page.svelte files) will be rendered -->
    <slot />
  </main>
</div>
