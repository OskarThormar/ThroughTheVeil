<script>
    import { onMount } from 'svelte';
    import { initFlowbite } from 'flowbite';


    onMount(() => {
        initFlowbite(); 
    });
    import { Router, Route } from 'svelte-routing';

    //components
    import Navbar from './components/Navbar/Navbar.svelte';
    import Footer from './components/Footer/Footer.svelte';

    //pages
    import HomePage from './components/Pages/HomePage/HomePage.svelte';
    import SimulatorPage from './components/Pages/SimulatorPage/SimulatorPage.svelte';

    import ItemsPage from './components/Pages/ItemsPage/ItemsPage.svelte';
    import WeaponsPage from './components/Pages/WeaponsPage/WeaponsPage.svelte';
    import ArmorPage from './components/Pages/ArmorPage/ArmorPage.svelte';
    import ShieldsPage from './components/Pages/ShieldsPage/ShieldsPage.svelte';

    import MechanicsPage from './components/Pages/MechanicsPage/MechanicsPage.svelte';
    import PsychicExpression from './components/Pages/PsychicExpressionPage/PsychicExpression.svelte';
    import ItemMechanics from './components/Pages/ItemMechanics/ItemMechanics.svelte';
    import ItemTypesMechanics from './components/Pages/ItemTypesMechanics/ItemTypesMechanics.svelte';
    import ItemWeaponTypesMechanics from './components/Pages/ItemWeaponTypesMechanics/ItemWeaponTypesMechanics.svelte';
    import ItemArmorTypesMechanics from './components/Pages/ItemArmorTypesMechanics/ItemArmorTypesMechanics.svelte';
    import ItemShieldTypesMechanics from './components/Pages/ItemShieldTypesMechanics/ItemShieldTypesMechanics.svelte';

    import ProfessionsPage from './components/Pages/ProfessionsPage/ProfessionsPage.svelte';

    import ProfessionsAlchemyPage from './components/Pages/ProfessionsPage/ProfessionsAlchemyPage/ProfessionsAlchemyPage.svelte';
    import ProfessionsAlchemyIngredientsPage from './components/Pages/ProfessionsPage/ProfessionsAlchemyPage/ProfessionsAlchemyIngredientsPage.svelte';
    import ProfessionsAlchemyCraftingToolPage from './components/Pages/ProfessionsPage/ProfessionsAlchemyPage/ProfessionsAlchemyCraftingToolPage.svelte';

    import ProfessionsBlacksmithingPage from './components/Pages/ProfessionsPage/ProfessionsBlacksmithingPage/ProfessionsBlacksmithingPage.svelte';
    import ProfessionsLeathercraftingPage from './components/Pages/ProfessionsPage/ProfessionsLeathercraftingPage/ProfessionsLeathercraftingPage.svelte';
    
    import ClassesPage from './components/Pages/ClassesPage/ClassesPage.svelte';


</script>

<Router>
<div class="relative min-h-screen flex flex-col bg-gray-950">


    <aside class="
        fixed top-0 left-0 z-50
        w-full h-16 bg-gray-800 shadow-md
        border-b border-gray-700
        md:h-screen md:w-64 md:flex md:flex-col
        md:border-r md:border-b-0
        ">
        <Navbar />
    </aside>

    <main class="
        flex-1 overflow-y-auto overflow-x-hidden
        top-[var(--navbar-mobile-height)] left-0 right-0 bottom-[var(--footer-height)]
        md:top-0 md:left-[var(--navbar-desktop-width)]

        px-0 py-0                        /* General padding for content on all sides */
        md:pt-0
        md:pb-12                          /* More vertical padding on desktop */
        md:px-8
        md:pr-0  
        md:pl-58
    ">

        <Route path="/"><HomePage /></Route>
        <Route path="/simulator"><SimulatorPage /></Route>

        <Route path="/items"><ItemsPage /></Route>
        <Route path="/items/weapons"><WeaponsPage /></Route>
        <Route path="/items/armor"><ArmorPage /></Route>
        <Route path="/items/shields"><ShieldsPage /></Route>

        <Route path="/mechanics"><MechanicsPage /></Route>
        <Route path="/mechanics/psychicexpression"><PsychicExpression /></Route>
        <Route path="/mechanics/items"><ItemMechanics /></Route>
        <Route path="/mechanics/itemtypes"><ItemTypesMechanics /></Route>       
        <Route path="/mechanics/items/weapontypes"><ItemWeaponTypesMechanics /></Route>  
        <Route path="/mechanics/items/armortypes"><ItemArmorTypesMechanics /></Route>  
        <Route path="/mechanics/items/shieldtypes"><ItemShieldTypesMechanics /></Route>
        
        <Route path="/professions"><ProfessionsPage /></Route>
        <Route path="/professions/alchemy"><ProfessionsAlchemyPage /></Route>
        <Route path="/professions/alchemy/ingredients"><ProfessionsAlchemyIngredientsPage /></Route>
        <Route path="/professions/alchemy/crafting"><ProfessionsAlchemyCraftingToolPage /></Route>
        <Route path="/professions/blacksmithing"><ProfessionsBlacksmithingPage /></Route>
        <Route path="/professions/leathercrafting"><ProfessionsLeathercraftingPage /></Route>

        <Route path="/classes"><ClassesPage /></Route>

    </main>

    <!-- Footer: Fixed at the bottom -->
    <footer class="
        fixed bottom-0 left-0 right-0 z-40
        w-full h-16 bg-gray-800 shadow-lg flex items-center justify-center
        border-t border-gray-700
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