// classesRoutes.js
import { Router } from 'express';
import db from '../database/connection.js'; // Directly import the database instance

const router = Router(); // Create the router instance

// API Endpoint: Get all classes
router.get('/', async (req, res) => { // This will be accessible at /classes
    try {
        const sql = `SELECT * FROM classes;`;
        const classes = await db.all(sql);
        res.json(classes);
    } catch (err) {
        console.error('Error fetching classes:', err.message);
        res.status(500).json({ error: 'Failed to retrieve classes' });
    }
});

// API Endpoint: Get abilities for a specific class
router.get('/:classId/abilities', async (req, res) => { // This will be accessible at /classes/:classId/abilities
    const classId = req.params.classId;
    try {
        const sql = `SELECT * FROM class_abilities WHERE class_id = ?;`;
        const abilities = await db.all(sql, classId);
        if (abilities.length === 0) {
            return res.status(404).json({ message: `No abilities found for class ID ${classId} or class not found.` });
        }
        res.json(abilities);
    } catch (err) {
        console.error(`Error fetching abilities for class ID ${classId}:`, err.message);
        res.status(500).json({ error: 'Failed to retrieve class abilities' });
    }
});

export default router; // Export the router directly
