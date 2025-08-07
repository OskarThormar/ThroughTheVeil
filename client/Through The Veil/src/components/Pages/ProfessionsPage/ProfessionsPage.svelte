<script>
    import { Link } from 'svelte-routing';
</script>

<div class="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-3xl font-bold mb-6 text-center text-teal-300">Professions Overview</h1>
    <p class="text-lg text-gray-300 text-center mb-8">Explore different professions</p>

    <div class="flex flex-wrap justify-center gap-6">
        <Link to="/professions/alchemy" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Alchemy</h2>
            <p class="text-sm text-gray-400">Draughts and bombs</p>
        </Link>

        <Link to="/professions/blacksmithing" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Blacksmithing</h2>
            <p class="text-sm text-gray-400">Items made by forge and anvil</p>
        </Link>

        <Link to="/professions/leathercrafting" class="item-category-card">
            <h2 class="text-xl font-semibold mb-2 text-center">Leathercrafting</h2>
            <p class="text-sm text-gray-400">Items made from animal materials</p>
        </Link>
    </div>
</div>