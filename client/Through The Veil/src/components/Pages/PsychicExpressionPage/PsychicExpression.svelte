<script>
    let showStrengthTooltip = false;
    let showStaminaTooltip = false;
    let showEnduranceTooltip = false;
    let showConditioningTooltip = false;
    let showToughnessTooltip = false;
    let showAgilityTooltip = false;
    let showDexterityTooltip = false;
    let showCelerityTooltip = false;
    let showGraceTooltip = false;
    let showIntelligenceTooltip = false;
    let showAcuityTooltip = false;
    let showClarityTooltip = false;
    let showAlacrityTooltip = false;
    let showEssenceTooltip = false;
    let showSpiritTooltip = false;
    let showAuraTooltip = false;
</script>

<div class="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
    <h1 class="text-3xl font-bold mb-6 text-center text-teal-300">Stats Page</h1>
    <p class="text-lg text-gray-300 text-center mb-8">Hover over a stat for details!</p>

    <div class="">
        <!-- Strength Stat Block -->
        <div class="relative inline-block w-full">
            <h2 class="text-3xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showStrengthTooltip = true}
                on:mouseleave={() => showStrengthTooltip = false}>
                Strength
            </h2>
            
            {#if showStrengthTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Attack power</li>
                        <li><span class="font-medium text-blue-300"></span>Block value</li>
                        <li><span class="font-medium text-blue-300"></span>Block chance</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showEnduranceTooltip = true}
                on:mouseleave={() => showEnduranceTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Endurance
            </h2>
            
            {#if showEnduranceTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Maximum health</li>
                    </ul>
                </div>
            {/if}
        </div>
                <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showStaminaTooltip = true}
                on:mouseleave={() => showStaminaTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Stamina
            </h2>
            
            {#if showStaminaTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Maximum physical resources</li>
                        <li><span class="font-medium text-blue-300"></span>Physical resource generation</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showConditioningTooltip = true}
                on:mouseleave={() => showConditioningTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Conditioning
            </h2>
            
            {#if showConditioningTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Increases armor from items and effects</li>
                    </ul>
                </div>
            {/if}
        </div>
                <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showToughnessTooltip = true}
                on:mouseleave={() => showToughnessTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Toughness
            </h2>
            
            {#if showToughnessTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Damage interval</li>
                    </ul>
                </div>
            {/if}
        </div>
    </div>

    <div>
        <br>
    </div>

    <div class="">
        <!-- Agility Stat Block -->
        <div class="relative inline-block w-full">
            <h2 class="text-3xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showAgilityTooltip = true}
                on:mouseleave={() => showAgilityTooltip = false}>
                Agility
            </h2>
            
            {#if showAgilityTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Attack power</li>
                        <li><span class="font-medium text-blue-300"></span>Critical strike chance</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showDexterityTooltip = true}
                on:mouseleave={() => showDexterityTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Dexterity
            </h2>
            
            {#if showDexterityTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Physical hit</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showCelerityTooltip = true}
                on:mouseleave={() => showCelerityTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Celerity
            </h2>
            
            {#if showCelerityTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Attack speed</li>
                        <li><span class="font-medium text-blue-300"></span>Dodge chance</li>
                        <li><span class="font-medium text-blue-300"></span>Block chance</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showGraceTooltip = true}
                on:mouseleave={() => showGraceTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Grace
            </h2>
            
            {#if showGraceTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span> Physical resource cost</li>
                    </ul>
                </div>
            {/if}
        </div>
    </div>

    <div>
        <br>
    </div>

    <div class="">
        <div class="relative inline-block w-full">
            <h2 class="text-3xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showIntelligenceTooltip = true}
                on:mouseleave={() => showIntelligenceTooltip = false}>
                Intelligence
            </h2>
            
            {#if showIntelligenceTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Spell power</li>
                        <li><span class="font-medium text-blue-300"></span>Mana</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showAcuityTooltip = true}
                on:mouseleave={() => showAcuityTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Acuity
            </h2>
            
            {#if showAcuityTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Spell critical strike chance</li>
                    </ul>
                </div>
            {/if}
        </div>
                <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showAlacrityTooltip = true}
                on:mouseleave={() => showAlacrityTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Alacrity
            </h2>
            
            {#if showAlacrityTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Spell haste</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showClarityTooltip = true}
                on:mouseleave={() => showClarityTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Clarity
            </h2>
            
            {#if showClarityTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Spell hit</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showEssenceTooltip = true}
                on:mouseleave={() => showEssenceTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Essence
            </h2>
            
            {#if showEssenceTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Resource cost of magical abilities</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showSpiritTooltip = true}
                on:mouseleave={() => showSpiritTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Spirit
            </h2>
            
            {#if showSpiritTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Maximum magical resources</li>
                        <li><span class="font-medium text-blue-300"></span>Magical resource generation</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="relative inline-block w-full">
            <h2 class="text-xl font-bold text-teal-300 cursor-pointer inline-block"
                on:mouseenter={() => showAuraTooltip = true}
                on:mouseleave={() => showAuraTooltip = false}>
                &nbsp;&nbsp;&nbsp;&nbsp;Aura
            </h2>
            
            {#if showAuraTooltip}
                <div class="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700
                            min-w-[250px] md:min-w-[300px] left-0 top-full mt-2 transform -translate-x-1/4 sm:translate-x-0">
                    <ul class="list-disc list-inside space-y-1">
                        <li><span class="font-medium text-blue-300"></span>Slowly regenerating magical shield</li>
                    </ul>
                </div>
            {/if}
        </div>
    </div>
</div>
