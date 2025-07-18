import { Router } from 'express';
import db from '../database/connection.js';


const router = Router();

router.get('/api/items/armor', async (req, res) => {
    try {
        const armorItems = await db.all('SELECT * FROM items WHERE type = ?;', 'Armor');
        res.json(armorItems);
    } catch (err) {
        console.error("Error fetching armor items:", err);
        res.status(500).json({ error: err.message });
    }
});

// Export the router so it can be used in your main server file
export default router;