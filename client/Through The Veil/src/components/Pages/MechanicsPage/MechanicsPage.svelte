<script>
    import { Link } from 'svelte-routing'; 
</script>

<div class="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-3xl font-bold mb-6 text-center text-teal-300">Mechanics Overview</h1>
    <p class="text-lg text-gray-300 text-center mb-8">Get to know the mechanics of Mystaria, Ouranogaea</p>

    <div class="flex flex-wrap justify-center gap-6">
        <Link to="/mechanics/psychicexpression" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Psychic Expression</h2>
            <p class="text-sm text-gray-400">The expression of a characters psychic potential</p>
        </Link>
        <Link to="/mechanics/items" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Item mechanics</h2>
            <p class="text-sm text-gray-400">How different items are used and what they can do</p>
        </Link>
        <Link to="/mechanics/itemtypes" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Item type mechanics</h2>
            <p class="text-sm text-gray-400">How different item types benefit different playstyles, and what those benefits does</p>
        </Link>
    </div>

    
</div>