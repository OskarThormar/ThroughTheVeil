<script>
    import { onMount } from 'svelte';

    let allBotanicals = []; 
    let loading = true;
    let error = null;

    let craftingSlots = [null, null, null, null, null, null]; 

    $: elixirPreview = calculateElixirPreview(craftingSlots);

    async function fetchBotanicals() {
        loading = true;
        error = null;

        try {
            const response = await fetch('/api/materials/botanicals');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            allBotanicals = await response.json();
        } catch (e) {
            console.error("Failed to fetch botanicals:", e);
            error = e.message;
        } finally {
            loading = false;
        }
    }

    function addBotanicalToSlot(botanical) {
        const emptySlotIndex = craftingSlots.findIndex(slot => slot === null);
        if (emptySlotIndex !== -1) {
            craftingSlots = [...craftingSlots];
            craftingSlots[emptySlotIndex] = botanical;
        } else {
            console.log("All crafting slots are full!");
        }
    }

    function removeBotanicalFromSlot(index) {
        if (craftingSlots[index] !== null) {
            craftingSlots = [...craftingSlots];
            craftingSlots[index] = null;
        }
    }

    function calculateElixirPreview(slots) {
        let preview = {
            strength_bonus: 0,
            stamina_bonus: 0,
            endurance_bonus: 0,
            conditioning_bonus: 0,
            agility_bonus: 0,
            dexterity_bonus: 0,
            celerity_bonus: 0,
            grace_bonus: 0,
            intelligence_bonus: 0,
            acuity_bonus: 0,
            alacrity_bonus: 0,
            clarity_bonus: 0,
            essence_bonus: 0,
            spirit_bonus: 0,
            aura_bonus: 0,
            toughness_bonus: 0,
            armor_flat_bonus: 0,
            strength_percent_bonus: 0.0,
            agility_percent_bonus: 0.0,
            intelligence_percent_bonus: 0.0,
            active_effects: '', 
            total_ingredients: 0
        };

        let uniqueEffects = new Set();

        slots.forEach(botanical => {
            if (botanical) {
                preview.total_ingredients++;
                preview.strength_bonus += botanical.strength_bonus || 0;
                preview.stamina_bonus += botanical.stamina_bonus || 0;
                preview.endurance_bonus += botanical.endurance_bonus || 0;
                preview.conditioning_bonus += botanical.conditioning_bonus || 0;
                preview.agility_bonus += botanical.agility_bonus || 0;
                preview.dexterity_bonus += botanical.dexterity_bonus || 0;
                preview.celerity_bonus += botanical.celerity_bonus || 0;
                preview.grace_bonus += botanical.grace_bonus || 0;
                preview.intelligence_bonus += botanical.intelligence_bonus || 0;
                preview.acuity_bonus += botanical.acuity_bonus || 0;
                preview.alacrity_bonus += botanical.alacrity_bonus || 0;
                preview.clarity_bonus += botanical.clarity_bonus || 0;
                preview.essence_bonus += botanical.essence_bonus || 0;
                preview.spirit_bonus += botanical.spirit_bonus || 0;
                preview.aura_bonus += botanical.aura_bonus || 0;
                preview.toughness_bonus += botanical.toughness_bonus || 0;
                preview.armor_flat_bonus += botanical.armor_flat_bonus || 0;

                preview.strength_percent_bonus += botanical.strength_percent_bonus || 0.0;
                preview.agility_percent_bonus += botanical.agility_percent_bonus || 0.0;
                preview.intelligence_percent_bonus += botanical.intelligence_percent_bonus || 0.0;

                if (botanical.active_effect_text) {
                    uniqueEffects.add(botanical.active_effect_text);
                }
            }
        });

        preview.active_effects = Array.from(uniqueEffects).join(', ');

        return preview;
    }

    onMount(() => {
        fetchBotanicals();
    });
</script>

