import db from '../../database/connection.js';
import { calculateStat } from './druidStatCalculatorService.js';

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
                ability_effects.scaling_value
            FROM ability_effects
            INNER JOIN ability_to_effects ON ability_effects.id = ability_to_effects.effect_id
            WHERE ability_to_effects.ability_id = ? AND ability_effects.effect_type = 'damage';
        `, [abilityId]);

        for (const effect of effects) {
            let baseDamage = calculateStat(effect.value, effect.value_per_level, level);
            let scalingDamage = 0;
            
            if (effect.scaling_type === 'attack_power') {
                scalingDamage = stats.attackPower * effect.scaling_value;
            } else {
                console.warn(`Unknown scaling_type: ${effect.scaling_type}. No scaling applied.`);
            }
            
            totalDamage += baseDamage + scalingDamage;
        }

    } catch (error) {
        console.error(`Failed to calculate damage for ${abilityName}:`, error.message);
    }

    return totalDamage;
}
