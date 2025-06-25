<script>
    // Import Flowbite's JavaScript initialization for interactive components
  import { onMount } from 'svelte';
  import { initFlowbite } from 'flowbite';


  onMount(() => {
    initFlowbite(); // Initialize Flowbite components when the page mounts
  });
    // Import any other page components you might have
  import { Router, Route } from 'svelte-routing';

  //components
    import Navbar from './components/Navbar/Navbar.svelte';
    import Footer from './components/Footer/Footer.svelte';

  //pages
  import WeaponsPage from './components/pages/WeaponsPage/WeaponsPage.svelte'; // Adjust path if needed
  import HomePage from './components/pages/HomePage/HomePage.svelte'; // Assuming this is your HomePage component path


    // Define constants for navbar and footer heights/widths to use for padding/margins
    // These values should align with the actual height/width of your Navbar and Footer components
    const NAVBAR_MOBILE_HEIGHT = '4rem'; // Example: h-16 (64px) roughly
    const NAVBAR_DESKTOP_WIDTH = '16rem'; // Example: w-64 (256px)
    const FOOTER_HEIGHT = '4rem'; // Example: A typical footer height

</script>
<!-- The Router component must wrap all components that need routing context -->
<Router>
    <!-- Main container for the whole application -->
    <!-- This container will manage the overall fixed layout -->
    <div class="relative min-h-screen flex flex-col bg-gray-950">

        <!-- Navbar: Fixed at the top for mobile, fixed to the left for desktop -->
        <!-- On small screens, it takes full width and sits at the top -->
        <!-- On medium screens and up, it becomes a fixed sidebar on the left -->
        <aside class="
            fixed top-0 left-0 z-50
            w-full h-16 bg-gray-700 shadow-md /* Reverted to bg-gray-800 for a neutral grey */
            border-b border-gray-700 /* Added bottom border for mobile */
            md:h-screen md:w-64 md:flex md:flex-col
            md:border-r md:border-b-0 /* Added right border for desktop, removed bottom border */
            ">
            <Navbar />
        </aside>

        <!-- Main content area -->
        <!-- This div will contain the actual page content and be independently scrollable. -->
        <!-- It needs padding/margin to prevent content from being obscured by the fixed Navbar/Footer. -->
        <main class="
            flex-1 overflow-y-auto
            pt-[var(--navbar-mobile-height)] pb-[var(--footer-height)]
            md:pl-[var(--navbar-desktop-width)] md:pt-0 md:pb-[var(--footer-height)]
            container mx-auto px-4 py-8
        ">
            <!-- Define your routes using the Route component -->
            <Route path="/" component={HomePage} />
            <Route path="/weapons" component={WeaponsPage} />
        </main>

        <!-- Footer: Fixed at the bottom -->
        <footer class="
            fixed bottom-0 left-0 right-0 z-40
            w-full h-16 bg-gray-800 shadow-lg flex items-center justify-center
        ">
            <Footer />
        </footer>
    </div>
</Router>

<style>
    /*
      Define CSS variables for consistent spacing.
      These can be used in Tailwind's arbitrary value syntax like pt-[var(--variable-name)].
      Adjust these values to match the actual rendered height/width of your Navbar and Footer.
    */
    :root {
        --navbar-mobile-height: v-bind(NAVBAR_MOBILE_HEIGHT);
        --navbar-desktop-width: v-bind(NAVBAR_DESKTOP_WIDTH);
        --footer-height: v-bind(FOOTER_HEIGHT);
    }

    /* Additional styles for main content area if needed */
    main {
        /* On desktop, the main content should be pushed to the right of the fixed sidebar.
           On mobile, it's pushed down by the fixed top navbar. */
        margin-top: var(--navbar-mobile-height); /* For mobile */
        margin-left: 0; /* Default for mobile */
    }

    @media (min-width: 768px) { /* Tailwind's 'md' breakpoint */
        main {
            margin-top: 0; /* No top margin needed on desktop as navbar is on the side */
            margin-left: var(--navbar-desktop-width); /* Push content right of sidebar */
        }
    }
</style>