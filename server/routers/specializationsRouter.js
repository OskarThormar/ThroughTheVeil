// specializationRouter.js
import { Router } from 'express';
import db from '../database/connection.js'; // Directly import the database instance

const router = Router(); // Create the router instance

// API Endpoint: Get all specializations
// This will be accessible at /specializations (or whatever base path it's mounted under in app.js)
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

// API Endpoint: Get abilities for a specific specialization
// This will be accessible at /specializations/:specializationId/abilities
router.get('/:specializationId/abilities', async (req, res) => {
    const specializationId = req.params.specializationId;
    try {
        const sql = `SELECT * FROM specialization_abilities WHERE specialization_id = ?;`;
        const abilities = await db.all(sql, specializationId);
        if (abilities.length === 0) {
            // Returns 404 if no abilities are found for the given specialization ID
            return res.status(404).json({ message: `No abilities found for specialization ID ${specializationId} or specialization not found.` });
        }
        res.json(abilities);
    } catch (err) {
        console.error(`Error fetching abilities for specialization ID ${specializationId}:`, err.message);
        res.status(500).json({ error: 'Failed to retrieve specialization abilities' });
    }
});

export default router; // Export the router directly
