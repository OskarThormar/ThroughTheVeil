<script>
    import { Link } from 'svelte-routing'; // Import Link for internal navigation
</script>

<div class="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-3xl font-bold mb-6 text-center text-teal-300">Item Types Overview</h1>
    <p class="text-lg text-gray-300 text-center mb-8">Explore different types of items:</p>

    <div class="flex flex-wrap justify-center gap-6">
        <Link to="/mechanics/items/weapontypes" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Weapon Types</h2>
            <p class="text-sm text-gray-400"></p>
        </Link>

        <Link to="/mechanics/items/armortypes" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Armor Types</h2>
            <p class="text-sm text-gray-400"></p>
        </Link>

        <Link to="/mechanics/items/shieldtypes" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Shield Types</h2>
            <p class="text-sm text-gray-400"></p>
        </Link>
    </div>
</div>