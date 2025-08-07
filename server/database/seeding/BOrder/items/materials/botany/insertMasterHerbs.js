// database/seeding/items/materials/herbalism/insertMasterHerbs.js
// This script inserts Master-level botanical ingredients into the 'profession_materials' table.

import db from '../../../../../connection.js'; // Correct path to connection.js

export default async function seedMasterHerbs() {
    console.log('Seeding Master botanical ingredients...');

    const herbs = [
        // --- MASTER (Sum 15, Max 1 Kind) ---
        { name: 'Leyline Bloom', description: 'Found in ancient, untouched forests where ley lines converge.', rarity: 'Master', type: 'Botanical ingredient', strength_bonus: 15 },
        { name: 'Aether Core', description: 'Found where the veil between worlds is thinnest.', rarity: 'Master', type: 'Botanical ingredient', stamina_bonus: 15 },
        { name: 'Titan Petal', description: 'Growing in ancient, primordial lands where titans once roamed.', rarity: 'Master', type: 'Botanical ingredient', endurance_bonus: 15 },
        { name: 'Dragonscale Leaf', description: 'Growing near ancient dragon lairs.', rarity: 'Master', type: 'Botanical ingredient', conditioning_bonus: 15 },
        { name: 'Skycoil Vine', description: 'Clinging to the highest, most dangerous peaks.', rarity: 'Master', type: 'Botanical ingredient', agility_bonus: 15 },
        { name: 'Cosmic Spore', description: 'Found in high-altitude caves or on exposed peaks where starlight is purest.', rarity: 'Master', type: 'Botanical ingredient', dexterity_bonus: 15 },
        { name: 'Temporal Grass', description: 'Growing in expansive fields on high plateaus.', rarity: 'Master', type: 'Botanical ingredient', celerity_bonus: 15 },
        { name: 'Divinelily', description: 'Found only in sacred, untainted glades touched by divine presence.', rarity: 'Master', type: 'Botanical ingredient', grace_bonus: 15 },
        { name: 'Forbidden Fungus', description: 'Growing in cursed lands or areas where forbidden rituals were performed.', rarity: 'Master', type: 'Botanical ingredient', intelligence_bonus: 15 },
        { name: 'Nebula Bloom', description: 'Blooming only in high-altitude crystal caves that align with celestial bodies.', rarity: 'Master', type: 'Botanical ingredient', acuity_bonus: 15 },
        { name: 'Chronoseed', description: 'Found scattered around the base of rare bioluminescent plants deep in untouched caverns.', rarity: 'Master', type: 'Botanical ingredient', alacrity_bonus: 15 },
        { name: 'Riftsprout', description: 'Pushing through desolate soil at the edges of planar rifts.', rarity: 'Master', type: 'Botanical ingredient', clarity_bonus: 15 },
        { name: 'Arcanemoss', description: 'Forming thick carpets around ancient runestones.', rarity: 'Master', type: 'Botanical ingredient', essence_bonus: 15 },
        { name: 'Soulpetal', description: 'Growing in forgotten crypts and haunted glades where spirits linger.', rarity: 'Master', type: 'Botanical ingredient', spirit_bonus: 15 },
        { name: 'Umbral Fern', description: 'Growing near planar rifts or abyssal intrusions.', rarity: 'Master', type: 'Botanical ingredient', aura_bonus: 15 },
        { name: 'Ironhide Root', description: 'Burrows deep into the soil of storm-ravaged coastlines.', rarity: 'Master', type: 'Botanical ingredient', toughness_bonus: 15 },
        { name: 'Primal Bark', description: 'From ancient trees found near forgotten runestones or sites of primal magic.', rarity: 'Master', type: 'Botanical ingredient', armor_flat_bonus: 15 },

        // --- MASTER CATALYSTS (30% to 1 or 2 Archetypes) ---
        { name: 'Worldheart Catalyst', description: 'Found only in the most pristine and untouched primordial lands.', rarity: 'Master', type: 'Botanical ingredient (Catalyst)', strength_percent_bonus: 30 },
        { name: 'Skydance Catalyst', description: 'Grows on bushes found only on the highest, most exposed mountain ridges.', rarity: 'Master', type: 'Botanical ingredient (Catalyst)', agility_percent_bonus: 30 },
        { name: 'Cosmicmind Catalyst', description: 'Blooms only at the exact convergence point of multiple powerful ley lines.', rarity: 'Master', type: 'Botanical ingredient (Catalyst)', intelligence_percent_bonus: 30 },
        { name: 'Dragonhide Catalyst', description: 'Clinging to the highest, most dangerous peaks.', rarity: 'Master', type: 'Botanical ingredient (Catalyst)', strength_percent_bonus: 30, agility_percent_bonus: 30 },
        { name: 'Earthsong Catalyst', description: 'Found deep within forgotten caves or where elemental spirits converge.', rarity: 'Master', type: 'Botanical ingredient (Catalyst)', strength_percent_bonus: 30, intelligence_percent_bonus: 30 },
        { name: 'Soulfire Catalyst', description: 'Grows in places of strong magical confluence or where powerful beings have rested.', rarity: 'Master', type: 'Botanical ingredient (Catalyst)', agility_percent_bonus: 30, intelligence_percent_bonus: 30 },

        // --- Special Master botanical ingredient
        { name: 'White Lotus', description: 'unknown', rarity: 'Master', type: 'Botanical ingredient', lore_text: 'Makes elixirs persist through death'}
    ];

    for (const herb of herbs) {
        await db.run(
            `INSERT OR IGNORE INTO profession_materials (
                name, description, rarity, type, 
                strength_bonus, stamina_bonus, endurance_bonus, conditioning_bonus, 
                agility_bonus, dexterity_bonus, celerity_bonus, grace_bonus, 
                intelligence_bonus, acuity_bonus, alacrity_bonus, clarity_bonus, 
                essence_bonus, spirit_bonus, aura_bonus, toughness_bonus,
                strength_percent_bonus, agility_percent_bonus, intelligence_percent_bonus,
                armor_flat_bonus, armor_percent_bonus, magic_resistance_bonus, 
                physical_resistance_bonus, dps_bonus, dps_percent_bonus, 
                speed_bonus, speed_percent_bonus, crit_chance_bonus, 
                block_chance_bonus, block_value_bonus, dodge_chance_bonus, 
                parry_chance_bonus, parry_value_bonus, deflection_chance_bonus, 
                deflection_value_bonus, aura_value_bonus,
                active_effect_text, lore_text
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                herb.name, herb.description, herb.rarity, herb.type,
                herb.strength_bonus || 0, herb.stamina_bonus || 0, herb.endurance_bonus || 0, herb.conditioning_bonus || 0,
                herb.agility_bonus || 0, herb.dexterity_bonus || 0, herb.celerity_bonus || 0, herb.grace_bonus || 0,
                herb.intelligence_bonus || 0, herb.acuity_bonus || 0, herb.alacrity_bonus || 0, herb.clarity_bonus || 0,
                herb.essence_bonus || 0, herb.spirit_bonus || 0, herb.aura_bonus || 0, herb.toughness_bonus || 0,
                herb.strength_percent_bonus || 0.0, herb.agility_percent_bonus || 0.0, herb.intelligence_percent_bonus || 0.0,
                herb.armor_flat_bonus || 0, 0.0, 0, // armor_percent_bonus, magic_resistance_bonus
                0, 0.0, 0.0, // physical_resistance_bonus, dps_bonus, dps_percent_bonus
                0.0, 0.0, 0.0, // speed_bonus, speed_percent_bonus, crit_chance_bonus
                0.0, 0, 0.0, // block_chance_bonus, block_value_bonus, dodge_chance_bonus
                0.0, 0, 0.0, // parry_chance_bonus, parry_value_bonus, deflection_chance_bonus
                0, 0, // deflection_value_bonus, aura_value_bonus
                null, null // active_effect_text, lore_text
            ]
        );
        console.log(`Inserted botanical ingredient: ${herb.name}`);
    }
    console.log('Master botanical ingredients seeding completed successfully.');
}
