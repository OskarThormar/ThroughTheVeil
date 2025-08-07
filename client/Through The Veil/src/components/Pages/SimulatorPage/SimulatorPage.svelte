<script>
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';

    // Component state for level and form selection
    let level = 1;
    let selectedForm = 'Cat Form'; // Defaulting to Cat Form for the simulation

    // Simulation state
    let simulationTime = 0; // Current time in seconds
    let maxSimulationTime = 30; // 30-second combat simulation
    let timeLeft = maxSimulationTime; // Countdown timer
    let tickRate = 0.1; // Simulation runs every 0.1 seconds
    let characterStats = null;
    
    // Resource states
    let currentMana = 0;
    let maxMana = 200;
    let manaRegenRate = 2.5; // Mana per second
    
    let currentEnergy = 0;
    let maxEnergy = 100;
    let energyRegenRate = 10; // Energy per second

    let currentRage = 0;
    let maxRage = 100;
    let rageRegenRate = 0; // Rage does not regenerate passively

    let abilityCooldowns = {};
    let autoAttackLog = [];
    let directDamageLog = [];
    let dotDamageLog = [];
    let totalDamage = 0;
    let isRunning = false;
    let simulationMessage = 'Ready to simulate.';
    let isError = false;

    // A simple list of abilities to be used in the rotation.
    // In a full application, you would fetch these from the server.
    const abilities = [
        { name: 'Shred', cost: 40, cooldown: 1.0, type: 'direct' },
        { name: 'Auto Attack (Cat Form)', cost: 0, cooldown: 2.0, type: 'auto-attack' } // Auto attack now has a 2-second swing timer
    ];

    onMount(() => {
        // Initialize the stats when the component is first mounted
        initializeStats();
    });

    // Helper function to update the character's stats from the server
    const initializeStats = async () => {
        if (!level || isNaN(level)) return;

        simulationMessage = 'Initializing character stats...';
        isError = false;

        try {
            const response = await fetch(`/api/druid/stats?level=${level}&form=${selectedForm}`);
            const data = await response.json();

            if (!response.ok) {
                simulationMessage = data.error || 'An error occurred while fetching stats.';
                isError = true;
                return;
            }
            
            characterStats = data.stats;
            simulationMessage = 'Stats initialized. Click "Run Simulation" to begin.';
        } catch (err) {
            console.error('Fetch error:', err);
            simulationMessage = 'Failed to connect to the server.';
            isError = true;
        }
    };

    /**
     * The core ability usage function. It checks prerequisites and makes a backend call.
     * @param {string} abilityName The name of the ability to use.
     */
    const useAbility = async (abilityName) => {
        const ability = abilities.find(a => a.name === abilityName);
        if (!ability) {
            console.warn(`Ability '${abilityName}' not found in local list.`);
            return;
        }

        // Check if ability is off cooldown
        if (abilityCooldowns[abilityName] && abilityCooldowns[abilityName] > simulationTime) {
            return;
        }

        // Check for energy cost
        if (currentEnergy < ability.cost) {
            return;
        }

        // If checks pass, use the ability
        currentEnergy -= ability.cost;
        abilityCooldowns[abilityName] = simulationTime + ability.cooldown;

        try {
            const response = await fetch(`/api/druid/damage?ability=${abilityName}&level=${level}&form=${selectedForm}`);
            const data = await response.json();

            if (response.ok) {
                // Handle different damage types from the response
                let damage = 0;
                let logEntry;
                if (data.damage && data.damage.mainHandDamage) {
                    // For auto-attacks, sum the damage and log it
                    damage = data.damage.mainHandDamage + data.damage.offHandDamage;
                    totalDamage += damage;
                    logEntry = {
                        time: simulationTime.toFixed(1),
                        ability: abilityName,
                        damage: damage.toFixed(2),
                        mainHandDamage: data.damage.mainHandDamage.toFixed(2),
                        offHandDamage: data.damage.offHandDamage.toFixed(2)
                    };
                    autoAttackLog = [...autoAttackLog, logEntry];
                } else if (data.damage) {
                    // For other abilities, just log the single damage number
                    damage = data.damage;
                    totalDamage += damage;
                    logEntry = {
                        time: simulationTime.toFixed(1),
                        ability: abilityName,
                        damage: damage.toFixed(2)
                    };
                    directDamageLog = [...directDamageLog, logEntry];
                } else {
                    console.warn(`Invalid damage data for ability ${abilityName}`);
                }
            }
        } catch (err) {
            console.error(`Failed to calculate damage for ${abilityName}:`, err);
        }
    };

    /**
     * The main simulation loop.
     */
    const runSimulation = () => {
        if (isRunning) return;
        
        // Reset simulation state
        simulationTime = 0;
        timeLeft = maxSimulationTime;
        totalDamage = 0;
        autoAttackLog = [];
        directDamageLog = [];
        dotDamageLog = [];
        currentMana = maxMana;
        currentEnergy = maxEnergy;
        currentRage = 0;
        abilityCooldowns = {};
        isRunning = true;
        simulationMessage = 'Running simulation...';

        const interval = setInterval(async () => {
            if (simulationTime >= maxSimulationTime) {
                clearInterval(interval);
                isRunning = false;
                simulationMessage = `Simulation complete. Total Damage: ${totalDamage.toFixed(2)} DPS: ${(totalDamage / maxSimulationTime).toFixed(2)}`;
                return;
            }

            // Simple rotation priority:
            // 1. Try to use Shred
            // 2. If Shred fails (e.g., not enough energy), try to auto attack
            if (currentEnergy >= 40) {
                 await useAbility('Shred');
            } else {
                 await useAbility('Auto Attack (Cat Form)');
            }

            // Energy regeneration
            currentEnergy = Math.min(maxEnergy, currentEnergy + (energyRegenRate * tickRate));
            
            // Mana regeneration
            currentMana = Math.min(maxMana, currentMana + (manaRegenRate * tickRate));

            // Rage regeneration
            currentRage = Math.min(maxRage, currentRage + (rageRegenRate * tickRate));

            simulationTime += tickRate;
            timeLeft = maxSimulationTime - simulationTime;
        }, tickRate * 1000);
    };

    // Reactive statement to re-initialize stats whenever level or form changes
    $: if (level || selectedForm) {
        initializeStats();
    }
