<script>
    import { Link } from 'svelte-routing';
</script>

<div class="p-6 max-w-5xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-4xl font-bold mb-6 text-center text-teal-300">Alchemy</h1>

    <p class="text-lg text-gray-300 mb-10">
        Alchemists produce both ingestible draughts and throwable bombs. Specializing in either of these teaches new recipes in its respective field.<br>
        Potions are powerful short lasting effects, and elixirs last from 10 min to and entire day depending on which and how many ingredients are used.<br>
        Bombs can stun, put to sleep or do damage depending on ingredients.

    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-blue-300 mb-3 text-center">Draughts</h2>
            <p class="text-gray-300">
                Elixirs<br>
                Potions
            </p>
        </div>

        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-red-300 mb-3 text-center">Bombs</h2>
            <p class="text-gray-300">
                Bombs
            </p>
        </div>
    </div>
</div>

    <div class="flex flex-wrap justify-center gap-6">
        <Link to="/professions/alchemy/crafting" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Alchemy crafting</h2>
            <p class="text-sm text-gray-400">Alchemy Crafting</p>
        </Link>
    </div>
    <div class="flex flex-wrap justify-center gap-6">
        <Link to="/professions/alchemy/ingredients" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Alchemy ingredients</h2>
            <p class="text-sm text-gray-400">Alchemy Ingredients</p>
        </Link>
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
