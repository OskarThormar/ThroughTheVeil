import db from '../../../../connection.js';

export default async function seedDruidClass() {
    console.log('Seeding Druid class, stats, resources, cooldowns, and auto-attacks...');

    try {
        await db.run(`
            INSERT OR IGNORE INTO classes (name, description, archetype)
            VALUES ('Druid', 'A shapeshifting class that draws power from nature.', 'Intelligence');
        `);
        const druidResult = await db.get("SELECT id FROM classes WHERE name = 'Druid'");
        if (!druidResult) {
            console.error("Error: Could not retrieve Druid class ID. Ensure the 'classes' table exists and the insert was successful.");
            return;
        }
        const druidId = druidResult.id;
        console.log('Druid class entry ensured.');

        const strengthResult = await db.get("SELECT id FROM stats WHERE name = 'Strength'");
        const agilityResult = await db.get("SELECT id FROM stats WHERE name = 'Agility'");
        const intelligenceResult = await db.get("SELECT id FROM stats WHERE name = 'Intelligence'");

        if (!strengthResult || !agilityResult || !intelligenceResult) {
            console.error("Error: Core stats not found. Ensure 'stats' table is seeded first.");
            return;
        }

        const strengthId = strengthResult.id;
        const agilityId = agilityResult.id;
        const intelligenceId = intelligenceResult.id;

        await db.run("DELETE FROM class_stats WHERE class_id = ?", [druidId]);
        await db.run(`
            INSERT INTO class_stats (class_id, stat_id, base_value, per_level_gain)
            VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?);
        `, [
            druidId, strengthId, 5, 1,
            druidId, agilityId, 6, 1,
            druidId, intelligenceId, 12, 4
        ]);
        console.log("Druid class stats seeded successfully!");

        await db.run(`
            INSERT OR IGNORE INTO resources (name, description, default_max_value, default_regen_rate)
            VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?);
        `, [
            'Mana', 'A resource for spellcasting.', 200, 2.5,
            'Energy', 'A fast-regenerating resource used by Cat Form abilities.', 100, 10,
            'Rage', 'A slowly-building resource used by Bear Form abilities.', 0, 0
        ]);

        const manaId = (await db.get("SELECT id FROM resources WHERE name = 'Mana'")).id;
        const energyId = (await db.get("SELECT id FROM resources WHERE name = 'Energy'")).id;
        const rageId = (await db.get("SELECT id FROM resources WHERE name = 'Rage'")).id;

        await db.run("DELETE FROM class_resources WHERE class_id = ?", [druidId]);

        await db.run(`
            INSERT INTO class_resources (class_id, resource_id)
            VALUES (?, ?), (?, ?), (?, ?);
        `, [
            druidId, manaId,
            druidId, energyId,
            druidId, rageId
        ]);
        console.log("Druid class resources seeded successfully!");

        await db.run(`
            INSERT OR IGNORE INTO cooldowns (type, duration)
            VALUES ('Druid Global', 1.0),
                   ('Main-Hand Global', 1.0);
        `);
        await db.run(`
            INSERT OR IGNORE INTO states (name, description)
            VALUES ('Cat Form', 'The druid is in cat form.'),
                   ('Bear Form', 'The druid is in bear form.'),
                   ('Stealth', 'The caster is currently stealthed and unseen by enemies.');
        `);
        const druidGlobalCooldownId = (await db.get(`SELECT id FROM cooldowns WHERE type = 'Druid Global'`)).id;
        const mainHandGlobalCooldownId = (await db.get(`SELECT id FROM cooldowns WHERE type = 'Main-Hand Global'`)).id;
        const catFormStateId = (await db.get(`SELECT id FROM states WHERE name = 'Cat Form'`)).id;
        const bearFormStateId = (await db.get(`SELECT id FROM states WHERE name = 'Bear Form'`)).id;
        const stealthStateId = (await db.get(`SELECT id FROM states WHERE name = 'Stealth'`)).id;
        console.log("Druid global cooldowns and form states ensured.");

        // Caster Form Effect
        await db.run(`
            INSERT OR IGNORE INTO ability_effects (name, description, effect_type, school, is_removable, scaling_type, value, value_per_level, scaling_value)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, ['Auto Attack Damage (Caster)', 'Damage is based on the equipped weapon and physical stats.', 'damage', 'Physical', 0, 'attack_power', 0.0, 0.0, 1.0]);
        const casterAutoAttackDamageEffectId = (await db.get(`SELECT id FROM ability_effects WHERE name = 'Auto Attack Damage (Caster)'`)).id;

        // Cat Form Effect
        await db.run(`
            INSERT OR IGNORE INTO ability_effects (name, description, effect_type, school, is_removable, scaling_type, value, value_per_level, scaling_value)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, ['Auto Attack Damage (Cat Form)', 'Deals physical damage based on Agility.', 'damage', 'Physical', 0, 'attack_power', 0.0, 0.0, 1.0]);
        const catFormAutoAttackDamageEffectId = (await db.get(`SELECT id FROM ability_effects WHERE name = 'Auto Attack Damage (Cat Form)'`)).id;

        // Bear Form Effect
        await db.run(`
            INSERT OR IGNORE INTO ability_effects (name, description, effect_type, school, is_removable, scaling_type, value, value_per_level, scaling_value)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, ['Auto Attack Damage (Bear Form)', 'Deals physical damage based on Strength.', 'damage', 'Physical', 0, 'attack_power', 0.0, 0.0, 1.0]);
        const bearFormAutoAttackDamageEffectId = (await db.get(`SELECT id FROM ability_effects WHERE name = 'Auto Attack Damage (Bear Form)'`)).id;

        // Caster Form Auto Attack
        await db.run(`
            INSERT OR IGNORE INTO abilities (class_id, name, description, ability_type, cooldown, school, positional_req) 
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [druidId, 'Auto Attack (Caster)', 'A basic attack with the currently equipped weapon.', 'Auto Attack', 0, 'Physical', null]);
        const casterAutoAttackAbilityId = (await db.get(`SELECT id FROM abilities WHERE name = 'Auto Attack (Caster)'`)).id;

        // Cat Form Auto Attack
        await db.run(`
            INSERT OR IGNORE INTO abilities (class_id, name, description, ability_type, cooldown, school, positional_req) 
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [druidId, 'Auto Attack (Cat Form)', 'Attacks with both paws. Has a fixed attack speed of 1.5 seconds.', 'Auto Attack', 1.5, 'Physical', null]);
        const catFormAutoAttackAbilityId = (await db.get(`SELECT id FROM abilities WHERE name = 'Auto Attack (Cat Form)'`)).id;

        // Bear Form Auto Attack
        await db.run(`
            INSERT OR IGNORE INTO abilities (class_id, name, description, ability_type, cooldown, school, positional_req) 
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [druidId, 'Auto Attack (Bear Form)', 'Attacks with both paws. Has a fixed attack speed of 3.0 seconds.', 'Auto Attack', 3.0, 'Physical', null]);
        const bearFormAutoAttackAbilityId = (await db.get(`SELECT id FROM abilities WHERE name = 'Auto Attack (Bear Form)'`)).id;

        // Link abilities to effects
        await db.run(`
            INSERT OR IGNORE INTO ability_to_effects (ability_id, effect_id, order_index, delay_seconds) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?);
        `, [
            casterAutoAttackAbilityId, casterAutoAttackDamageEffectId, 0, 0,
            catFormAutoAttackAbilityId, catFormAutoAttackDamageEffectId, 0, 0,
            bearFormAutoAttackAbilityId, bearFormAutoAttackDamageEffectId, 0, 0
        ]);

        // Link abilities to prerequisite states
        await db.run(`
            INSERT OR IGNORE INTO ability_to_states (ability_id, state_id) VALUES (?, ?);
        `, [catFormAutoAttackAbilityId, catFormStateId]);
        await db.run(`
            INSERT OR IGNORE INTO ability_to_states (ability_id, state_id) VALUES (?, ?);
        `, [bearFormAutoAttackAbilityId, bearFormStateId]);

        // Link Caster and Bear auto-attacks to the global cooldown
        await db.run(`
            INSERT OR IGNORE INTO ability_to_cooldowns (ability_id, cooldown_id) VALUES (?, ?), (?, ?);
        `, [casterAutoAttackAbilityId, druidGlobalCooldownId, bearFormAutoAttackAbilityId, druidGlobalCooldownId]);

        console.log('All Druid stats, global cooldown, auto attacks and links seeded successfully!');

    } catch (err) {
        console.error('An error occurred during the Druid seeding process:', err.message);
        throw err;
    }
}
