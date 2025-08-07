// database/seeding/items/materials/botany/insertExpertBotanicals.js
import db from '../../../../../connection.js'; // Correct path to connection.js

export default async function seedExperiencedBotanicals() {
    console.log('Seeding Experienced botanicals'); // Updated console log

    const botanicals = [ // Renamed 'herbs' to 'botanicals'
        // --- EXPERIENCED (Sum 9, Max 1 Kind) ---
        // 17 unique types
        { name: 'Gritbloom', description: 'Found in ancient, untouched forests.', rarity: 'Experienced', type: 'Botanical', subtype: 'Flower', strength_bonus: 9 },
        { name: 'Deepstone Root', description: 'Found deep beneath ancient ruins.', rarity: 'Experienced', type: 'Botanical', subtype: 'Root', stamina_bonus: 9 },
        { name: 'Cragheart', description: 'Growing directly out of solid rock faces.', rarity: 'Experienced', type: 'Botanical', subtype: 'Stalk', endurance_bonus: 9 },
        { name: 'Sunscorch Leaf', description: 'Thriving in arid deserts.', rarity: 'Experienced', type: 'Botanical', subtype: 'Leaf', conditioning_bonus: 9 },
        { name: 'Skyshimmer Vine', description: 'Growing high in ancient canopies.', rarity: 'Experienced', type: 'Botanical', subtype: 'Stalk', agility_bonus: 9 },
        { name: 'Shadowdust Spore', description: 'Found in deep, untouched caves.', rarity: 'Experienced', type: 'Botanical', subtype: 'Mushroom', exterity_bonus: 9 },
        { name: 'Windrunner Grass', description: 'Found on high, windswept plateaus.', rarity: 'Experienced', type: 'Botanical', subtype: 'Leaf', celerity_bonus: 9 },
        { name: 'Aura Petal', description: 'Falling from rare magical flora.', rarity: 'Experienced', type: 'Botanical', subtype: 'Flower', grace_bonus: 9 },
        { name: 'Mindglow Moss', description: 'Forming glowing carpets on damp surfaces deep within dark caves.', rarity: 'Experienced', type: 'Botanical', subtype: 'Stalk', intelligence_bonus: 9 },
        { name: 'Veilbloom', description: 'Found where the veil between worlds is thin.', rarity: 'Experienced', type: 'Botanical', subtype: 'Flower', acuity_bonus: 9 },
        { name: 'Quicksilver Bud', description: 'Found in secluded glades where magic lingers.', rarity: 'Experienced', type: 'Botanical', subtype: 'Flower', alacrity_bonus: 9 },
        { name: 'Starfall Sprout', description: 'Found in areas rich with natural magic.', rarity: 'Experienced', type: 'Botanical', subtype: 'Stalk', clarity_bonus: 9 },
        { name: 'Dreamweave Moss', description: 'Found in perpetually misty forests.', rarity: 'Experienced', type: 'Botanical', subtype: 'Stalk', essence_bonus: 9 },
        { name: 'Soulwhisper Bloom', description: 'Found in places of profound spiritual peace.', rarity: 'Experienced', type: 'Botanical', subtype: 'Flower', spirit_bonus: 9 },
        { name: 'Nightshade Leaf', description: 'Found in areas of perpetual shadow.', rarity: 'Experienced', type: 'Botanical', subtype: 'Leaf', aura_bonus: 9 },
        { name: 'Mirehide Root', description: 'Embedded deep within stagnant bogs.', rarity: 'Experienced', type: 'Botanical', subtype: 'Root', toughness_bonus: 9 },
        { name: 'Stoneguard Bark', description: 'From a common forest tree.', rarity: 'Experienced', type: 'Botanical', subtype: 'Bark', armor_flat_bonus: 9 },

        // --- EXPERIENCED CATALYSTS (18% to 1 Archetype) ---
        { name: 'Tyrs Hair', description: 'Found near forgotten runestones.', rarity: 'Experienced', type: 'Botanical', subtype: 'Catalyst', strength_percent_bonus: 18 },
        { name: 'Ethereal Bloom', description: 'Found in areas of powerful, lingering magic.', rarity: 'Experienced', type: 'Botanical', subtype: 'Catalyst', agility_percent_bonus: 18 },
        { name: 'Deepmind Fungus', description: 'Found in deep, untouched caves.', rarity: 'Experienced', type: 'Botanical', subtype: 'Catalyst', intelligence_percent_bonus: 18 },
    ];

    try { // Added try block
        for (const botanical of botanicals) { // Renamed 'herb' to 'botanical'
            await db.run(
                `INSERT OR IGNORE INTO profession_materials (
                    name, description, rarity, type, subtype, weight,
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
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [
                    botanical.name, botanical.description, botanical.rarity, botanical.type, botanical.subtype, botanical.weight, 
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
        console.log('Sucecss.'); // Updated console log
    } catch (err) { // Added catch block
        console.error('Error during Experienced botanical seeding:', err.message); // Updated console log
        throw err;
    }
}
