import { Router } from 'express';
import db from '../../database/connection.js';


const router = Router();

router.get('/materials/tailoring', async (req, res) => {
    try {
        const sql = await db.all('SELECT * FROM profession_materials WHERE type = ?;', 'Padding');
        res.json(sql);
    } catch (err) {
        console.error("Error fetching skinning items:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;