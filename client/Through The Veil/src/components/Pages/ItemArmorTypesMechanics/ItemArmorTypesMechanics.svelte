<script>
</script>

<div class="p-6 max-w-5xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-4xl font-bold mb-6 text-center text-teal-300">Armor Mechanics</h1>

    <p class="text-lg text-gray-300 mb-10">
        How different armor innately augments the user<br>
        Armor provides a percentage damage reduction to all direct damage of both physical and magical nature.<br>
        Deflection provides a chance that a blows damage is partially ignored before armor reduction.<br>
        Dodge provides additional chance that a blow will miss.<br>
        Aura is most efficiant in clothing and drops off as the mass of the armor piece increases.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-blue-300 mb-3 text-center">Super Heavy Armor</h2>
            <p class="text-gray-300">
                Very high armor<br>
                No dodge chance<br>
                High deflection chance<br>
                No Aura efficiancy<br>
                <br>
                Very high strength requirement<br>
                Low agility requirement<br>

            </p>
        </div>

        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-red-300 mb-3 text-center">Heavy Armor</h2>
            <p class="text-gray-300">
                High armor<br>
                Low dodge chance<br>
                Medium deflection chance<br> 
                Low Aura efficiancy<br>
                <br>
                high strength requirement<br>
                Low agility requirement<br>               
            </p>
        </div>

        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-green-300 mb-3 text-center">Medium Armor</h2>
            <p class="text-gray-300">
                Medium Armor<br>
                Medium dodge chance<br>
                Low deflection chance<br>
                Medium Aura efficiancy<br>
                <br>
                Medium strength requirement<br>
                Medium agility requirement<br>
            </p>
        </div>

        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-purple-300 mb-3 text-center">Light Armor</h2>
            <p class="text-gray-300">
                Low Armor<br>
                High dodge chance<br>
                No deflection chance<br>  
                High Aura efficiancy<br>
                <br>
                low strength requirement<br>
                High agility requirement<br>
            </p>
        </div>

        <div class="item-mechanics-card">
            <h2 class="text-2xl font-semibold text-yellow-300 mb-3 text-center">Clothing</h2>
            <p class="text-gray-300">
                No Armor<br>
                High dodge chance<br>
                No deflection chance<br>
                Very High Aura efficiancy<br>
                <br>
                No strength requirement<br>
                No agility requirement<br>
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
