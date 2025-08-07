import { Router } from 'express';
import db from '../database/connection.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const sql = `SELECT * FROM specializations;`;
        const specializations = await db.all(sql);
        res.json(specializations);
    } catch (err) {
        console.error('Error fetching specializations:', err.message);
        res.status(500).json({ error: 'Failed to retrieve specializations' });
    }
});

router.get('/:specializationId/abilities', async (req, res) => {
    const specializationId = req.params.specializationId;
    try {
        const sql = `SELECT * FROM specialization_abilities WHERE specialization_id = ?;`;
        const abilities = await db.all(sql, specializationId);
        if (abilities.length === 0) {
            return res.status(404).json({ message: `No abilities found for specialization ID ${specializationId} or specialization not found.` });
        }
        res.json(abilities);
    } catch (err) {
        console.error(`Error fetching abilities for specialization ID ${specializationId}:`, err.message);
        res.status(500).json({ error: 'Failed to retrieve specialization abilities' });
    }
});

export default router; 
