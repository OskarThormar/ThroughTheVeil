import { Router } from 'express';
import db from '../../database/connection.js';


const router = Router();

router.get('/materials/skinnings', async (req, res) => {
    try {
        const sql = await db.all('SELECT * FROM profession_materials WHERE type = ?;', 'Skinnings');
        res.json(sql);
    } catch (err) {
        console.error("Error fetching skinning items:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;