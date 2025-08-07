import db from '../../../../../../connection.js';

export default async function seedExpertHerbs() {
    console.log('Seeding Expert botanical ingredients...');

    const herbs = [
        { name: 'Titanbloom', description: 'Found in ancient, untouched forests where ley lines converge.', rarity: 'Expert', type: 'Botanical ingredient', strength_bonus: 12 },
        { name: 'Deeprock Root', description: 'Found in mineral-rich caves.', rarity: 'Expert', type: 'Botanical ingredient', stamina_bonus: 12 },
        { name: 'Cinderbloom', description: 'Growing on exposed mountain peaks frequently struck by lightning.', rarity: 'Expert', type: 'Botanical ingredient', endurance_bonus: 12 },
        { name: 'Thunderleaf', description: 'Thriving on exposed, high-altitude ridges frequently battered by thunderstorms.', rarity: 'Expert', type: 'Botanical ingredient', conditioning_bonus: 12 },
        { name: 'Silkenvine', description: 'Clinging to the highest, most dangerous peaks.', rarity: 'Expert', type: 'Botanical ingredient', agility_bonus: 12 },
        { name: 'Moonshard Spore', description: 'Found in high-altitude caves where starlight is purest.', rarity: 'Expert', type: 'Botanical ingredient', dexterity_bonus: 12 },
        { name: 'Zephyrgrass', description: 'Growing in expansive fields on high plateaus.', rarity: 'Expert', type: 'Botanical ingredient', celerity_bonus: 12 },
        { name: 'Aetherpetal', description: 'Found clinging to the highest branches of ancient, cloud-piercing trees.', rarity: 'Expert', type: 'Botanical ingredient', grace_bonus: 12 },
        { name: 'Astralcap', description: 'Growing in cursed lands where forbidden rituals were performed.', rarity: 'Expert', type: 'Botanical ingredient', intelligence_bonus: 12 },
        { name: 'Cosmic Bloom', description: 'Blooming only in high-altitude crystal caves that align with celestial bodies.', rarity: 'Expert', type: 'Botanical ingredient', acuity_bonus: 12 },
        { name: 'Flickerseed', description: 'Found scattered around the base of rare bioluminescent plants deep in untouched caverns.', rarity: 'Expert', type: 'Botanical ingredient', alacrity_bonus: 12 },
        { name: 'Voidlight Sprout', description: 'Pushing through desolate soil at the edges of planar rifts.', rarity: 'Expert', type: 'Botanical ingredient', clarity_bonus: 12 },
        { name: 'Manaflow Moss', description: 'Forming thick carpets around ancient runestones.', rarity: 'Expert', type: 'Botanical ingredient', essence_bonus: 12 },
        { name: 'Echo Orchid', description: 'Growing in forgotten crypts and haunted glades where spirits linger.', rarity: 'Expert', type: 'Botanical ingredient', spirit_bonus: 12 },
        { name: 'Abyssal Fern', description: 'Growing near planar rifts or abyssal intrusions.', rarity: 'Expert', type: 'Botanical ingredient', aura_bonus: 12 },
        { name: 'Stormwall Root', description: 'Burrows deep into the soil of storm-ravaged coastlines.', rarity: 'Expert', type: 'Botanical ingredient', toughness_bonus: 12 },
        { name: 'Glyphwood Bark', description: 'From ancient trees found near forgotten runestones or sites of primal magic.', rarity: 'Expert', type: 'Botanical ingredient', armor_flat_bonus: 12 },

        { name: 'Forgeheart Catalyst', description: 'Found in mineral-rich caves.', rarity: 'Expert', type: 'Botanical ingredient (Catalyst)', strength_percent_bonus: 24 },
        { name: 'Skywhisper Catalyst', description: 'Found on trees growing in profoundly sacred groves.', rarity: 'Expert', type: 'Botanical ingredient (Catalyst)', agility_percent_bonus: 24 },
        { name: 'Stargazer Catalyst', description: 'Blooms only in sacred, untainted glades.', rarity: 'Expert', type: 'Botanical ingredient (Catalyst)', intelligence_percent_bonus: 24 },
        { name: 'Stoneflight Catalyst', description: 'Clinging to ancient, weathered stone structures.', rarity: 'Expert', type: 'Botanical ingredient (Catalyst)', strength_percent_bonus: 24, agility_percent_bonus: 24 },
        { name: 'Earthmind Catalyst', description: 'Found in secluded glades where magic lingers.', rarity: 'Expert', type: 'Botanical ingredient (Catalyst)', strength_percent_bonus: 24, intelligence_percent_bonus: 24 },
        { name: 'Spiritwind Catalyst', description: 'Growing in places of strong magical confluence or where powerful beings have rested.', rarity: 'Expert', type: 'Botanical ingredient (Catalyst)', agility_percent_bonus: 24, intelligence_percent_bonus: 24 },
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
    console.log('Expert botanical ingredients seeding completed successfully.');
}
