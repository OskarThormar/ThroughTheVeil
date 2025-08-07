// database/seeding/items/materials/herbalism/insertApprenticeHerbs.js
// This script inserts Apprentice-level botanical ingredients into the 'profession_materials' table.

import db from '../../../../../connection.js'; // Correct path to connection.js

export default async function seedApprenticeHerbs() {
    console.log('Seeding Apprentice botanicals');

    const botanicals = [ // Renamed 'herbs' to 'botanicals'
        // --- APPRENTICE (Sum 6, Max 1 Kind) ---
        // 17 unique types (15 psychic alignments + Toughness + Armor_flat_bonus)
        { name: 'Ironbloom', description: 'Found in ancient, undisturbed forests.', rarity: 'Apprentice', type: 'Botanical', subtype: 'Flower', strength_bonus: 6 },
        { name: 'Deepmoss', description: 'From resilient trees in oldest forests.', rarity: 'Apprentice', type: 'Botanical', subtype: 'Stalk', stamina_bonus: 6 },
        { name: 'Volcaroot', description: 'Thriving near volcanic vents.', rarity: 'Apprentice', type: 'Botanical', subtype: 'Root', endurance_bonus: 6 },
        { name: 'Stormleaf', description: 'Growing on exposed mountaintops.', rarity: 'Apprentice', type: 'Botanical', conditioning_bonus: 6 },
        { name: 'Skywhisper', description: 'Clinging to windswept plateaus.', rarity: 'Apprentice', type: 'Botanical', agility_bonus: 6 },
        { name: 'Glimmerdust', description: 'Found at the base of ancient trees.', rarity: 'Apprentice', type: 'Botanical', dexterity_bonus: 6 },
        { name: 'Windrush', description: 'Found in expansive fields on high plateaus.', rarity: 'Apprentice', type: 'Botanical', celerity_bonus: 6 },
        { name: 'Mistveil', description: 'Found in misty, haunted swamps.', rarity: 'Apprentice', type: 'Botanical', grace_bonus: 6 },
        { name: 'Frostcore', description: 'Found in glacial caves.', rarity: 'Apprentice', type: 'Botanical', intelligence_bonus: 6 },
        { name: 'Moonlight', description: 'Blooms only under a full moon, near tranquil moonlit pools.', rarity: 'Apprentice', type: 'Botanical', acuity_bonus: 6 },
        { name: 'Sparkbud', description: 'Growing on peaks frequently struck by lightning.', rarity: 'Apprentice', type: 'Botanical', alacrity_bonus: 6 },
        { name: 'Spiritsprout', description: 'Found in sacred groves.', rarity: 'Apprentice', type: 'Botanical', clarity_bonus: 6 },
        { name: 'Aetherweb', description: 'Forming web-like patterns on ancient trees.', rarity: 'Apprentice', type: 'Botanical', essence_bonus: 6 },
        { name: 'Elysian Bloom', description: 'Found in sacred, untainted glades.', rarity: 'Apprentice', type: 'Botanical', spirit_bonus: 6 },
        { name: 'Voidpetal', description: 'Found at the edges of planar rifts.', rarity: 'Apprentice', type: 'Botanical', aura_bonus: 6 },
        { name: 'Stonehide', description: 'Found in the deepest, most stable caverns.', rarity: 'Apprentice', type: 'Botanical', toughness_bonus: 6 },
        { name: 'Crimsonbark', description: 'From ancient trees.', rarity: 'Apprentice', type: 'Botanical', armor_flat_bonus: 6 },

        // --- APPRENTICE CATALYSTS (12% to 1 or 2 Archetypes) ---
        { name: 'Terra Catalyst', description: 'Found in temperate forests.', rarity: 'Apprentice', type: 'Botanical (Catalyst)', strength_percent_bonus: 12 },
        { name: 'Azure Catalyst', description: 'Found on bushes in open meadows.', rarity: 'Apprentice', type: 'Botanical (Catalyst)', agility_percent_bonus: 12 },
        { name: 'Runeglow Catalyst', description: 'Found near ancient magical ruins.', rarity: 'Apprentice', type: 'Botanical (Catalyst)', intelligence_percent_bonus: 12 }
    ];

    try {
        for (const botanical of botanicals) { // Renamed 'herb' to 'botanical'
            await db.run(
                `INSERT OR IGNORE INTO profession_materials (
                    name, description, rarity, type, weight,
                    strength_bonus, stamina_bonus, endurance_bonus, conditioning_bonus,
                    agility_bonus, dexterity_bonus, celerity_bonus, grace_bonus,
                    intelligence_bonus, acuity_bonus, alacrity_bonus, clarity_bonus,
                    essence_bonus, spirit_bonus, aura_bonus, toughness_bonus,
                    strength_percent_bonus, agility_percent_bonus, intelligence_percent_bonus,
                    armor_flat_bonus, armor_percent_bonus, magic_resistance_bonus,
                    physical_resistance_bonus, dps_bonus, dps_percent_bonus,
                    attack_speed_bonus, attack_speed_percent_bonus, crit_chance_bonus,
                    crit_damage_bonus, block_chance_bonus, block_value_bonus, dodge_chance_bonus,
                    parry_chance_bonus, parry_value_bonus, deflection_chance_bonus,
                    deflection_value_bonus, aura_value_bonus,
                    active_effect_text, lore_text
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [
                    botanical.name, botanical.description, botanical.rarity, botanical.type, botanical.weight, 
                    botanical.strength_bonus || 0, botanical.stamina_bonus || 0, botanical.endurance_bonus || 0, botanical.conditioning_bonus || 0,
                    botanical.agility_bonus || 0, botanical.dexterity_bonus || 0, botanical.celerity_bonus || 0, botanical.grace_bonus || 0,
                    botanical.intelligence_bonus || 0, botanical.acuity_bonus || 0, botanical.alacrity_bonus || 0, botanical.clarity_bonus || 0,
                    botanical.essence_bonus || 0, botanical.spirit_bonus || 0, botanical.aura_bonus || 0, botanical.toughness_bonus || 0,
                    botanical.strength_percent_bonus || 0.0, botanical.agility_percent_bonus || 0.0, botanical.intelligence_percent_bonus || 0.0,
                    botanical.armor_flat_bonus || 0, botanical.armor_percent_bonus || 0.0, botanical.magic_resistance_bonus || 0,
                    botanical.physical_resistance_bonus || 0, botanical.dps_bonus || 0.0, botanical.dps_percent_bonus || 0.0,
                    botanical.attack_speed_bonus || 0.0, botanical.attack_speed_percent_bonus || 0.0, botanical.crit_chance_bonus || 0.0,
                    botanical.crit_damage_bonus || 0.0, botanical.block_chance_bonus || 0.0, botanical.block_value_bonus || 0,
                    botanical.dodge_chance_bonus || 0.0, botanical.parry_chance_bonus || 0.0, botanical.parry_value_bonus || 0,
                    botanical.deflection_chance_bonus || 0.0, botanical.deflection_value_bonus || 0, botanical.aura_value_bonus || 0,
                    botanical.active_effect_text || null, botanical.lore_text || null
                ]
            );
        }
        console.log('Success'); // Updated console log
    } catch (err) {
        console.error('Error during Apprentice botanical seeding:', err.message); // Updated console log
        throw err;
    }
}
