import db from '../../../../connection.js';

/**
 * Seeds the 'Shred' ability and its related effects for the Druid class.
 * This version is corrected to use the current database schema and now reflects
 * the game design where abilities have no base damage and scale entirely with stats.
 */
export default async function seedDruidCatFormAbilityShred() {
    try {
        console.log("Seeding Shred ability for Druid Cat Form...");

        // --- 1. Get necessary IDs from the database ---
        const druidResult = await db.get("SELECT id FROM classes WHERE name = 'Druid'");
        if (!druidResult) {
            console.error("Error: Druid class not found. Ensure the main Druid class has been seeded.");
            return;
        }
        const druidId = druidResult.id;

        // Get cooldown and state IDs from the database
        const druidGlobalCooldownId = (await db.get(`SELECT id FROM cooldowns WHERE type = 'Druid Global'`)).id;
        const catFormStateId = (await db.get(`SELECT id FROM states WHERE name = 'Cat Form'`)).id;
        const energyId = (await db.get(`SELECT id FROM resources WHERE name = 'Energy'`)).id;

        // --- 2. Insert the Shred ability into the abilities table ---
        // Removed global_cooldown_id as this is now handled by the ability_to_cooldowns table
        await db.run(`
            INSERT OR IGNORE INTO abilities (class_id, name, description, ability_type, cooldown, school, resource_id, resource_cost, positional_req)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [
            druidId,
            'Shred',
            'Shreds the target, dealing massive physical damage. Usable only in Cat Form.',
            'Damage',
            0, // This ability is on the global cooldown, not a unique one
            'Physical',
            energyId,
            40,
            'Behind'
        ]);
        const shredAbilityId = (await db.get(`SELECT id FROM abilities WHERE name = 'Shred'`)).id;

        // --- 3. Insert the Shred Damage effect with scaling into the ability_effects table ---
        // As per the game design, value is 0 and scaling is based on attack_power
        await db.run(`
            INSERT OR IGNORE INTO ability_effects (name, description, effect_type, value, value_per_level, scaling_type, scaling_value, school)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `, [
            'Shred Damage',
            'Deals physical damage based on attack power.',
            'damage',
            0.0, // Base damage is 0.0, as all damage scales with stats
            0.0, // No per-level scaling for this ability
            'attack_power', // The scaling type is now explicit
            2.5, // Multiplier for the character's attack power
            'Physical'
        ]);
        const shredDamageEffectId = (await db.get(`SELECT id FROM ability_effects WHERE name = 'Shred Damage'`)).id;

        // --- 4. Link the Shred ability to its effects ---
        await db.run(`
            INSERT OR IGNORE INTO ability_to_effects (ability_id, effect_id, order_index, delay_seconds)
            VALUES (?, ?, ?, ?);
        `, [shredAbilityId, shredDamageEffectId, 0, 0]);

        // --- 5. Link Shred to its prerequisite state (Cat Form) ---
        await db.run(`
            INSERT OR IGNORE INTO ability_to_states (ability_id, state_id)
            VALUES (?, ?);
        `, [shredAbilityId, catFormStateId]);

        // --- 6. Link Shred to its global cooldown via the new junction table ---
        await db.run(`
            INSERT OR IGNORE INTO ability_to_cooldowns (ability_id, cooldown_id)
            VALUES (?, ?);
        `, [shredAbilityId, druidGlobalCooldownId]);

        console.log("Shred ability seeded successfully!");

    } catch (err) {
        console.error('An error occurred during Shred ability seeding:', err.message);
        throw err;
    }
}
