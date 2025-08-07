// Example of an INSERT statement and its values, matching your schema and item object.
// This is designed to be placed within the seedArmor function in insertArmor.js.
import db from '../../../connection.js';

// SQL INSERT statement with all 22 columns (excluding auto-incrementing 'id')
// Ensure the order of columns here matches your table schema and the order in the values array.
const sql = `
    INSERT OR IGNORE INTO items (
        name, magnitude, material_1, material_2, material_3, material_4, material_5, archetype, rarity, 
        armor, block_chance, block_value, dps, speed, 
        critical_strike_chance, type, subtype, item_slot,
        strength_requirement, agility_requirement, intelligence_requirement, 
        active_effects, enchantment, padding, oil, lore_text
    ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    );
`;

// Array of values, mapping directly to the columns in the SQL statement.
// Each value corresponds to a '?' placeholder in the SQL query.
const values = [
    'Azure Dragonscale Gauntlets',                      // name
    'Master',                                           // magnitude
    'Azure Dragonscales',                   // material_1
    'Frostpaw Leather',                                 // material_2
    'Shadow Panther Claws',                             // material_3
    null,                                               // material_4
    null,                                               // material_5
    'Intelligence',                                     // archetype
    'Magical',                                          // rarity
    82,                                                 // armor
    null,                                               // block_chance
    null,                                               // block_value
    null,                                               // dps
    null,                                               // speed
    null,                                               // critical_strike_chance
    'Armor',                                            // type
    'Medium Armor',                                     // subtype
    'Hands',                                            // item_slot
    12,                                                 // strength_requirement
    12,                                                 // agility_requirement
    38,                                                 // intelligence_requirement
    null,                                               // stats
    '8 Intelligence from Azure Dragonscales, 4 Strength from Frostpaw Leather and 4 Agility from Shadow Panther Claws', // active_effect_1
    null,                               //active_effect_2
    null,                               //active_effect_3
    null,                                               // enchantment
    null,                                               // padding
    null,                                               // oil
    null                                                // lore_text
];

await db.run(sql, values);
console.log(`Inserted: Azure Dragonscale Gauntlets`);

