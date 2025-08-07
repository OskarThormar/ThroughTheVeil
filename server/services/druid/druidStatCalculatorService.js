import db from '../../database/connection.js';

/**
 * Calculates a druid's total stats at a given level, including bonuses from active states.
 * This version fetches all required data (base stats and bonuses) from the database.
 * @param {number} level The character's current level.
 * @param {string[]} activeStates An array of strings representing the character's active states.
 * @returns {object} An object containing the calculated total stats, including derived stats like attack power.
 */
export async function calculateDruidStats(level, activeStates) {
    let stats = {};

    try {
        // Find the Druid's class ID
        const druidClassResult = await db.get("SELECT id FROM classes WHERE name = 'Druid'");
        if (!druidClassResult) {
            console.error("Error: Druid class not found in database.");
            return { strength: 0, agility: 0 };
        }
        const druidId = druidClassResult.id;

        const baseStats = await db.all(`
            SELECT 
                stats.name, 
                class_stats.base_value, 
                class_stats.per_level_gain
            FROM class_stats
            INNER JOIN stats ON class_stats.stat_id = stats.id
            WHERE class_stats.class_id = ?;
        `, [druidId]);
        
        for (const stat of baseStats) {
            stats[stat.name.toLowerCase()] = calculateStat(stat.base_value, stat.per_level_gain, level);
        }
        
        if (activeStates.includes('Cat Form')) {
            
            const catFormAbilityResult = await db.get("SELECT id FROM abilities WHERE name = 'Cat Form'");
            if (!catFormAbilityResult) {
                console.error("Error: Cat Form ability not found in database.");
                return stats;
            }
            const catFormAbilityId = catFormAbilityResult.id;

            const effects = await db.all(`
                SELECT 
                    ability_effects.value, 
                    ability_effects.value_per_level, 
                    ability_effects.effect_type
                FROM ability_effects
                INNER JOIN ability_to_effects ON ability_effects.id = ability_to_effects.effect_id
                WHERE ability_to_effects.ability_id = ? AND ability_effects.effect_type LIKE 'stat_bonus_%';
            `, [catFormAbilityId]);

            for (const effect of effects) {
                switch (effect.effect_type) {
                    case 'stat_bonus_strength':
                        stats.strength += calculateStat(effect.value, effect.value_per_level, level);
                        break;
                    case 'stat_bonus_agility':
                        stats.agility += calculateStat(effect.value, effect.value_per_level, level);
                        break;
                    default:
                        break;
                }
            }
        }
    } catch (error) {
        console.error("Failed to calculate Druid stats:", error.message);
        return { strength: stats.strength || 0, agility: stats.agility || 0, attackPower: 0 };
    }

    stats.attackPower = (stats.strength * 2) + stats.agility;

    return stats;
}

export async function calculateAbilityDamage(abilityName, level, stats) {
    let totalDamage = 0;

    try {
        const abilityResult = await db.get("SELECT id FROM abilities WHERE name = ?", [abilityName]);
        if (!abilityResult) {
            console.error(`Error: Ability '${abilityName}' not found.`);
            return totalDamage;
        }
        const abilityId = abilityResult.id;

        const effects = await db.all(`
            SELECT 
                ability_effects.value, 
                ability_effects.value_per_level, 
                ability_effects.scaling_type, 
                ability_effects.scaling_value, 
                ability_effects.school
            FROM ability_effects
            INNER JOIN ability_to_effects ON ability_effects.id = ability_to_effects.effect_id
            WHERE ability_to_effects.ability_id = ? AND ability_effects.effect_type = 'damage';
        `, [abilityId]);

        for (const effect of effects) {
            let baseDamage = calculateStat(effect.value, effect.value_per_level, level);
            let scalingDamage = 0;
            
            if (effect.scaling_type === 'attack_power') {
                scalingDamage = stats.attackPower * effect.scaling_value;
            }
            
            totalDamage += baseDamage + scalingDamage;
        }

    } catch (error) {
        console.error(`Failed to calculate damage for ${abilityName}:`, error.message);
    }

    return totalDamage;
}

export function calculateStat(baseValue, perLevelGain, level) {
    if (level < 1) {
        level = 1;
    }
    return baseValue + (perLevelGain * (level - 1));
}
