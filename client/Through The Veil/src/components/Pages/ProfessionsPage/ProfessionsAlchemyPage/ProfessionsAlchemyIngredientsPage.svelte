<script>
    import { onMount } from 'svelte'; 

    let botanicals = []; 
    let loading = true;
    let error = null;

    async function fetchBotanicals() {
        loading = true; 
        error = null;    

        try {
            const response = await fetch('/api/materials/botanicals');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }

            const fetchedData = await response.json();

        } catch (e) {
            console.error("Failed to fetch botanicals:", e);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        fetchBotanicals();
    });

    $: noviceBotanicals = botanicals.filter(item => item.rarity === 'Novice');
    $: apprenticeBotanicals = botanicals.filter(item => item.rarity === 'Apprentice');
    $: experiencedBotanicals = botanicals.filter(item => item.rarity === 'Experienced');
    $: expertBotanicals = botanicals.filter(item => item.rarity === 'Expert');
    $: masterBotanicals = botanicals.filter(item => item.rarity === 'Master');
</script>

<div class="p-6 pr-0 font-sans w-full">
    <div class="flex flex-wrap justify-center gap-2">
        <div class="p-6 bg-gray-900 text-white rounded-xl shadow-lg flex-1 min-w-[280px] max-w-xs">
            <h1 class="text-2xl font-bold mb-6 text-center text-teal-300">Novice Botanicals</h1>
            {#if loading}
                <p class="text-center text-gray-400">Loading botanicals...</p>
            {:else if error}
                <p class="text-center text-red-500">Error: {error}</p>
                <button
                    on:click={fetchBotanicals}
                    class="mt-4 block mx-auto px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                >
                    Try Again
                </button>
            {:else if noviceBotanicals.length === 0}
                <p class="text-center text-gray-400">No novice botanicals found.</p>
            {:else}
                <ul class="space-y-4">
                    {#each noviceBotanicals as item (item && item.id ? item.id : item.name || Math.random())}
                        {#if item}
                            <li class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                                <h2 class="text-xl font-semibold text-teal-300">{item.name}</h2>
                            </li>
                        {/if}
                    {/each}
                </ul>
            {/if}
        </div>

        <div class="p-6 bg-gray-900 text-white rounded-xl shadow-lg flex-1 min-w-[280px] max-w-xs">
            <h1 class="text-2xl font-bold mb-6 text-center text-teal-300">Apprentice Botanicals</h1>
            {#if loading}
                <p class="text-center text-gray-400">Loading botanicals...</p>
            {:else if error}
                <p class="text-center text-red-500">Error: {error}</p>
                <button
                    on:click={fetchBotanicals}
                    class="mt-4 block mx-auto px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                >
                    Try Again
                </button>
            {:else if apprenticeBotanicals.length === 0}
                <p class="text-center text-gray-400">No apprentice botanicals found.</p>
            {:else}
                <ul class="space-y-4">
                    {#each apprenticeBotanicals as item (item && item.id ? item.id : item.name || Math.random())}
                        {#if item}
                            <li class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                                <h2 class="text-xl font-semibold text-teal-300">{item.name}</h2>
                            </li>
                        {/if}
                    {/each}
                </ul>
            {/if}
        </div>

        <div class="p-6 bg-gray-900 text-white rounded-xl shadow-lg flex-1 min-w-[280px] max-w-xs">
            <h1 class="text-2xl font-bold mb-6 text-center text-teal-300">Experienced Botanicals</h1>
            {#if loading}
                <p class="text-center text-gray-400">Loading botanicals...</p>
            {:else if error}
                <p class="text-center text-red-500">Error: {error}</p>
                <button
                    on:click={fetchBotanicals}
                    class="mt-4 block mx-auto px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                >
                    Try Again
                </button>
            {:else if experiencedBotanicals.length === 0}
                <p class="text-center text-gray-400">No experienced botanicals found.</p>
            {:else}
                <ul class="space-y-4">
                    {#each experiencedBotanicals as item (item && item.id ? item.id : item.name || Math.random())}
                        {#if item}
                            <li class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                                <h2 class="text-xl font-semibold text-teal-300">{item.name}</h2>
                            </li>
                        {/if}
                    {/each}
                </ul>
            {/if}
        </div>

        <div class="p-6 bg-gray-900 text-white rounded-xl shadow-lg flex-1 min-w-[280px] max-w-xs">
            <h1 class="text-2xl font-bold mb-6 text-center text-teal-300">Expert Botanicals</h1>
            {#if loading}
                <p class="text-center text-gray-400">Loading botanicals...</p>
            {:else if error}
                <p class="text-center text-red-500">Error: {error}</p>
                <button
                    on:click={fetchBotanicals}
                    class="mt-4 block mx-auto px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                >
                    Try Again
                </button>
            {:else if expertBotanicals.length === 0}
                <p class="text-center text-gray-400">No expert botanicals found.</p>
            {:else}
                <ul class="space-y-4">
                    {#each expertBotanicals as item (item && item.id ? item.id : item.name || Math.random())}
                        {#if item}
                            <li class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                                <h2 class="text-xl font-semibold text-teal-300">{item.name}</h2>
                            </li>
                        {/if}
                    {/each}
                </ul>
            {/if}
        </div>

        <div class="p-6 bg-gray-900 text-white rounded-xl shadow-lg flex-1 min-w-[280px] max-w-xs">
            <h1 class="text-2xl font-bold mb-6 text-center text-teal-300">Master Botanicals</h1>
            {#if loading}
                <p class="text-center text-gray-400">Loading botanicals...</p>
            {:else if error}
                <p class="text-center text-red-500">Error: {error}</p>
                <button
                    on:click={fetchBotanicals}
                    class="mt-4 block mx-auto px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                >
                    Try Again
                </button>
            {:else if masterBotanicals.length === 0}
                <p class="text-center text-gray-400">No master botanicals found.</p>
            {:else}
                <ul class="space-y-4">
                    {#each masterBotanicals as item (item && item.id ? item.id : item.name || Math.random())}
                        {#if item}
                            <li class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                                <h2 class="text-xl font-semibold text-teal-300">{item.name}</h2>
                            </li>
                        {/if}
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
</div>
