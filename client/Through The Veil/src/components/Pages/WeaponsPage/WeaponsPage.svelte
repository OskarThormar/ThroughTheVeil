<script>
    import { onMount } from 'svelte'; // Imports Svelte's lifecycle function 'onMount'

    let weapons = []; // Stores all fetched weapons of type 'Weapon'
    let loading = true;
    let error = null;

    // New state for the selected subtype from the dropdown.
    // 'All' is the default option to show all weapons initially.
    let selectedSubtype = 'All';

    // New state to hold unique subtypes extracted from fetched weapons, for dropdown options.
    let uniqueSubtypes = [];

    // Reactive declaration: filteredWeapons will automatically re-calculate whenever
    // 'weapons' or 'selectedSubtype' changes.
    $: filteredWeapons = weapons.filter(item =>
        selectedSubtype === 'All' || item.subtype === selectedSubtype
    );

    // Function to fetch weapon items
    async function fetchWeapons() {
        loading = true; // Set loading to true before fetching
        error = null;   // Clear any previous errors

        try {
            // Make a GET request to the backend API endpoint for 'Weapon' category.
            // This path '/api/items/weapons' should match your backend router definition.
            const response = await fetch('/api/items/weapons'); 

            // Check if the request was successful (status code 2xx)
            if (!response.ok) {
                // If not successful, throw an error with the status text
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }

            // Parse the JSON response
            const fetchedData = await response.json();
            weapons = fetchedData; // Assign fetched data to the 'weapons' array

            // After fetching, extract unique subtypes for the dropdown.
            // 'filter(Boolean)' removes any null or undefined subtypes.
            // 'Set' ensures only unique values.
            // We add 'All' as the first option for the dropdown.
            uniqueSubtypes = ['All', ...new Set(weapons.map(item => item.subtype).filter(Boolean))];

        } catch (e) {
            // Catch any errors that occur during the fetch operation
            console.error("Failed to fetch weapons:", e);
            error = e.message; // Store the error message to display to the user
        } finally {
            loading = false; // Set loading to false once the fetch operation is complete
        }
    }

    // Call fetchWeapons when the component is first mounted
    onMount(() => {
        fetchWeapons(); 
    });
</script>

<div class="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-3xl font-bold mb-6 text-center text-teal-300">All Weapons</h1>
    <!-- Changed heading to "All Weapons" for clarity -->

    <!-- Dropdown Menu for Subtype Filtering -->
    <div class="mb-8 p-4 bg-gray-800 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <label for="subtype-select" class="text-lg font-semibold text-gray-300 mr-2">Filter by Subtype:</label>
        <select
            id="subtype-select"
            class="block w-full sm:w-auto p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
            bind:value={selectedSubtype}
        >
            {#each uniqueSubtypes as subtype}
                <option value={subtype}>{subtype}</option>
            {/each}
        </select>
    </div>

    <!-- Conditional Rendering for Loading, Error, or No Weapons -->
    {#if loading}
        <p class="text-center text-gray-400">Loading weapons...</p>
    {:else if error}
        <p class="text-center text-red-500">Error: {error}</p>
        <button
            on:click={fetchWeapons}
            class="mt-4 block mx-auto px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
        >
            Try Again
        </button>
    {:else if filteredWeapons.length === 0}
        <p class="text-center text-gray-400">No weapons found matching the selected criteria.</p>
    {:else}
        <!-- Display Filtered Weapons -->
        <ul class="space-y-4">
            {#each filteredWeapons as item (item && item.id ? item.id : item.name || Math.random())}
                {#if item}
                    <li class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                        <h2 class="text-xl font-semibold text-teal-300">{item.name}</h2>
                        <p class="text-gray-400 text-sm mt-1">{item.description}</p>
                        <div class="mt-2 text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {#if item.type}<p><span class="font-medium">Type:</span> {item.type}</p>{/if}
                            {#if item.subtype}<p><span class="font-medium">Subtype:</span> {item.subtype}</p>{/if}
                            {#if item.archetype}<p><span class="font-medium">Archetype:</span> {item.archetype}</p>{/if}
                            {#if item.rarity}<p><span class="font-medium">Rarity:</span> {item.rarity}</p>{/if}
                            {#if item.dps !== null}<p><span class="font-medium">DPS:</span> {item.dps}</p>{/if}
                            {#if item.speed !== null}<p><span class="font-medium">Speed:</span> {item.speed}</p>{/if}
                            {#if item.strength_requirement !== null}<p><span class="font-medium">Str Req:</span> {item.strength_requirement}</p>{/if}
                            {#if item.agility_requirement !== null}<p><span class="font-medium">Agi Req:</span> {item.agility_requirement}</p>{/if}
                            {#if item.intelligence_requirement !== null}<p><span class="font-medium">Int Req:</span> {item.intelligence_requirement}</p>{/if}
                            {#if item.active_effects}<p><span class="font-medium">Effects:</span> {item.active_effects}</p>{/if}
                            {#if item.enchantment}<p><span class="font-medium">Enchantment:</span> {item.enchantment}</p>{/if}
                            {#if item.weapon_oil}<p><span class="font-medium">Weapon Oil:</span> {item.weapon_oil}</p>{/if}
                            {#if item.lore_text}<p class="col-span-1 md:col-span-2"><span class="font-medium">Lore:</span> {item.lore_text}</p>{/if}
                        </div>
                    </li>
                {/if}
            {/each}
        </ul>
    {/if}
</div>

<style>
    /* TailwindCSS is loaded via CDN in the HTML wrapper for Canvas,
       so most styling uses Tailwind classes directly in the markup. */
</style>
