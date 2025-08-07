import db from '../../../../connection.js';

export default async function seedNoviceDrops() {
    console.log('Seeding Novice drops');

    const drops = [
        { name: 'Boar Tusks', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Boar', 
            endurance_bonus: 1,
            conditioning_bonus: 1
        },

        { name: 'Boar Tail', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Boar', 
            endurance_bonus: 1,
            conditioning_bonus: 1
        },

        { name: 'Boar Hoofs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Boar', 
            endurance_bonus: 1,
            conditioning_bonus: 1
        },

        { name: 'Deer Hoofs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Deer', 
            stamina_bonus: 1,
            grace_bonus: 1
        },

        { name: 'Deer Tail', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Deer', 
            stamina_bonus: 1,
            grace_bonus: 1
        },

        { name: 'Elk Antlers', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Elk', 
            stamina_bonus: 1,
            conditioning_bonus: 1
        },

        { name: 'Elk Hoofs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Elk', 
            stamina_bonus: 1,
            conditioning_bonus: 1
        },

        { name: 'Elk Tail', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Elk', 
            stamina_bonus: 1,
            conditioning_bonus: 1
        },

        { name: 'Ox Horns', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Ox', 
            strength_bonus: 2
        },

        { name: 'Ox Hoofs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Ox', 
            strength_bonus: 2
        },

        { name: 'Ox Tail', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Ox', 
            strength_bonus: 2
        },

        { name: 'Basilisk Horns', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Basilisk', 
            strength_bonus: 1,
            agility_bonus: 1
        },

        { name: 'Basilisk Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Basilisk', 
            strength_bonus: 1,
            agility_bonus: 1
        },

        { name: 'Basilisk Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Basilisk', 
            strength_bonus: 1,
            agility_bonus: 1
        },

        { name: 'Blue Dragon Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            intelligence_bonus: 1,
            aura_bonus: 1
        },

        { name: 'Blue Dragon Horns', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            intelligence_bonus: 1,
            aura_bonus: 1
        },

        { name: 'Blue Dragon Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            intelligence_bonus: 1,
            aura_bonus: 1
        },

        { name: 'Black Dragon Horns', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            strength_bonus: 1,
            endurance_bonus: 1
        },

        { name: 'Black Dragon Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            strength_bonus: 1,
            endurance_bonus: 1
        },

        { name: 'Black Dragon Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            strength_bonus: 1,
            endurance_bonus: 1
        },

        { name: 'Green Dragon Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            agility_bonus: 1,
            dexterity_bonus: 1
        },

        { name: 'Green Dragon Horns', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            agility_bonus: 1,
            dexterity_bonus: 1
        },

        { name: 'Green Dragon Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            agility_bonus: 1,
            dexterity_bonus: 1
        },

        { name: 'Red Dragon Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            strength_bonus: 1,
            grace_bonus: 1
        },

        { name: 'Red Dragon Horns', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            strength_bonus: 1,
            grace_bonus: 1
        },

        { name: 'Red Dragon Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            strength_bonus: 1,
            grace_bonus: 1
        },

        { name: 'White Dragon Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            agility_bonus: 1,
            celerity_bonus: 1
        },

        { name: 'White Dragon Horns', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            agility_bonus: 1,
            celerity_bonus: 1
        },

        { name: 'White Dragon Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            agility_bonus: 1,
            celerity_bonus: 1
        },

        { name: 'Wyvern Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            grace_bonus: 1,
            celerity_bonus: 1
        },

        { name: 'Wyvern Horns', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            grace_bonus: 1,
            celerity_bonus: 1
        },

        { name: 'Wyvern Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Dragon', 
            grace_bonus: 1,
            celerity_bonus: 1
        },
        
        { name: 'Bear Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Bear', 
            endurance_bonus: 1,
            toughness_bonus: 1
        },

        { name: 'Bear Ears', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Bear', 
            endurance_bonus: 1,
            toughness_bonus: 1
        },

        { name: 'Bear Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Bear', 
            endurance_bonus: 1,
            toughness_bonus: 1
        },

        { name: 'Wolf Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Wolf', 
            strength_bonus: 1,
            stamina_bonus: 1
        },

        { name: 'Wolf Tail', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Wolf', 
            strength_bonus: 1,
            stamina_bonus: 1
        },

        { name: 'Wolf Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Wolf', 
            strength_bonus: 1,
            toughness_bonus: 1
        },

        { name: 'Panther Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Panther', 
            agility_bonus: 2
        },

        { name: 'Panther Tail', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Panther', 
            agility_bonus: 2
        },

        { name: 'Panther Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Panther', 
            agility_bonus: 2
        },

        { name: 'Lynx Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Lynx', 
            agility_bonus: 1,
            celerity_bonus: 1
        },

        { name: 'Lynx Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Lynx', 
            agility_bonus: 1,
            celerity_bonus: 1
        },

        { name: 'Lynx Tail', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Lynx', 
            agility_bonus: 1,
            celerity_bonus: 1
        },

        { name: 'Tiger Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Tiger', 
            agility_bonus: 1,
            strength_bonus: 1
        },

        { name: 'Tiger Tail', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Tiger', 
            agility_bonus: 1,
            strength_bonus: 1
        },

        { name: 'Tiger Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Tiger', 
            agility_bonus: 1,
            strength_bonus: 1
        },

        { name: 'Lion Fangs', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Lion', 
            agility_bonus: 1,
            strength_bonus: 1
        },

        { name: 'Lion Tail', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Lion', 
            agility_bonus: 1,
            strength_bonus: 1
        },

        { name: 'Lion Claws', 
            rarity: 'Novice', 
            type: 'Drops', 
            subtype: 'Lion', 
            agility_bonus: 1,
            strength_bonus: 1
        },
    ];

    try {
        for (const drop of drops) {
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
                    drop.name, drop.description, drop.rarity, drop.type, drop.subtype, drop.weight, 
                    drop.strength_bonus || 0, drop.stamina_bonus || 0, drop.endurance_bonus || 0, drop.conditioning_bonus || 0,
                    drop.agility_bonus || 0, drop.dexterity_bonus || 0, drop.celerity_bonus || 0, drop.grace_bonus || 0,
                    drop.intelligence_bonus || 0, drop.acuity_bonus || 0, drop.alacrity_bonus || 0, drop.clarity_bonus || 0,
                    drop.essence_bonus || 0, drop.spirit_bonus || 0, drop.aura_bonus || 0, drop.toughness_bonus || 0,
                    drop.strength_percent_bonus || 0.0, drop.agility_percent_bonus || 0.0, drop.intelligence_percent_bonus || 0.0,
                    drop.armor_flat_bonus || 0, drop.armor_percent_bonus || 0.0, drop.magic_resistance_bonus || 0,
                    drop.physical_resistance_bonus || 0, drop.dps_bonus || 0.0, drop.dps_percent_bonus || 0.0,
                    drop.attack_speed_bonus || 0.0, drop.attack_speed_percent_bonus || 0.0, drop.crit_chance_bonus || 0.0,
                    drop.crit_damage_bonus || 0.0, drop.block_chance_bonus || 0.0, drop.block_value_bonus || 0,
                    drop.dodge_chance_bonus || 0.0, drop.parry_chance_bonus || 0.0, drop.parry_value_bonus || 0,
                    drop.deflection_chance_bonus || 0.0, drop.deflection_value_bonus || 0, drop.aura_value_bonus || 0,
                    drop.active_effect_text || null, drop.lore_text || null
                ]
            );
        }
        console.log('Success'); // Updated console log
    } catch (err) {
        console.error('Error: ', err.message); // Updated console log
        throw err;
    }
}
