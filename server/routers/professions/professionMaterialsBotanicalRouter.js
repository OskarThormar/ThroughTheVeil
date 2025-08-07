import { Router } from 'express';
import db from '../../database/connection.js';


const router = Router();

router.get('/materials/botanicals', async (req, res) => {
    try {
        const sql = await db.all('SELECT * FROM profession_materials WHERE type = ?;', 'Botanical');
        res.json(sql);
    } catch (err) {
        console.error("Error fetching botanical items:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;