<div class="p-6 max-w-8xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10 mb-20">
    <h1 class="text-3xl font-bold mb-6 text-center text-teal-300">Elixir Crafting Station</h1>

    <div class="mb-8 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h2 class="text-2xl font-semibold mb-4 text-teal-300 text-center">Crafting Slots ({elixirPreview.total_ingredients}/6)</h2>
        <div class="flex flex-wrap justify-center gap-4">
            {#each craftingSlots as slot, index}
                <div class="w-48 h-32 bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-center relative overflow-hidden">
                    {#if slot}
                        <div class="text-center p-2">
                            <p class="font-semibold text-teal-200 text-lg leading-tight">{slot.name}</p>
                            <p class="text-gray-400 text-sm">{slot.rarity}</p>
                            <button
                                on:click={() => removeBotanicalFromSlot(index)}
                                class="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                aria-label="Remove ingredient"
                            >
                                &times;
                            </button>
                        </div>
                    {:else}
                        <p class="text-gray-500">Empty Slot</p>
                    {/if}
                </div>
            {/each}
        </div>
        <div class="mt-6 text-center">
            <button
                class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                disabled={elixirPreview.total_ingredients === 0}
            >
                Craft Elixir
            </button>
        </div>
    </div>

    <div class="mb-8 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h2 class="text-2xl font-semibold mb-4 text-teal-300">Elixir Preview</h2>
        {#if elixirPreview.total_ingredients === 0}
            <p class="text-gray-400 text-center">Add ingredients to see elixir properties.</p>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                {#if elixirPreview.strength_bonus > 0}<p><span class="font-medium">Strength:</span> +{elixirPreview.strength_bonus}</p>{/if}
                {#if elixirPreview.stamina_bonus > 0}<p><span class="font-medium">Stamina:</span> +{elixirPreview.stamina_bonus}</p>{/if}
                {#if elixirPreview.endurance_bonus > 0}<p><span class="font-medium">Endurance:</span> +{elixirPreview.endurance_bonus}</p>{/if}
                {#if elixirPreview.conditioning_bonus > 0}<p><span class="font-medium">Conditioning:</span> +{elixirPreview.conditioning_bonus}</p>{/if}
                {#if elixirPreview.agility_bonus > 0}<p><span class="font-medium">Agility:</span> +{elixirPreview.agility_bonus}</p>{/if}
                {#if elixirPreview.dexterity_bonus > 0}<p><span class="font-medium">Dexterity:</span> +{elixirPreview.dexterity_bonus}</p>{/if}
                {#if elixirPreview.celerity_bonus > 0}<p><span class="font-medium">Celerity:</span> +{elixirPreview.celerity_bonus}</p>{/if}
                {#if elixirPreview.grace_bonus > 0}<p><span class="font-medium">Grace:</span> +{elixirPreview.grace_bonus}</p>{/if}
                {#if elixirPreview.intelligence_bonus > 0}<p><span class="font-medium">Intelligence:</span> +{elixirPreview.intelligence_bonus}</p>{/if}
                {#if elixirPreview.acuity_bonus > 0}<p><span class="font-medium">Acuity:</span> +{elixirPreview.acuity_bonus}</p>{/if}
                {#if elixirPreview.alacrity_bonus > 0}<p><span class="font-medium">Alacrity:</span> +{elixirPreview.alacrity_bonus}</p>{/if}
                {#if elixirPreview.clarity_bonus > 0}<p><span class="font-medium">Clarity:</span> +{elixirPreview.clarity_bonus}</p>{/if}
                {#if elixirPreview.essence_bonus > 0}<p><span class="font-medium">Essence:</span> +{elixirPreview.essence_bonus}</p>{/if}
                {#if elixirPreview.spirit_bonus > 0}<p><span class="font-medium">Spirit:</span> +{elixirPreview.spirit_bonus}</p>{/if}
                {#if elixirPreview.aura_bonus > 0}<p><span class="font-medium">Aura:</span> +{elixirPreview.aura_bonus}</p>{/if}
                {#if elixirPreview.toughness_bonus > 0}<p><span class="font-medium">Toughness:</span> +{elixirPreview.toughness_bonus}</p>{/if}
                {#if elixirPreview.armor_flat_bonus > 0}<p><span class="font-medium">Armor:</span> +{elixirPreview.armor_flat_bonus}</p>{/if}

                {#if elixirPreview.strength_percent_bonus > 0}<p><span class="font-medium">Strength %:</span> +{elixirPreview.strength_percent_bonus}%</p>{/if}
                {#if elixirPreview.agility_percent_bonus > 0}<p><span class="font-medium">Agility %:</span> +{elixirPreview.agility_percent_bonus}%</p>{/if}
                {#if elixirPreview.intelligence_percent_bonus > 0}<p><span class="font-medium">Intelligence %:</span> +{elixirPreview.intelligence_percent_bonus}%</p>{/if}

                {#if elixirPreview.active_effects}<p class="col-span-1 md:col-span-2"><span class="font-medium">Effects:</span> {elixirPreview.active_effects}</p>{/if}
            </div>
        {/if}
    </div>

    <div class="p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h2 class="text-2xl font-semibold mb-4 text-teal-300">Available Botanicals</h2>
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
        {:else if allBotanicals.length === 0}
            <p class="text-center text-gray-400">No botanicals found.</p>
        {:else}
            <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each allBotanicals as item (item.id || item.name)}
                    <li class="bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-600 flex flex-col">
                        <h3 class="text-xl font-semibold text-teal-300">{item.name}</h3>
                        <p class="text-gray-400 text-sm mt-1 flex-1">{item.description}</p>
                        <div class="mt-2 text-gray-300 text-sm">
                            {#if item.rarity}<p><span class="font-medium">Rarity:</span> {item.rarity}</p>{/if}
                            {#if item.type}<p><span class="font-medium">Type:</span> {item.type}</p>{/if}
                            {#if item.strength_bonus > 0}<p>Str: +{item.strength_bonus}</p>{/if}
                            {#if item.agility_bonus > 0}<p>Agi: +{item.agility_bonus}</p>{/if}
                            {#if item.intelligence_bonus > 0}<p>Int: +{item.intelligence_bonus}</p>{/if}
                            {#if item.strength_percent_bonus > 0}<p>Str %: +{item.strength_percent_bonus}%</p>{/if}
                            {#if item.agility_percent_bonus > 0}<p>Agi %: +{item.agility_percent_bonus}%</p>{/if}
                            {#if item.intelligence_percent_bonus > 0}<p>Int %: +{item.intelligence_percent_bonus}%</p>{/if}
                            {#if item.armor_flat_bonus > 0}<p>Armor: +{item.armor_flat_bonus}</p>{/if}
                        </div>
                        <button
                            on:click={() => addBotanicalToSlot(item)}
                            class="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                            disabled={craftingSlots.includes(item)}
                        >
                            Add to Crafting
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>
