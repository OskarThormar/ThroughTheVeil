<script>
    import { onMount } from 'svelte'; 

    let shields = [];
    let loading = true;
    let error = null;

    let selectedSubtype = 'All';

    let uniqueSubtypes = [];

    $: filteredShields = shields.filter(item =>
        selectedSubtype === 'All' || item.subtype === selectedSubtype
    );

    async function fetchShields() {
        loading = true; 
        error = null;   

        try {
            const response = await fetch('/api/items/shields'); 

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }

            const fetchedData = await response.json();
            shields = fetchedData; 

            uniqueSubtypes = ['All', ...new Set(shields.map(item => item.subtype).filter(Boolean))];

        } catch (e) {
            console.error("Failed to fetch shields:", e);
            error = e.message; 
        } finally {
            loading = false; 
        }
    }

    onMount(() => {
        fetchShields(); 
    });
</script>

<div class="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-3xl font-bold mb-6 text-center text-teal-300">All Shields</h1>

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
        <p class="text-center text-gray-400">Loading shields...</p>
    {:else if error}
        <p class="text-center text-red-500">Error: {error}</p>
        <button
            on:click={fetchShields}
            class="mt-4 block mx-auto px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
        >
            Try Again
        </button>
    {:else if filteredShields.length === 0}
        <p class="text-center text-gray-400">No shields found matching the selected criteria.</p>
    {:else}
        <ul class="space-y-4">
            {#each filteredShields as item (item && item.id ? item.id : item.name || Math.random())}
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
                            {#if item.block_chance !== null}<p><span class="font-medium">Block Chance:</span> {item.block_chance}%</p>{/if}
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
