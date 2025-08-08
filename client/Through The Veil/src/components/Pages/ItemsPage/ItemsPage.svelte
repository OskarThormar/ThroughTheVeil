<script>
    import { Link } from 'svelte-routing'; 
</script>

<div class="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-3xl font-bold mb-6 text-center text-teal-300">Items Overview</h1>
    <p class="text-lg text-gray-300 text-center mb-8">Explore different categories of items:</p>

    <div class="flex flex-wrap justify-center gap-6">
        <Link to="/items/weapons" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Weapons</h2>
            <p class="text-sm text-gray-400">Swords, bows, staffs, and more.</p>
        </Link>

        <Link to="/items/armor" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Armor</h2>
            <p class="text-sm text-gray-400">Protective gear for all adventurers.</p>
        </Link>

        <Link to="/items/shields" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Shields</h2>
            <p class="text-sm text-gray-400">Defensive tools for blocking attacks.</p>
        </Link>
    </div>
</div>