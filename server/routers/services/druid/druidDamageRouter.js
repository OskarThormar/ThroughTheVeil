import { Router } from 'express';
import { calculateDruidStats } from '../../../services/druid/druidStatCalculatorService.js';
import { calculateAbilityDamage } from '../../../services/druid/druidDamageCalculatorService.js';

const router = Router();

router.get('/druid/damage', async (req, res) => {
    try {
        const abilityName = req.query.ability;
        const level = parseInt(req.query.level, 10);
        
        if (!abilityName || isNaN(level) || level < 1 || level > 60) {
            return res.status(400).json({ error: 'Invalid ability name or level parameter.' });
        }

        const stats = await calculateDruidStats(level, ['Cat Form']);
        
        const damage = await calculateAbilityDamage(abilityName, level, stats);
        
        res.json({ ability: abilityName, damage });

    } catch (err) {
        console.error('Error in /api/druid/damage:', err.message);
        res.status(500).json({ error: 'An unexpected error occurred while calculating ability damage.' });
    }
});

export default router;
