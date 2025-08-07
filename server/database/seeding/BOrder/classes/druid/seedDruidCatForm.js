import db from '../../../../connection.js';

/**
 * Seeds all Cat Form abilities and their related effects for the Druid class.
 * This function is self-contained and retrieves the Druid ID from the database.
 */
export default async function seedDruidCatForm() {
    try {
        console.log("Seeding Druid Cat Form abilities with final schema...");

        const druidId = (await db.get("SELECT id FROM classes WHERE name = 'Druid'")).id;
        const catFormStateId = (await db.get(`SELECT id FROM states WHERE name = 'Cat Form'`)).id;
        const stealthStateId = (await db.get(`SELECT id FROM states WHERE name = 'Stealth'`)).id;
        const manaId = (await db.get(`SELECT id FROM resources WHERE name = 'Mana'`)).id;
        const energyId = (await db.get(`SELECT id FROM resources WHERE name = 'Energy'`)).id;
        const agilityStatId = (await db.get("SELECT id FROM stats WHERE name = 'Agility'")).id;
        const strengthStatId = (await db.get("SELECT id FROM stats WHERE name = 'Strength'")).id;

        await db.run(`
            INSERT OR IGNORE INTO abilities (class_id, name, description, ability_type, cooldown, school, resource_id, resource_cost)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `, [druidId, 'Cat Form', 'Shapeshift into a nimble cat, increasing Agility and changing your primary resource to Energy.', 'Shapeshift', 1.5, 'Physical', manaId, 10]);
        const catFormAbilityId = (await db.get(`SELECT id FROM abilities WHERE name = 'Cat Form'`)).id;

        await db.run(`
            INSERT OR IGNORE INTO abilities (class_id, name, description, ability_type, cooldown, school, resource_id, resource_cost)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `, [druidId, 'Stealth', 'Crouch low and become undetectable to enemies. Requires Cat Form.', 'Utility', 60.0, 'Physical', energyId, 25]);
        const stealthAbilityId = (await db.get(`SELECT id FROM abilities WHERE name = 'Stealth'`)).id;

        // Effect to apply the Cat Form state
        await db.run(`
            INSERT OR IGNORE INTO ability_effects (name, description, effect_type, applied_state_id, duration)
            VALUES (?, ?, ?, ?, ?);
        `, ['Apply Cat Form State', 'Puts the caster in Cat Form.', 'apply_state', catFormStateId, -1]);
        const applyCatFormStateEffectId = (await db.get(`SELECT id FROM ability_effects WHERE name = 'Apply Cat Form State'`)).id;
        
        // Effect for Strength bonus
        await db.run(`
            INSERT OR IGNORE INTO ability_effects (name, description, effect_type, duration, value, value_per_level)
            VALUES (?, ?, ?, ?, ?, ?);
        `, ['Cat Form Strength Bonus', 'Provides a flat and per-level bonus to Strength while in Cat Form.', 'stat_bonus_strength', -1, 5, 3.0]);
        const catFormStrengthEffectId = (await db.get(`SELECT id FROM ability_effects WHERE name = 'Cat Form Strength Bonus'`)).id;

        // Effect for Agility bonus
        await db.run(`
            INSERT OR IGNORE INTO ability_effects (name, description, effect_type, duration, value, value_per_level)
            VALUES (?, ?, ?, ?, ?, ?);
        `, ['Cat Form Agility Bonus', 'Provides a flat and per-level bonus to Agility while in Cat Form.', 'stat_bonus_agility', -1, 5, 3.0]);
        const catFormAgilityEffectId = (await db.get(`SELECT id FROM ability_effects WHERE name = 'Cat Form Agility Bonus'`)).id;

        // Effect to apply the Stealth state
        await db.run(`
            INSERT OR IGNORE INTO ability_effects (name, description, effect_type, applied_state_id, duration)
            VALUES (?, ?, ?, ?, ?);
        `, ['Apply Stealth State', 'Puts the caster in Stealth.', 'apply_state', stealthStateId, -1]);
        const applyStealthStateEffectId = (await db.get(`SELECT id FROM ability_effects WHERE name = 'Apply Stealth State'`)).id;

        // Cat Form ability triggers both the state application and the stat bonuses.
        await db.run(`
            INSERT OR IGNORE INTO ability_to_effects (ability_id, effect_id) VALUES (?, ?);
        `, [catFormAbilityId, applyCatFormStateEffectId]);
        await db.run(`
            INSERT OR IGNORE INTO ability_to_effects (ability_id, effect_id) VALUES (?, ?);
        `, [catFormAbilityId, catFormStrengthEffectId]);
        await db.run(`
            INSERT OR IGNORE INTO ability_to_effects (ability_id, effect_id) VALUES (?, ?);
        `, [catFormAbilityId, catFormAgilityEffectId]);

        // Stealth ability only triggers its own state application effect.
        await db.run(`
            INSERT OR IGNORE INTO ability_to_effects (ability_id, effect_id) VALUES (?, ?);
        `, [stealthAbilityId, applyStealthStateEffectId]);

        await db.run(`
            INSERT OR IGNORE INTO ability_to_states (ability_id, state_id)
            VALUES (?, ?);
        `, [stealthAbilityId, catFormStateId]);

        console.log("Druid Cat Form abilities and stat bonuses seeded successfully!");

    } catch (err) {
        console.error('An error occurred during Cat Form seeding:', err.message);
        throw err;
    }
}
