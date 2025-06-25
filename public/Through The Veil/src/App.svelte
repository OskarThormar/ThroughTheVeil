<script>
    import { Router, Route } from 'svelte-routing';
    import Navbar from './components/pages/Navbar/Navbar.svelte'; // Adjust path if needed
    import WeaponsPage from './components/pages/WeaponsPage/WeaponsPage.svelte'; // Adjust path if needed
    import HomePage from './components/pages/HomePage/HomePage.svelte'; // Assuming this is your HomePage component path
    import Images from './assets/images/GGI.png';
    import Footer from './components/Footer/Footer.svelte';
    // Import any other page components you might have
</script>

<!-- The Router component must wrap all components that need routing context -->
<Router>
  <div class="min-h-screen bg-gray-950 flex flex-col"></div>
    <div class="min-h-screen bg-gray-950 flex flex-col md:flex-row">
        <!-- Navbar: This will always be visible -->
        <aside class="w-full md:w-64 bg-gray-800 shadow-md">
            <Navbar />
        </aside>

        <!-- Main content area where pages will be rendered by the router -->
        <main class="flex-1 container mx-auto px-4 py-8 md:ml-4">
            <!-- Define your routes using the Route component -->
            <!-- Route for the Home Page -->
            <Route path="/" component={HomePage} />

            <!-- Route for the Weapons Page -->
            <Route path="/weapons" component={WeaponsPage} />

            <!-- Add more Route components for other pages here -->
            <!-- Example: <Route path="/items" component={ItemsPage} /> -->
            <!-- Example: <Route path="/classes" component={ClassesPage} /> -->
            <!-- Example: <Route path="/mechanics" component={MechanicsPage} /> -->
            <!-- Example: <Route path="/professions" component={ProfessionsPage} /> -->
        </main>
        <!-- Footer: This will always be visible at the bottom -->
        <Footer />
    </div>
    
</Router>

<style>
    /* Global styles or specific App.svelte styles */
</style>
