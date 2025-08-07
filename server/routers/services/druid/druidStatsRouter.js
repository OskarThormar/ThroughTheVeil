import { Router } from 'express';
import { calculateDruidStats } from '../../../services/druid/druidStatCalculatorService.js';

const router = Router();

router.get('/druid/stats', async (req, res) => {
    try {
        const level = parseInt(req.query.level, 10);
        const form = req.query.form;

        if (isNaN(level) || level < 1 || level > 60) {
            return res.status(400).json({ error: 'Invalid level parameter. Must be an integer between 1 and 60.' });
        }

        let activeStates = [];
        if (form === 'Cat Form') {
            activeStates.push('Cat Form');
        }

        const stats = await calculateDruidStats(level, activeStates);

        res.json({ stats });
    } catch (err) {
        console.error('Error in /api/druid/stats:', err.message);
        res.status(500).json({ error: 'An unexpected error occurred while calculating stats.' });
    }
});

export default router;
