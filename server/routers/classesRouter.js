// classesRoutes.js
import { Router } from 'express';
import db from '../database/connection.js'; 

const router = Router(); 

router.get('/classes', async (req, res) => {
    try {
        const sql = await db.all('SELECT * FROM classes');
        res.json(sql);
    } catch (err) {
        console.error("Error fetching classes:", err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/:classId/abilities', async (req, res) => { 
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

export default router; 
