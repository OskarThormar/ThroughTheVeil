<script>
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';

    let level = 1;
    let selectedForm = 'Cat Form';

    let simulationTime = 0; 
    let maxSimulationTime = 30; 
    let timeLeft = maxSimulationTime; 
    let tickRate = 0.1; 
    let characterStats = null;
    
    let currentMana = 0;
    let maxMana = 200;
    let manaRegenRate = 2.5; 
    
    let currentEnergy = 0;
    let maxEnergy = 100;
    let energyRegenRate = 10;

    let currentRage = 0;
    let maxRage = 100;
    let rageRegenRate = 0;

    let abilityCooldowns = {};
    let autoAttackLog = [];
    let directDamageLog = [];
    let dotDamageLog = [];
    let totalDamage = 0;
    let isRunning = false;
    let simulationMessage = 'Ready to simulate.';
    let isError = false;

    const abilities = [
        { name: 'Shred', cost: 40, cooldown: 1.0, type: 'direct' },
        { name: 'Auto Attack (Cat Form)', cost: 0, cooldown: 2.0, type: 'auto-attack' } 
    ];

    onMount(() => {
        initializeStats();
    });

    const initializeStats = async () => {
        if (!level || isNaN(level)) return;

        simulationMessage = 'Initializing character stats...';
        isError = false;

        try {
            // FIX: Added `credentials: 'include'` to send the session cookie.
            const response = await fetch(`/api/druid/stats?level=${level}&form=${selectedForm}`, {
                credentials: 'include'
            });
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

    const useAbility = async (abilityName) => {
        const ability = abilities.find(a => a.name === abilityName);
        if (!ability) {
            console.warn(`Ability '${abilityName}' not found in local list.`);
            return;
        }

        if (abilityCooldowns[abilityName] && abilityCooldowns[abilityName] > simulationTime) {
            return;
        }

        if (currentEnergy < ability.cost) {
            return;
        }

        currentEnergy -= ability.cost;
        abilityCooldowns[abilityName] = simulationTime + ability.cooldown;

        try {
            // FIX: Added `credentials: 'include'` to send the session cookie.
            const response = await fetch(`/api/druid/damage?ability=${abilityName}&level=${level}&form=${selectedForm}`, {
                credentials: 'include'
            });
            const data = await response.json();

            if (response.ok) {
                let damage = 0;
                let logEntry;
                if (data.damage && data.damage.mainHandDamage) {
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

    const runSimulation = () => {
        if (isRunning) return;
        
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

            if (currentEnergy >= 40) {
                 await useAbility('Shred');
            } else {
                 await useAbility('Auto Attack (Cat Form)');
            }

            currentEnergy = Math.min(maxEnergy, currentEnergy + (energyRegenRate * tickRate));
            
            currentMana = Math.min(maxMana, currentMana + (manaRegenRate * tickRate));

            currentRage = Math.min(maxRage, currentRage + (rageRegenRate * tickRate));

            simulationTime += tickRate;
            timeLeft = maxSimulationTime - simulationTime;
        }, tickRate * 1000);
    };

    $: if (level || selectedForm) {
        initializeStats();
    }
</script>

<div class="flex items-center justify-center min-h-screen p-4">
    <div class="bg-[#242646] p-8 rounded-2xl shadow-lg w-full max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <div class="flex flex-col space-y-4">
            <h2 class="text-2xl font-bold text-white text-center">Combat Simulator</h2>
            <p class="text-gray-400 text-center mt-1">Simulate a {maxSimulationTime}-second combat encounter.</p>


            <div class="w-full h-8 bg-gray-700 rounded-lg overflow-hidden relative">
                <div class="absolute inset-0 bg-blue-500 transition-all duration-100 ease-linear"
                        style="width: {(currentMana / maxMana) * 100}%;"></div>
                <div class="relative z-10 text-center text-sm font-semibold leading-8 text-white"
                        style="text-shadow: 1px 1px 0px #000;">
                    Mana: {Math.round(currentMana)} / {maxMana}
                </div>
            </div>

            <div class="w-full h-8 bg-gray-700 rounded-lg overflow-hidden relative">
                <div class="absolute inset-0 bg-yellow-400 transition-all duration-100 ease-linear"
                        style="width: {(currentEnergy / maxEnergy) * 100}%;"></div>
                <div class="relative z-10 text-center text-sm font-semibold leading-8 text-black"
                        style="text-shadow: 1px 1px 0px #fff;">
                    Energy: {Math.round(currentEnergy)} / {maxEnergy}
                </div>
            </div>

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

        <hr class="border-t border-[#3b3b5c] md:col-span-3">

        <div class="md:col-span-3 space-y-6">
            <h3 class="text-xl font-bold text-white text-center">Simulation Results</h3>
            <div class="bg-[#1a1a2e] p-5 rounded-lg border border-[#3b3b5c] min-h-[150px] space-y-2">
                <p class="text-gray-400">Total Damage: <span class="text-white font-bold">{totalDamage.toFixed(2)}</span></p>
                <p class="text-gray-400">DPS: <span class="text-white font-bold">{(totalDamage / maxSimulationTime).toFixed(2)}</span></p>
                <p class="text-center text-gray-500 {isError ? 'text-red-300' : ''}">{simulationMessage}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
                <div class="bg-[#1a1a2e] p-4 rounded-lg border border-[#3b3b5c] flex flex-col h-full">
                    <h4 class="text-lg font-semibold text-white mb-2">Auto Attacks</h4>
                    <div class="overflow-y-auto flex-grow">
                        {#each autoAttackLog as log}
                            <p class="text-sm text-gray-300">[{log.time}s] Used <span class="text-[#8c7ae6]">{log.ability}</span> for <span class="text-red-400">{log.damage}</span> damage.</p>
                        {/each}
                    </div>
                </div>

                <div class="bg-[#1a1a2e] p-4 rounded-lg border border-[#3b3b5c] flex flex-col h-full">
                    <h4 class="text-lg font-semibold text-white mb-2">Direct Damage</h4>
                    <div class="overflow-y-auto flex-grow">
                        {#each directDamageLog as log}
                            <p class="text-sm text-gray-300">[{log.time}s] Used <span class="text-[#8c7ae6]">{log.ability}</span> for <span class="text-red-400">{log.damage}</span> damage.</p>
                        {/each}
                    </div>
                </div>

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

</style>
