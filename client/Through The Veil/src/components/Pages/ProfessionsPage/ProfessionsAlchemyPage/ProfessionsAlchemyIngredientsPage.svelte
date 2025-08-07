<script>
    import { onMount } from 'svelte'; // Imports Svelte's lifecycle function 'onMount'

    let botanicals = []; // Stores all fetched botanicals
    let loading = true;
    let error = null;

    // Function to fetch botanical materials
    async function fetchBotanicals() {
        loading = true; // Set loading to true before fetching
        error = null;    // Clear any previous errors

        try {
            // Make a GET request to the backend API endpoint for 'Botanical' category.
            const response = await fetch('/api/materials/botanicals');

            // Check if the request was successful (status code 2xx)
            if (!response.ok) {
                // If not successful, throw an error with the status text
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }

            // Parse the JSON response
            const fetchedData = await response.json();
            botanicals = fetchedData; // Assign fetched data to the 'botanicals' array

        } catch (e) {
            // Catch any errors that occur during the fetch operation
            console.error("Failed to fetch botanicals:", e);
            error = e.message; // Store the error message to display to the user
        } finally {
            loading = false; // Set loading to false once the fetch operation is complete
        }
    }

    // Call fetchBotanicals when the component is first mounted
    onMount(() => {
        fetchBotanicals();
    });

    // Reactive declarations for each rarity level
    $: noviceBotanicals = botanicals.filter(item => item.rarity === 'Novice');
    $: apprenticeBotanicals = botanicals.filter(item => item.rarity === 'Apprentice');
    $: experiencedBotanicals = botanicals.filter(item => item.rarity === 'Experienced');
    $: expertBotanicals = botanicals.filter(item => item.rarity === 'Expert');
    $: masterBotanicals = botanicals.filter(item => item.rarity === 'Master');
</script>

<!-- Main content area, adjusted for sidebar -->
<!-- On small screens (sm) and larger, it shifts right by 64 units (matching a 64-unit wide sidebar) -->
<!-- Added 'w-full' to make the content area take up the full available width after the margin -->
<!-- Added 'pr-0' to remove padding on the right side, allowing content to extend to the edge -->
<div class="p-6 pr-0 font-sans w-full">
    <div class="flex flex-wrap justify-center gap-2">
        <!-- Novice Botanicals Section -->
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

        <!-- Apprentice Botanicals Section -->
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

        <!-- Experienced Botanicals Section -->
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

        <!-- Expert Botanicals Section -->
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

        <!-- Master Botanicals Section -->
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
