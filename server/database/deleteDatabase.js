import db from './connection.js';

export default async function deleteDatabase() {
    console.log('Deleting all entries from the database...');

    try {
        await db.exec(`
            DELETE FROM creature_drops;
            DELETE FROM object_drops;
            DELETE FROM creatures;
            DELETE FROM objects;
            DELETE FROM zones;
            DELETE FROM vendor_materials;
            DELETE FROM profession_materials;
            DELETE FROM items;
            DELETE FROM professions;
            DELETE FROM specializations;
            DELETE FROM cooldowns;
            DELETE FROM effect_to_states;
            DELETE FROM ability_to_states;
            DELETE FROM states;
            DELETE FROM effect_to_triggered_effects;
            DELETE FROM ability_to_effects;
            DELETE FROM ability_effects;
            DELETE FROM abilities;
            DELETE FROM classes;
            DELETE FROM stats;
        `);
        console.log('Success: All entries deleted.');
    } catch (err) {
        console.error('Error deleting database entries: ', err.message);
        throw err;
    }
}
