<script>
    import { onMount } from 'svelte';

    let weapons = []; // Renamed from 'items' for clarity
    let loading = true;
    let error = null;

    // Function to fetch weapon items specifically
    async function fetchWeapons() {
        loading = true; // Set loading to true before fetching
        error = null;   // Clear any previous errors

        try {
            // Make a GET request to the backend API endpoint for 'Weapon' category
            const response = await fetch('/api/items/Weapon');

            // Check if the request was successful (status code 2xx)
            if (!response.ok) {
                // If not successful, throw an error with the status text
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }

            // Parse the JSON response
            weapons = await response.json();
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
    {:else if weapons.length === 0}
        <p class="text-center text-gray-400">No weapons found in the database.</p>
    {:else}
        <ul class="space-y-4">
            {#each weapons as item (item.id)}
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
            {/each}
        </ul>
    {/if}
</div>

<style>
    /* TailwindCSS is loaded via CDN in the HTML wrapper for Canvas,
       so most styling uses Tailwind classes directly in the markup. */
</style>