</script>

<div class="flex items-center justify-center min-h-screen p-4">
    <div class="bg-[#242646] p-8 rounded-2xl shadow-lg w-full max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Main Stats Display Area -->
        <div class="bg-[#1a1a2e] p-5 rounded-lg border border-[#3b3b5c] min-h-[200px] md:col-span-2">
            {#if characterStats}
                <h3 class="text-xl font-bold text-white mb-4 text-center">Stats for Level {level} Druid ({selectedForm})</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {#each Object.entries(characterStats) as [statName, statValue]}
                        <div class="flex justify-between items-center bg-[#242646] p-3 rounded-lg">
                            <span class="font-bold capitalize">{statName}</span>
                            <span class="text-lg font-semibold text-white">{Math.round(statValue)}</span>
                        </div>
                    {/each}
                </div>
            {:else}
                <p class="text-center text-gray-500 mt-16 {isError ? 'text-red-300' : ''}">{simulationMessage}</p>
            {/if}
        </div>

        <!-- Controls Column -->
        <div class="flex flex-col space-y-4">
            <h2 class="text-2xl font-bold text-white text-center">Combat Simulator</h2>
            <p class="text-gray-400 text-center mt-1">Simulate a {maxSimulationTime}-second combat encounter.</p>

            <!-- Resource Bars -->
            <!-- Mana Bar -->
            <div class="w-full h-8 bg-gray-700 rounded-lg overflow-hidden relative">
                <div class="absolute inset-0 bg-blue-500 transition-all duration-100 ease-linear"
                     style="width: {(currentMana / maxMana) * 100}%;"></div>
                <div class="relative z-10 text-center text-sm font-semibold leading-8 text-white"
                     style="text-shadow: 1px 1px 0px #000;">
                    Mana: {Math.round(currentMana)} / {maxMana}
                </div>
            </div>

            <!-- Energy Bar -->
            <div class="w-full h-8 bg-gray-700 rounded-lg overflow-hidden relative">
                <div class="absolute inset-0 bg-yellow-400 transition-all duration-100 ease-linear"
                     style="width: {(currentEnergy / maxEnergy) * 100}%;"></div>
                <div class="relative z-10 text-center text-sm font-semibold leading-8 text-black"
                     style="text-shadow: 1px 1px 0px #fff;">
                    Energy: {Math.round(currentEnergy)} / {maxEnergy}
                </div>
            </div>

            <!-- Rage Bar -->
            <div class="w-full h-8 bg-gray-700 rounded-lg overflow-hidden relative">
                <div class="absolute inset-0 bg-red-500 transition-all duration-100 ease-linear"
                     style="width: {(currentRage / maxRage) * 100}%;"></div>
                <div class="relative z-10 text-center text-sm font-semibold leading-8 text-white"
                     style="text-shadow: 1px 1px 0px #000;">
                    Rage: {Math.round(currentRage)} / {maxRage}
                </div>
            </div>


            <div class="text-center">
                <span class="text-4xl font-bold text-white">{timeLeft.toFixed(1)}</span>
                <span class="text-gray-400">s remaining</span>
            </div>

            <!-- Level and Form Inputs -->
            <input type="number" 
                   bind:value={level} 
                   placeholder="Enter level (1-60)"
                   class="p-3 rounded-lg bg-[#1a1a2e] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8c7ae6] transition-colors duration-200 text-white placeholder-gray-500">
            
            <select bind:value={selectedForm} 
                    class="p-3 rounded-lg bg-[#1a1a2e] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8c7ae6] transition-colors duration-200 text-white">
                <option value="Caster Form">Caster Form</option>
                <option value="Cat Form">Cat Form</option>
            </select>
            
            <button on:click={runSimulation}
                    disabled={isRunning || !characterStats}
                    class="w-full p-3 bg-[#4a7ecf] hover:bg-[#6c9ae6] text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {isRunning ? 'Simulating...' : 'Run Simulation'}
            </button>
        </div>

        <!-- Horizontal line separator -->
        <hr class="border-t border-[#3b3b5c] md:col-span-3">

        <!-- Simulation Results Display Area -->
        <div class="md:col-span-3 space-y-6">
            <h3 class="text-xl font-bold text-white text-center">Simulation Results</h3>
            <div class="bg-[#1a1a2e] p-5 rounded-lg border border-[#3b3b5c] min-h-[150px] space-y-2">
                <p class="text-gray-400">Total Damage: <span class="text-white font-bold">{totalDamage.toFixed(2)}</span></p>
                <p class="text-gray-400">DPS: <span class="text-white font-bold">{(totalDamage / maxSimulationTime).toFixed(2)}</span></p>
                <p class="text-center text-gray-500 {isError ? 'text-red-300' : ''}">{simulationMessage}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
                <!-- Auto Attacks Log -->
                <div class="bg-[#1a1a2e] p-4 rounded-lg border border-[#3b3b5c] flex flex-col h-full">
                    <h4 class="text-lg font-semibold text-white mb-2">Auto Attacks</h4>
                    <div class="overflow-y-auto flex-grow">
                        {#each autoAttackLog as log}
                            <p class="text-sm text-gray-300">[{log.time}s] Used <span class="text-[#8c7ae6]">{log.ability}</span> for <span class="text-red-400">{log.damage}</span> damage.</p>
                        {/each}
                    </div>
                </div>

                <!-- Direct Damage Log -->
                <div class="bg-[#1a1a2e] p-4 rounded-lg border border-[#3b3b5c] flex flex-col h-full">
                    <h4 class="text-lg font-semibold text-white mb-2">Direct Damage</h4>
                    <div class="overflow-y-auto flex-grow">
                        {#each directDamageLog as log}
                            <p class="text-sm text-gray-300">[{log.time}s] Used <span class="text-[#8c7ae6]">{log.ability}</span> for <span class="text-red-400">{log.damage}</span> damage.</p>
                        {/each}
                    </div>
                </div>

                <!-- DoT Effects Log (placeholder for future implementation) -->
                <div class="bg-[#1a1a2e] p-4 rounded-lg border border-[#3b3b5c] flex flex-col h-full">
                    <h4 class="text-lg font-semibold text-white mb-2">DoT Effects</h4>
                    <div class="overflow-y-auto flex-grow">
                        {#each dotDamageLog as log}
                            <p class="text-sm text-gray-300">[{log.time}s] Tick for <span class="text-red-400">{log.damage}</span> damage.</p>
                        {:else}
                            <p class="text-sm text-gray-500">No DoT effects used yet.</p>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    body {
        font-family: 'Inter', sans-serif;
        background-color: #1a1a2e;
        color: #e0e0e0;
    }
</style>
