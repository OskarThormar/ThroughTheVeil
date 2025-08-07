import db from '../../../../../connection.js';

export default async function seedNoviceHerbs() {
    console.log('Seeding Novice botanical ingredients...');

    const herbs = [
        { name: 'Sunpetal', description: 'Found in sun-drenched meadows.', rarity: 'Novice', type: 'Botanical ingredient', strength_bonus: 3 },
        { name: 'Deeproot', description: 'Found in damp, shaded forest floors.', rarity: 'Novice', type: 'Botanical ingredient', stamina_bonus: 3 },
        { name: 'Cragbloom', description: 'Clinging to rocky outcrops.', rarity: 'Novice', type: 'Botanical ingredient', endurance_bonus: 3 },
        { name: 'Windleaf', description: 'Thriving in open, windswept plains.', rarity: 'Novice', type: 'Botanical ingredient', conditioning_bonus: 3 },
        { name: 'Skyvine', description: 'Growing in dense jungle canopies.', rarity: 'Novice', type: 'Botanical ingredient', agility_bonus: 3 },
        { name: 'Whisperspore', description: 'Found in quiet, secluded glades.', rarity: 'Novice', type: 'Botanical ingredient', dexterity_bonus: 3 },
        { name: 'Swiftgrass', description: 'Found on high, windswept peaks.', rarity: 'Novice', type: 'Botanical ingredient', celerity_bonus: 3 },
        { name: 'Moonpetal', description: 'Blooming near tranquil moonlit pools.', rarity: 'Novice', type: 'Botanical ingredient', grace_bonus: 3 },
        { name: 'Glimmercap', description: 'Discovered deep within damp caves.', rarity: 'Novice', type: 'Botanical ingredient', intelligence_bonus: 3 },
        { name: 'Azurebloom', description: 'Found only on secluded mountaintops.', rarity: 'Novice', type: 'Botanical ingredient', acuity_bonus: 3 },
        { name: 'Emberbud', description: 'Found in areas touched by lingering heat.', rarity: 'Novice', type: 'Botanical ingredient', alacrity_bonus: 3 },
        { name: 'Brightsprout', description: 'Found in areas rich with natural magic.', rarity: 'Novice', type: 'Botanical ingredient', clarity_bonus: 3 },
        { name: 'Spiritmoss', description: 'Found in perpetually misty forests.', rarity: 'Novice', type: 'Botanical ingredient', essence_bonus: 3 },
        { name: 'Soulbloom', description: 'Found in places of profound spiritual peace.', rarity: 'Novice', type: 'Botanical ingredient', spirit_bonus: 3 },
        { name: 'Shadowleaf', description: 'Found in areas of perpetual shadow.', rarity: 'Novice', type: 'Botanical ingredient', aura_bonus: 3 },
        { name: 'Bogroot', description: 'Embedded deep within stagnant bogs.', rarity: 'Novice', type: 'Botanical ingredient', toughness_bonus: 3 },
        { name: 'Ironbark', description: 'From a common forest tree.', rarity: 'Novice', type: 'Botanical ingredient', armor_flat_bonus: 3 },

        { name: 'Sunfire Catalyst', description: 'Found in common forest soil.', rarity: 'Novice', type: 'Botanical ingredient (Catalyst)', strength_percent_bonus: 6 },
        { name: 'Windswift Catalyst', description: 'Found in open fields.', rarity: 'Novice', type: 'Botanical ingredient (Catalyst)', agility_percent_bonus: 6 },
        { name: 'Starglow Catalyst', description: 'Floats in the air of damp caves.', rarity: 'Novice', type: 'Botanical ingredient (Catalyst)', intelligence_percent_bonus: 6 },
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
                herb.armor_flat_bonus || 0, 0.0, 0,
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
    console.log('Novice botanical ingredients seeding completed successfully.');
}
