<script>
    import { onMount } from 'svelte';
  import MechanicsPage from '../../MechanicsPage/MechanicsPage.svelte';

    // Stores all fetched materials, categorized by type
    let allSkinnings = [];
    let allVendorMaterials = []; // For stitchings and rivets
    let allTailoringPaddings = [];
    let allDrops = [];
    let loading = true;
    let error = null;

    // Array to hold materials selected for crafting (up to 9 slots)
    // Each element will hold a material object or null
    let craftingSlots = [null, null, null, null, null, null, null, null, null];

    // Reactive declaration for the elixir preview.
    // This will automatically re-calculate whenever craftingSlots changes.
    $: leathercraftingPreview = calculateLeathercraftingPreview(craftingSlots);

    /**
     * Fetches all material types from their respective API endpoints.
     * Assigns a 'type' property to each material for slot validation.
     */
    async function fetchMaterials() {
        loading = true;
        error = null;

        try {
            // Fetch skinnings
            const skinningsResponse = await fetch('/api/materials/skinnings');
            if (!skinningsResponse.ok) {
                throw new Error(`HTTP error fetching skinnings! status: ${skinningsResponse.status}`);
            }
            allSkinnings = (await skinningsResponse.json()).map(item => ({ ...item, type: 'skinning' }));

            const tailoringResponse = await fetch('/api/professions/tailoring/padding');
            if (!tailoringResponse.ok) {
                throw new Error(`HTTP error fetching tailoring. status: ${tailoringResponse.status}`);
            }
            allTailoringPaddings = (await tailoringResponse.json()).map(item => ({... item, type: 'padding'}));

            // Fetch vendor materials (stitchings and rivets)
            const vendorResponse = await fetch('/api/materials/vendor');
            if (!vendorResponse.ok) {
                throw new Error(`HTTP error fetching vendor materials! status: ${vendorResponse.status}`);
            }
            // Assuming vendor materials will have a 'subtype' or 'name' that indicates 'stitching' or 'rivet'
            // For simplicity, we'll assign 'stitching' or 'rivet' directly as the type based on name, or a generic 'vendor' if not specific
            allVendorMaterials = (await vendorResponse.json()).map(item => {
                let type = 'vendor'; // Default type
                if (item.name && item.name.toLowerCase().includes('stitching')) {
                    type = 'stitching';
                } else if (item.name && item.name.toLowerCase().includes('rivet')) {
                    type = 'rivet';
                } else if (item.name && item.name.toLowerCase().includes('padding')) {
                    type = 'padding';
                }

                return { ...item, type };
            });

            // Fetch drops
            const dropsResponse = await fetch('/api/materials/drops');
            if (!dropsResponse.ok) {
                throw new Error(`HTTP error fetching drops! status: ${dropsResponse.status}`);
            }
            allDrops = (await dropsResponse.json()).map(item => ({ ...item, type: 'drop' }));

        } catch (e) {
            console.error("Failed to fetch materials:", e);
            error = e.message;
        } finally {
            loading = false;
        }
    }

    /**
     * Adds an item to the next available crafting slot, respecting slot type restrictions.
     * @param {Object} item The material item to add.
     */
    function addItemToSlot(item) {
        // Find the first empty slot that is valid for this item type
        const emptyValidSlotIndex = craftingSlots.findIndex((slot, index) => {
            if (slot === null) {
                if ((index === 0 || index === 1 || index === 2) && item.type === 'skinning') {
                    return true;
                }
                if ((index === 2 || index === 3) && (item.type === 'stitching' || item.type === 'rivet')) {
                    return true;
                }
                if ((index === 4 || index === 5) && item.type === 'drop') {
                    return true;
                }
            }
            return false;
        });

        if (emptyValidSlotIndex !== -1) {
            // Create a new array to trigger Svelte's reactivity
            craftingSlots = [...craftingSlots];
            craftingSlots[emptyValidSlotIndex] = item;
        } else {
            // Optional: Provide user feedback if no valid slots are available
            console.log(`No valid crafting slot available for ${item.name} (${item.type}) or all slots are full!`);
            // You could add a simple message box here instead of console.log
        }
    }

    /**
     * Removes an item from a specific crafting slot.
     * @param {number} index The index of the slot to clear.
     */
    function removeItemFromSlot(index) {
        if (craftingSlots[index] !== null) {
            // Create a new array to trigger Svelte's reactivity
            craftingSlots = [...craftingSlots];
            craftingSlots[index] = null;
        }
    }

    /**
     * Checks if a given item can be added to any valid, empty crafting slot.
     * Used to enable/disable the "Add to Crafting" buttons.
     * @param {Object} item The material item to check.
     * @returns {boolean} True if the item can be added to a valid slot, false otherwise.
     */
    function canAddItemToAnyValidSlot(item) {
        return craftingSlots.some((slot, index) => {
            if (slot === null) {
                if ((index === 0 || index === 1 || index === 2) && item.type === 'skinning') {
                    return true;
                }
                if ((index === 3) && (item.type === 'stitching')) {
                    return true;
                }
                if ((index === 4) && (item.type === 'rivet')) {
                    return true;
                }
                if ((index === 5) && (item.type === 'padding')) {
                    return true;
                }
                if ((index === 6 || index === 7 || index === 8) && item.subtype === '') {
                    return true;
                }
            }
            return false;
        });
    }

    /**
     * Calculates the combined properties of the elixir based on items in crafting slots.
     * @param {Array<Object|null>} slots The array of crafting slot items.
     * @returns {Object} An object representing the combined elixir properties.
     */
    function calculateLeathercraftingPreview(slots) {
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

        let uniqueEffects = new Set(); // Use a temporary Set to collect unique effects

        slots.forEach(item => {
            if (item) {
                preview.total_ingredients++;
                // Sum up flat bonuses
                preview.strength_bonus += item.strength_bonus || 0;
                preview.stamina_bonus += item.stamina_bonus || 0;
                preview.endurance_bonus += item.endurance_bonus || 0;
                preview.conditioning_bonus += item.conditioning_bonus || 0;
                preview.agility_bonus += item.agility_bonus || 0;
                preview.dexterity_bonus += item.dexterity_bonus || 0;
                preview.celerity_bonus += item.celerity_bonus || 0;
                preview.grace_bonus += item.grace_bonus || 0;
                preview.intelligence_bonus += item.intelligence_bonus || 0;
                preview.acuity_bonus += item.acuity_bonus || 0;
                preview.alacrity_bonus += item.alacrity_bonus || 0;
                preview.clarity_bonus += item.clarity_bonus || 0;
                preview.essence_bonus += item.essence_bonus || 0;
                preview.spirit_bonus += item.spirit_bonus || 0;
                preview.aura_bonus += item.aura_bonus || 0;
                preview.toughness_bonus += item.toughness_bonus || 0;
                preview.armor_flat_bonus += item.armor_flat_bonus || 0;

                // Sum up percentage bonuses
                preview.strength_percent_bonus += item.strength_percent_bonus || 0.0;
                preview.agility_percent_bonus += item.agility_percent_bonus || 0.0;
                preview.intelligence_percent_bonus += item.intelligence_percent_bonus || 0.0;

                // Add active effects to the temporary Set
                if (item.active_effect_text) {
                    uniqueEffects.add(item.active_effect_text);
                }
            }
        });

        // Convert the temporary Set of effects to a comma-separated string for display
        preview.active_effects = Array.from(uniqueEffects).join(', ');

        return preview;
    }

    // Call fetchMaterials when the component is first mounted
    onMount(() => {
        fetchMaterials();
    });
