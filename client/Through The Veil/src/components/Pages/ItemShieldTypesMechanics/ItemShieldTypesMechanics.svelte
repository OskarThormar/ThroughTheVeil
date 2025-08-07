<script>
    // No specific script logic needed for this display-only page
</script>

<div class="p-6 max-w-5xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-4xl font-bold mb-6 text-center text-teal-300">Shield Type Mechanics</h1>

    <p class="text-lg text-gray-300 mb-10">
        The strength requirement of the shields expresses how much of each stat is required to reach 100% block.<br>
        Strength gives block chance up to 50% and Celerity gives block chance up to 50%, how many of each stat is required to hit maximum block
        is determined by the shield, bucklers are small and light, shields are large and heavy.<br>
        <br>
        When using shield slams and bashes, the shield will have high armor penetration and low critical strike chance, and the opposite for buckler.<br>
        Without any strength, which increases block value, a block reduces damage by first 5% to 10% and then a flat amount.<br>
        Shields scale with strength better, which means for every point of strength, a shields block value is increased by more than the buckler, but its easier reach maximum block on a buckler.
        The buckler on the other hand requires low strength, which makes it a convenient defensive tool for non physical characters.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Shield Box -->
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-blue-300 mb-3 text-center">Shield</h2>
            <p class="text-gray-300">
                High block chance<br>
                High block value<br>
                Slow attack speed<br>
                Slow draw speed<br>
                Low critical strike chance<br>
                High armor penetration<br>
                <br>
                High Strength requirements<br>
                Low Agility requirements<br>
            </p>
        </div>

        <!-- Buckler Box -->
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-red-300 mb-3 text-center">Buckler</h2>
            <p class="text-gray-300">
                High block chance<br>
                Low block value<br>
                Fast attack speed<br>
                Fast draw speed<br>
                High critical strike chance<br>
                Low armor penetration<br>
                <br>
                Low Strength requirements<br>
                Medium Agility requirements<br>
            </p>
        </div>
    </div>
</div>

<style>
    .item-mechanics-card {
        background-color: #1f2937; /* A slightly lighter dark gray */
        padding: 1.75rem;
        border-radius: 0.75rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        border: 1px solid #374151; /* Subtle border */
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .item-mechanics-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
    }
</style>
