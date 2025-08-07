<script>
    import { Link } from 'svelte-routing';
</script>


<div class="p-6 max-w-5xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-4xl font-bold mb-6 text-center text-teal-300">Classes</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Link to="/classes/warrior" class="item-category-card">
            <div class="item-mechanics-card">
                <h2 class="text-2xl font-semibold text-blue-300 mb-3 text-center">Warrior</h2>
                <p class="text-gray-300 text-center">
                    <br>
                    Defender<br>
                    Huscarl<br>
                    Berserker<br>
                </p>
            </div>
        </Link>
            
        <Link to="/classes/warrior" class="item-category-card">    
            <div class="item-mechanics-card">
                <h2 class="text-2xl font-semibold text-red-300 mb-3 text-center">Ranger</h2>
                <p class="text-gray-300 text-center">
                    <br>
                    Rogue<br>
                    Hunter<br>
                    Beast Master<br>
                </p>
            </div>
        </Link>

        <Link to="/classes/warrior" class="item-category-card">
            <div class="item-mechanics-card">
                <h2 class="text-2xl font-semibold text-green-300 mb-3 text-center">Druid</h2>
                <p class="text-gray-300 text-center">
                    <br>
                    Naturalist<br>
                    Lunaris<br>
                    Solaris<br>
                    Feral<br>
                </p>
            </div>
        </Link>
        
        <Link to="/classes/shaman" class="item-category-card">
            <div class="item-mechanics-card">  
                <h2 class="text-2xl font-semibold text-purple-300 mb-3 text-center">Shaman</h2>
                <p class="text-gray-300 text-center">
                    <br>
                    Elementalist<br>
                    Infuser<br>
                    Verdant<br>
                    Bulwark<br>
                </p>
            </div>
        </Link>

        <Link to="/classes/sorcerer" class="item-category-card">
            <div class="item-mechanics-card">
                <h2 class="text-2xl font-semibold text-yellow-300 mb-3 text-center">Sorcerer</h2>
                <p class="text-gray-300 text-center">
                    <br>
                    Fire<br>
                    Frost<br>
                    Faerie<br>
                    Cosmos<br>
                    Death<br>
                    Night<br>
                    Blood<br>
                </p>
            </div>
        </Link>

        <Link to="/classes/warlock" class="item-category-card">
            <div class="item-mechanics-card">
                <h2 class="text-2xl font-semibold text-indigo-300 mb-3 text-center">Warlock</h2>
                <p class="text-gray-300 text-center">
                    <br>
                    Demonologist<br>
                    Maledictor<br>
                    Nethermancer<br>
                </p>
            </div>
        </Link>

        <Link to="/classes/warrior" class="item-category-card">
            <div class="item-mechanics-card">
                <h2 class="text-2xl font-semibold text-indigo-300 mb-3 text-center">Celestian</h2>
                <p class="text-gray-300 text-center">
                    <br>
                    Cleric<br>
                    Inquisitor<br>
                    Templar<br>
                    Crusader<br>
                    Paladin<br>
                </p>
            </div>
        </Link>
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