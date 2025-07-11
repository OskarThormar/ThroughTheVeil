import { Router } from 'express';
import db from '../database/connection.js';


const router = Router();

router.get('/api/items/shield', async (req, res) => {
    try {
        const shieldItems = await db.all('SELECT * FROM items WHERE type = ?;', 'Shield');
        res.json(shieldItems);
    } catch (err) {
        console.error("Error fetching shield items:", err);
        res.status(500).json({ error: err.message });
    }
});

// Export the router so it can be used in your main server file
export default router;