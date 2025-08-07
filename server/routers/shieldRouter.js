import { Router } from 'express';
import db from '../database/connection.js';


const router = Router();

router.get('/items/shields', async (req, res) => {
    try {
        const shieldItems = await db.all('SELECT * FROM items WHERE type = ?;', 'Shield');
        res.json(shieldItems);
    } catch (err) {
        console.error("Error fetching shield items:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;