</script>

<div class="p-6 max-w-8xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10 mb-20 font-inter">
    <h1 class="text-3xl font-bold mb-6 text-center text-teal-300">Elixir Crafting Station</h1>

    <!-- Crafting Slots Section -->
    <div class="mb-8 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h2 class="text-2xl font-semibold mb-4 text-teal-300 text-center">
            Crafting Slots ({leathercraftingPreview.total_ingredients}/6)
        </h2>
        <div class="flex flex-wrap justify-center gap-4">
            {#each craftingSlots as slot, index}
                <div class="w-48 h-32 bg-gray-700 rounded-lg border border-gray-600 flex flex-col items-center justify-center relative overflow-hidden p-2">
                    {#if slot}
                        <div class="text-center">
                            <p class="font-semibold text-teal-200 text-lg leading-tight">{slot.name}</p>
                            <p class="text-gray-400 text-sm">{slot.rarity} ({slot.type})</p>
                            <button
                                on:click={() => removeItemFromSlot(index)}
                                class="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md"
                                aria-label="Remove ingredient"
                            >
                                &times;
                            </button>
                        </div>
                    {:else}
                        <p class="text-gray-500 text-center">
                            {#if index === 0 || index === 1}
                                Skinning Slot
                            {:else if index === 2 || index === 3}
                                Stitching/Rivet Slot
                            {:else if index === 4 || index === 5}
                                Drop Slot
                            {:else}
                                Empty Slot
                            {/if}
                        </p>
                    {/if}
                </div>
            {/each}
        </div>
        <div class="mt-6 text-center">
            <button
                class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                disabled={leathercraftingPreview.total_ingredients === 0}
            >
                Craft Elixir
            </button>
        </div>
    </div>

    <!-- Elixir Preview Section -->
    <div class="mb-8 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h2 class="text-2xl font-semibold mb-4 text-teal-300">Elixir Preview</h2>
        {#if leathercraftingPreview.total_ingredients === 0}
            <p class="text-gray-400 text-center">Add ingredients to see elixir properties.</p>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-300">
                <!-- Flat Bonuses -->
                {#if leathercraftingPreview.strength_bonus > 0}<p><span class="font-medium">Strength:</span> +{leathercraftingPreview.strength_bonus}</p>{/if}
                {#if leathercraftingPreview.stamina_bonus > 0}<p><span class="font-medium">Stamina:</span> +{leathercraftingPreview.stamina_bonus}</p>{/if}
                {#if leathercraftingPreview.endurance_bonus > 0}<p><span class="font-medium">Endurance:</span> +{leathercraftingPreview.endurance_bonus}</p>{/if}
                {#if leathercraftingPreview.conditioning_bonus > 0}<p><span class="font-medium">Conditioning:</span> +{leathercraftingPreview.conditioning_bonus}</p>{/if}
                {#if leathercraftingPreview.agility_bonus > 0}<p><span class="font-medium">Agility:</span> +{leathercraftingPreview.agility_bonus}</p>{/if}
                {#if leathercraftingPreview.dexterity_bonus > 0}<p><span class="font-medium">Dexterity:</span> +{leathercraftingPreview.dexterity_bonus}</p>{/if}
                {#if leathercraftingPreview.celerity_bonus > 0}<p><span class="font-medium">Celerity:</span> +{leathercraftingPreview.celerity_bonus}</p>{/if}
                {#if leathercraftingPreview.grace_bonus > 0}<p><span class="font-medium">Grace:</span> +{leathercraftingPreview.grace_bonus}</p>{/if}
                {#if leathercraftingPreview.intelligence_bonus > 0}<p><span class="font-medium">Intelligence:</span> +{leathercraftingPreview.intelligence_bonus}</p>{/if}
                {#if leathercraftingPreview.acuity_bonus > 0}<p><span class="font-medium">Acuity:</span> +{leathercraftingPreview.acuity_bonus}</p>{/if}
                {#if leathercraftingPreview.alacrity_bonus > 0}<p><span class="font-medium">Alacrity:</span> +{leathercraftingPreview.alacrity_bonus}</p>{/if}
                {#if leathercraftingPreview.clarity_bonus > 0}<p><span class="font-medium">Clarity:</span> +{leathercraftingPreview.clarity_bonus}</p>{/if}
                {#if leathercraftingPreview.essence_bonus > 0}<p><span class="font-medium">Essence:</span> +{leathercraftingPreview.essence_bonus}</p>{/if}
                {#if leathercraftingPreview.spirit_bonus > 0}<p><span class="font-medium">Spirit:</span> +{leathercraftingPreview.spirit_bonus}</p>{/if}
                {#if leathercraftingPreview.aura_bonus > 0}<p><span class="font-medium">Aura:</span> +{leathercraftingPreview.aura_bonus}</p>{/if}
                {#if leathercraftingPreview.toughness_bonus > 0}<p><span class="font-medium">Toughness:</span> +{leathercraftingPreview.toughness_bonus}</p>{/if}
                {#if leathercraftingPreview.armor_flat_bonus > 0}<p><span class="font-medium">Armor:</span> +{leathercraftingPreview.armor_flat_bonus}</p>{/if}

                <!-- Percentage Bonuses -->
                {#if leathercraftingPreview.strength_percent_bonus > 0}<p><span class="font-medium">Strength %:</span> +{leathercraftingPreview.strength_percent_bonus}%</p>{/if}
                {#if leathercraftingPreview.agility_percent_bonus > 0}<p><span class="font-medium">Agility %:</span> +{leathercraftingPreview.agility_percent_bonus}%</p>{/if}
                {#if leathercraftingPreview.intelligence_percent_bonus > 0}<p><span class="font-medium">Intelligence %:</span> +{leathercraftingPreview.intelligence_percent_bonus}%</p>{/if}

                <!-- Active Effects -->
                {#if leathercraftingPreview.active_effects}<p class="col-span-1 md:col-span-2 lg:col-span-3"><span class="font-medium">Effects:</span> {leathercraftingPreview.active_effects}</p>{/if}
            </div>
        {/if}
    </div>

    <!-- Available Materials Section -->
    <div class="p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h2 class="text-2xl font-semibold mb-4 text-teal-300">Available Materials</h2>
        {#if loading}
            <p class="text-center text-gray-400">Loading materials...</p>
        {:else if error}
            <p class="text-center text-red-500">Error: {error}</p>
            <button
                on:click={fetchMaterials}
                class="mt-4 block mx-auto px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
            >
                Try Again
            </button>
        {:else}
            <!-- Skinnings List -->
            {#if allSkinnings.length > 0}
                <h3 class="text-xl font-semibold mb-3 text-teal-200 mt-6">Skinnings</h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {#each allSkinnings as item (item.id || item.name)}
                        <li class="bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-600 flex flex-col">
                            <h4 class="text-lg font-semibold text-teal-300">{item.name}</h4>
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
                                on:click={() => addItemToSlot(item)}
                                class="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                                disabled={!canAddItemToAnyValidSlot(item) || craftingSlots.includes(item)}
                            >
                                Add to Crafting
                            </button>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p class="text-center text-gray-400">No skinnings found.</p>
            {/if}

            <!-- Vendor Materials List -->
            {#if allVendorMaterials.length > 0}
                <h3 class="text-xl font-semibold mb-3 text-teal-200 mt-6">Vendor Materials (Stitchings & Rivets)</h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {#each allVendorMaterials as item (item.id || item.name)}
                        <li class="bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-600 flex flex-col">
                            <h4 class="text-lg font-semibold text-teal-300">{item.name}</h4>
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
                                on:click={() => addItemToSlot(item)}
                                class="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                                disabled={!canAddItemToAnyValidSlot(item) || craftingSlots.includes(item)}
                            >
                                Add to Crafting
                            </button>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p class="text-center text-gray-400">No vendor materials found.</p>
            {/if}

            <!-- Drops List -->
            {#if allDrops.length > 0}
                <h3 class="text-xl font-semibold mb-3 text-teal-200 mt-6">Drops</h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {#each allDrops as item (item.id || item.name)}
                        <li class="bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-600 flex flex-col">
                            <h4 class="text-lg font-semibold text-teal-300">{item.name}</h4>
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
                                on:click={() => addItemToSlot(item)}
                                class="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                                disabled={!canAddItemToAnyValidSlot(item) || craftingSlots.includes(item)}
                            >
                                Add to Crafting
                            </button>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p class="text-center text-gray-400">No drops found.</p>
            {/if}
        {/if}
    </div>
</div>

<style>
    /* Ensure Inter font is used if not globally defined */
    .font-inter {
        font-family: 'Inter', sans-serif;
    }
</style>
