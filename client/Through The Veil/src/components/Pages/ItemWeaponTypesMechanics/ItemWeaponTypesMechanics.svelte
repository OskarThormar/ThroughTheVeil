<script>
    // No specific script logic needed for this display-only page
</script>

<div class="p-6 max-w-5xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-4xl font-bold mb-6 text-center text-teal-300">Weapon Type Mechanics</h1>

    <p class="text-lg text-gray-300 mb-10">
        The differences between the weapon types:<br>
        Swords have generally high parry chance.<br>
        Daggers have high critical strike chance.<br>
        Maces have high armor penetration.<br>
        Axes are in between swords and maces, but augments bleed effects applied by the weapon
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Long Sword Box -->
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-blue-300 mb-3 text-center">Long Sword</h2>
            <p class="text-gray-300">
                High parry chance<br>
                High parry value<br>
                Slow speed<br>
                Slow draw speed<br>
                Low critical strike chance<br>
                Low armor penetration<br>
            </p>
        </div>

        <!-- Short Sword Box -->
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-red-300 mb-3 text-center">Short Sword</h2>
            <p class="text-gray-300">
                High parry chance<br>
                Medium parry value<br>
                Medium speed<br>
                Fast draw speed<br>
                Medium critical strike chance<br>
                Low armor penetration<br>
            </p>
        </div>

        <!-- Sabre Box -->
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-green-300 mb-3 text-center">Sabre</h2>
            <p class="text-gray-300">
                High parry chance<br>
                Medium parry value<br>
                Fast attack speed<br>
                Fast draw speed<br>
                Medium critical strike chance<br>
                No armor penetration<br>
            </p>
        </div>

        <!-- Rapier Box -->
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-purple-300 mb-3 text-center">Rapier</h2>
            <p class="text-gray-300">
                High parry chance<br>
                Low parry value<br>
                Fast attack speed<br>
                Fast draw speed<br>
                High critical strike chance<br>
                No armor penetration<br>   
            </p>
        </div>

        <!-- Dagger Box -->
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-yellow-300 mb-3 text-center">Dagger</h2>
            <p class="text-gray-300">
                Low parry chance<br>
                Low parry value <br>
                Very fast attack speed<br>
                Very fast draw speed<br>
                Very high critical strike chance<br>
                No armor penetration<br>
            </p>
        </div>

        <!-- Mace Box -->
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-indigo-300 mb-3 text-center">Mace</h2>
            <p class="text-gray-300">
                Medium parry chance<br>
                Medium parry value<br>
                Slow attack speed<br>
                Medium draw speed<br>
                Low critical strike chance<br>
                High armor penetration<br>
            </p>
        </div>
        <!-- Axe Box -->
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-orange-400 mb-3 text-center">Axe</h2>
            <p class="text-gray-300">
                Medium parry chance<br>
                Medium parry value<br>
                Medium attack speed<br>
                Medium draw speed<br>
                Medium critical strike chance<br>
                Medium armor penetration<br>
            </p>
        </div>

        <!-- Hatchet Box -->
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-sky-400 mb-3 text-center">Hatchet</h2>
            <p class="text-gray-300">
                Low parry chance<br>
                Low parry value<br>
                Fast attack speed<br>
                Fast draw speed<br>
                High critical strike chance<br>
                Low armor penetration<br>
            </p>
        </div>

        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-fuchsia-400 mb-3 text-center">Staff</h2>
            <p class="text-gray-300">
                High parry chance<br>
                High parry value<br>
                Medium attack speed<br>
                Medium draw speed<br>
                Low critical strike chance<br>
                Low armor penetration<br>
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
