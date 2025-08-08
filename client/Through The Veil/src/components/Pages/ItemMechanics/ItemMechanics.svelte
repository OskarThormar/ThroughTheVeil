<script>
</script>

<div class="p-6 max-w-5xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-4xl font-bold mb-6 text-center text-teal-300">Item Mechanics</h1>

    <p class="text-lg text-gray-300 text-center mb-10">
        What item stats can different items possess
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-blue-300 mb-3 text-center">Armor</h2>
            <p class="text-gray-300">
                Armor<br>
                Psychic requirements<br>
                Psychic alignments<br>
                Magical effects<br>
                Enchantment<br>
                Padding<br>
            </p>
        </div>

        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-red-300 mb-3 text-center">Weapons</h2>
            <p class="text-gray-300">
                Damage per second<br>
                Attack speed<br>
                Psychic requirements<br>
                Psychic Alignments<br>
                Magical effects<br>
                Enchantment<br>
                Imbue<br>
                Oil<br>
            </p>
        </div>

        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-green-300 mb-3 text-center">Shields</h2>
            <p class="text-gray-300">
                Block value<br>
                Block chance<br>
                Psychic requirements<br>
                Psychic alignments<br>
                Magical effects<br>
                Enchantment<br>
                Imbue<br>
                Oil<br>
            </p>
        </div>

        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-purple-300 mb-3 text-center">Jewellery</h2>
            <p class="text-gray-300">
                Psychic requirements<br>
                Psychic alignments<br>
                Magical effects<br>
                Enchantment<br>   
            </p>
        </div>

        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-yellow-300 mb-3 text-center">Backpacks</h2>
            <p class="text-gray-300">
                Storage space<br>
                Item quick draws<br>
                Potion autoinjectors<br>
                Special slot<br>
            </p>
        </div>

        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-indigo-300 mb-3 text-center">Storage Rings</h2>
            <p class="text-gray-300">
                Storage space
            </p>
        </div>
    </div>
</div>

<style>
    .item-mechanics-card {
        background-color: #1f2937;
        padding: 1.75rem;
        border-radius: 0.75rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        border: 1px solid #374151; 
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .item-mechanics-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
    }
</style>
