<script>
    import { onMount } from 'svelte'; 

    let armor = [];
    let loading = true;
    let error = null;

    let selectedSubtype = 'All';

    let uniqueSubtypes = [];

    $: filteredArmor = armor.filter(item =>
        selectedSubtype === 'All' || item.subtype === selectedSubtype
    );

    async function fetchArmor() {
        loading = true; 
        error = null;  

        try {
            const response = await fetch('/api/items/armor'); 

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }

            const fetchedData = await response.json();
            armor = fetchedData;

            uniqueSubtypes = ['All', ...new Set(armor.map(item => item.subtype).filter(Boolean))];

        } catch (e) {
            console.error("Failed to fetch armor:", e);
            error = e.message; 
        } finally {
            loading = false; 
        }
    }

    onMount(() => {
        fetchArmor(); 
    });
</script>

<div class="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-3xl font-bold mb-6 text-center text-teal-300">All Armor</h1>

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

    {#if loading}
        <p class="text-center text-gray-400">Loading armor...</p>
    {:else if error}
        <p class="text-center text-red-500">Error: {error}</p>
        <button
            on:click={fetchArmor}
            class="mt-4 block mx-auto px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
        >
            Try Again
        </button>
    {:else if filteredArmor.length === 0}
        <p class="text-center text-gray-400">No armor found matching the selected criteria.</p>
    {:else}
        <ul class="space-y-4">
            {#each filteredArmor as item (item && item.id ? item.id : item.name || Math.random())}
                {#if item}
                    <li class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                        <h2 class="text-xl font-semibold text-teal-300">{item.name}</h2>
                        <p class="text-gray-400 text-sm mt-1">{item.description}</p>
                        <div class="mt-2 text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {#if item.type}<p><span class="font-medium">Type:</span> {item.type}</p>{/if}
                            {#if item.subtype}<p><span class="font-medium">Subtype:</span> {item.subtype}</p>{/if}
                            {#if item.archetype}<p><span class="font-medium">Archetype:</span> {item.archetype}</p>{/if}
                            {#if item.rarity}<p><span class="font-medium">Rarity:</span> {item.rarity}</p>{/if}
                            {#if item.defense !== null}<p><span class="font-medium">Defense:</span> {item.defense}</p>{/if}
                            {#if item.magic_resistance !== null}<p><span class="font-medium">Magic Resistance:</span> {item.magic_resistance}</p>{/if}
                            {#if item.weight !== null}<p><span class="font-medium">Weight:</span> {item.weight}</p>{/if}
                            {#if item.strength_requirement !== null}<p><span class="font-medium">Str Req:</span> {item.strength_requirement}</p>{/if}
                            {#if item.agility_requirement !== null}<p><span class="font-medium">Agi Req:</span> {item.agility_requirement}</p>{/if}
                            {#if item.intelligence_requirement !== null}<p><span class="font-medium">Int Req:</span> {item.intelligence_requirement}</p>{/if}
                            {#if item.active_effects}<p><span class="font-medium">Effects:</span> {item.active_effects}</p>{/if}
                            {#if item.enchantment}<p><span class="font-medium">Enchantment:</span> {item.enchantment}</p>{/if}
                            {#if item.lore_text}<p class="col-span-1 md:col-span-2"><span class="font-medium">Lore:</span> {item.lore_text}</p>{/if}
                        </div>
                    </li>
                {/if}
            {/each}
        </ul>
    {/if}
</div>

<style>
    
</style>
